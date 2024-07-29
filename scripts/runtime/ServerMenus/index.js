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


import { world, system, Player, ItemStack } from "@minecraft/server";
import { ActionFormData, FormCancelationReason, MessageFormData, ModalFormData } from "@minecraft/server-ui";
import { ChestFormData } from "../../Extensions/Chestform/forms.js";
import { HomeMenu } from "../Systems/Home.js";
import { ReedemCodeMenu } from "../Systems/RedeemCode.js";
import { FactionMenu } from "../Systems/Factions.js";
import { sellPad } from "../../Extensions/SellPad.js";
import { items } from "../SellPad/index.js";
import { Rules_Gui } from "./rules.js";
import { menu } from "../Shops/buildingblocks/building_blocks.js"
import { foodmenu } from "../Shops/FoodShop/food_shop.js";
import { raidmenu } from "../Shops/RaidingShop/raiding_shop.js";
import { spawnermenu } from "../Shops/SpawnerShop/spawner_shop.js";
import { TpaMenu } from "../Systems/TPa.js";
import ChatCommand from "../../Extensions/ChatHandler.js";
import BountyMenu from "../Systems/Bounty.js";
import './playerstats.js'
import './rules.js'

ChatCommand({
    command: 'Menu',
    description: 'Opens The Server Menu',
    alias: ['m'],
    callback: (player) => {
        system.run(() => MemberMenu(player))
        player.sendMessage(`§aOpening Server Menu - §cPlease Exit The Chat Room...`)
    }
})

ChatCommand({
    command: 'Rules',
    description: 'Opens The Rules Menu',
    alias: ['r'],
    callback: (player) => {
        system.run(() => Rules_Gui(player))
        player.sendMessage(`§aOpening Rules Menu - §cPlease Exit The Chat Room...`)
    }
})


world.beforeEvents.itemUse.subscribe(({ source: player, itemStack: item }) => {
    if (item.typeId == SRconfig.ServerMenu.MembersItem && !player.hasTag(ACconfig.Tags.CombatTag)) return system.run(() => MemberMenu(player))
})

/**
 * 
 * @param {Player} player 
 */
export function MemberMenu(player) {
    const form = new ActionFormData()
    form.title("§aServer Menu")
    form.body(`§aWelcome To The Server Menu\n`)
    form.button('§6Server Warps', 'textures/ui/mashup_world')
    form.button('§bHomes', 'textures/ui/icon_recipe_item')
    form.button("§6VIP's Menu", "textures/ui/icon_best3")
    form.button("§5Tpa Menu", "textures/ui/Friend2")
    form.button('§aBounty Menu', 'textures/ui/anvil_icon')
    form.button('§6Factions Menu', 'textures/ui/filledStar')
    form.button('§5Sidebar Settings', 'textures/ui/creative_icon')
    form.button('§aMoney Transfer', 'textures/ui/trade_icon')
    form.button('§9Redeem Code', 'textures/ui/icon_blackfriday')
    form.button('§6Fix Gui Stuck\nIn Inventory', 'textures/items/orbmenu')
    form.button('§cClose', 'textures/ui/cancel')
    form.show(player).then(async ({ canceled, selection, cancelationReason }) => {
        if (cancelationReason === FormCancelationReason.UserBusy) return MemberMenu(player);
        if (canceled) return;
        switch (selection) {
            case 0:
                if (player.hasTag(ACconfig.Tags.CombatTag)) return player.sendMessage(`§cYou Can't Use This While In Combat!`)
                system.run(() => WarpMenu(player))
                break;
            case 1: system.run(() => HomeMenu(player)); break;
            case 2: if (!player.hasTag('VIP')) return player.sendMessage(`§cYou Need To Be A §aVIP §cTo Use This!\n§aYou Can Buy VIP At §6https://reapland-factions.tebex.io/`)
                system.run(() => VIPSTUFF(player));
                break;
            case 3: system.run(() => TpaMenu(player)); break;
            case 4: system.run(() => BountyMenu(player)); break;
            case 5: system.run(() => FactionMenu(player)); break;
            case 6: system.run(() => Settings(player)); break;
            case 7: system.run(() => MoneyTranfer(player)); break;
            case 8: system.run(() => ReedemCodeMenu(player)); break;
            case 9:
                const playerinv = player.getComponent('inventory').container;
                await player.runCommandAsync('clear @s soulless:menu')
                const item = new ItemStack('soulless:menu', 1)
                item.lockMode = 'slot'
                item.keepOnDeath = true;
                playerinv.setItem(8, item)
                player.sendMessage(`§aGui has been refreshed to your inventory!`);
            default: player.sendMessage(`§aClosing Menu...`); break;
        }
    })
}

