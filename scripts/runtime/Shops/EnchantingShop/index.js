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

import { ItemStack, Player, EnchantmentType } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";
import { VIPEnchants } from "./VIPEnc.js";
import ChestFormData from "../../../Extensions/Chestform/forms2.js";

const config = {
    Weapons: {
        textures: "textures/items/diamond_sword",
        items: [
            {
                itemName: "§aSword",
                item: "sword",
                textures: "textures/items/diamond_sword",
                Enchantments: [
                    {
                        EnchantmentName: "Sharpness",
                        enchantment: "sharpness",
                        price: 5000,
                        maxlevel: 5,
                    },
                    {
                        EnchantmentName: "Knockback",
                        enchantment: "knockback",
                        price: 1500,
                        maxlevel: 2,
                    },
                    {
                        EnchantmentName: "Fire Aspect",
                        enchantment: "fire_aspect",
                        price: 3000,
                        maxlevel: 2,
                    },
                    {
                        EnchantmentName: "Looting",
                        enchantment: "looting",
                        price: 2000,
                        maxlevel: 3,
                    },
                    {
                        EnchantmentName: "Unbreaking",
                        enchantment: "unbreaking",
                        price: 2000,
                        maxlevel: 3,
                    },
                    {
                        EnchantmentName: "Mending",
                        enchantment: "mending",
                        price: 10000,
                        maxlevel: 1,
                    }
                ]
            },
            {
                itemName: "§aPickaxe",
                item: "pickaxe",
                textures: "textures/items/diamond_pickaxe",
                Enchantments: [
                    {
                        EnchantmentName: "Efficiency",
                        enchantment: "efficiency",
                        price: 1500,
                        maxlevel: 5,
                    },
                    {
                        EnchantmentName: "Silk Touch",
                        enchantment: "silk_touch",
                        price: 2000,
                        maxlevel: 1,
                    },
                    {
                        EnchantmentName: "Fortune",
                        enchantment: "fortune",
                        price: 2000,
                        maxlevel: 3,
                    },
                    {
                        EnchantmentName: "Unbreaking",
                        enchantment: "unbreaking",
                        price: 2000,
                        maxlevel: 3,
                    },
                    {
                        EnchantmentName: "Mending",
                        enchantment: "mending",
                        price: 10000,
                        maxlevel: 1,
                    }
                ]
            },
            {
                itemName: "§aAxe",
                item: "axe",
                textures: "textures/items/diamond_axe",
                Enchantments: [
                    {
                        EnchantmentName: "Efficiency",
                        enchantment: "efficiency",
                        price: 1500,
                        maxlevel: 5,
                    },
                    {
                        EnchantmentName: "Fortune",
                        enchantment: "fortune",
                        price: 2000,
                        maxlevel: 3,
                    },
                    {
                        EnchantmentName: "Sharpness",
                        enchantment: "sharpness",
                        price: 5000,
                        maxlevel: 5,
                    },
                    {
                        EnchantmentName: "Unbreaking",
                        enchantment: "unbreaking",
                        price: 2000,
                        maxlevel: 3,
                    },
                    {
                        EnchantmentName: "Mending",
                        enchantment: "mending",
                        price: 10000,
                        maxlevel: 1,
                    },
                    {
                        EnchantmentName: "Silk Touch",
                        enchantment: "silk_touch",
                        price: 2000,
                        maxlevel: 1,
                    }
                ]
            },
            {
                itemName: "§aShovel",
                item: "shovel",
                textures: "textures/items/diamond_shovel",
                Enchantments: [
                    {
                        EnchantmentName: "Efficiency",
                        enchantment: "efficiency",
                        price: 1500,
                        maxlevel: 5,
                    },
                    {
                        EnchantmentName: "Silk Touch",
                        enchantment: "silk_touch",
                        price: 2000,
                        maxlevel: 1,
                    },
                    {
                        EnchantmentName: "Fortune",
                        enchantment: "fortune",
                        price: 2000,
                        maxlevel: 3,
                    },
                    {
                        EnchantmentName: "Unbreaking",
                        enchantment: "unbreaking",
                        price: 2000,
                        maxlevel: 3,
                    },
                    {
                        EnchantmentName: "Mending",
                        enchantment: "mending",
                        price: 10000,
                        maxlevel: 1,
                    }
                ]
            },
            {
                itemName: "§aHoe",
                item: "hoe",
                textures: "textures/items/diamond_hoe",
                Enchantments: [
                    {
                        EnchantmentName: "Efficiency",
                        enchantment: "efficiency",
                        price: 1500,
                        maxlevel: 5,
                    },
                    {
                        EnchantmentName: "Unbreaking",
                        enchantment: "unbreaking",
                        price: 2000,
                        maxlevel: 3,
                    },
                    {
                        EnchantmentName: "Mending",
                        enchantment: "mending",
                        price: 10000,
                        maxlevel: 1,
                    },
                    {
                        EnchantmentName: "Fortune",
                        enchantment: "fortune",
                        price: 2000,
                        maxlevel: 3,
                    }
                ]
            },
            {
                itemName: "§aBow",
                item: "bow",
                textures: "textures/items/bow_standby",
                Enchantments: [
                    {
                        EnchantmentName: "Power",
                        enchantment: "power",
                        price: 5000,
                        maxlevel: 5,
                    },
                    {
                        EnchantmentName: "Punch",
                        enchantment: "punch",
                        price: 2000,
                        maxlevel: 2,
                    },
                    {
                        EnchantmentName: "Flame",
                        enchantment: "flame",
                        price: 2500,
                        maxlevel: 1,
                    },
                    {
                        EnchantmentName: "Infinity",
                        enchantment: "infinity",
                        price: 5000,
                        maxlevel: 1,
                    },
                    {
                        EnchantmentName: "Unbreaking",
                        enchantment: "unbreaking",
                        price: 2000,
                        maxlevel: 3,
                    },
                    {
                        EnchantmentName: "Mending",
                        enchantment: "mending",
                        price: 10000,
                        maxlevel: 1,
                    }
                ]
            },
            {
                itemName: "§aCrossbow",
                item: "crossbow",
                textures: "textures/items/crossbow_standby",
                Enchantments: [
                    {
                        EnchantmentName: "Piercing",
                        enchantment: "piercing",
                        price: 2000,
                        maxlevel: 4,
                    },
                    {
                        EnchantmentName: "Multishot",
                        enchantment: "multishot",
                        price: 3000,
                        maxlevel: 1,
                    },
                    {
                        EnchantmentName: "Quick Charge",
                        enchantment: "quick_charge",
                        price: 3000,
                        maxlevel: 3,
                    },
                    {
                        EnchantmentName: "Unbreaking",
                        enchantment: "unbreaking",
                        price: 2000,
                        maxlevel: 3,
                    },
                    {
                        EnchantmentName: "Mending",
                        enchantment: "mending",
                        price: 10000,
                        maxlevel: 1,
                    }
                ]
            },
            {
                itemName: "§aTrident",
                item: "trident",
                textures: "textures/items/trident",
                Enchantments: [
                    {
                        EnchantmentName: "Impaling",
                        enchantment: "impaling",
                        price: 5000,
                        maxlevel: 5,
                    },
                    {
                        EnchantmentName: "Channeling",
                        enchantment: "channeling",
                        price: 2000,
                        maxlevel: 1,
                    },
                    {
                        EnchantmentName: "Loyalty",
                        enchantment: "loyalty",
                        price: 3000,
                        maxlevel: 3,
                    },
                    {
                        EnchantmentName: "Riptide",
                        enchantment: "riptide",
                        price: 10000,
                        maxlevel: 3,
                    },
                    {
                        EnchantmentName: "Unbreaking",
                        enchantment: "unbreaking",
                        price: 2000,
                        maxlevel: 3,
                    },
                    {
                        EnchantmentName: "Mending",
                        enchantment: "mending",
                        price: 10000,
                        maxlevel: 1
                    }
                ]
            }
        ]
    },
    Armor: {
        textures: "textures/items/diamond_chestplate",
        items: [
            {
                itemName: "§aHelmet",
                item: "helmet",
                textures: "textures/items/diamond_helmet",
                Enchantments: [
                    {
                        EnchantmentName: "Protection",
                        enchantment: "protection",
                        price: 2000,
                        maxlevel: 4,
                    },
                    {
                        EnchantmentName: "Fire Protection",
                        enchantment: "fire_protection",
                        price: 2000,
                        maxlevel: 4,
                    },
                    {
                        EnchantmentName: "Blast Protection",
                        enchantment: "blast_protection",
                        price: 2000,
                        maxlevel: 4,
                    },
                    {
                        EnchantmentName: "Projectile Protection",
                        enchantment: "projectile_protection",
                        price: 2000,
                        maxlevel: 4,
                    },
                    {
                        EnchantmentName: "Unbreaking",
                        enchantment: "unbreaking",
                        price: 2000,
                        maxlevel: 3,
                    },
                    {
                        EnchantmentName: "Mending",
                        enchantment: "mending",
                        price: 10000,
                        maxlevel: 1,
                    }
                ]
            },
            {
                itemName: "§aChestplate",
                item: "chestplate",
                textures: "textures/items/diamond_chestplate",
                Enchantments: [
                    {
                        EnchantmentName: "Protection",
                        enchantment: "protection",
                        price: 2000,
                        maxlevel: 4,
                    },
                    {
                        EnchantmentName: "Fire Protection",
                        enchantment: "fire_protection",
                        price: 2000,
                        maxlevel: 4,
                    },
                    {
                        EnchantmentName: "Blast Protection",
                        enchantment: "blast_protection",
                        price: 2000,
                        maxlevel: 4,
                    },
                    {
                        EnchantmentName: "Projectile Protection",
                        enchantment: "projectile_protection",
                        price: 2000,
                        maxlevel: 4,
                    },
                    {
                        EnchantmentName: "Unbreaking",
                        enchantment: "unbreaking",
                        price: 2000,
                        maxlevel: 3,
                    },
                    {
                        EnchantmentName: "Mending",
                        enchantment: "mending",
                        price: 10000,
                        maxlevel: 1,
                    }
                ]
            },
            {
                itemName: "§aLeggings",
                item: "leggings",
                textures: "textures/items/diamond_leggings",
                Enchantments: [
                    {
                        EnchantmentName: "Protection",
                        enchantment: "protection",
                        price: 2000,
                        maxlevel: 4,
                    },
                    {
                        EnchantmentName: "Fire Protection",
                        enchantment: "fire_protection",
                        price: 2000,
                        maxlevel: 4,
                    },
                    {
                        EnchantmentName: "Blast Protection",
                        enchantment: "blast_protection",
                        price: 2000,
                        maxlevel: 4,
                    },
                    {
                        EnchantmentName: "Projectile Protection",
                        enchantment: "projectile_protection",
                        price: 2000,
                        maxlevel: 4,
                    },
                    {
                        EnchantmentName: "Unbreaking",
                        enchantment: "unbreaking",
                        price: 2000,
                        maxlevel: 3,
                    },
                    {
                        EnchantmentName: "Mending",
                        enchantment: "mending",
                        price: 10000,
                        maxlevel: 1,
                    }
                ]
            },
            {
                itemName: "§aBoots",
                item: "boots",
                textures: "textures/items/diamond_boots",
                Enchantments: [
                    {
                        EnchantmentName: "Protection",
                        enchantment: "protection",
                        price: 2000,
                        maxlevel: 4,
                    },
                    {
                        EnchantmentName: "Fire Protection",
                        enchantment: "fire_protection",
                        price: 2000,
                        maxlevel: 4,
                    },
                    {
                        EnchantmentName: "Blast Protection",
                        enchantment: "blast_protection",
                        price: 2000,
                        maxlevel: 4,
                    },
                    {
                        EnchantmentName: "Projectile Protection",
                        enchantment: "projectile_protection",
                        price: 2000,
                        maxlevel: 4,
                    },
                    {
                        EnchantmentName: "Unbreaking",
                        enchantment: "unbreaking",
                        price: 2000,
                        maxlevel: 3,
                    },
                    {
                        EnchantmentName: "Mending",
                        enchantment: "mending",
                        price: 10000,
                        maxlevel: 1
                    }
                ]
            },
            {
                itemName: "§aElytra",
                item: "elytra",
                textures: "textures/items/elytra",
                Enchantments: [
                    {
                        EnchantmentName: "Unbreaking",
                        enchantment: "unbreaking",
                        price: 10000,
                        maxlevel: 3,
                    },
                    {
                        EnchantmentName: "Mending",
                        enchantment: "mending",
                        price: 25000,
                        maxlevel: 1
                    }
                ]
            },
            {
                itemName: "§aShield",
                item: "shield",
                textures: "textures/items/diamond_sword",
                Enchantments: [
                    {
                        EnchantmentName: "Unbreaking",
                        enchantment: "unbreaking",
                        price: 500,
                        maxlevel: 3,
                    },
                    {
                        EnchantmentName: "Mending",
                        enchantment: "mending",
                        price: 2000,
                        maxlevel: 1
                    }
                ]
            }
        ]
    }
};

