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
import { setTimer, getTime, hasTimerReachedEnd } from "../../../Extensions/functions.js"
import { AdminMenu } from "./Admin.js";

export function MuteMenu(player) {
    new ActionFormData()
        .title('§cMute Menu')
        .body(`§cWelcome Mute Menu: §7${player.name}§c\n What you like to do`)
        .button('§cMute Player')
        .button(`§cUnMute`)
        .button('§cGet Mute')
        .button('§cBack')
        .show(player).then(({ canceled, selection }) => {
            if (canceled) return player.sendMessage('§cYou Have Left The Mute Menu')
            switch (selection) {
                case 0: return MutePlayer(player)
                case 1: return UnMute(player)
                case 2: return GetMute(player)
                default: return AdminMenu(player)
            }
        })
}


/**
 * 
 * @param {Player} player 
 */
function MutePlayer(player) {
    const Mutes = Database.entries().filter((v) => v[0].startsWith('Muted:')).map((v) => v[1])
    const players = world.getPlayers().filter((p) => !Mutes.find((v) => v.targetId === p.id || v.target === p.name));
    const timeDuractions = ['days', 'hours', 'minutes', 'Forevery'];
    new ModalFormData()
        .title('§cMute Player Menu')
        .dropdown('§cPick one of the options\n§6(§7Live Player §6or§7 Enter A Player Name§6)§c\n\nLive Player', ['Pick User', ...players.map(p => p.name)])
        .textField('§cOffline Player Name', '')
        .textField('§cMute Time', '', '3')
        .dropdown('§cMute Duraction', timeDuractions, 2)
        .textField('§6[§7Optional§6]§c - Mute Reason', '')
        .toggle('§cAre You Sure About This Mute?', false)
        .show(player).then(async (FormData) => {
            if (FormData.canceled) return;
            const [LivePlayerindex, OfflinePlayerName, MuteTime, MuteDuractionIndex, Reason, Confirmed] = FormData.formValues;
            if (!Confirmed) return player.sendMessage('§cYou Must Confirm Your Mute!!');

            const targetName = LivePlayerindex === 0 ? OfflinePlayerName : players[LivePlayerindex - 1].name;
            if (LivePlayerindex === 0 && OfflinePlayerName.length === 0) return player.sendMessage('§cPlease Select A Player Or Enter A Name');

            const LivePlayerClass = players[LivePlayerindex - 1]

            const MutedTarget = LivePlayerindex > 0 && Mutes.find((v) => v.target === OfflinePlayerName || (LivePlayerindex !== 0 && v.target === LivePlayerClass?.name || v.targetId === LivePlayerClass?.id))
            if (LivePlayerindex !== 0 && MutedTarget) return player.sendMessage(`§c${targetName} Is Already Been Muted`);

            const time = parseInt(MuteTime);
            if ((isNaN(time) || time <= 0)) return player.sendMessage('§cPleace Enter A Vaid Number');

            const TotalTime = MuteDuractionIndex === 3 ? null : setTimer(time, timeDuractions[MuteDuractionIndex])
            const reason = Reason.length === 0 ? 'No Reason Provided' : Reason;

            if (Reason.length > 0 && Reason.length < 5) return player.sendMessage('§cPlease provide a reason with at least 5 letters');
            Database.set(`Muted:${targetName}`, {
                target: targetName,
                targetId: LivePlayerindex === 0 ? null : LivePlayerClass?.id,
                time: TotalTime,
                reason: reason,
                mutedBy: player.name
            });

            const GetTime = getTime(TotalTime);

            await player.sendMessage(`§c§7${targetName} is Muted
§cUser Id: §7${LivePlayerindex === 0 ? 'Offline' : LivePlayerClass.id}
§cTime: §7${TotalTime === null ? 'Forever' : `${GetTime.days}D, ${GetTime.hours}H, ${GetTime.minutes}M, ${GetTime.seconds}S`}
§cReason: §7${reason}`);

            if (LivePlayerClass) return LivePlayerClass.sendMessage(`§cYou Have Been Muted
 §cUser Id: §7${LivePlayerindex === 0 ? 'Offline' : LivePlayerClass.id}
§cTime: §7${TotalTime === null ? 'Forever' : `${GetTime.days}D, ${GetTime.hours}H, ${GetTime.minutes}M, ${GetTime.seconds}S`}
§cReason: §7${reason}
By: §7${player.name} `)
        })
}


