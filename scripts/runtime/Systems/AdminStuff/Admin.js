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
import { ActionFormData, ModalFormData, MessageFormData } from "@minecraft/server-ui";
import { wait } from "../../../Extensions/functions";
import { BanMenu } from "./Ban.js";
import { MuteMenu } from "./Mute.js";
import BountiesMenu from "./Bounty.js";
import AdminFactionMenu from "./AdminFaction";
import ChatCommand from "../../../Extensions/ChatHandler";

ChatCommand({
    command: 'Admin',
    description: '§cAdmin Menu',
    alias: ['ad'],
    permissions: (player) => ACconfig.Tags.AdminTags.some((value) => player.hasTag(value)),
    callback: (player) => {
        system.run(() => AdminMenu(player));
    }
})


ChatCommand({
    command: 'ResetMobStacker',
    description: '§cRemove MobStacker',
    alias: ['rms'],
    args: { 'range': 'number' },
    permissions: (player) => player.hasTag('Owner'),
    callback: (player, args) => {
        const range = args['range'] ?? 10
        const mobs = player.dimension.getEntities({ location: player.location, maxDistance: range }).filter((entity) => SRconfig.MobStackerConfig.EntityTypes.includes(entity.typeId.split(':')[1]))
        system.run(() => {
            mobs.forEach((entity) => {
                if (entity.nameTag.includes('§5')) entity.nameTag = `§5${1} §b${entity.typeId.split(':')[1].replace("still", "")}`;
            })
        })
        return player.sendMessage(`§aAll MobStacker Entities Has Been Reseted In A Range Of ${range}`)
    }
})

ChatCommand({
    command: 'lockdown',
    description: '§cLockdown The Server',
    alias: ['ld'],
    permissions: (player) => player.hasTag('Owner'),
    args: {},
    callback: (player, args) => {
        const lockdownMode = Database.get('LockDown') ?? false;
        if (lockdownMode === false) {
            world.getPlayers().filter((v) => !ACconfig.OwnerNames.includes(v.name) && !ACconfig.Tags.skipPlayers.some((t) => v.hasTag(t)))
                .forEach(async (v) => await v.runCommandAsync(`kick "${v.name}" §cThe Server Is Now In Lockdown`));
            Database.set('LockDown', true)
            return player.sendMessage('§cThe Server Is Now In Lockdown')
        } else {
            Database.set('LockDown', false)
            return player.sendMessage('§aThe Server Is Now Out Of Lockdown')
        }
    }
})

world.afterEvents.playerSpawn.subscribe(({ initialSpawn, player }) => {
    if (!initialSpawn || ACconfig.OwnerNames.includes(player.name)) return;
    const lockdown = Database.get('LockDown') ?? false;
    if (!lockdown || ACconfig.Tags.skipPlayers.some((v) => player.hasTag(v))) return;
    player.runCommandAsync(`kick "${player.name}" §cThe Server Is Now In Lockdown`)
})


/**
 * @param {Player} player
 */
export function AdminMenu(player) {
    new ActionFormData()
        .title('§cADMIN MENU')
        .button('§l§fBan Menu', "textures/ui/anvil_icon")
        .button('§l§fKick Player', "textures/ui/speed_effect")
        .button('§l§fMute menu', "textures/items/map_filled")
        .button('§l§fBounties Menu', "textures/ui/Friend2")
        .button('§l§fFaction Menu', "textures/items/diamond")
        .button('§l§fCrates', "textures/ui/absorption_heart")
        .button('§l§fEdit Player Stats', "textures/ui/absorption_heart")
        .button('§l§fClone Inventory', "textures/items/brush")
        .button('§l§fClears', "textures/blocks/barrier")
        .button('§l§fGamemodes', "textures/ui/absorption_heart")
        .show(player).then(({ canceled, cancelationReason, selection }) => {
            if (cancelationReason === 'UserBusy') return AdminMenu(player)
            if (canceled) return;
            switch (selection) {
                case 0:
                    if (player.hasTag('Owner') || player.hasTag('Admin') || player.hasTag("Moderator")) return BanMenu(player);
                    else return player.sendMessage('§cYou Do Not Have Permission To Use This')

                case 1:
                    if (player.hasTag('Owner') || player.hasTag('Admin') || player.hasTag("Moderator")) return KickMenu(player);
                    else return player.sendMessage('§cYou Do Not Have Permission To Use This')

                case 2: MuteMenu(player); break

                case 3: 
                if (player.hasTag('Owner') || player.hasTag('Admin') || player.hasTag("Moderator")) return BountiesMenu(player);
                else return player.sendMessage('§cYou Do Not Have Permission To Use This')

                case 4:
                    if (player.hasTag('Owner')) return AdminFactionMenu(player);
                    else return player.sendMessage('§cYou Do Not Have Permission To Use This')
                    

                case 5:
                    if (player.hasTag('Owner')) return CreatesAdminMenu(player);
                    else return player.sendMessage('§cYou Do Not Have Permission To Use This')
                    

                case 6:
                    if (player.hasTag('Owner') || player.hasTag('Admin')) return AdminPlayerStats(player);
                    else return player.sendMessage('§cYou Do Not Have Permission To Use This')
                    

                case 7:
                    if (player.hasTag('Owner') || player.hasTag('Admin')) return InventoryClone(player);
                    else return player.sendMessage('§cYou Do Not Have Permission To Use This')
                    

                case 8:
                    if (player.hasTag('Owner') || player.hasTag('Admin')) return ClearInventory(player);
                    else return player.sendMessage('§cYou Do Not Have Permission To Use This')
                    

                case 9:
                    if (player.hasTag('Owner') || player.hasTag('Admin')) return PlayerGamemode(player);
                    else return player.sendMessage('§cYou Do Not Have Permission To Use This')
                    
            }
        })
}

