import { world, system, Player, GameMode } from '@minecraft/server';

system.runInterval(() => {
    world.getPlayers().forEach((player) => {
        ClearBannnedItems(player);
        KillEntites(player);
        RunCommandAsyncs(player);
        CheckUserOutOfBodder(player)
    });
    GameModeChecker();
}, 70)


const box = (player, location) =>
    player.location.x >= Math.min(location.cords1.x, location.cords2.x) &&
    player.location.x <= Math.max(location.cords1.x, location.cords2.x) &&
    player.location.y >= Math.min(location.cords1.y, location.cords2.y) &&
    player.location.y <= Math.max(location.cords1.y, location.cords2.y) &&
    player.location.z >= Math.min(location.cords1.z, location.cords2.z) &&
    player.location.z <= Math.max(location.cords1.z, location.cords2.z);

/**
 * 
 * @param {Player} player 
 */
function CheckUserOutOfBodder(player) {
    if (player.hasTag('Owner')) return;
    if (box(player, { cords1: { x: -10000, y: -70, z: -10000 }, cords2: { x: 10000, y: 350, z: 10000 } })) return
    player.sendMessage(`§6[§7Anti Cheat§6]§c - You are not allowed to be here!`)
    return player.teleport({ x: 0, y: 115, z: 0 }, { dimension: world.getDimension('overworld') })
}


/**
 * 
 * @param {Player} player 
 */
function ClearBannnedItems(player) {
    const PlayerInv = player.getComponent('inventory').container;
    for (let i = 0; i < PlayerInv.size; i++) {
        const item = PlayerInv.getItem(i);
        if (!item || !ACconfig.BannedItems.includes(item.typeId.split(':')[1])) continue;
        PlayerInv.setItem(i, undefined);
        player.sendMessage(`§6[§7Anti Cheat§6]§c - You are not allowed to have ${item.typeId.split(':')[1] ?? ''} in your inventory!`)
    }
}

/**
 * 
 * @param {Player} player 
 */
function KillEntites(player) {
    player.dimension.getEntities().map((entity) => {
        if (ACconfig.KillEntitys.includes(entity.typeId.split(':')[1])) return entity.remove()
    })
}

world.beforeEvents.playerInteractWithBlock.subscribe((data) => {
    try {
        if (data?.itemStack && !ACconfig.BannedBlocks.includes(data.itemStack.typeId.split(':')[1])) return
        data.player.sendMessage(`§6[§7Anti Cheat§6]§c - You are not allowed to place ${data.itemStack.typeId.split(':')[1]}!`)
        data.cancel = true;
    } catch { }
})


/**
 * 
 * @param {Player} player 
 */
function RunCommandAsyncs(player) {
    player.runCommandAsync('execute as @a[tag=safe] run effect @s fire_resistance 30 100 true')
    player.runCommandAsync('clear @a arrow 25')
    player.runCommandAsync('clear @a lingering_potion 24')
    player.runCommandAsync('clear @a splash_potion 24')
    player.runCommandAsync('execute at @a run fill ~10~10~10 ~-10~-10~-10 air replace mob_spawner')
    player.runCommandAsync('execute at @a run fill ~10~10~10 ~-10~-10~-10 air replace snow_layer')
}

function GameModeChecker() {
    world.getPlayers({ gameMode: GameMode.creative, excludeTags: ACconfig.Tags.skipPlayers }).map((player) => {
        player.runCommandAsync('gamemode survival @s')
        player.sendMessage(`§cYou are not allowed to be in creative mode!`)
    })
}