/**
 * 
 * @param {Player} player 
 */
function UnMute(player) {
    const players = Database.entries().filter((v) => v[0].startsWith('Muted:') && (v[1].time === null || !hasTimerReachedEnd(v[1].time.targetDate))).map((v) => v[1]);
    const form = new ActionFormData()
        .title('§cUnMute Player Menu')
        .body(`§cWelcome UnMute Menu: §7${player.name}§c\n${players.length === 0 ? '§cNo Players Are Muted' : `§aPlayers Muted - ${players.length}`}`);
    players.map((v, i) => form.button(`${i + 1} - §4${v.target}`))
    form.button('§cBack')
    form.show(player).then(({ canceled, selection }) => {
        if (canceled) return player.sendMessage('§cYou Have Left The UnMute Menu')
        if (selection === players.length) return MuteMenu(player)
        const target = players[selection]
        const time = target.time === null ? 'Forever' : `${getTime(target.time).days > 0 ? `${getTime(target.time).days} Days` : ''} ${getTime(target.time).hours > 0 ? `${getTime(target.time).hours} Hours` : ''} ${getTime(target.time).minutes > 0 ? `${getTime(target.time).minutes} Minutes` : ''} ${getTime(target.time).seconds > 0 ? `${getTime(target.time).seconds} Seconds` : ''}`;
        new MessageFormData()
            .title('§cUnMute Player')
            .body(`§cAre you sure you want to UnMute - §6(§r${target.target}§6)§c?\n§cTime§7: ${time}\n§cReason§7: ${target.reason}\n`)
            .button2('§cYes')
            .button1('§cNo')
            .show(player).then(async ({ canceled, selection }) => {
                if (canceled) return player.sendMessage('§cYou Have Left The UnMute Menu')
                if (selection === 0) return MuteMenu(player)
                Database.delete(`Muted:${target.target}`);
                player.sendMessage(`§aYou Have UnMuted ${target.target}`);
                const targetPlayer = world.getPlayers({ name: target.target })[0]
                if (targetPlayer) targetPlayer.sendMessage(`§aYou Have Been UnMuted by ${player.name}`);
            })
    })
}

/**
 * 
 * @param {Player} player 
 */
function GetMute(player) {
    const players = Database.entries().filter((v) => v[0].startsWith('Muted:') && (v[1].time === null || !hasTimerReachedEnd(v[1].time.targetDate))).map((v) => v[1]);
    const form = new ActionFormData()
        .title('§cGet Mute Menu')
        .body(`§cWelcome Get Mute Menu: §7${player.name}§c\n${players.length === 0 ? '§cNo Players Are Muted' : `§aPlayers Muted - ${players.length}`}`);
    players.map((v, i) => form.button(`${i + 1} - §4${v.target}`))
    form.button('§cBack')
    form.show(player).then(({ canceled, selection }) => {
        if (canceled) return MuteMenu(player)
        if (selection === players.length) return MuteMenu(player)
        const target = players[selection]
        const time = target.time === null ? 'Forever' : `${getTime(target.time).days > 0 ? `${getTime(target.time).days} Days` : ''} ${getTime(target.time).hours > 0 ? `${getTime(target.time).hours} Hours` : ''} ${getTime(target.time).minutes > 0 ? `${getTime(target.time).minutes} Minutes` : ''} ${getTime(target.time).seconds > 0 ? `${getTime(target.time).seconds} Seconds` : ''}`;
        new MessageFormData()
            .title('§cGet Mute Menu')
            .body(`§cMute Info - §7${target.target}
§cUser Id: §7${target.targetId === null ? 'Offline' : target.targetId}
§cTime: §7${time}.
§cReason: §7${target.reason}
§cMuted By: §7${target.mutedBy}`)
            .button2('§cBack')
            .show(player).then(({ canceled }) => {
                if (canceled) return player.sendMessage('§cYou Have Left The Get Mute Menu')
                return GetMute(player)
            })
    })
}