/**
 * @param {Player} player
 */
export default function ItemsEnc(player) {
    new ChestFormData('double')
        .title(`§𝕠§6Enchant Menu`)
        .pattern([0, 0], [
            '_________',
            '_________',
            '__w_a_v__',
            '_________',
            '____c____',
            '_________'
        ], {
            x: { itemName: '', itemDesc: [], enchanted: false, stackAmount: 1, iconPath: 'textures/ui/cointier_backdrop', callback: () => { } },

            c: {
                itemName: '§cClose', itemDesc: [], enchanted: false, stackAmount: 1, iconPath: 'textures/blocks/barrier', callback: () => {
                    player.sendMessage('§cEnctaning Shop Closed');
                }
            },
            w: {
                itemName: '§6Weapons And Tools', itemDesc: [], enchanted: false, stackAmount: 1, iconPath: 'textures/items/diamond_sword', callback: () => {
                    Weapons(player)
                }
            },
            a: {
                itemName: '§6Armor', itemDesc: [], enchanted: false, stackAmount: 1, iconPath: 'textures/items/diamond_chestplate', callback: () => {
                    Armor(player);
                }
            },
            v: {
                itemName: '§6VIP Enchantments', itemDesc: [], enchanted: false, stackAmount: 1, iconPath: 'textures/items/diamond', callback: () => {
                  if (!player.hasTag(ACconfig.Tags.VIP)) return player.sendMessage('§cYou Must Be A VIP To Access This Menu');
                    VIPEnchants(player);
                }
            }
        })
        .show(player, true, (_, canceled) => {
            if (canceled) return player.sendMessage('§cEnchanting Shop Closed');
        })
}

