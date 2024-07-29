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

import { world, system } from '@minecraft/server'
import { ModalFormData, MessageFormData, ActionFormData } from '@minecraft/server-ui'
import { MemberMenu } from '../ServerMenus/index.js'
const database = new WeakMap()

export function TpaMenu(player) {
    new ActionFormData()
        .title('§cTeleport Menu')
        .body('§cSending A Request To A Player Will Let You Teleport To Them (if they accept)\n\n§aWhat would you like to do?')
        .button('Send Tpa Request', "textures/items/emerald")
        .button("Tpa Request's", 'textures/items/diamond')
        .button('Exit', 'textures/ui/cancel')
        .show(player).then(({ canceled, cancelationReason, selection }) => {
            if (cancelationReason === 'UserBusy') return TpaMenu(player)
            if (canceled || selection === 2) return MemberMenu(player)
            if (selection === 0) return TpaRequest(player);
            if (selection === 1) return TpaRequests(player);
        })
}

/**
 * @param {import('@minecraft/server').Player} player
 */
function TpaRequest(player) {
    const players = world.getPlayers().filter(p => p.name !== player.name)
    if (players.length == 0) return player.sendMessage('§cThere Are None Ative Players')
    new ModalFormData()
        .title('Send Tpa Request')
        .dropdown('Select Player', players.map(p => p.name))
        .toggle('send Tpa Request', false)
        .show(player).then(({ canceled, formValues: [playerindex, Confirmed] }) => {
            if (canceled) return
            if (!Confirmed) return player.sendMessage('Tpa Request Canceled')
            const target = players[playerindex]
            if (!target) return player.sendMessage(`§cPlayer not found or not online`)
            const data = database.get(target) || {}
            data[player.name] = { ...data[player.name], [player.name]: true }
            database.set(target, data)
            player.sendMessage(`§aTpa Request Sent to §6${target.name}`)
            target.sendMessage(`§6${player.name} §aSent You A Tpa Request`)
        })
}

function TpaRequests(player) {
    const data = database.get(player) || {}
    const requests = Object.keys(data).map(key => ({ key, value: data[key] }))
    const form = new ActionFormData()
    form.title('§cTpa Requests')
    form.body('§cSelect a Tpa Request')
    requests.forEach(({ key }) => {
        form.button(`Tpa Request from ${key}`, 'textures/ui/Friend2')
    })
    form.button('Back', 'textures/ui/cancel')
    form.show(player).then(({ canceled, selection }) => {
        if (canceled) return
        if (selection === requests.length) return TpaMenu(player)
        const { key } = requests[selection]
        new MessageFormData()
            .title('Tpa Request')
            .body(`Would you like to accept the Tpa Request from ${key}?`)
            .button2('Accept')
            .button1('Decline')
            .show(player).then(({ canceled, selection }) => {
                if (canceled) return
                const target = world.getPlayers({ name: key })[0]
                if (!target) return player.sendMessage(`§cPlayer not found or not online`)
                const data = database.get(target) || {}
                if (selection === 0) {
                    delete data[key]
                    database.set(player, data)
                    player.sendMessage(`§aAccepted Tpa Request from §6${target.name}`)
                    return target.sendMessage(`§6${player.name} §aAccepted Your Tpa Request`)
                }
                if (player.hasTag(ACconfig.Tags.CombatTag)) return player.sendMessage('§cYou cannot accept Tpa Requests while in combat')
                delete data[key]
                database.set(player, data)
                target.teleport(player.location, { dimension: world.getDimension(player.dimension.id) })
                target.sendMessage(`§6${player.name} §aAccepted Your Tpa Request`)
            })
    })
}