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
import { sellPad } from "../../Extensions/SellPad";

export const items = { // Basic Block Prices
    'cobblestone': {
        price: 1,
        amount: 64,
    },
    "cobbled_deepslate": {
        price: 1,
        amount: 64,
    },
    'dirt': {
        price: 1,
        amount: 64,
    },
    'sand': {
        price: 1,
        amount: 32,
    },
    'gravel': {
        price: 1,
        amount: 32,
    },
    'oak_log': {
        price: 1,
        amount: 1,
    },
    'birch_log': {
        price: 1,
        amount: 1,
    },
    'spruce_log': {
        price: 1,
        amount: 1,
    },
    'jungle_log': {
        price: 1,
        amount: 1,
    },
    'acacia_log': {
        price: 1,
        amount: 1,
    },
    'dark_oak_log': {
        price: 1,
        amount: 1,
    },
    'mangrove_log': {
        price: 1,
        amount: 1,
    },
    'cherry_log': {
        price: 1,
        amount: 1,
    },
    'crimson_stem': {
        price: 1,
        amount: 1,
    },
    'warped_stem': {
        price: 1,
        amount: 1,
    },
    'coal': { // ores prices
        price: 3,
        amount: 1,
    },
    'copper_ingot': {
        price: 3,
        amount: 1,
    },
    'iron_ingot': {
        price: 5,
        amount: 1,
    },
    'gold_ingot': {
        price: 10,
        amount: 1,
    },
    'diamond': {
        price: 50,
        amount: 1,
    },
    'emerald': {
        price: 100,
        amount: 1,
    },
    'netherite_ingot': {
        price: 500,
        amount: 1,
    },
    "redstone": {
        price: 3,
        amount: 1,
    },
    "quartz": {
        price: 5,
        amount: 1,
    },
    'melon_slice': { // farming prices
        price: 1,
        amount: 1,
    },
    'melon_block': {
        price: 12,
        amount: 1,
    },
    'sugar_cane': {
        price: 2,
        amount: 1,
    },
    'sweet_berries': {
        price: 3,
        amount: 1,
    },
    'wheat': {
        price: 2,
        amount: 1,
    },
    'pumpkin': {
        price: 3,
        amount: 1,
    },
    'carrot': {
        price: 5,
        amount: 1,
    },
    'potato': {
        price: 5,
        amount: 1,
    },
    'beetroot': {
        price: 5,
        amount: 1,
    },
    'cocoa_beans': {
        price: 5,
        amount: 1,
    },
    'cactus': {
        price: 5,
        amount: 1,
    },
    'bamboo': {
        price: 1,
        amount: 1,
    },
    'nether_wart': {
        price: 3,
        amount: 1,
    },
    'chicken': { // mob drops prices
        price: 10,
        amount: 1,
    },
    'feather': {
        price: 5,
        amount: 1,
    },
    'porkchop': {
        price: 35,
        amount: 1,
    },
    'mutton': {
        price: 50,
        amount: 1,
    },
    'white_wool': {
        price: 10,
        amount: 1,
    },
    'beef': {
        price: 75,
        amount: 1,
    },
    'leather': {
        price: 5,
        amount: 1,
    },
    'spider_eye': {
        price: 150,
        amount: 1,
    },
    'rotten_flesh': {
        price: 250,
        amount: 1,
    },
    'skull': {
        price: 500,
        amount: 1,
    },
    'slime_ball': {
        price: 750,
        amount: 1,
    },
    'magma_cream': {
        price: 1250,
        amount: 1,
    },
    'blaze_rod': {
        price: 1500,
        amount: 1,
    },
    'prismarine_crystals': {
        price: 500,
        amount: 1,
    },
    'prismarine_shard': {
        price: 500,
        amount: 1,
    },
    'wither_rose': {
        price: 4000,
        amount: 1,
    },
    'dragon_egg': {
        price: 5000,
        amount: 1,
    },
    'honeycomb': {
        price: 10000,
        amount: 1,
    },
}

system.runInterval(() => {
    try { // new Vector(player.location.x, player.location.y - 1, player.location.z)
        world.getPlayers().forEach((player) => (player.dimension.getBlock({
            x: Math.floor(player.location.x),
            y: Math.floor(player.location.y - 1),
            z: Math.floor(player.location.z)
        })?.typeId === 'minecraft:beacon') ? sellPad(player, items) : null)
    } catch (r) { }
}, 60)