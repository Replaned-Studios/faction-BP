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


import { Player, world, system } from '@minecraft/server';
import { ActionFormData, ModalFormData } from '@minecraft/server-ui'

/**
 * 
 * @param {Player} player 
 */
export default function BountyMenu(player) {
    new ActionFormData()
        .title("§lBounty Menu")
        .button("§aSet Bounty", "textures/ui/anvil_icon")
        .button("§bView Bounties", "textures/ui/speed_effect")
        .button("§cClose", "textures/ui/cancel")
        .show(player).then(({ canceled, selection, cancelationReason }) => {
            if (cancelationReason === "UserBusy") return BountyMenu(player);
            if (canceled) return;
            switch (selection) {
                case 0: system.run(() => SetBounty(player)); break;
                case 1: system.run(() => ViewBounties(player)); break;
                default: player.sendMessage("§aClosing Menu..."); break;
            }
        })
}

/**
 * 
 * @param {Player} player 
 */
function SetBounty(player) {
    const bountydata = Database.get("Bountys") ?? {}
    const players = world.getPlayers().filter((p) => p !== player && !bountydata[p.name])
    const form = new ActionFormData()
    form.title('§lSet Bounty')
    form.body(`§aWelcome to The Bounty Menu\n§aPlease Select a Player to Bounty`)
    players.map((v, i) => form.button(`${i + 1} - §6${v.name}`, 'textures/ui/Friend2'))
    form.button('§cBack', 'textures/ui/cancel')
    form.show(player).then((data) => {
        if (data.canceled) return;
        if (data.selection === players.length) return BountyMenu(player)
        new ModalFormData()
            .title(`§aSet Bounty -§7 ${players[data.selection].name}`)
            .textField(`§aWelcome To The Bounty Menu\n§6Please Enter The Amount You Want to Bounty`, "", '0')
            .toggle("§aAre You Sure You Want To Set This Bounty?", false)
            .show(player).then((data2) => {
                if (data2.canceled) return;
                const [Amount, Confimed] = data2.formValues;
                if (!Confimed) return player.sendMessage("§cBounty Process Canceled")
                const amount = parseInt(Amount)
                if (isNaN(amount) || amount <= 0) return player.sendMessage("§cPlease Enter A Valid Number")
                const target = world.getPlayers().filter((p) => p !== player)[data.selection]
                if (!target) return player.sendMessage(`§cPlayer Not Found - ${players[data.selection - 1].name}`)
                if (amount > player.score.Money) return player.sendMessage("§cYou Do Not Have Enough Money")
                if (amount < 10000) return player.sendMessage("§cPlease Enter A Number Above 10k")
                if (bountydata[target.name]) return player.sendMessage(`§c${target.name} Already Has A Bounty\n§aBounty Amount: ${bountydata[target.name].amount}\n§aBounty By: ${bountydata[target.name].by}!`)
                bountydata[target.name] = { amount, by: player.name }
                player.score.Money = (player.score.Money ?? 0) - amount
                Database.set("Bountys", bountydata)
                world.sendMessage(`§c§l${target.name}§r §7Has Been Bountied By - ${player.name} For §a${amount} Money`)

            })
    })

}


/**
 * @param {Player} player
 */
function ViewBounties(player) {
    const bountydata = Database.get("Bountys") ?? {}
    const arraydata = Object.entries(bountydata)
    const form = new ActionFormData();
    form.title("§cBounties")
    form.body(`§cClick On A Bounty to Check It Out!\n§cTotal Bounties§7: ${arraydata.length}`)
    arraydata.forEach((value, index) => form.button(`${index + 1} - §6${value[0]}`, 'textures/ui/Friend2'))
    form.button("§cClose")
    form.show(player).then(({ canceled, selection, cancelationReason }) => {
        if (cancelationReason === "UserBusy") return ViewBounties(player);
        if (canceled) return;
        if (selection === arraydata.length) return BountyMenu(player)
        const bounty = arraydata[selection]
        const form = new ActionFormData
        form.title(`§cBounty Info - §7${bounty[0]}`)
        form.body(`§cBounty Amount§7: ${bounty[1].amount}\n§cBounty By§7: ${bounty[1].by}\n§cBounty Player§7: ${bounty[0]}`)
        form.button("§cBack")
        form.show(player).then(({ canceled, cancelationReason }) => {
            if (cancelationReason === "UserBusy") return ViewBounties(player);
            if (canceled) return;
            ViewBounties(player)
        })
    })
}

world.afterEvents.entityDie.subscribe((event) => {
    if (event.damageSource.cause !== 'entityAttack') return
    const bountydata = Database.get("Bountys") ?? {}
    const { deadEntity: target, damageSource: { damagingEntity: player } } = event;
    if (!(player instanceof Player)) return
    if (!bountydata[target.name]) return
    const bounty = bountydata[target.name]
    const amount = bounty.amount
    delete bountydata[target.name]
    Database.set("Bountys", bountydata)
    player.score.Money = (player.score.Money ?? 0) + amount
    player.sendMessage(`§aYou Have Recived §6${amount} §aFrom Killing §6${target.name}`)
    world.sendMessage(`§c§l${target.name}§r §7Has Been Killed By - ${player.name} For §a${amount} Money`)
}, { 'entityTypes': ['minecraft:player'] })
