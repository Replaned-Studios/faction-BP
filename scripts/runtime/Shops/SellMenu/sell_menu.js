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


import { world, system, Player, ContainerSlot, WorldBeforeEvents, BlockRecordPlayerComponent, } from "@minecraft/server";
import { ChestFormData } from "../../../Extensions/Chestform/forms.js";
import { ModalFormData } from "@minecraft/server-ui"

export { getScore };
function getScore(player, objective, alwaysnumber = true) {
    try {
        return world.scoreboard
            .getObjective(objective)
            .getScore(player.scoreboardIdentity);
    } catch {
        if (alwaysnumber) return 0;
        else return null;
    }
}


/**
 * 
 * @param {Player} player 
 */

export function sellmenu(player) {
    new ChestFormData(`small`)
        .title(`§𝕠§6Sell Menu`)
        .button(11, '§𝕠§6Blocks', ['§6§𝕠Click To See What Blocks You Can Sell'], 'minecraft:cobblestone', 0, true)
        .button(12, '§𝕠§6Ores', ['§6§𝕠Click To See What Ores You Can Sell'], 'minecraft:diamond', 0, true)
        .button(13, '§𝕠§6Farmables', ['§6§𝕠Click To See What Farmables You Can Sell\nLike Wheat & Carrots'], 'textures/items/wheat', 0, true)
        .button(14, '§𝕠§6Mob Drops / Spawner Items', ['§6§𝕠Click To See What Mob Drops You Can Sell'], 'minecraft:porkchop', 0, true)
        .button(15, '§𝕠§cComing Soon', ['§6§𝕠Tell Me What To Add'], 'textures/items/bucket_empty', 0, true)
        .button(22, '§𝕠§c§lClose', [], 'minecraft:barrier', 0)
        .show(player).then(response => {
            if (response === null || response.canceled) return player.sendMessage(`§cMenu Closed`)
            switch (response.selection) {
                case 49:
                    player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`)
                    break;
                case 11:
                    player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
                    blocks(player)
                    break;
                case 12:
                    player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
                    ores(player)
                    break;
                case 13:
                    player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
                    farmables(player)
                    break;
                case 14:
                    player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
                    mobdrops(player)
                    break;
                case 15:
                    player.runCommand(`playsound random.hurt @s ~~~ 1 1 1`)
                    player.sendMessage(`§cDm Me On Discord To Suggest Items To Add To The Sell Menu\n§9§lDiscord: §6soullessyt`)
                    break;
            }
        }
        )
}

function blocks(player) {
    new ChestFormData(`double`)
        .title(`§𝕠§6Sell Menu - Blocks`)
        .button(11, '§𝕠§6Cobblestone Or Cobbled_deepslate', ['§6§𝕠Sell Price: §a$1 For 64'], 'minecraft:cobbled_deepslate', 64)
        .button(12, '§𝕠§6Dirt', ['§6§𝕠Sell Price: §a$1 For 64'], 'minecraft:dirt', 64)
        .button(13, '§𝕠§6Sand', ['§6§𝕠Sell Price: §a$1 For 32'], 'minecraft:sand', 32)
        .button(14, '§𝕠§6Gravel', ['§6§𝕠Sell Price: §a$1 For 32'], 'minecraft:gravel', 32)
        .button(15, '§𝕠§6Logs', ['§6§𝕠All Logs Sell Price: §a$1'], 'minecraft:sapling', 0, true)
        .button(31, '§𝕠§c§lBack', [], 'minecraft:barrier', 0)
        .pattern([0, 0], [
            '_________',
            '_________',
            '_________',
            '_________',
            '_________',
            '_________'
        ], {
            x: { data: { itemName: '', itemDesc: [], enchanted: false, stackAmount: 1 }, iconPath: 'textures/ui/cointier_backdrop' },
            l: { data: { itemName: '§𝕠§6Sell Menu', itemDesc: [], enchanted: true, stackAmount: 1 }, iconPath: "textures/ui/hammer_l" },
            r: { data: { itemName: '§𝕠§6Sell Menu', itemDesc: [], enchanted: true, stackAmount: 1 }, iconPath: "textures/ui/hammer_r" },

        })
        .show(player).then(response => {
            if (response === null || response.canceled) return player.sendMessage(`§cMenu Closed`)
            switch (response.selection) {
                case 31:
                    sellmenu(player)
                    player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
                    break;
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                    player.sendMessage(`§cPlease Stand On The Sellpad (Beacon) To Sell Items`)
                    player.runCommand(`tp @s 124 101 -9`)
                    break;
            }
        }
        )
}


function ores(player) {
    new ChestFormData(`double`)
        .title(`§𝕠§6Sell Menu - Ores`)
        .button(11, '§𝕠§6Coal', ['§6§𝕠Sell Price: §a$3 For 1'], 'minecraft:coal', 0, true)
        .button(12, '§𝕠§6Copper Ingot', ['§6§𝕠Sell Price: §a$3 For 1'], 'textures/items/copper_ingot', 0, true)
        .button(13, '§𝕠§6Iron Ingot', ['§6§𝕠Sell Price: §a$5 For 1'], 'minecraft:iron_ingot', 0, true)
        .button(14, '§𝕠§6Gold Ingot', ['§6§𝕠Sell Price: §a$10 For 1'], 'minecraft:gold_ingot', 0, true)
        .button(15, '§𝕠§6Diamond', ['§6§𝕠Sell Price: §a$50 For 1'], 'minecraft:diamond', 0, true)
        .button(21, '§𝕠§6Emerald', ['§6§𝕠Sell Price: §a$100 For 1'], 'textures/items/emerald', 0, true)
        .button(22, '§𝕠§6Netherite', ['§6§𝕠Sell Price: §a$500 For 1'], 'textures/items/netherite_ingot', 0, true)
        .button(23, '§𝕠§6Quartz', ['§6§𝕠Sell Price: §a$5 For 1'], 'textures/items/quartz', 0, true)
        .button(40, '§𝕠§c§lBack', [], 'minecraft:barrier', 0)
        .pattern([0, 0], [
            '_________',
            '_________',
            '_________',
            '_________',
            '_________',
            '_________'
        ], {
            x: { data: { itemName: '', itemDesc: [], enchanted: false, stackAmount: 1 }, iconPath: 'textures/ui/cointier_backdrop' },
            l: { data: { itemName: '§𝕠§6Sell Menu', itemDesc: [], enchanted: true, stackAmount: 1 }, iconPath: "textures/ui/hammer_l" },
            r: { data: { itemName: '§𝕠§6Sell Menu', itemDesc: [], enchanted: true, stackAmount: 1 }, iconPath: "textures/ui/hammer_r" },

        })
        .show(player).then(response => {
            if (response === null || response.canceled) return player.sendMessage(`§cMenu Closed`)
            switch (response.selection) {
                case 40:
                    sellmenu(player)
                    player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
                    break;
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 21:
                case 22:
                    player.sendMessage(`§cPlease Stand On The Sellpad (Beacon) To Sell Items`)
                    player.runCommand(`tp @s 124 101 -9`)
                    break;

            }
        }
        )
}

function farmables(player) {
    new ChestFormData(`double`)
        .title(`§𝕠§6§oFood Menu`)
        .button(11, '§a§6Melon', ['§𝕠§6Sell Price §a$1 For 1'], 'minecraft:melon_slice', 0)
        .button(12, '§a§6Melon Blocks', ['§𝕠§6Sell Price §a$10 For 1'], 'minecraft:melon_block', 0)
        .button(13, '§a§6Sugar Cane', ['§𝕠§6Sell Price §a$2 For 1'], 'textures/items/reeds', 0)
        .button(14, '§a§6Berries', ['§𝕠§6Sell Price §a$3 For 1'], 'minecraft:sweet_berries', 0)
        .button(15, '§a§6Wheat', ['§𝕠§6Sell Price §a$2 For 1'], 'textures/items/wheat', 0)
        .button(20, '§a§6Pumpkin', ['§𝕠§6Sell Price §a$3 For 1'], 'minecraft:pumpkin', 0)
        .button(21, '§a§6Carrots', ['§𝕠§6Sell Price §a$5 For 1'], 'minecraft:carrot', 0)
        .button(22, '§a§6Potatoes', ['§𝕠§6Sell Price §a$5 For 1'], 'minecraft:potato', 0)
        .button(23, '§a§6Beetroot', ['§𝕠§6Sell Price §a$5 For 1'], 'minecraft:beetroot', 0)
        .button(24, '§a§6Cocoa Beans', ['§𝕠§6Sell Price §a$5 For 1'], 'textures/items/dye_powder_brown', 0)
        .button(29, '§a§6Cactus', ['§𝕠§6Sell Price §a$5 For 1'], 'minecraft:cactus', 0)
        .button(30, '§a§6Bamboo', ['§𝕠§6Sell Price §a$1 For 1'], 'minecraft:bamboo', 0)
        .button(31, '§a§6Nether Wart', ['§𝕠§6Sell Price §a$3 For 1'], 'minecraft:nether_wart', 0)
        .button(40, '§c§6Close', [], 'minecraft:barrier', 0)
        .pattern([0, 0], [
            '_________',
            '_________',
            '_________',
            '_________',
            '_________',
            '_________'
        ], {
            x: { data: { itemName: '', itemDesc: [], enchanted: false, stackAmount: 1 }, iconPath: 'textures/ui/cointier_backdrop' },

        })
        .show(player).then(response => {
            if (response === null || response.canceled) return player.sendMessage(`§cMenu Closed`)
            switch (response.selection) {
                case 40:
                    sellmenu(player)
                    player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
                    break;
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 20:
                case 21:
                case 22:
                case 23:
                case 24:
                case 29:
                case 30:
                    player.sendMessage(`§cPlease Stand On The Sellpad (Beacon) To Sell Items`)
                    player.runCommand(`tp @s 124 101 -9`)
                    break;
            }
        }
        )
}

function mobdrops(player) {
    new ChestFormData(`double`)
        .title(`§𝕠§6Sell Menu - Mob Drops`)
        .button(11, '§𝕠§6Raw Chicken', ['§𝕠§6Sell Price §a$10 For 1'], 'minecraft:chicken', 0)
        .button(12, '§𝕠§6Feather', ['§𝕠§6Sell Price §a$5 For 1'], 'textures/items/feather', 0)
        .button(13, '§𝕠§6Raw Porkchop', ['§𝕠§6Sell Price §a$35 For 1'], 'minecraft:porkchop', 0)
        .button(14, '§𝕠§6Raw Mutton', ['§𝕠§6Sell Price §a$50 For 1'], 'textures/items/mutton_raw', 0)
        .button(15, '§𝕠§6Wool', ['§𝕠§6Sell Price §a$10 For 1'], 'minecraft:white_wool', 0)
        .button(20, '§𝕠§6Raw Beef', ['§𝕠§6Sell Price §a$75 For 1\n§6Leather: §a$5 For 1'], 'minecraft:beef', 0)
        .button(21, '§𝕠§6Spider Eyes', ['§𝕠§6Sell Price §a$150 For 1'], 'minecraft:spider_eye', 0)
        .button(22, '§𝕠§6Rotten Flesh', ['§𝕠§6Sell Price §a$250 For 1'], 'minecraft:rotten_flesh', 0)
        .button(23, '§𝕠§6Skeleton Skull', ['§𝕠§6Sell Price §a$500 For 1'], 'textures/items/skullshop', 0)
        .button(24, '§𝕠§6Slimeballs', ['§𝕠§6Sell Price §a$750 For 1'], 'textures/items/slimeball', 0)
        .button(29, '§𝕠§6Magma Cream', ['§𝕠§6Sell Price §a$1250 For 1'], 'textures/items/magma_cream', 0)
        .button(30, '§𝕠§6Blaze Rod', ['§𝕠§6Sell Price §a$1500 For 1'], 'textures/items/blaze_rod', 0)
        .button(31, '§𝕠§6Prismarine Shard', ['§𝕠§6Sell Price §a$500 For 1'], 'textures/items/prismarine_shard', 0)
        .button(32, '§𝕠§6Prismarine Crystals', ['§𝕠§6Sell Price §a$500 For 1'], 'textures/items/prismarine_crystals', 0)
        .button(33, '§𝕠§6Wither Rose', ['§𝕠§6Sell Price §a$4000 For 1'], 'minecraft:wither_rose', 0)
        .button(38, '§𝕠§6Dragon Egg', ['§𝕠§6Sell Price §a$5000 For 1'], 'minecraft:dragon_egg', 0)
        .button(39, '§𝕠§6Honeycomb', ['§𝕠§6Sell Price §a$10000 For 1'], 'textures/items/honeycomb', 0)

        .button(49, '§𝕠§c§lBack', [], 'minecraft:barrier', 0)
        .pattern([0, 0], [
            '_________',
            '_________',
            '_________',
            '_________',
            '_________',
            '_________'
        ], {
            x: { data: { itemName: '', itemDesc: [], enchanted: false, stackAmount: 1 }, iconPath: 'textures/ui/cointier_backdrop' },

        })
        .show(player).then(response => {
            if (response === null || response.canceled) return player.sendMessage(`§cMenu Closed`)
            switch (response.selection) {
                case 40:
                    sellmenu(player)
                    player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
                    break;
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 21:
                case 22:
                case 23:
                case 24:
                case 29:
                    player.sendMessage(`§cPlease Stand On The Sellpad (Beacon) To Sell Items`)
                    player.runCommand(`tp @s 124 101 -9`)
                    break;
            }
        }
        )
}