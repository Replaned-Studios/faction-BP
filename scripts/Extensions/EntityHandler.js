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


import { world, system, Player, Entity } from '@minecraft/server';
const database = new Map()
let isInitialized = false;
/**
   * @param {string} entityId - Entity ID
   * @param {{nameTag?, permissions?}} args - Options for the entity
   * @param {(player: Player, entity: Entity) => void} callback - Callback function
   */
export default function newEntity(entityId, args, callback) {
    database.set(entityId, { args, callback })
    if (isInitialized) return;
    isInitialized = true;
    world.beforeEvents.playerInteractWithEntity.subscribe(({ target, player }) => {
        const entityData = database.get(target.typeId)
        if (!entityData) return;
        if (entityData.args.permissions && !entityData.args.permissions(player, target)) return player.sendMessage(`§c<AntiCheat Error>§7 You don't have the right permissions to use this entity.`);
        entityData.callback(player, target);
    });
    system.runInterval(() => {
        world.getDimension('overworld').getEntities().forEach((entity) => {
            if (entity instanceof Player) return;
            const entityData = database.get(entity.typeId)
            if (!entityData) return;
            if (entityData.args.nameTag) entity.nameTag = entityData.args.nameTag;
        });
    }, 1000);
}