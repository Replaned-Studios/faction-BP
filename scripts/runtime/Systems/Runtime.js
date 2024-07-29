
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

import { world, system } from '@minecraft/server';
import { radiusCheck, hasTimerReachedEnd, setTimer, wait, getTime } from '../../Extensions/functions.js'

const Weak = new WeakMap()

system.runInterval(() => {
    world.getPlayers().map((player) => {
        if (ACconfig.Tags.skipPlayers.some(tag => player.hasTag(tag)) === true || player.hasTag(ACconfig.Tags.VIP) === true) return Weak.has(player) ? Weak.delete(player) : null

        const playerVelocity = player.getVelocity();

        const speed = Math.sqrt(playerVelocity.x ** 2 + playerVelocity.z ** 2);

        const isSneakingFast = player.isSneaking && speed >= 0.064;

        const isSprinting = !player.isSprinting ? true : false;

        const entityAbovePlayer = player.dimension.getEntitiesAtBlockLocation({
            x: player.location.x,
            y: player.location.y + 1,
            z: player.location.z
        })[0];

        const entityTypeId = entityAbovePlayer?.typeId;

        const isOnVehicle = ['minecraft:minecart', 'boat'].some(id => entityTypeId?.includes(id));

        const isMoving = isSprinting || isSneakingFast || isOnVehicle || speed <= 0.170;

        if (isMoving) {
            if (Weak.has(player) && hasTimerReachedEnd(Weak.get(player).time.targetDate) === true) {
                Weak.delete(player);
                world.sendMessage(`§6[§cAnti AFK§6] §a${player.name} has been kicked for being AFK!`);
                return player.runCommandAsync(`kick "${player.name}" \n\n §6[§cAnti AFK§6] §aYou have been kicked for being AFK!`);
            }

            if (!Weak.has(player)) Weak.set(player, { time: setTimer(15, 'minutes') });
        } else if (Weak.has(player)) Weak.delete(player);

        if (radiusCheck(player, 0.61, 106.00, 34.53, 3)) {
            player.addTag('insafezone')
            player.teleport({ x: 0.50, y: 85, z: 1323.50 })
            player.sendMessage('§6[§cSystem§6] §aYou have been teleported to the Wild!')
        }
    })
}, 15)


world.beforeEvents.playerLeave.subscribe(({ player }) => {
    if (Weak.has(player)) Weak.delete(player)
})