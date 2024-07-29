/**
 * This code is developed by soullessyt (Discord).
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


import { world, system, Player } from "@minecraft/server";
import newEntity from "../../Extensions/EntityHandler";
import { menu } from "./buildingblocks/building_blocks";
import { foodmenu } from "./FoodShop/food_shop";
import { raidmenu } from "./RaidingShop/raiding_shop";
import { enchantmenu } from "./EnchantShop/enchant_shop";
import { spawnermenu } from "./SpawnerShop/spawner_shop";
import { shulkermenu } from "./ShulkerShop/shulker_shop";
import { sellmenu } from "./SellMenu/sell_menu";
import { oresmenu } from "./OresShop/ores_shop";
import { BuyCratesKeys } from "../../Extensions/CratesHanlder";
import { projectilesmenu } from "./ProjectilesShop/projectiles_shop";
import ItemsEnc from "./EnchantingShop/index";
import { redstone } from "./Redstone/redstone_shop";
newEntity("soulless:sellmenu", { nameTag: "§𝕠§6Sell Menu" }, (player) => {
    system.run(() => sellmenu(player));
    system.run(() =>
        player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
    );
});

newEntity("soulless:trees", { nameTag: "§𝕠§6Building Blocks" }, (player) => {
    system.run(() => menu(player));
    system.run(() =>
        player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
    );
});

newEntity("soulless:butcher", { nameTag: "§𝕠§3Food Shop" }, (player) => {
    system.run(() => foodmenu(player));
    system.run(() =>
        player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
    );
});

newEntity("soulless:raiding", { nameTag: "§𝕠§uRaiding Shop" }, (player) => {
    system.run(() => raidmenu(player));
    system.run(() =>
        player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
    );
});

newEntity("soulless:enchant", { nameTag: "§𝕠§dEnchant Shop" }, (player) => {
    system.run(() => enchantmenu(player));
    system.run(() =>
        player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
    );
});

newEntity("soulless:spawners", { nameTag: "§𝕠§5Spawner Shop" }, (player) => {
    system.run(() => spawnermenu(player));
    system.run(() =>
        player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
    );
});

newEntity("soulless:shulker", { nameTag: "§𝕠§2Shulker Shop" }, (player) => {
    system.run(() => shulkermenu(player));
    system.run(() =>
        player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
    );
});

newEntity("soulless:ores", { nameTag: "§𝕠§bOres Shop" }, (player) => {
    system.run(() => oresmenu(player));
    system.run(() =>
        player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
    );
});

newEntity("soulless:project", { nameTag: "§𝕠§cProjectiles Shop" }, (player) => {
    system.run(() => projectilesmenu(player));
    system.run(() =>
        player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
    );
});

world.afterEvents.entityHitEntity.subscribe((event) => {
    if (event.hitEntity.typeId !== 'soulless:keyseller') return;    
    if (Math.floor(event.hitEntity.location.x) === 116) return ItemsEnc(event.damagingEntity), event.hitEntity.nameTag = "§𝕠§6Enchanting Shop";
    if (Math.floor(event.hitEntity.location.x) === -75) return BuyCratesKeys(event.damagingEntity), event.hitEntity.nameTag = "§𝕠§6Crates Shop";
});


newEntity("soulless:redstone", { nameTag: "§𝕠§cRedstone Shop" }, (player) => {
    system.run(() => redstone(player));
    system.run(() =>
        player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
    );
});

newEntity("soulless:slot", { nameTag: "§𝕠§6Play Slots?" }, (player) => {
    system.run(() =>
        player.sendMessage("§6Slot Machine is currently disabled!"),
    );
});