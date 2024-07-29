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

import { CombatDatabase } from '../../AC/clog';
import { getTime, UserTime } from '../../Extensions/functions';
import { world, system } from '@minecraft/server';  
const overworld = world.getDimension('overworld');

system.runInterval(() => {
    world.getPlayers().forEach(async (player) => {
        const sideData = Database.get(SRconfig.DatabaseNames.Sidebar, player) ?? {};
        const actionBarLines = await getActionBarLines(player, sideData);
        player.onScreenDisplay.setActionBar(actionBarLines);
    });
    disableGameRules(SRconfig.GameRuleTurnedOff);
}, 15);


async function getActionBarLines(player, sideData) {
    const RealmPing = await ping()
    return [
        `\n§ᵒ§5Reapland §bFactions`,
        `§6IGN: ${player.name}`,
        sideData.Money && `${SRconfig.DefaultSideBarData['Money']} ${(player.score.Money).sort ?? 0}`,
        sideData.Kills && `${SRconfig.DefaultSideBarData['Kills']} ${player.score.Kills ?? 0}`,
        sideData.Deaths && `${SRconfig.DefaultSideBarData['Deaths']} ${player.score.Deaths ?? 0}`,
        sideData.KDR && `${SRconfig.DefaultSideBarData['KDR']} ${getKDR(player)}`,
        sideData.Killstreak && `${SRconfig.DefaultSideBarData['Killstreak']} ${player.score.Killstreak ?? 0}`,
        CombatDatabase[player.id] && `§cCombat: ${getTime(CombatDatabase[player.id].timer).seconds}`,
        sideData.Playtime && `${SRconfig.DefaultSideBarData['Playtime']} ${UserTime(player)}`,
        sideData.Coordinates && `${SRconfig.DefaultSideBarData['Coordinates']} ${getCoordinates(player)}`,
        sideData.FactionInfo && player.factions.in && getFactionInfo(player),
            (sideData.RealmInfo) && `§7---------------------\n§3${(() => {
                const EndDate = ForMatTimer(new Date('2024-08-01T00:00:00') - new Date())
                if (TimerHasEnded(EndDate)) {
                    Database.set('LockDown', true)
                    world.getPlayers().filter((v) => !ACconfig.OwnerNames.includes(v.name) && !ACconfig.Tags.skipPlayers.some((t) => v.hasTag(t)))
                        .forEach(async (v) => await v.runCommandAsync(`kick "${v.name}" §cThe Season Has Ended Please Join The Discord.gg/SQEj8Wv6SE For More Information!`));
                    return '§lRealm Reset: §r§7Now'
                }
                return `§oRealm Reset In: §r§o§7${EndDate.days}d ${EndDate.hours}h ${EndDate.minutes}m\n§bRealm Ping: §r§7${RealmPing}ms`
            })()}\n§9Discord.gg/SQEj8Wv6SE\n§uOnline Players: ${world.getPlayers().length}\n§r`,
    ].filter(Boolean).join('\n');
}

const ping = (() => {
    return new Promise((resolve) => {
        const start = Date.now()
        system.runTimeout(() => {
            const ping = (Date.now() - start) - 1000
            if (ping < 0) return resolve(0)
            resolve(ping)
        }, 20)
    })
})

function getKDR(player) {
    return player.score.Kills ? (player.score.Deaths ? (player.score.Kills / player.score.Deaths).toFixed(2) : player.score.Kills) : 0;
}

function getCoordinates(player) {
    return ['x', 'y', 'z'].map(value => player.location[value].toFixed(2)).join(' ');
}

function getFactionInfo(player) {
    return `§7-------------------
§6§lFaction Name: §r§7${player.factions.inFaction.name}
§6§lBank Money: §r§7${player.factions.inFaction.balance}
§6§lFaction Rank: §r§7${getFactionRank(player)}
§6§lFaction Members: §r§7${player.factions.inFaction.members.length + player.factions.inFaction.officers.length}§r`;
}

function getFactionRank(player) {
    return player.factions.inFaction.leader.id === player.id ? '§uLeader' : player.factions.inFaction.officers.some((officer) => officer.id === player.id) ? '§bOfficer' : '§8Member';
}

function disableGameRules(gameRules) {
    gameRules.map((value) => overworld.runCommandAsync(`gamerule ${value} false`));
}

function ForMatTimer(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
}

function TimerHasEnded(time) {
    return time.days <= 0 && time.hours <= 0 && time.minutes <= 0 && time.seconds <= 0;
}