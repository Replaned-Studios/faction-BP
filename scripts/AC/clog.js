import { world, system } from "@minecraft/server";
import { setTimer, hasTimerReachedEnd } from "../Extensions/functions";
export const CombatDatabase = {};

world.afterEvents.entityHurt.subscribe((event) => {
    if (event.damageSource.cause !== "entityAttack" || event.hurtEntity.hasTag('safe') || ACconfig.Tags.skipPlayers.some(v => event.hurtEntity.hasTag(v))) return;
    CombatDatabase[event.hurtEntity.id] = { timer: setTimer(20, 'seconds') };
    event.hurtEntity.addTag(ACconfig.Tags.CombatTag);
}, { entityTypes: ["minecraft:player"] })

system.runInterval(() => {
    world.getPlayers({ tag: ACconfig.Tags.CombatTag }).map((player) => {
        if (player.hasTag('safe')) return delete CombatDatabase[player.id], player.removeTag(ACconfig.Tags.CombatTag)
        if (!CombatDatabase[player.id]) return delete CombatDatabase[player.id], player.removeTag(ACconfig.Tags.CombatTag)
        if (!CombatDatabase[player.id] || CombatDatabase[player.id].hasOwnProperty('clear')) return;
        if (hasTimerReachedEnd(CombatDatabase[player.id].timer.targetDate)) {
            delete CombatDatabase[player.id]
            player.sendMessage('§aYou Are Now Out Of Combat You May Leave Or Warp Away')
            player.removeTag(ACconfig.Tags.CombatTag)
            return
        }
        const playerinv = player.getComponent('inventory').container
        const playerEquippable = player.getComponent("minecraft:equippable");
        CombatDatabase[player.id] = {
            timer: CombatDatabase[player.id].timer,
            location: player.location,
            dimension: player.dimension.id,
            items: Array.from({ length: playerinv.size }).map((_, i) => playerinv.getItem(i))
                .concat(["Head", "Chest", "Legs", "Feet", 'Offhand'].map(v => playerEquippable.getEquipment(v))).filter(Boolean),
        }
    })
})

world.afterEvents.playerLeave.subscribe(({ playerId, playerName }) => {
    if (!CombatDatabase[playerId] || CombatDatabase[playerId]?.clear) return;
    const dim = world.getDimension(CombatDatabase[playerId].dimension);
    const entity = dim.spawnEntity('soulless:clog', CombatDatabase[playerId].location)
    const EntityInv = entity.getComponent('inventory').container;
    CombatDatabase[playerId]?.items.map((value) => EntityInv.addItem(value))
    entity.kill()
    CombatDatabase[playerId] = { clear: true }
    world.sendMessage(`[Combat Logging] ${playerName} Combat Logged!`)
})

world.afterEvents.playerSpawn.subscribe(async (event) => {
    if (!event.initialSpawn) return
    if (!CombatDatabase[event.player.id]?.clear) return;
    delete CombatDatabase[event.player.id]
    await event.player.runCommandAsync('tp @s 0 105 0')
    await event.player.runCommandAsync('clear @s')
    world.sendMessage(`§6${event.player.name} §cCombat Logged So Their Inventory Was Cleared`)
    return event.player.sendMessage('§cYour inventory Was Cleared For Combat logging!');
})

world.afterEvents.entityDie.subscribe(({ deadEntity }) => {
    if (!CombatDatabase[deadEntity.id]) return;
    deadEntity.sendMessage('§aCombat Ended')
    delete CombatDatabase[deadEntity.id];
}, { entityTypes: ["minecraft:player"] })