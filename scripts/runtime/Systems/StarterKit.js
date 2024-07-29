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
import { getTime, hasTimerReachedEnd, setTimer } from "../../Extensions/functions";
const timer = new WeakMap()

world.beforeEvents.playerInteractWithBlock.subscribe((data) => {
    const { player, block } = data;
    if (Object.values(block.location).some((v, i) => v !== [4, 106, 5][i]) || !player.dimension.id.includes('overworld')) return;
    data.cancel = true;
    const timedata = timer.get(player);
    if (timer.has(player) && !hasTimerReachedEnd(timedata.timer.targetDate)) {
        return player.sendMessage(`§cWait ${getTime(timedata.timer).seconds} to redeem the Starter Kit again.`);
    }

    player.addItems([
        ['soulless:rulebook', 1],
        ["leather_helmet", 1],
        ["leather_chestplate", 1],
        ["leather_leggings", 1],
        ["leather_boots", 1],
        ["stone_sword", 1],
        ['stone_pickaxe', 1],
        ['stone_axe', 1],
        ['stone_shovel', 1],
        ['cooked_rabbit', 64],
    ]);
    timer.set(player, { timer: setTimer(15, 'seconds') })
    player.sendMessage("§aYou have received the starter kit!\nFood Can Be Found In Your Inventory\n§cYou can only use this once every 15 seconds!");
})  