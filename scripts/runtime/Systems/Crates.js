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


import { world, system, ItemStack, Player, EnchantmentType } from "@minecraft/server";

/**
 * @typedef {Object} CrateItem
 * @property {number} chance
 * @property {number} items_giving
 * @property {[string, number, Enchantment[]]} itemName
 * @property {string} textures
 * @property {(player: Player, crateName: string) => void} callback
 */

/**
 * @typedef {Object} CrateInfo
 * @property {string} blockId
 * @property {number} price
 * @property {{x: number, y: number, z: number}} location
 * @property {CrateItem[]} items
 */

/**
 * @type {Record<string, CrateInfo>}
 */
export const CratesInfo = {
    'Trims': {
        blockId: 'minecraft:chest',
        price: 25000,
        location: { x: -81, y: 104, z: 6 },
        items: [
            {
                chance: 2,
                items_giving: 1,
                itemName: 'Coast Armour Trim',
                textures: 'minecraft:coast_armor_trim_smithing_template',
                items: [
                    ["minecraft:coast_armor_trim_smithing_template", 1],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 6.2,
                items_giving: 1,
                itemName: 'Sentry Armour Trim',
                textures: 'minecraft:sentry_armor_trim_smithing_template',
                items: [
                    ["minecraft:sentry_armor_trim_smithing_template", 1],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 6.2,
                items_giving: 1,
                itemName: 'Vex Armour Trim',
                textures: 'minecraft:vex_armor_trim_smithing_template',
                items: [
                    ["minecraft:vex_armor_trim_smithing_template", 1],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 6.2,
                items_giving: 1,
                itemName: 'Wild Armour Trim',
                textures: 'minecraft:wild_armor_trim_smithing_template',
                items: [
                    ["minecraft:wild_armor_trim_smithing_template", 1],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 6.2,
                items_giving: 1,
                itemName: 'Dune Armour Trim',
                textures: 'minecraft:dune_armor_trim_smithing_template',
                items: [
                    ["minecraft:dune_armor_trim_smithing_template", 1],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 6.2,
                items_giving: 1,
                itemName: 'Wayfinder Armour Trim',
                textures: 'minecraft:wayfinder_armor_trim_smithing_template',
                items: [
                    ["minecraft:wayfinder_armor_trim_smithing_template", 1],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 6.2,
                items_giving: 1,
                itemName: 'Shaper Armour Trim',
                textures: 'minecraft:shaper_armor_trim_smithing_template',
                items: [
                    ["minecraft:shaper_armor_trim_smithing_template", 1],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 6.2,
                items_giving: 1,
                itemName: 'Raiser Armour Trim',
                textures: 'minecraft:raiser_armor_trim_smithing_template',
                items: [
                    ["minecraft:raiser_armor_trim_smithing_template", 1],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 6.2,
                items_giving: 1,
                itemName: 'Host Armour Trim',
                textures: 'minecraft:host_armor_trim_smithing_template',
                items: [
                    ["minecraft:host_armor_trim_smithing_template", 1],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 6.2,
                items_giving: 1,
                itemName: 'Ward Armour Trim',
                textures: 'minecraft:ward_armor_trim_smithing_template',
                items: [
                    ["minecraft:ward_armor_trim_smithing_template", 1],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 6.2,
                items_giving: 1,
                itemName: 'Silence Armour Trim',
                textures: 'minecraft:silence_armor_trim_smithing_template',
                items: [
                    ["minecraft:silence_armor_trim_smithing_template", 1],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 6.2,
                items_giving: 1,
                itemName: 'Tide Armour Trim',
                textures: 'minecraft:tide_armor_trim_smithing_template',
                items: [
                    ["minecraft:tide_armor_trim_smithing_template", 1],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 6.2,
                items_giving: 1,
                itemName: 'Snout Armour Trim',
                textures: 'minecraft:snout_armor_trim_smithing_template',
                items: [
                    ["minecraft:snout_armor_trim_smithing_template", 1],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 6.2,
                items_giving: 1,
                itemName: 'Rib Armour Trim',
                textures: 'minecraft:rib_armor_trim_smithing_template',
                items: [
                    ["minecraft:rib_armor_trim_smithing_template", 1],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 6.2,
                items_giving: 1,
                itemName: 'Eye Armour Trim',
                textures: 'minecraft:eye_armor_trim_smithing_template',
                items: [
                    ["minecraft:eye_armor_trim_smithing_template", 1],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 6.2,
                items_giving: 1,
                itemName: 'Spire Armour Trim',
                textures: 'minecraft:spire_armor_trim_smithing_template',
                items: [
                    ["minecraft:spire_armor_trim_smithing_template", 1],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
        ]
    },
    "Common": {
        blockId: 'minecraft:chest',
        price: 2500,
        location: { x: -69, y: 104, z: 6 },
        items: [
            {
                chance: 45,
                items_giving: 1,
                itemName: 'Iron Sword',
                textures: 'minecraft:iron_sword',
                items: [
                    ["minecraft:iron_sword", 1],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 45,
                items_giving: 1,
                itemName: 'Iron Pickaxe',
                textures: 'minecraft:iron_pickaxe',
                items: [
                    ["minecraft:iron_pickaxe", 1],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 45,
                items_giving: 1,
                itemName: 'Iron Axe',
                textures: 'minecraft:iron_axe',
                items: [
                    ["minecraft:iron_axe", 1],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 45,
                items_giving: 1,
                itemName: 'Iron Shovel',
                textures: 'minecraft:iron_shovel',
                items: [
                    ["minecraft:iron_shovel", 1],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 15,
                items_giving: 1,
                itemName: '12 Iron Blocks',
                textures: 'minecraft:iron_block',
                items: [
                    ["minecraft:iron_block", 12],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 10,
                items_giving: 1,
                itemName: '5 Diamonds',
                textures: 'minecraft:diamond',
                items: [
                    ["minecraft:diamond", 5],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 20,
                items_giving: 1,
                itemName: '15 Cooked Beef',
                textures: 'minecraft:cooked_beef',
                items: [
                    ["minecraft:cooked_beef", 15],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 20,
                items_giving: 1,
                itemName: '15 Cooked Porkchops',
                textures: 'minecraft:cooked_porkchop',
                items: [
                    ["minecraft:cooked_porkchop", 15],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 35,
                items_giving: 1,
                itemName: '10 Books',
                textures: 'minecraft:book',
                items: [
                    ["minecraft:book", 10],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
        ]
    },
    "Uncommon": {
        blockId: 'minecraft:chest',
        price: 8000,
        location: { x: -69, y: 104, z: 10 },
        items: [
            {
                chance: 45,
                items_giving: 1,
                itemName: 'Diamond Sword',
                textures: 'minecraft:diamond_sword',
                items: [
                    ["minecraft:diamond_sword", 1],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 45,
                items_giving: 1,
                itemName: 'Diamond Pickaxe',
                textures: 'minecraft:diamond_pickaxe',
                items: [
                    ["minecraft:diamond_pickaxe", 1],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 45,
                items_giving: 1,
                itemName: 'Iron Sword',
                textures: 'minecraft:iron_sword',
                items: [
                    ["minecraft:iron_sword", 1],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 45,
                items_giving: 1,
                itemName: 'Iron Pickaxe',
                textures: 'minecraft:iron_pickaxe',
                items: [
                    ["minecraft:iron_pickaxe", 1],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 25,
                items_giving: 1,
                itemName: '35 Cooked Beef',
                textures: 'minecraft:cooked_beef',
                items: [
                    ["minecraft:cooked_beef", 35],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 25,
                items_giving: 1,
                itemName: '35 Cooked Porkchops',
                textures: 'minecraft:cooked_porkchop',
                items: [
                    ["minecraft:cooked_porkchop", 35],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 30,
                items_giving: 1,
                itemName: '22 Iron Blocks',
                textures: 'minecraft:iron_block',
                items: [
                    ["minecraft:iron_block", 22],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 50,
                items_giving: 1,
                itemName: '5 Bookshelves',
                textures: 'minecraft:bookshelf',
                items: [
                    ["minecraft:bookshelf", 5],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },

        ]
    },
    "Rare": {
        blockId: 'minecraft:chest',
        price: 15000,
        location: { x: -70, y: 104, z: 15 },
        items: [
            {
                chance: 35,
                items_giving: 1,
                itemName: 'Diamond Sword',
                textures: 'minecraft:diamond_sword',
                items: [
                    ["minecraft:diamond_sword", 1],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 35,
                items_giving: 1,
                itemName: 'Diamond Pickaxe',
                textures: 'minecraft:diamond_pickaxe',
                items: [
                    ["minecraft:diamond_pickaxe", 1],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 35,
                items_giving: 1,
                itemName: 'Diamond Axe',
                textures: 'minecraft:diamond_axe',
                items: [
                    ["minecraft:diamond_axe", 1],
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 35,
                items_giving: 1,
                itemName: 'Diamond Shovel',
                textures: 'minecraft:diamond_shovel',
                items: [
                    ["minecraft:diamond_shovel", 1],
                ],
                callback(player) {
                    player.addItems(this.items);
                },
            },
            {
                chance: 12,
                items_giving: 1,
                itemName: '7 Diamonds',
                textures: 'minecraft:diamond',
                items: [
                    ["minecraft:diamond", 7],
                ],
                callback(player) {
                    player.addItems(this.items);
                },
            },
            {
                chance: 35,
                items_giving: 1,
                itemName: '25 Iron Blocks',
                textures: 'minecraft:iron_block',
                items: [
                    ["minecraft:iron_block", 25],
                ],
                callback(player) {
                    player.addItems(this.items);
                },
            },
            {
                chance: 15,
                items_giving: 1,
                itemName: '2 Golden Apples',
                textures: 'minecraft:golden_apple',
                items: [
                    ["minecraft:golden_apple", 2],
                ],
                callback(player) {
                    player.addItems(this.items);
                },
            },
            {
                chance: 305,
                items_giving: 1,
                itemName: 'Maxed Enchanted Shield\n§6Unbreaking 3\n§6Mending 1',
                textures: 'minecraft:shield',
                items: [
                    ["minecraft:shield", 1, [{
                        type: new EnchantmentType('unbreaking'),
                        level: 3
                    }, {
                        type: new EnchantmentType('mending'),
                        level: 1
                         }
                      ]
                    ]
                ],
                callback(player) {      
                    player.addItems(this.items);
                },
            },
            {
                chance: 5,
                items_giving: 1,
                itemName: 'Fire Resistance Potion',
                textures: 'textures/items/potion_bottle_fireResistance',
                items: [],
                callback(player) {
                    player.runCommandAsync('give @s potion 1 13')
                },
            },
        ],
    },
    "Epic": {
        blockId: 'minecraft:chest',
        price: 25000,
        location: { x: -80, y: 104, z: 15 },
        items: [
            {
                chance: 35,
                items_giving: 1,
                itemName: 'Diamond Sword\n§6Unbreaking 3\n§6Mending 1',
                textures: 'minecraft:diamond_sword',
                items: [
                    ["minecraft:diamond_sword", 1,
                        [
                            {
                                type: new EnchantmentType('unbreaking'),
                                level: 3
                            },
                            {
                                type: new EnchantmentType('mending'),
                                level: 1
                            }
                        ]]
                ],
                callback(player) {
                    player.addItems(this.items);
                },
            },
            {
                chance: 35,
                items_giving: 1,
                itemName: 'Diamond Pickaxe\n§6Unbreaking 3\n§6Mending 1',
                textures: 'minecraft:diamond_pickaxe',
                items: [
                    ["minecraft:diamond_pickaxe", 1, [{
                        type: new EnchantmentType('unbreaking'),
                        level: 3
                    }, {
                        type: new EnchantmentType('mending'),
                        level: 1
                    }]]
                ],
                callback(player) {
                    player.addItems(this.items);
                },
            },
            {
                chance: 35,
                items_giving: 1,
                itemName: 'Diamond Axe\n§6Unbreaking 3\n§6Mending 1',
                textures: 'minecraft:diamond_axe',
                items: [
                    ["minecraft:diamond_axe", 1, [{
                        type: new EnchantmentType('unbreaking'),
                        level: 3
                    }, {
                        type: new EnchantmentType('mending'),
                        level: 1
                    }]]
                ],
                callback(player) {
                    player.addItems(this.items);
                },
            },
            {
                chance: 35,
                items_giving: 1,
                itemName: 'Diamond Shovel\n§6Unbreaking 3\n§6Mending 1',
                textures: 'minecraft:diamond_shovel',
                items: [
                    ["minecraft:diamond_shovel", 1, [
                        {
                            type: new EnchantmentType('unbreaking'),
                            level: 3
                        },
                        {
                            type: new EnchantmentType('mending'),
                            level: 1
                        }
                    ]]
                ],
                callback(player) {
                    player.addItems(this.items);
                },
            },
            {
                chance: 25,
                items_giving: 1,
                itemName: 'Diamond Block',
                textures: 'minecraft:diamond_block',
                items: [
                    ["minecraft:diamond_block", 2]
                ],
                callback(player) {
                    player.addItems(this.items);
                },
            },
            {
                chance: 20,
                items_giving: 1,
                itemName: 'Golden Apple',
                textures: 'minecraft:golden_apple',
                items: [
                    ["minecraft:golden_apple", 5]
                ],
                callback(player) {
                    player.addItems(this.items);
                },
            },
            {
                chance: 45,
                items_giving: 1,
                itemName: 'Swiftness Potion',
                textures: 'textures/items/potion_bottle_moveSpeed',
                items: [],
                callback(player) {
                    player.runCommandAsync('give @s potion 1 16')
                },
            },
            {
                chance: 25,
                items_giving: 1,
                itemName: '5x Instant Damage Arrow',
                textures: 'minecraft:arrow',
                items: [],
                callback(player) {
                    player.runCommandAsync('give @s arrow 5 24')
                },
            },
            {
                chance: 10,
                items_giving: 1,
                itemName: 'Netherite Ingot',
                textures: 'minecraft:netherite_ingot',
                items: [
                    ["minecraft:netherite_ingot", 1]
                ],
                callback(player) {
                    player.addItems(this.items);
                },
            },
        ]
    },
    "Legendary": {
        blockId: 'minecraft:chest',
        price: 75000,
        location: { x: -81, y: 104, z: 11 },
        items: [
            {
                chance: 35,
                items_giving: 1,
                itemName: 'Netherite Upgrade Template',
                textures: 'minecraft:netherite_upgrade_smithing_template',
                items: [
                    ["minecraft:netherite_upgrade_smithing_template", 1]
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 5,
                items_giving: 1,
                itemName: 'Enchanted Golden Apple',
                textures: 'minecraft:enchanted_golden_apple',
                items: [
                    ["minecraft:enchanted_golden_apple", 1]
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 35,
                items_giving: 1,
                itemName: 'Maxed Enchanted Diamond Pickaxe',
                textures: 'minecraft:diamond_pickaxe',
                items: [
                    ["minecraft:diamond_pickaxe", 1, [
                        {
                            type: new EnchantmentType('unbreaking'),
                            level: 3
                        },
                        {
                            type: new EnchantmentType('mending'),
                            level: 1
                        },
                        {
                            type: new EnchantmentType('efficiency'),
                            level: 5
                        },
                        {
                            type: new EnchantmentType('fortune'),
                            level: 3
                        }
                    ]
                    ]],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 35,
                items_giving: 1,
                itemName: 'Maxed Enchant Diamond Axe',
                textures: 'minecraft:diamond_axe',
                items: [
                    ["minecraft:diamond_axe", 1, [{
                        type: new EnchantmentType('unbreaking'),
                        level: 3
                    }, {
                        type: new EnchantmentType('mending'),
                        level: 1
                    }, {
                        type: new EnchantmentType('efficiency'),
                        level: 5
                    }, {
                        type: new EnchantmentType('fortune'),
                        level: 3
                    }]]
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 35,
                items_giving: 1,
                itemName: 'Maxed Enchanted Diamond Shovel',
                textures: 'minecraft:diamond_shovel',
                items: [
                    ["minecraft:diamond_shovel", 1, [{
                        type: new EnchantmentType('unbreaking'),
                        level: 3
                    }, {
                        type: new EnchantmentType('mending'),
                        level: 1
                    }, {
                        type: new EnchantmentType('efficiency'),
                        level: 5
                    }, {
                        type: new EnchantmentType('fortune'),
                        level: 3
                    }]]
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 25,
                items_giving: 1,
                itemName: 'Netherite Ingot',
                textures: 'minecraft:netherite_ingot',
                items: [
                    ["minecraft:netherite_ingot", 1]
                ],
                callback(player) {
                    player.addItems(this.items);
                },
            },
            {
                chance: 25,
                items_giving: 1,
                itemName: '6 Diamond',
                textures: 'minecraft:diamond',
                items: [
                    ["minecraft:diamond", 6]
                ],
                callback(player) {
                    player.addItems(this.items);
                },
            },
            {
                chance: 75,
                items_giving: 1,
                itemName: '64 Iron Blocks',
                textures: 'minecraft:iron_block',
                items: [
                    ["minecraft:iron_block", 64]
                ],
                callback(player) {
                    player.addItems(this.items);
                },
            }
        ]
    },
    "Mastery": {
        blockId: 'minecraft:chest',
        price: 150000,
        location: { x: -75, y: 104, z: 10 },
        items: [
            {
                chance: 25,
                items_giving: 1,
                itemName: 'Netherite Upgrade Template',
                textures: 'textures/items/netherite_upgrade_smithing_template',
                items: [
                    ["minecraft:netherite_upgrade_smithing_template", 1]
                ],
                callback(player) {
                    player.addItems(this.items)
                },
            },
            {
                chance: 25,
                items_giving: 1,
                itemName: '5 Enchanted Golden Apple',
                textures: 'minecraft:enchanted_golden_apple',
                items: [
                    ["minecraft:enchanted_golden_apple", 5]
                ],
                callback(player) {
                    player.addItems(this.items);
                },
            },
            {
                chance: 25,
                items_giving: 1,
                itemName: 'Maxed Enchanted Diamond Sword',
                textures: 'minecraft:diamond_sword',
                items: [
                    ["minecraft:diamond_sword", 1, [{
                        type: new EnchantmentType('unbreaking'),
                        level: 3
                    }, {
                        type: new EnchantmentType('mending'),
                        level: 1
                    }, {
                        type: new EnchantmentType('sharpness'),
                        level: 5
                    }, {
                        type: new EnchantmentType('looting'),
                        level: 3
                    }]]
                ],
                callback(player) {
                    player.addItems(this.items);
                },
            },
        ]
    },

}



