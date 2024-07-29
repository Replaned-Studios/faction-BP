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
import { ActionFormData } from "@minecraft/server-ui";

const {SpawnersIds, MaxLevel, LevelOneSpawnerTimer, SpawnerViewNames} = SRconfig.BlockSpawner

world.afterEvents.playerInteractWithBlock.subscribe(({ player, block, itemStack: item }) => {
    if (!item && SpawnersIds.some((v) => `mrleefy:${v}` === block.typeId.replace(/\d+$/, ''))) return Info(player, block, getSpawnerLevel(block.typeId));
    if (!item) return;
    if (!(SpawnersIds.some((v) => `mrleefy:${v}` === item.typeId.replace(/\d+$/, ''))) || !(block.typeId.replace(/\d+$/, '') === item.typeId.replace(/\d+$/, ''))) return 0;
   
    const level = getSpawnerLevel(item.typeId);
    const blocklevel = getSpawnerLevel(block.typeId);
   
    if (blocklevel >= MaxLevel) return player.sendMessage(`§cThis spawner is already at max level!`);
   
    if (player.isSneaking) return player.sendMessage(`§cYou can't upgrade the spawner while sneaking! This is to prevent accidental upgrades and spawner duping glitches!`);
   
    if ((blocklevel + level) > MaxLevel) return player.sendMessage(`§cYou can't upgrade the spawner past level ${MaxLevel}! Use A Stone Cutter To uncombine the spawners back to level 1`);
   

    player.dimension.getBlock(block.location).setType(`${block.typeId.replace(/\d+$/, '') + (blocklevel + level)}`);
   
    const inv = player.getComponent('inventory').container;
   
    item.amount > 1 ? (item.amount-- && inv.setItem(player.selectedSlotIndex, item)) : inv.setItem(player.selectedSlotIndex, null)
   
    player.sendMessage(`§aUpgraded §5${SpawnerViewNames[block.typeId.replace('mrleefy:', '').replace(/\d+$/, '')]} Spawner §aTo Level: §b${blocklevel + level}`);
})

function Info(player, block, blocklevel) {
    new ActionFormData()
        .title(`§5${SpawnerViewNames[block.typeId.replace('mrleefy:', '').replace(/\d+$/, '')]} Spawner`)
        .body(`§6Welcome to the ${SpawnerViewNames[block.typeId.replace('mrleefy:', '').replace(/\d+$/, '')]} Spawner!§r\nThis spawner is currently at level ${blocklevel}!\n\n§5Time Between Spawns: §b${blocklevel === 1 ? LevelOneSpawnerTimer : 80 - (blocklevel - 1) * 5} Seconds\n\n§5Upgrade: §bRight Click With A Spawner Of The Same Type\n\n§5Info: §bRight Click With An Empty Hand\n\n§5Pick UP: §bMine With A Pickaxe`)
        .button('Exit', 'textures/ui/cancel')
        .show(player)
}

function getSpawnerLevel(id) {
    const level = id.split(':')[1].split('spawner')[1];
    return isNaN(parseInt(level)) ? 1 : parseInt(level);
}