function Armor(player) {
    const Armor = config.Armor.items;
    const rowSize = 9;
    const innerRowSize = 7;
    const topBottomRows = 1;
    const form = new ChestFormData('large')
        .title(`§6Enchantments`)
    Armor.map((item, i) => {
        const innerRow = Math.floor(i / innerRowSize);
        const innerColumn = i % innerRowSize;
        const slotIndex = (innerRow + topBottomRows) * rowSize + (innerColumn + 1);
        form.button(slotIndex, item.itemName, [], item.textures, 1, false, () => {
            const inv = player.getComponent('inventory').container;
            const SelItem = inv.getItem(player.selectedSlotIndex);
            if (!SelItem || !SelItem.typeId.split(':')[1].includes(item.item)) return player.sendMessage(`§cYou Must Have §6${item.item}§c In Your Hand To Enchant It`);
            Enchantments(player, item, inv.getItem(player.selectedSlotIndex));
        })
    })
    form.button(31, '§cBack', [''], 'textures/blocks/barrier', 1, false, (() => {
        ItemsEnc(player);
    }))
    form.show(player, true, (_, canceled) => {
        if (canceled) return player.sendMessage('§cEnchanting Shop Closed');
    })
}

/**
 * 
 * @param {Player} player 
 */
function Weapons(player) {
    const Weapons = config.Weapons.items;
    const rowSize = 9;
    const innerRowSize = 7;
    const topBottomRows = 1;
    const form = new ChestFormData('large')
        .title(`§6Enchantments`)
    Weapons.map((item, i) => {
        const innerRow = Math.floor(i / innerRowSize);
        const innerColumn = i % innerRowSize;
        const slotIndex = (innerRow + topBottomRows) * rowSize + (innerColumn + 1);
        form.button(slotIndex, item.itemName, [], item.textures, 1, false, () => {
            const inv = player.getComponent('inventory').container;
            const SelItem = inv.getItem(player.selectedSlotIndex);
            if (!SelItem || !SelItem.typeId.split(':')[1].includes(item.item)) return player.sendMessage(`§cYou Must Have §6${item.item}§c In Your Hand To Enchant It`);
            Enchantments(player, item, inv.getItem(player.selectedSlotIndex));
        })
    })
    form.button(31, '§cBack', [''], 'textures/blocks/barrier', 1, false, (() => {
        ItemsEnc(player);
    }))
    form.show(player, true, (_, canceled) => {
        if (canceled) return player.sendMessage('§cEnchanting Shop Closed');
    })
}

