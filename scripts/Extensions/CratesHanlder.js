/**
 * This code is developed by the_boss9345 (Discord).
 * 
 * License: MIT
 * 
 * Disclaimer:
 * This code is provided "as is", without warranty of any kind, express or implied,
 * including but not limited to the warranties of merchantability, fitness for a particular
 * purpose, and noninfringement. In no event shall the authors or copyright holders be
 * liable for any claim, damages, or other liability, whether in an action of contract,
 * tort, or otherwise, arising from, out of, or in connection with the software or the
 * use or other dealings in the software.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
 * to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 */


import { world, system, Player } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { CratesInfo } from "../runtime/Systems/Crates";
import { ChestFormData } from "./Chestform/forms";
world.beforeEvents.playerInteractWithBlock.subscribe((data) => {
    const { player, block } = data
    Object.entries(CratesInfo).map(([name, crate]) => {
        if (block.typeId === crate.blockId && block.location.x === crate.location.x && block.location.y === crate.location.y && block.location.z === crate.location.z) {
            data.cancel = true
            system.run(() => CratesMenu(player, name, crate));
        }
    })
})

/** 
 * 
 * @param {Player} player 
 * @param {*} name 
 * @param {*} crate 
 */
export async function CratesMenu(player, name, crate) {
    const keyamount = await GetCrates(player).then((c) => c[name] || 0)
    const form = new ChestFormData('double')
    form.title(`§l§a${name} Crate`)
    form.button(31, '§l§cExit', [''], 'textures/blocks/barrier')
    form.button(21, `§aOpen ${name}`, [`You Have ${keyamount} Keys`], "textures/ui/icon_blackfriday")
    form.button(23, `§bView ${name} Crate Rewards`, [], "minecraft:chest", 0)
    form.pattern([0, 0], [
        'xxxxxxxxx',
        'xxxxxxxxx',
        'xxx_x_xxx',
        'xxxx_xxxx',
        'xxxxxxxxx',
        'xxxxxxxxx'], {
        x: { data: { itemName: '', itemDesc: [], enchanted: false, stackAmount: 1 }, iconPath: 'textures/ui/cointier_backdrop' },
    })
    form.show(player).then(({ canceled, selection }) => {
        if (canceled) return;
        if (selection === 31) return player.sendMessage(`§c§lMenu Closed`)
        if (selection === 21) return OpenCrate(player, name, crate)
        if (selection === 23) return ViewCratesRewards(player, name, crate)
    })
}

/**
 * @param {Player} player
 */
async function OpenCrate(player, name, crate) {
    const crateData = await GetCrates(player).then((c) => c ?? {})
    if (!crateData[name] || crateData[name] <= 0) return player.sendMessage(`§c§lYou don't have ${name} Crate Keys`)
    const randomItem = getRandomItem(crate)
    const inv = player.getComponent('inventory').container;
    if (inv.emptySlotsCount < randomItem.items_giving) return player.sendMessage(`§c§lYou Won A ${randomItem.itemName} But You Didn't Have Enought Space In Your Inventory So You Didn't Get The Item §a[Key Refunded] §cYou need ${randomItem.items_giving - inv.emptySlotsCount} slots in your inventory to open this crate`)
    randomItem?.callback(player)
    crateData[name]--
    await SetCrates(player, crateData)
    player.runCommand(`playsound random.levelup @s`)
    player.sendMessage(`§a§lYou Won A ${randomItem.itemName}`)
}

/**
 * @param {Player} player
 * @param {string} name
 * @param {*} crate 
 */
