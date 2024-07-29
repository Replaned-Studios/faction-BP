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

import { world, system } from "@minecraft/server";
import { radiusCheck } from "../../Extensions/functions";
import { CombatDatabase } from "../../AC/clog";
import { setTimer } from "../../Extensions/functions";

const box = (player, location) =>
    player.location.x >= Math.min(location.cords1.x, location.cords2.x) &&
    player.location.x <= Math.max(location.cords1.x, location.cords2.x) &&
    player.location.y >= Math.min(location.cords1.y, location.cords2.y) &&
    player.location.y <= Math.max(location.cords1.y, location.cords2.y) &&
    player.location.z >= Math.min(location.cords1.z, location.cords2.z) &&
    player.location.z <= Math.max(location.cords1.z, location.cords2.z);

/**
* @typedef {Object} CrateInfo
* @property {boolean} build
* @property {boolean} pvp
* @property {boolean} break
* @property {Object | undefined} interact
* @property {boolean} interact.entity
* @property {boolean} interact.block
* @property {string} name
*/

/**
 * @type {[string, CrateInfo]}
 */
export const safezones = [
    {
        location: {
            cords1: { x: -16, y: -63, z: 1307 },
            cords2: { x: 17, y: 320, z: 1340 },
        },
        build: false,
        pvp: true,
        break: false,
        interact: {
            entity: false,
            block: false,
        },
        perms(player) {
            return ['Owner', 'Admin'].some((v) => player.hasTag(v));
        },
    }
];

system.runInterval(() => {
    world.getPlayers().map((player) => {
        safezones.filter((value) => box(player, value.location)).map((v) => {
            if ((v.perms && v.perms(player))) return 0;
            if (!v.pvp) player.addTag("safe");
            if (player.location.y > 74 && !player.hasTag('insafezone')) {
                player.teleport({ x: 0.5, y: 66, z: 1323.5 })
                CombatDatabase[player.id] = { timer: setTimer(20, 'seconds') };
                player.applyDamage(2)
                return player.sendMessage("§cYou are not allowed to go above the safezone\nYpu have now been put in combat for 20 seconds");
            }
            if (radiusCheck(player, 0, 79, 1323, 10) && player.hasTag('insafezone')) return player.addTag('safe');
            if (player.location.y < 75 && player.hasTag('insafezone')) return player.removeTag('insafezone') && player.removeTag('safe')
        })
        try {
            world.getDimension('overworld').getEntities().filter((v) => ACconfig.SafeZone.RemoveEntityTypes.some((d) => v.typeId.split(':')[1] === d)).map((entity) => {
                if (safezones.filter((value) => box(entity, value.location)).length > 0) entity.kill()
            })
        } catch (err) { }
    });
}, 30)


world.beforeEvents.playerPlaceBlock.subscribe((event) => {
    const isInsideAnyLocation = safezones.filter((value) => box(event.block, value.location))[0];
    if (!isInsideAnyLocation || (isInsideAnyLocation.perms && isInsideAnyLocation.perms(event.player)) || isInsideAnyLocation.build) return;
    event.cancel = true
});

world.beforeEvents.playerInteractWithEntity.subscribe((event) => {
    const isInsideAnyLocation = safezones.filter((value) => box(event.target, value.location))[0];
    if (!isInsideAnyLocation || (isInsideAnyLocation.perms && isInsideAnyLocation.perms(event.player)) || isInsideAnyLocation.interact.entity) return;
    event.cancel = true
});

world.beforeEvents.playerBreakBlock.subscribe((event) => {
    const isInsideAnyLocation = safezones.filter((value) => box(event.block, value.location))[0];
    if (!isInsideAnyLocation || (isInsideAnyLocation.perms && isInsideAnyLocation.perms(event.player)) || isInsideAnyLocation.break) return;
    event.cancel = true
});

