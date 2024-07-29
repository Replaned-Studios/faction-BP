import { world, Player, system } from "@minecraft/server"
import { radiusCheck } from "../Extensions/functions";
const database = [];

const Messages = [
    "§cWhy are you trying to Leave the Island?",
    "§cPlease Dont Jump Off The Island!",
    "§cDo you need help??",
    "§cIf You Need Help Call Superslide Hotline xD",
    "§cDid someone force you to do this?",
    "§cAre you sure you want to leave? There might be monsters out there!",
    "§cThe island is full of treasures, don't go yet!",
    "§cRemember, the island is your home now!",
    "§cAnd they said pigs couldn't fly... turns out players can't either.",
    "§cDon't think you can just walk away!",
    "§cThis island is not a theme park, it's our home!",
    "§cWe don't want to lose our new friend! Stay put!",
    "§cWe won't let you go without a fight!",
    "§cThis is our land, our rules, our game!",
    "§cYou can't just decide to leave whenever you feel like it!",
    "§cWe won't let you ruin our peace!",
];

const interactableblocks = ["minecraft:ender_chest"];


const box = (player, location) =>
    player.location.x >= Math.min(location.cords1.x, location.cords2.x) &&
    player.location.x <= Math.max(location.cords1.x, location.cords2.x) &&
    player.location.y >= Math.min(location.cords1.y, location.cords2.y) &&
    player.location.y <= Math.max(location.cords1.y, location.cords2.y) &&
    player.location.z >= Math.min(location.cords1.z, location.cords2.z) &&
    player.location.z <= Math.max(location.cords1.z, location.cords2.z);


/**
* @param {{ cords1: {x: number, y: number, z: number}, cords2: {x: number, y: number, z: number}}} location
* @param {((player: Player) => boolean) } permissions
*/ function SpawnPro(location, permissions) {
    database.push({ location: location, permissions: permissions });

    world.beforeEvents.playerBreakBlock.subscribe((data) => {
        const isInsideAnyLocation = database.filter((value) => box(data.block, value.location))[0];
        if (!isInsideAnyLocation) return;
        if (isInsideAnyLocation?.permissions && isInsideAnyLocation.permissions(data.player)) return;
        data.cancel = true;
        return data.player.sendMessage(`§cYou can't break blocks here!`);
    });



    world.beforeEvents.playerInteractWithBlock.subscribe((data) => {
        if (interactableblocks.some((v) => data.block.typeId === v)) return;
        const isInsideAnyLocation = database.filter((value) => box(data.block, value.location))[0];
        if (!isInsideAnyLocation) return;
        if (isInsideAnyLocation?.permissions && isInsideAnyLocation.permissions(data.player)) return;
        return data.cancel = true
    });

    world.beforeEvents.playerPlaceBlock.subscribe((data) => {
        const isInsideAnyLocation = database.filter((value) => box(data.block, value.location))[0];
        if (!isInsideAnyLocation) return;
        if (isInsideAnyLocation?.permissions && isInsideAnyLocation.permissions(data.player)) return;
        data.cancel = true;
        return data.player.sendMessage(`§cYou can't place blocks here!`);
    });

    world.beforeEvents.itemUse.subscribe((data) => {
        const { source: player } = data
        const isInsideAnyLocation = database.filter((value) => box(player, value.location))[0];
        if (!isInsideAnyLocation || !ACconfig.BannedItems.includes(data.itemStack.typeId.split(":")[1])) return;
        if (isInsideAnyLocation.permissions && isInsideAnyLocation.permissions(player)) return;
        data.cancel = true;
        return player.sendMessage(`§cYou can't use this item here!`);
    })

    world.beforeEvents.itemUseOn.subscribe((data) => {
        const { source: player } = data
        const isInsideAnyLocation = database.filter((value) => box(player, value.location))[0];
        if (!isInsideAnyLocation || !ACconfig.BannedItems.includes(data.itemStack.typeId.split(":")[1])) return;    
        if (isInsideAnyLocation.permissions && isInsideAnyLocation.permissions(player)) return;
        data.cancel = true;
        return player.sendMessage(`§cYou can't use this item here!`);
    })  


    world.beforeEvents.explosion.subscribe((data) => {
        const isInsideAnyLocation = database.filter((value) => box(data.source, value.location))[0];
        if (!isInsideAnyLocation) return;
        data.cancel = true;
    });

    system.runInterval(() => {
        world.getPlayers({ excludeTags: ['Owner', 'Admin'] }).forEach((player) => {
            const isInsideAnyLocation = database.filter((value) => box(player, value.location))[0];
 
            if (!isInsideAnyLocation && !radiusCheck(player, 0, 79, 1323, 10)) return player.removeTag("safe");
            if (!box(player, { cords1: { x: -289.0, y: -64.0, z: -334.0 }, cords2: { x: 340.0, y: 320.0, z: 361.0 } })) return;
            if (player.isGliding) {
                player.teleport({ x: 0, y: 110, z: 0 }, { dimension: world.getDimension("overworld") });
                return player.sendMessage("§cYou can't use elytra here. you are in a safezone");
            }
            player.addTag("safe");
            if (player.location.y >= 86) return;
            if (player.location.y <= 86) player.teleport({ x: 0, y: 110, z: 0 }, { dimension: world.getDimension("overworld") });
            player.sendMessage(`${Messages[Math.floor(Math.random() * Messages.length)]}`);
            player.runCommandAsync("playsound mob.shulker.teleport @s ~~~s");
        });
    }, 25);
}

SpawnPro({ cords1: { x: -289.0, y: -64.0, z: -334.0 }, cords2: { x: 340.0, y: 320.0, z: 361.0 } }, (player) => ['Owner', 'Admin'].some((v) => player.hasTag(v)));