/**
 * 
 * @param {Player} player 
 */
function VIPSTUFF(player) {
    new ActionFormData()
        .title("§aVIP's Stuff")
        .body("§aPlease Select An Option From Below")
        .button('§aSell All Items', 'textures/ui/trade_icon')
        .button('§aOpen Shops', "textures/ui/icon_best3")
        .button('§cExit', 'textures/ui/cancel')
        .show(player).then(({ canceled, selection }) => {
            if (canceled) return;
            if (!player.hasTag('VIP')) return player.sendMessage(`§cYou Need To Be A §aVIP §cTo Use This!`)
            switch (selection) {
                case 0:
                    if (!player.hasTag('VIP')) return player.sendMessage(`§cYou Need To Be A §aVIP §cTo Use This!`)
                    sellPad(player, items);
                    break;
                case 1: system.run(() => VIPSHOPS(player)); break;
                default: player.sendMessage(`§aClosing Menu...`); break;
            }
        })
}

function VIPSHOPS(player) {
    new ChestFormData('large')
        .title("§aVI's  SShops")
        .button(11, '§𝕠§l§aVIP Shop Enchants', [], 'minecraft:gold_block', 0)
        .button(12, '§𝕠§n§6Building Blocks', [], "minecraft:oak_log", 0)
        .button(13, `§𝕠§l§aFood Shop`, [], "minecraft:cooked_beef", 0)
        .button(14, `§𝕠§l§uRaiding Shop`, [], "minecraft:diamond_sword", 0)
        .button(15, `§𝕠§l§6Spawner Shop`, [], "minecraft:mob_spawner", 0)
        .button(31, '§c§lClose', [], 'minecraft:barrier', 0)
        .pattern([0, 0], [
            'xxxxxxxxx',
            'xx_____xx',
            'xxxxxxxxx',
            'xxxx_xxxx',
            'xxxxxxxxx',
            'xxxxxxxxx'
        ], {
            x: { data: { itemName: '', itemDesc: [], enchanted: false, stackAmount: 1 }, iconPath: 'textures/ui/cointier_backdrop' },
            l: { data: { itemName: '§𝕠§6Building Menu', itemDesc: [], enchanted: true, stackAmount: 1 }, iconPath: "textures/ui/hammer_l" },
            r: { data: { itemName: '§𝕠§6Building Menu', itemDesc: [], enchanted: true, stackAmount: 1 }, iconPath: "textures/ui/hammer_r" },

        })
        .show(player).then(response => {
            if (response === null || response.canceled) return player.sendMessage(`§cMenu Closed`)
            player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
            switch (response.selection) {
                case 11:
                    player.runCommand("tp @s 119 100 33")
                    player.sendMessage("§6Punch This NPC To Open VIP Enchants")
                    break;
                case 12:
                    menu(player);
                    break;
                case 13:
                    foodmenu(player);
                    break;
                case 14:
                    raidmenu(player);
                    break;
                case 15:
                    spawnermenu(player);
                    break;
                case 31:
                    player.sendMessage(`§cMenu Closed`)
                    break;
            }
        })
};

/**
 * @param {Player} player
 */