/**
 * 
 * @param {Player} player 
 * @param {} item 
 */
function Enchantments(player, item, InvItem) {
    const form = new ChestFormData('double')
        .title(`§6${item.itemName} - Enchantments`)
        .button(0, '§cBack', [''], 'textures/blocks/barrier', 1, false, () => {
            Weapons(player);
        })
    const Enchantments = item.Enchantments
    const rowSize = 9;
    const innerRowSize = 7;
    const topBottomRows = 1;
    Enchantments.map((enchantment, i) => {
        const innerRow = Math.floor(i / innerRowSize);
        const innerColumn = i % innerRowSize;
        const slotIndex = (innerRow + topBottomRows) * rowSize + (innerColumn + 1);
        form.button(slotIndex, enchantment.EnchantmentName, [
            `§6Price: §a${enchantment.price}`,
            `§6Max Level: §a${enchantment.maxlevel}`
        ], 'textures/items/book_enchanted', 1, false, () => {
            Enchant(player, item, enchantment, InvItem);
        })
    });
    form.show(player, true, (_, canceled) => {
        if (canceled) return player.sendMessage('§cEnchanting Shop Closed');
    })
}
/**
 * 
 * @param {Player} player 
 * @param {} item 
 * @param {} enchantment 
 * @param {ItemStack} InvItem 
 */
