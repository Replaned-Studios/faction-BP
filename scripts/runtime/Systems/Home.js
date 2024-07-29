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

import { system, Player } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { MemberMenu } from "../ServerMenus/index.js";

export function HomeMenu(player) {
    new ActionFormData()
        .title('§aHome Menu')
        .body('§aPlease Select An Option From Below')
        .button('§aGo To Home', 'textures/ui/check')
        .button('§aSet Home', 'textures/ui/icon_recipe_item')
        .button(`§aGet Home List`, 'textures/ui/icon_recipe_item')
        .button('§aDelete Home', 'textures/ui/cancel')
        .button('§cClose', 'textures/ui/cancel')
        .show(player).then(({ canceled, selection, cancelationReason }) => {
            if (cancelationReason === "UserBusy") return HomeMenu(player)
            if (canceled) return
            switch (selection) {
                case 0: system.run(() => GoHome(player)); break;
                case 1: system.run(() => SetHome(player)); break;
                case 2: system.run(() => HomeList(player)); break;
                case 3: system.run(() => DeleteHome(player)); break;
                case 4: MemberMenu(player); break;
            }
        })
}

/**
 * 
 * @param {Player} player 
 */
export function SetHome(player) {
    if (player.hasTag('safe') && !['Owner', 'Admin'].some((c) => player.hasTag(c))) return player.sendMessage(`§cYou Cannot Set A Home While In Safe Pleace!`)
    const database = Database.get(SRconfig.DatabaseNames.Home) ?? {}
    const playerHomes = database[player.name] ? Object.keys(database[player.name]).length : 0;
    const maxHomes = player.hasTag(ACconfig.Tags.VIP) ? SRconfig.Homes.MaxVIPHomes : SRconfig.Homes.MaxMemberHomes;
    if (playerHomes >= maxHomes) return player.sendMessage(`§cYou Have Reached The Max Amount Of Homes!`)
    new ModalFormData()
        .title('§aSet Home')
        .textField('§aPlease Enter A Name For Your Home', 'Home Name')
        .toggle('§aDo You Want To Set This Home To Your Current Position?', true)
        .show(player).then(({ canceled, cancelationReason, formValues: [HomeName, Confirm] }) => {
            if (cancelationReason === "UserBusy") return SetHome(player)
            if (canceled) return
            if (!Confirm) return player.sendMessage(`§cHome Not Set!`)
            if (HomeName.length > 10 || HomeName.length < 1) return player.sendMessage(`§cHome Name Must Be Between 1-10 Characters!`)
            if (database[player.name]?.some(({ HomeName: name }) => name === HomeName)) return player.sendMessage(`§cYou Already Have A Home Named §6${HomeName}!`)
            database[player.name] = [...(database[player.name] || []), { HomeName: HomeName, location: player.location, dimension: player.dimension.id }]
            Database.set(SRconfig.DatabaseNames.Home, database)
            player.sendMessage(`§aHome Set\n§cLocation: x:§7 ${Math.floor(player.location.x)}, §cy:§7 ${Math.floor(player.location.y)}, §cz:§7 ${Math.floor(player.location.z)}\n§cNamed:§7 ${HomeName}!`)
        })
}

/**
 * 
 * @param {Player} player 
 */
export function GoHome(player) {
    const database = Database.get(SRconfig.DatabaseNames.Home) ?? {}
    const form = new ActionFormData()
    form.title('§aHome List')
    form.body(`§aPlease Select A Home From Below\n${!database[player.name] ? '§cYou Have No Homes!' : ''}`)
    database[player.name]?.map(({ HomeName }) => form.button(`§a${HomeName}`))
    form.button('§cClose', 'textures/ui/cancel')
    form.show(player).then(({ canceled, selection, cancelationReason }) => {
        if (cancelationReason === "UserBusy") return GoHome(player)
        if (canceled) return
        if (!database[player.name] || selection === database[player.name]?.length) return HomeMenu(player)
        const { location, dimension } = database[player.name][selection]
        if (player.dimension.id !== dimension) return player.sendMessage(`§cYou Must Be In The Same Dimension As Your Home!`)
        player.teleport(location)
        player.sendMessage(`§aTeleporting To §6${database[player.name][selection].HomeName}...`)
    })
}

/**
 * 
 * @param {Player} player 
 */
export function HomeList(player) {
    const database = Database.get(SRconfig.DatabaseNames.Home) ?? {}
    const form = new ActionFormData()
    form.title('§aHome List')
    form.body(`§aPlease Select A Home From Below\n${!database[player.name] ? '§cYou Have No Homes!' : ''}`)
    database[player.name]?.map(({ HomeName }) => form.button(`§a${HomeName}`))
    form.button('§cClose', 'textures/ui/cancel')
    form.show(player).then(({ canceled, selection, cancelationReason }) => {
        if (cancelationReason === "UserBusy") return HomeList(player)
        if (canceled) return
        if (!database[player.name] || selection === database[player.name]?.length) return HomeMenu(player)
        const { location, dimension } = database[player.name][selection]
        player.sendMessage(`§aHome Location: §6${Math.floor(location.x)}, ${Math.floor(location.y)}, ${Math.floor(location.z)} §aIn Dimension: §6${dimension.replace('minecraft:', '')}`)
    })
}

/**
 * 
 * @param {Player} player 
 */
export function DeleteHome(player) {
    const database = Database.get(SRconfig.DatabaseNames.Home) ?? {}
    if (!database[player.name]) return player.sendMessage(`§cYou Have No Homes!`)
    const form = new ActionFormData()
    form.title('§aHome List')
    form.body('§aPlease Select A Home From Below')
    database[player.name]?.map(({ HomeName }) => form.button(`§a${HomeName}`))
    form.button('§cClose', 'textures/ui/cancel')
    form.show(player).then(({ canceled, selection, cancelationReason }) => {
        if (cancelationReason === "UserBusy") return DeleteHome(player)
        if (canceled) return
        if (selection === database[player.name]?.length) return HomeMenu(player)
        const { HomeName } = database[player.name][selection]
        database[player.name] = database[player.name].filter((_, index) => index !== selection)
        Database.set(SRconfig.DatabaseNames.Home, database)
        player.sendMessage(`§aHome §6${HomeName} §aDeleted!`)
    })
}  