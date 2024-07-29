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


import { world, Player, system } from "@minecraft/server";
import { ActionFormData, ModalFormData, MessageFormData } from "@minecraft/server-ui";
import { setTimer, getTime, hasTimerReachedEnd } from "../../../Extensions/functions.js"
import { AdminMenu } from "./Admin.js";


/**
 * 
 * @param {Player} player
 */
export function BanMenu(player) {
    new ActionFormData()
        .title('§cBan Menu')
        .body(`§cWelcome To The Ban Menu - §7${player.name}§c`)
        .button('§l§cBan Player')
        .button(`§l§aUnBan`)
        .button('§l§fGet Ban')
        .button('§cBack')
        .show(player).then(({ canceled, selection }) => {
            if (canceled) return player.sendMessage('§cYou Have Left The Ban Menu')
            switch (selection) {
                case 0: return BanPlayer(player)

                case 1: return UnBan(player)

                case 2: return GetBan(player)

                default: return AdminMenu(player)
            }
        })
}

/**
 * 
 * @param {Player} player 
 */
function BanPlayer(player) {
    const players = world.getPlayers().filter((p) => p !== player)
    const timeDuractions = ['days', 'hours', 'minutes', 'Forevery'];
    new ModalFormData()
        .title('§cBan Player Menu')
        .dropdown('§cPick one of the options\n§6(§7Live Player §6or§7 Enter A Player Name§6)§c\n\nLive Player', ['Pick User', ...players.map(p => p.name)])
        .textField('§cOffline Player Name', '')
        .textField('§cBan Time', '', '3')
        .dropdown('§cBan Duraction', timeDuractions, 2)
        .textField('§6[§7Optional§6]§c - Ban Reason', '')
        .toggle('§cAre You Sure About This Ban?', false)
        .show(player).then(async (FormData) => {
            if (FormData.canceled) return;
            const [LivePlayerindex, OfflinePlayerName, BanTime, BanDuractionIndex, Reason, Confirmed] = FormData.formValues;
            if (!Confirmed) return player.sendMessage('§cYou Must Confirm Your Ban!!');

            const targetName = LivePlayerindex === 0 ? OfflinePlayerName : players[LivePlayerindex - 1].name;
            if (LivePlayerindex === 0 && OfflinePlayerName.length === 0) return player.sendMessage('§cPlease Select A Player Or Enter A Name');

            const Bans = Database.entries().filter((v) => v[0].startsWith('Banned:')).map((v) => v[1])
            const LivePlayerClass = players[LivePlayerindex - 1]

            const bannedTarget = LivePlayerindex > 0 && Bans.find((v) => v.target === OfflinePlayerName || (LivePlayerindex !== 0 && v.target === LivePlayerClass?.name || v.targetId === LivePlayerClass?.id))
            if (LivePlayerindex !== 0 && bannedTarget) return player.sendMessage(`§c${targetName} Is Already Been Banned`);

            const time = parseInt(BanTime);
            if (BanDuractionIndex !== 3 && (isNaN(time) || time <= 0)) return player.sendMessage('§cPleace Enter A Vaid Number');

            const TotalTime = BanDuractionIndex === 3 ? null : setTimer(time, timeDuractions[BanDuractionIndex])
            const reason = Reason.length === 0 ? 'No Reason Provided' : Reason;

            if (Reason.length > 0 && Reason.length < 5) return player.sendMessage('§cPlease provide a reason with at least 5 letters');
            Database.set(`Banned:${targetName}`, {
                target: targetName,
                targetId: LivePlayerindex === 0 ? null : LivePlayerClass?.id,
                time: TotalTime,
                reason: reason,
                banner: player.name
            });

            const timeString = TotalTime === null ? 'Forever' : (() => {
                const timeObj = getTime(TotalTime);
                return `${timeObj.days > 0 ? `${timeObj.days} Days` : ''} ${timeObj.hours > 0 ? `${timeObj.hours} Hours` : ''} ${timeObj.minutes > 0 ? `${timeObj.minutes} Minutes` : ''} ${timeObj.seconds > 0 ? `${timeObj.seconds} Seconds` : ''}`
            })()

            await world.sendMessage(`§c§7${targetName} Is Banned 
§cUser Id: §7${LivePlayerindex === 0 ? 'Offline' : LivePlayerClass.id}
§cTime: §7${timeString}
§cReason: §7${reason}`);
            KickUser(targetName, TotalTime, reason, player.name)
        })
}


/**
 * 
 * @param {Player} player 
 */