function Enchant(player, item, enchantment, InvItem) {
    const { enchantment: enchantmentType, maxlevel, EnchantmentName, price } = enchantment;
    const enchantable = InvItem.getComponent('enchantable');
    const EnchantmentLevel = enchantable.getEnchantment(enchantmentType);

    if (EnchantmentLevel && EnchantmentLevel.level >= maxlevel) {
        return player.sendMessage(`§c${item.itemName}§c Already Has The Max Level For §6${EnchantmentName}`);
    }

    new ModalFormData()
        .title(`§6${item.itemName} - Enchantments`)
        .slider(`§6Select Enchantment Level: `, (EnchantmentLevel && EnchantmentLevel.level + 1) || 1, maxlevel, 1)
        .show(player)
        .then((data) => {
            if (data.canceled) return;
            const level = data.formValues[0];

            new ChestFormData('double')
                .title(`§6Enchanting - ${item.itemName}`)

                .button(19, '§aEnchant', [
                    `§cAre You Sure You Want To Enchant §6${item.itemName}§c With §6${EnchantmentName}§c Level §6${toRoman(level)}§c For §6${price * level}§c?`,
                    `§6If You Are Sure Click This Button To Enchant The Item`,
                ], 'textures/items/book_enchanted', 1, false, () => {
                    const inv = player.getComponent('inventory').container;
                    const selItem = inv.getItem(player.selectedSlotIndex);   
                    if (!selItem || !selItem.typeId.split(':')[1].includes(item.item)) return player.sendMessage(`§cYou Must Have §6${item.item}§c In Your Hand To Enchant It`);
                    if (player.score.Money < price * level) return player.sendMessage(`§cYou Don't Have Enough Money To Enchant §6${item.itemName}§c With §6${EnchantmentName}§c Level §6${toRoman(level)}`);
                    player.score.Money = player.score.Money - (price * level);
                    selItem.getComponent('enchantable').addEnchantment({ type: new EnchantmentType(enchantmentType), level: level });
                    inv.setItem(player.selectedSlotIndex, selItem);
                    player.sendMessage(`§aYou Have Enchanted §6${item.itemName}§a With §6${EnchantmentName}§a Level §6${toRoman(level)}`);
                })

                .button(22,
                    InvItem.nameTag ? InvItem.nameTag : `§b${formatString(InvItem.typeId.split(':')[1])}`,
                    GetItemEncAndLore(InvItem, { level, type: enchantmentType }),
                    item.textures,
                    1,
                    true,
                    () => { })

                .button(25, '§cBack', [''], 'textures/blocks/barrier', 1, false, () => { })

                .show(player, true)
        });
}


/**
 * @param {ItemStack} item
 * @param {{level: number, type: string}} AddingEnc
 */
function GetItemEncAndLore(item, AddingEnc) {
    if (!(item instanceof ItemStack)) throw new Error('Item Must Be An Instance Of ItemStack');
    const Enchantments = item.getComponent('enchantable').getEnchantments().filter(({ type }) => type.id !== AddingEnc.type);
    const EnchantmentsLore = item.getLore();
    return [
        `§7${formatString(AddingEnc.type)} ${toRoman(AddingEnc.level)}\n${Enchantments.length > 0 ? `§7${Enchantments.map((data) => `${formatString(data.type.id)} ${toRoman(data.level)}`).join('\n')}` : ''}`,
        ...EnchantmentsLore
    ]
}

export const formatString = (str) => str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

function toRoman(num) {
    const roman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    const decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    let result = '';
    for (let i = 0; i < decimal.length; i++) {
        while (num % decimal[i] < num) {
            result += roman[i];
            num -= decimal[i];
        }
    }
    return result;
}