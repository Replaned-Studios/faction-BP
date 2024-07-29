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

const MobStackerConfig = SRconfig.MobStackerConfig;

world.afterEvents.entitySpawn.subscribe(async ({ cause, entity }) => {
    if (cause !== 'Spawned' || !MobStackerConfig.EntityTypes.includes(entity.typeId.split(':')[1])) return;
    if (entity?.nameTag && entity.nameTag.includes('§5')) return;
    let entities = entity.dimension.getEntities({ location: entity.location, maxDistance: MobStackerConfig.maxDistance, type: entity.typeId });
    entities = entities.filter(e => e.nameTag.includes('§5')).sort((a, b) => {
        const countA = parseInt(a.nameTag.split('§')[1].substring(1));
        const countB = parseInt(b.nameTag.split('§')[1].substring(1));
        return countB - countA;
    });
    let entityTypeId = entity.typeId.split(':')[1].replace("still", "");
    let count = 0;
    for (let i = 0; i < entities.length; i++) {
        const entityCount = parseInt(entities[i].nameTag.split('§')[1].substring(1)); 
        if (count + entityCount < MobStackerConfig.maxEntities) {
            count += entityCount;
            entities[i].nameTag = `§5${count} §b${entityTypeId}`;
        } else {
            entities[i].nameTag = `§5100 §b${entityTypeId}`;
            entity.remove()
            return entities.filter((_, index) => index !== i).map(e => e.remove());
        }
    }
    count += 1;
    if (entities.length === 0) entity.nameTag = `§5${count} §b${entityTypeId}`;
    else entities[0].nameTag = `§5${count} §b${entityTypeId}`;
    if (entities.length > 0) entity.remove();
});

world.afterEvents.entityDie.subscribe(({ deadEntity }) => {
    if (!MobStackerConfig.EntityTypes.includes(deadEntity.typeId.split(':')[1])) return;
    let count = deadEntity.nameTag.split('§')[1] ? parseInt(deadEntity.nameTag.split('§')[1].substring(1)) : 1
    const entities = deadEntity.dimension.getEntities({ location: deadEntity.location, maxDistance: MobStackerConfig.maxDistance, type: deadEntity.typeId });
    entities.forEach((entity) => {
        if (entity.nameTag.includes('§5')) {
            count += parseInt(entity.nameTag.split('§')[1].substring(1))
            entity.remove()
        } else count++, entity.remove()
    })
    count = Math.min(count, MobStackerConfig.maxEntities)
    if (count > 1) deadEntity.dimension.spawnEntity(deadEntity.typeId, deadEntity.location).nameTag = `§5${count - 1} §b${deadEntity.typeId.split(':')[1].replace("still", "")}`;
});