/**
 * @param {Player} player
 */
function CreatesAdminMenu(player) {
    const players = world.getPlayers()
    const form = new ActionFormData()
    form.title('§lADMIN MENU')
    form.body('§7Select A Player To Edit Stats')
    players.forEach((value) => {
        form.button(value.name, 'textures/ui/icon_recipe_item')
    })
    form.button('§cClose', 'textures/ui/cancel')
    form.show(player).then(({ canceled, selection }) => {
        if (canceled || selection === players.length) return AdminMenu(player)
        const findplayer = world.getPlayers({ name: players[selection].name })[0]
        if (!findplayer) return player.sendMessage(`§c${players[selection].name} is no longer is in game`);
        const crates = ['Trims', 'Common', 'Mastery', 'Uncommon', 'Rare', 'Epic', 'Legendary']
        new ModalFormData()
            .title('§lADMIN MENU')
            .dropdown('§7Select A Crate', crates)
            .textField(`§7Enter The Amount Of Crate You Want To Give`, '0')
            .toggle(`§7Are You Sure You Want To Give This Crate?`, false)
            .show(player).then(({ canceled, formValues: [Crate, Amount, Confirm] }) => {
                if (canceled) return;
                if (!Confirm) return player.sendMessage('§cYou Must Agree To Give The Crate')
                Amount = parseInt(Amount)
                if (isNaN(Amount) || Amount <= 0) return player.sendMessage('§cPlease Enter A Valid Number')
                const crate = crates[Crate]
                const crateData = Database.get('Crates', findplayer) ?? {}
                crateData[crate] = (crateData[crate] ?? 0) + Amount
                Database.set('Crates', crateData, findplayer)
                player.sendMessage(`§aYou Have Given ${findplayer.name} ${Amount} ${crate} Crates`)
            })
    })
}
/**
 * 
 * @param {Player} player 
 */
function AdminPlayerStats(player) {
    const players = world.getPlayers()
    const form = new ActionFormData()
    form.title('§lADMIN MENU')
    form.body('§7Select A Player To Edit Stats')
    players.forEach((value) => {
        form.button(value.name, 'textures/ui/icon_recipe_item')
    })
    form.button('§cClose', 'textures/ui/cancel')
    form.show(player).then(({ canceled, selection }) => {
        if (canceled || selection === players.length) return AdminMenu(player)
        const findplayer = world.getPlayers({ name: players[selection].name })[0]
        const EditStats = ['Money', 'Kills', 'Deaths', 'Killstreak']
        new ModalFormData()
            .title('§lADMIN MENU')
            .dropdown('§7Select A Stat To Edit', EditStats)
            .textField(`§7Enter The Amount Of You Want To set`, '0')
            .toggle(`§7Are You Sure You Want To Set To This Amount?`, false)
            .show(player).then(({ canceled, formValues: [Editsel, Amount, Confirm] }) => {
                if (canceled) return;
                if (!Confirm) return player.sendMessage('§cYou Must Agree To Change The Stats')
                Amount = parseInt(Amount)
                if (isNaN(Amount)) return player.sendMessage('§cPlease Enter A Valid Number')
                if (Amount < 0) return player.sendMessage('§cYou Cannot Set A Negative Number')
                if (Editsel === 0) findplayer.score.Money = Amount
                if (Editsel === 1) findplayer.score.Kills = Amount
                if (Editsel === 2) findplayer.score.Deaths = Amount
                if (Editsel === 3) findplayer.score.Killstreak = Amount
                player.sendMessage(`§aYou Have Set ${findplayer.name} ${EditStats[Editsel]} To ${Amount}`)
            })
    })
}

/**
 * 
 * @param {Player} player 
 */