function ViewCratesRewards(player, name, crate, currentPage = 0) {
    const getAllItems = crate.items.map(item => {
        return {
            items: item.itemName,
            chance: item.chance,
            textures: item.textures
        }
    })
    const form = new ChestFormData('double');
    form.title(`§l§a${name} Items §𝕠[Page ${currentPage + 1}]`);
    const itemsPerPage = 28;
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = getAllItems.slice(start, end);
    pageItems.forEach((item, i) => {
        const rowSize = 9;
        const innerRowSize = 7;
        const topBottomRows = 1;
        const innerRow = Math.floor(i / innerRowSize);
        const innerColumn = i % innerRowSize;
        const slotIndex = (innerRow + topBottomRows) * rowSize + (innerColumn + 1);
        form.button(slotIndex, `§l§a${item.items}`, [`§l§aChance: ${item.chance}%`], `${item.textures ?? 'minecraft:element_0'}`, 0);
    })
    form.pattern([0, 0], ['xxxxxxxxx', 'x_______x', 'x_______x', 'x_______x', 'x_______x', 'xxxpbnxxx'], {
        x: { data: { itemName: '', itemDesc: [], enchanted: false, stackAmount: 1 }, iconPath: 'textures/ui/cointier_backdrop' },
        b: { data: { itemName: 'Close', itemDesc: [], enchanted: false, stackAmount: 1 }, iconPath: 'minecraft:barrier' },
        n: { data: { itemName: currentPage < Math.floor(getAllItems.length / itemsPerPage) ? 'Next Page' : '', itemDesc: [], enchanted: false, stackAmount: 1 }, iconPath: currentPage < Math.floor(getAllItems.length / itemsPerPage) ? 'textures/ui/arrowRight' : 'textures/ui/cointier_backdrop' },
        p: { data: { itemName: 0 < currentPage ? 'Previous Page' : '', itemDesc: [], enchanted: false, stackAmount: 1 }, iconPath: currentPage > 0 ? 'textures/ui/arrowLeft' : 'textures/ui/cointier_backdrop' }
    })
    form.show(player).then(({ canceled, selection }) => {
        if (canceled) return;
        if (selection === 50) ViewCratesRewards(player, name, crate, currentPage + 1);
        if (selection === 48 && currentPage > 0) ViewCratesRewards(player, name, crate, currentPage - 1);
        if (selection === 49) player.sendMessage('§l§cClosed');
    });
}

/**
* @param {Player} player 
*/
export function BuyCratesKeys(player) {
    const crates = ['§5Trims', '§7Common', '§aUncommon', '§bRare', '§uEpic', '§6Legendary', '§dMastery']
    const form = new ChestFormData('double')
    form.title('§l§aBuy Crate Keys')
    crates.map((crate, index) => form.button(index + 19, `§l${crate} Crate Key`, [``], "minecraft:tripwire_hook", 0, true))
    form.pattern([0, 0], [
        'xxxxxxxxx',
        'xxxxxxxxx',
        'x_______x',
        'xxxx_xxxx',
        'xxxxxxxxx',
        'xxxxxxxxx'], {
        x: { data: { itemName: '', itemDesc: [], enchanted: false, stackAmount: 1 }, iconPath: 'textures/ui/cointier_backdrop' },
    })
    form.button(31, '§l§cExit', [''], 'textures/blocks/barrier')
    form.show(player).then(({ canceled, selection }) => {
        if (canceled) return;
        const crate = Object.entries(CratesInfo)[selection - 19]
        if (selection - 19 === 6) return player.sendMessage('§c§lThis Crate Is Not Available Yet')
        if (selection === 31 || crate === undefined) return player.sendMessage('§c§lMenu Closed')
        new ModalFormData()
            .title(`§l§aBuy ${crate[0]} Key`)
            .textField(`Price: §a$${crate[1].price} Per ${crate[0]} Key\n\n§l§aHow Many Do You Want To Buy`, '1', '1')
            .toggle('§l§aConfirm', false)
            .show(player).then(async ({ canceled, formValues: [Amount, Confirm] }) => {
                if (canceled) return;
                if (!Confirm) return player.sendMessage(`§c§lPurchase Canceled`)
                Amount = parseInt(Amount)
                if (isNaN(Amount) || Amount <= 0) return player.sendMessage(`§c§lInter a valid number`)
                const price = Amount * crate[1].price
                if (player.score.Money < price) return player.sendMessage(`§c§lYou don't have enough money`)
                player.score.Money = (player.score.Money - price)
                const crateData = await GetCrates(player).then((c) => c)
                crateData[crate[0]] = (crateData[crate[0]] ?? 0) + Amount
                await SetCrates(player, crateData).then(() => {
                    player.sendMessage(`§a§lYou bought ${Amount} ${crate[0]} Crate Keys`)
                })
            })
    })
}

function getRandomItem(crate) {
    let randomChance = Math.random() * crate.items.reduce((sum, item) => sum + item.chance, 0);
    return crate.items.find(item => (randomChance -= item.chance) < 0)
}

async function GetCrates(player) {
    return await Database.get('Crates', player) ?? {}
}
async function SetCrates(player, crates) {
    return await Database.set('Crates', JSON.stringify(crates), player)
}
