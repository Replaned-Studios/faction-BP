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

import { Player, world } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";

/**
 * 
 * @param {Player} player 
 */
export function ReedemCodeMenu(player) {
    if (/^.*\(\d+\)$/.test(player.name)) return player.sendMessage(`§c<System>§7: You are not allowed to use the (Redeem Code) system.`);
    new ModalFormData()
        .title('§aRedeem Code')
        .textField('§eEnter your code here...', 'code')
        .toggle('§aAre you sure you want to redeem this code?', false)
        .show(player).then(({ canceled, cancelationReason, formValues: [code2, Confirmed] }) => {
            if (canceled) return;
            
            if (cancelationReason === 'UserBusy') return ReedemCodeMenu(player);
            
            if (!Confirmed) return player.sendMessage('§cCode not redeemed!');
            
            let database = Database.get('ServerCodes', player) ?? [];
            
            const findCode = SRconfig.ReedemCode.Codes.find(({ code }) => code === code2);
            
            if (!findCode) return player.sendMessage('§cInvalid code!');
            
            if (findCode.permissions && !findCode.permissions(player)) return player.sendMessage('§cYou do not have permission to redeem this code!');

            let playercode = database.find(({ code, playerName }) => code === findCode.code)
            
            if (playercode && playercode.times >= findCode.times) return player.sendMessage('§cYou have already redeemed this code!');
            
            if (playercode) playercode.times += 1;
            
            else database.push({code: findCode.code, times: 1 });


            Database.set('ServerCodes', database, player);
            
            findCode.callback(player);
        })
}

