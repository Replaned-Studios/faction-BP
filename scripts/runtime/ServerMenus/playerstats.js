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


import { ActionFormData } from "@minecraft/server-ui";
import { world, Player } from "@minecraft/server";
import { UserTime } from "../../Extensions/functions";

world.afterEvents.playerInteractWithEntity.subscribe(({ player, target }) => {
        if (!(target instanceof Player)) return;
        if (!player.isSneaking) {
                return player.sendMessage(`§cPlease Crouch And Click To View §6Player Stats`);
        }

        const playerDetails = getPlayerDetails(target);
        displayPlayerStats(player, target, playerDetails);
});

function getPlayerDetails(target) {
        return {
                gamertag: target.name,
                timePlayed: UserTime(target),
                money: target.score.Money,
                kills: target.score.Kills ?? 0,
                deaths: target.score.Deaths ?? 0,
                killstreak: target.score.Killstreak ?? 0,
                kdr: getKDR(target),
                isVip: target.hasTag("VIP") ? "Yes" : "No",
        };
}

function getKDR(target) {
        return target.score.Kills ? (target.score.deaths ? (target.score.kills / target.score.deaths).toFixed(2) : target.score.kills) : 0;
}

function displayPlayerStats(player, target, playerDetails) {
        new ActionFormData()
                .title(`§6${target.name}`)
                .body(`PLAYER DETAILS:\n\nGamertag: §6${playerDetails.gamertag}
§mTime Played: ${playerDetails.timePlayed},
§6VIP Member: ${playerDetails.isVip},
§aMoney: ${playerDetails.money},
§2Kills: ${playerDetails.kills},
§cDeaths: ${playerDetails.deaths},
§cKDR: ${playerDetails.kdr},
§dKillstreak: ${playerDetails.killstreak}
`)
                .button("Close")
                .show(player)
                .then((data) => {
                        if (data.canceled) return;
                        if (data.selection === 0) player.sendMessage(`§cPlayer Stats Closed`);
                });
}