function KickMenu(player) {
    const reasons = ['Cheating/Hacking', 'Exploitation', 'Scamming', 'Rule Broken', 'Harassment/Toxic Behavior', 'Spamming/Advertising', 'Inappropriate Actions/Username', "Inappropriate Messages", 'Other']
    const players = world.getPlayers().filter((v) => v.name !== player.name)
    if (players.length === 0) return player.sendMessage('§cThere Are Certainly Zero Active Players')
    new ModalFormData()
        .title("§lKick Menu")
        .dropdown("Player Name", players.map((value) => value.name))
        .dropdown("Punishment Reason", reasons, 0)
        .show(player).then(({ canceled, formValues: [selplayer, reason] }) => {
            if (canceled) return AdminMenu(player)
            const findplayer = world.getPlayers({ name: players[selplayer].name })[0]
            if (!findplayer) return player.sendMessage(`§c${players[selplayer].name} is no longer is in game`);
            player.runCommandAsync(`kick "${findplayer.name}" §cYou Have Been Kicked By ${findplayer.name} Due To§4 ${reasons[reason]}`)
            world.sendMessage(`§c§l${findplayer.name}§r §7Has Been Kicked By - ${player.name} Due To§4 ${reasons[reason]}`)
        })
}

/**
 * 
 * @param {Player} player 
 */
async function InventoryClone(player) {
    const players = world.getPlayers().filter((v) => v.name !== player.name)
    if (players.length === 0) return player.sendMessage('§cThere Are Certainly Zero Active Players')
    new ModalFormData()
        .title(player.name + "’s Inventory")
        .dropdown("Player Name", players.map(p => p.name))
        .show(player).then(async ({ canceled, formValues: [selplayer] }) => {
            if (canceled) return;
            const findplayer = world.getPlayers({ name: players[selplayer].name })[0]
            if (!findplayer) return player.sendMessage(`§c${players[selplayer].name} is no longer is in game`);
            player.runCommandAsync('clear @s')
            await wait(10)
            const [items, armor] = await clonePlayerStuff(findplayer);
            const playerInv = player.getComponent('inventory').container;
            for (const [item, slot] of items) playerInv.setItem(slot, item)
            const playereq = player.getComponent(`equippable`)
            for (const [item, eq] of armor) playereq.setEquipment(eq, item)
            player.sendMessage('§aYou Have Cloned The Inventory And Armor')
        })
}

/**
 * 
 * @param {Player} player 
 */
function clonePlayerStuff(player) {
    return new Promise((resolve, reject) => {
        const items = []
        const playerInv = player.getComponent('inventory').container;
        for (let i = 0; i < playerInv.size; i++) {
            const item = playerInv.getItem(i)
            if (!item) continue;
            items.push([item, i])
        }
        const armor = []
        const playereq = player.getComponent(`equippable`)
        for (const eq of ['Chest', 'Feet', 'Head', 'Legs', 'Mainhand', 'Offhand']) {
            const item = playereq.getEquipment(eq)
            if (!item) continue
            armor.push([item, eq])
        }
        resolve([items, armor])
    })
}

/**
 * 
 * @param {Player} player 
 */
function ClearInventory(player) {
    const types = ['Inventory', 'Ender Chest']
    const reasons = ['Cheating/Hacking', 'Exploitation', 'Scamming', 'Rule Broken', 'Harassment/Toxic Behavior', 'Spamming/Advertising', 'Inappropriate Actions/Username', "Inappropriate Messages", 'Other']
    const players = world.getPlayers().filter((v) => v.name !== player.name)
    if (players.length === 0) return player.sendMessage('§cThere Are Certainly Zero Active Players')
    new ModalFormData()
        .title(player.name + "’s Inventory")
        .dropdown("Player Name", players.map(p => p.name))
        .dropdown('Type Of Clear', types, 0)
        .show(player).then(({ canceled, formValues: [selplayer, type, reson] }) => {
            if (canceled) return;
            const findplayer = world.getPlayers({ name: players[selplayer].name })[0]
            if (!findplayer) return player.sendMessage(`§c${players[selplayer].name} is no longer is in game`);
            const findplayerInv = findplayer.getComponent('inventory').container;
            if (type === 0) return findplayer.runCommandAsync('clear @s'), player.sendMessage(`§aYou Have Cleared ${findplayer.name} ${types[type]}`)
            if (type === 1) {
                for (let slot = 0; slot <= 26; slot++) findplayer.runCommandAsync(`replaceitem entity "${findplayer.name}" slot.enderchest ${slot} air`);
            }
            player.sendMessage(`§aYou Have Cleared ${findplayer.name} ${types[type]}`)
        })
}

/**
 * 
 * @param {Player} player 
 */
function PlayerGamemode(player) {
    const gamemodes = ['Creative', 'Survival', 'Spectator', 'Adventure']
    new ActionFormData()
        .title('§lGAMEMODES')
        .button('Creative')
        .button('Survival')
        .button('Spectator')
        .button('Adventure')
        .button('Back')
        .show(player).then(({ canceled, selection }) => {
            if (canceled) return;
            const gamemode = gamemodes[selection]
            if (!gamemode) return AdminMenu(player)
            player.runCommandAsync(`gamemode ${gamemode}`)
            player.sendMessage(`§aYour Gamemode is changed to ${gamemode}`)
        })
}