function Settings(player) {
    const database = Database.get('SidebarSettings', player) ?? {}
    const form = new ModalFormData()
    form.title("§aSettings")
    SRconfig.ServerMenu.settings.map((setting) => form.toggle(`§6${setting}`, database[setting] ?? true))
    form.show(player).then(({ canceled, cancelationReason, formValues }) => {
        if (cancelationReason === FormCancelationReason.UserBusy) return Settings(player);
        if (canceled) return;
        SRconfig.ServerMenu.settings.forEach((setting, index) => database[setting] = formValues[index])
        Database.set('SidebarSettings', database, player);
        player.sendMessage('§aSettings Updated!');
    })
}

/**
 * 
 * @param {Player} player 
 */
function WarpMenu(player) {
    const form = new ActionFormData();
    form.title("§6Server Warps")
    form.body("§6Use This Menu To Warp To Different Locations Around The Server\n§cPlease Note: §rYou Can Only Use This Menu In The Overworld\n\n§cCant Find The Warp You Need? Do §a.w §cor §a.warps §cTo See All Warps")
    SRconfig.ServerMenu.Warps.map(({ locationName }) => form.button(`§6${locationName}`))
    form.button('§cClose', 'textures/ui/cancel')
    form.show(player).then(async ({ canceled, selection, cancelationReason }) => {
        if (cancelationReason === FormCancelationReason.UserBusy) return WarpMenu(player);
        if (canceled) return;
        if (selection === SRconfig.ServerMenu.Warps.length) return MemberMenu(player);
        const { location, locationName } = SRconfig.ServerMenu.Warps[selection]
        if (locationName === "Wilderness") {
            if (player.dimension.id !== 'minecraft:overworld') {
                player.teleport(SRconfig.ServerMenu.Warps[0].location, { dimension: world.getDimension('overworld') })
                return player.sendMessage(`§aTeleporting To §6Overworld...\n§cYou Cant Teleport To The Wilderness From The Nether but You Can From The Overworld!`)
            }
            await player.runCommandAsync('spreadplayers 0 0 0 10000 @s');
            return player.sendMessage(`§aTeleporting To §6${locationName || 'SomeWere'}...`)
        }
        player.teleport(location, { dimension: world.getDimension('overworld') })
        player.sendMessage(`§aTeleporting To §6${locationName || 'SomeWere'}...`)
    })
}

/**
 * 
 * @param {Player} player 
 */
function MoneyTranfer(player) {
    const players = world.getPlayers().filter((value) => value.name !== player.name)
    if (players.length === 0) return player.sendMessage(`§cThere Are No Players Online!`)
    new ModalFormData()
        .title("§aMoney Transfer")
        .dropdown("§o§5Select The Player You Want To Send Money To", players.map((player) => player.name))
        .textField(`§5Enter The Amount Your Sending\n§bYou Have (${player.score.Money}) Money`, `§oOnly Use Numbers`)
        .toggle("§5Are You Sure You Want To Send This Money?", false)
        .show(player).then(({ canceled, cancelationReason, formValues: [indexPlayer, amount, Confirmed] }) => {
            if (canceled) return;
            if (cancelationReason === FormCancelationReason.UserBusy) return MoneyTranfer(player);
            if (!Confirmed) return player.sendMessage(`§aProcess Canceled...`);
            if (isNaN(parseInt(amount)) || parseInt(amount) <= 0) return player.sendMessage(`§cPlease Enter A Valid Number!`);
            if (parseInt(amount) > player.score.Money) return player.sendMessage(`§cYou Don't Have Enough Money!`);
            const target = players[indexPlayer]
            if (!target) return player.sendMessage(`§c${target.name} has Left the game!`);
            target.score.Money = target.score.Money + parseInt(amount)
            player.score.Money = player.score.Money - parseInt(amount)
            player.sendMessage(`§aYou Have Sent §6${amount} §aTo §6${target.name}`)
            target.sendMessage(`§aYou Have Recived §6${amount} §aFrom §6${player.name}`)
        })
}