function UnBan(player) {
    const bannedPlayers = Database.entries().filter((v) => v[0].startsWith('Banned:') && (v[1].time === null || !hasTimerReachedEnd(v[1].time.targetDate))).map((v) => v[1]);
    const form = new ActionFormData()
        .title('§cUnBan Menu')
        .body(`§cWelcome UnBan Menu: §7${player.name}§c\n${bannedPlayers.length === 0 ? '§cNo Players Banned' : `§aPlayers Banned - ${bannedPlayers.length}`}`);
    bannedPlayers.map((b, i) => form.button(`${i + 1} - §4${b.target}`))
    form.button('§cBack')
    form.show(player).then(async (FormData) => {
        if (FormData.canceled) return player.sendMessage('§cYou Have Left The UnBan Menu');
        const { selection } = FormData;

        if (selection === bannedPlayers.length) return BanMenu(player);
        const ban = bannedPlayers[selection];

        const time = ban.time === null ? 'Forever' : `${getTime(ban.time).days > 0 ? `${getTime(ban.time).days} Days` : ''} ${getTime(ban.time).hours > 0 ? `${getTime(ban.time).hours} Hours` : ''} ${getTime(ban.time).minutes > 0 ? `${getTime(ban.time).minutes} Minutes` : ''} ${getTime(ban.time).seconds > 0 ? `${getTime(ban.time).seconds} Seconds` : ''}`;
        new MessageFormData()
            .title(`§cUnBan Menu - ${ban.target}`)
            .body(`§cAre you sure you want to unban - §7${ban.target}
§cUser Id: §7${ban.targetId === null ? 'Offline' : ban.targetId}
§cTime: §7${time}.
§cReason: §7${ban.reason}
§cBanner: §7${ban.banner}`)
            .button2('§cYes')
            .button1('§cBack')
            .show(player).then(async ({ canceled, selection }) => {
                if (canceled) return player.sendMessage('§cYou Have Left The UnBan Menu');
                if (selection === 0) return BanMenu(player);
                const bannedTarget = Database.entries().filter((v) => v[0].startsWith('Banned:')).map((v) => v[1]).find((v) => ban.targetId === null ? v.target === ban.target : v.targetId === ban.targetId);
                if (!bannedTarget) return player.sendMessage(`§c${ban.target} Is Not Banned`);
                Database.delete(`Banned:${bannedTarget.target}`);
                await player.sendMessage(`§aYou Have UnBanned ${bannedTarget.target}`);
            })
    })
}


/**
 * 
 * @param {Player} player 
 */
function GetBan(player) {
    const bannedPlayers = Database.entries().filter((v) => v[0].startsWith('Banned:') && !hasTimerReachedEnd(v[1].time.targetDate)).map((v) => v[1]);
    const form = new ActionFormData()
        .title('§cGet Ban Menu')
        .body(`§cWelcome Get Ban Menu: §7${player.name}§c\n${bannedPlayers.length === 0 ? '§cNo Players Banned' : `§aPlayers Banned - ${bannedPlayers.length}`}`);
    bannedPlayers.map((b, i) => form.button(`${i + 1} - §4${b.target}`))
    form.button('§cBack')
    form.show(player).then(async (FormData) => {
        if (FormData.canceled) return player.sendMessage('§cYou Have Left The Get Ban Menu');
        const { selection } = FormData;
        if (selection === bannedPlayers.length) return BanMenu(player);

        const ban = bannedPlayers[selection];
        const time = ban.time === null ? 'Forever' : `${getTime(ban.time).days > 0 ? `${getTime(ban.time).days} Days` : ''} ${getTime(ban.time).hours > 0 ? `${getTime(ban.time).hours} Hours` : ''} ${getTime(ban.time).minutes > 0 ? `${getTime(ban.time).minutes} Minutes` : ''} ${getTime(ban.time).seconds > 0 ? `${getTime(ban.time).seconds} Seconds` : ''}`;

        new MessageFormData()
            .title(`§cGet Ban Menu - ${ban.target}`)
            .body(`§cBan Info - §7${ban.target}
§cUser Id: §7${ban.targetId === null ? 'Offline' : ban.targetId}
§cTime: §7${time.replace('', '')}
§cReason: §7${ban.reason}
§cBanner: §7${ban.banner}`)
            .button2('§cBack')
            .button1('§cBack')
            .show(player).then(async ({ canceled }) => {
                if (canceled) return player.sendMessage('§cYou Have Left The Get Ban Menu');
                return BanMenu(player);
            })
    })
}

world.afterEvents.playerSpawn.subscribe(({ initialSpawn, player }) => {
    if (!initialSpawn) return;
    const FindBannedTarget = Database.entries().filter((v) => v[0].startsWith('Banned:')).map((v) => v[1]).find((v) => v.targetId === player.id || v.target === player.name);
    if (!FindBannedTarget) return;
    
    if (FindBannedTarget.time !== null && hasTimerReachedEnd(FindBannedTarget.time.targetDate)) {
        return Database.delete(`Banned:${FindBannedTarget.target}`);
    }

    if (FindBannedTarget.targetId === null) Database.set(`Banned:${player.name}`, Object.assign(FindBannedTarget, { targetId: player.id }));
    KickUser(player.name, FindBannedTarget.time, FindBannedTarget.reason, FindBannedTarget.banner)
    world.sendMessage(`§6<§rAnti Cheat§6> §c${player.name} Has Been Kicked For Being Banned`);
})

/**
 * Kicks a user from the server and sends a ban message.
 * @param {string} playerName - The name of the player to be kicked.
 * @param {string} time - The ban duration or time.
 * @param {string} reason - The reason for the ban.
 * @param {string} banner - The name of the person who issued the ban.
 */
function KickUser(playerName, time, reason, banner) {
    const timeString = time === null ? 'Forever' : (() => {
        const timeObj = getTime(time);
        return `${timeObj.days > 0 ? `${timeObj.days} Days` : ''} ${timeObj.hours > 0 ? `${timeObj.hours} Hours` : ''} ${timeObj.minutes > 0 ? `${timeObj.minutes} Minutes` : ''} ${timeObj.seconds > 0 ? `${timeObj.seconds} Seconds` : ''}`
    })();
    world.getDimension('overworld').runCommandAsync(`kick "${playerName}"\n\n§cBanned Info
    §cTime: §7${timeString}
    §cReason: §7${reason}
    §cBanner: §7${banner}`);
}