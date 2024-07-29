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


import { world } from "@minecraft/server";
import { CRconfig } from "./CRconfig";
import { getTime, hasTimerReachedEnd } from "../../Extensions/functions";
const oldmessage = new WeakMap()

world.beforeEvents.chatSend.subscribe((event) => {
    const { sender: player, message } = event;

    if (message.startsWith(`.`)) return event.cancel = true;
event.cancel = true;
    const muteInfo = Database.entries().filter((entry) => entry[0].startsWith('Muted:'))
        .map((entry) => entry[1])
        .find((entry) => entry.targetId === player.id || entry.target === player.name);

    if (muteInfo && hasTimerReachedEnd(muteInfo?.time.targetDate)) {
        Database.delete(`Muted:${muteInfo.target}`);
        player.sendMessage(`§6[§cSystem§6] §aYour mute has expired!`);

    }

    if (muteInfo && !hasTimerReachedEnd(muteInfo?.time.targetDate) && !ACconfig.Tags.skipPlayers.some((tag) => player.hasTag(tag))) {
        const muteTime = muteInfo.time === null ? 'Forever' : formatMuteTime(muteInfo.time);
        return player.sendMessage(`§cYou Have Been Muted\nFor§7:${muteTime},\n§cReason§7: ${muteInfo.reason}\n§cMuted By§7: ${muteInfo.mutedBy}`);
    }

    if (new RegExp(CRconfig.BannedWords.join(`|`), `gi`).test(message)) return player.sendMessage(`§cYou cannot say that!`);
    

    if (oldmessage.get(player) + 1500 > Date.now()) {
        const waitTime = (1.6 - (Date.now() - oldmessage.get(player)) / 1000).toFixed(1);
        return player.sendMessage(`§cPlease wait ${waitTime}s before sending another message!`);
    }

    oldmessage.set(player, Date.now());
    const playerRank = getPlayerRank(player);
    world.sendMessage(`${playerRank} ${player.name}: ${message}`);
});

function formatMuteTime(time) {
    const timeObj = getTime(time);
    return `${timeObj.days > 0 ? `${timeObj.days} Days` : ''} ${timeObj.hours > 0 ? `${timeObj.hours} Hours` : ''} ${timeObj.minutes > 0 ? `${timeObj.minutes} Minutes` : ''} ${timeObj.seconds > 0 ? `${timeObj.seconds} Seconds` : ''}`;
}

function getPlayerRank(player) {
    return player.getTags().sort((a, b) => {
        const ranks = Object.keys(CRconfig.Ranks);
        return ranks.indexOf(a) - ranks.indexOf(b);
    }).map((rankName) => CRconfig.Ranks[rankName]).join(``) || CRconfig.Ranks.Member;
}