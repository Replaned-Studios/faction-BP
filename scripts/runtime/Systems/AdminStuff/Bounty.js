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


import { ActionFormData, ModalFormData } from '@minecraft/server-ui';
import { AdminMenu } from "./Admin";
import { Player } from '@minecraft/server';

/**
 * 
 * @param {Player} player 
 */
export default function BountiesMenu(player) {
    const players = Database.get("Bountys") ?? {}
    const form = new ActionFormData()
        .title('§l§aBounties Manager')
        .body(`§6${Object.keys(players).length} Bounties`)
    Object.entries(players).map((v, i) => form.button(`${i + 1} - §6${v[0]}`, 'textures/ui/Friend2'))
    form.button('§cBack', 'textures/ui/cancel')
        .show(player).then((data) => {
            if (data.canceled) return;
            if (data.selection === Object.keys(players).length) return AdminMenu(player);
            const TargetInfo = players[Object.keys(players)[data.selection]]
            const TargetBountyAmount = TargetInfo.amount ?? 0
            const TargetBountyBy = TargetInfo.by ?? "Unknown"
            new ActionFormData()
                .title(`§aBounty - §6${Object.keys(players)[data.selection]}`)
                .body(`§aBounty Amount: §6${TargetBountyAmount}\n§aBounty By: §6${TargetBountyBy}`)
                .button(`§6Change Bounty Amount`, "textures/ui/anvil_icon")
                .button("§cRemove Bounty", "textures/ui/cancel")
                .button("§cBack", "textures/ui/cancel")
                .show(player).then(({ canceled, selection }) => {
                    if (canceled) return;
                    switch (selection) {
                        case 1: RemoveBounty(player, Object.keys(players)[data.selection]); break;
                        case 0: ChangeBountyAmount(player, Object.keys(players)[data.selection]); break;
                        default: BountiesMenu(player); break;
                    }
                })
        })
}

/**
 * 
 * @param {Player} player 
 * @param {string} target 
 */
function RemoveBounty(player, target) {
    const players = Database.get("Bountys") ?? {}
    delete players[target]
    Database.set("Bountys", players)
    player.sendMessage(`§aSuccessfully Removed Bounty for §6${target}`)
    BountiesMenu(player)
}

/**
 * 
 * @param {Player} player 
 * @param {string} target 
 */
function ChangeBountyAmount(player, target) {
    const bounties = Database.get("Bountys") ?? {};

    new ModalFormData()
        .title(`§aChange Bounty Amount`)
        .textField('§aEnter New Amount', '0', '0')
        .toggle('§aAre you sure?', false)
        .show(player)
        .then((data) => {
            if (data.canceled) return;
            let [newAmount, confirm] = data.formValues;
            if (!confirm) return ChangeBountyAmount(player, target);

            const targetBounty = bounties[target];
            if (!(Database.get("Bountys") ?? {})[target]) return player.sendMessage(`§cBounty for §6${target} §cDoesn't Exist!`);

            newAmount = parseInt(newAmount);
            if (isNaN(newAmount) || newAmount <= 0) return player.sendMessage("§cInvalid Amount Entered!");
             
            targetBounty.amount = newAmount;
            Database.set("Bountys", bounties);
            player.sendMessage(`§aSuccessfully Changed Bounty Amount for §6${target} §ato §6${newAmount}`);
        });
} 