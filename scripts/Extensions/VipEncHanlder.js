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


import { world, system, ItemStack } from '@minecraft/server';

world.afterEvents.playerBreakBlock.subscribe(({ block, player }) => {
    const inv = player.getComponent('inventory').container;
    const item = inv.getItem(player.selectedSlotIndex);
    const vipEnchants = Database.get('vipEnchants', item) ?? {};
    if (!item || !vipEnchants['Mine Pickup'] || !player.hasTag('VIP')) return; 
    player.dimension.getEntities({ type: 'minecraft:item', location: block.location, minDistance: 0, maxDistance: 1.5 }).forEach((entity) => {
        const dropitem = entity.getComponent('item').itemStack;
        if (!SlotsLeft(player, dropitem.typeId)) return;
        entity.remove();
        inv.addItem(dropitem);
    });
});

world.beforeEvents.playerBreakBlock.subscribe(({ block, player }) => {
    const inv = player.getComponent('inventory').container;
    const item = inv.getItem(player.selectedSlotIndex);
    const blockTypeId = block.typeId;
    const vipEnchants = Database.get('vipEnchants', item) ?? {};
    if (!item || !vipEnchants['Log Catcher'] || !blockTypeId.includes('log') || !player.hasTag('VIP')) return;
    const blockLocation = block.location;
    const blocks = getBlocksAbove(player, blockLocation, 10, 'log');
    system.run(() => {
        blocks.forEach((block) => {
            if (!SlotsLeft(player, blockTypeId)) return;
            block.setType('minecraft:air')
            inv.addItem(new ItemStack(blockTypeId, 1));
        })
    })
})

world.afterEvents.entityHurt.subscribe(({ hurtEntity, damageSource }) => {
    if (damageSource.cause !== 'entityAttack' || damageSource.damagingEntity.typeId !== 'minecraft:player') return;
    const inv = damageSource.damagingEntity.getComponent('inventory').container;
    const item = inv.getItem(damageSource.damagingEntity.selectedSlotIndex);
    const vipEnchants = Database.get('vipEnchants', item) ?? {};
    if (!item || !vipEnchants['Area Damage'] || !damageSource.damagingEntity.hasTag('VIP')) return;
    const getEntities = getEntitiesRadius(hurtEntity, 3).filter((v) => v !== damageSource.damagingEntity || v.typeId.includes('player'))
    if (getEntities.length === 0) return;
    try {
        getEntities.forEach((entity) => entity.applyDamage(2))
    } catch (e) { }
})

world.afterEvents.entityDie.subscribe(({ deadEntity, damageSource }) => {
    if (damageSource.cause !== 'entityAttack' || damageSource.damagingEntity.typeId !== 'minecraft:player') return;
    const target = damageSource.damagingEntity;
    const inv = target.getComponent('inventory').container;
    const item = inv.getItem(target.selectedSlotIndex);
    const vipEnchants = Database.get('vipEnchants', item) ?? {};
    if (!item || !vipEnchants['Drop Pickup'] || !target.hasTag('VIP')) return;
    deadEntity.dimension.getEntities({ type: 'minecraft:item', location: deadEntity.location, minDistance: 0, maxDistance: 1.5 }).map((entity) => {
        const dropitem = entity.getComponent('item').itemStack;
        if (!SlotsLeft(target, dropitem.typeId)) return;
        entity.remove();
        inv.addItem(dropitem);
    })
})
function getEntitiesRadius(player, radius) {
    const entities = [];
    for (let x = player.location.x - radius; x <= player.location.x + radius; x++) {
        for (let y = player.location.y - radius; y <= player.location.y + radius; y++) {
            for (let z = player.location.z - radius; z <= player.location.z + radius; z++) {
                const entity = player.dimension.getEntitiesAtBlockLocation({ x, y, z });
                if (entity.length > 0) entities.push(entity);
            }
        }
    }
    return entities.flat();
}


function getBlocksAbove(player, blockLocation, radius, type) {
    const blocks = [];
    for (let y = blockLocation.y + 1; y <= blockLocation.y + radius; y++) {
        if (y > 320) continue;
        const block = player.dimension.getBlock({ x: blockLocation.x, y, z: blockLocation.z });
        if (block.typeId.includes(type)) blocks.push(block);
    }
    return blocks;
}
function SlotsLeft(player, itemId) {
    const inv = player.getComponent('inventory').container;
    const slots = Array.from({ length: inv.size }).map((_, i) => inv.getItem(i)).filter((item) => item !== undefined && item.typeId === itemId);
    const fullSlots = slots.filter(slot => slot.amount === 64).length;
    const notFullSlots = slots.length - fullSlots;
    const emptySlots = inv.size - slots.length;
    if ((emptySlots < 1 || notFullSlots < 1) && inv.emptySlotsCount === 0) return false
    return true
}

export const formatString = (str) => str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');