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


import { ItemStack, Player } from "@minecraft/server";
import ChestFormData from "../../../Extensions/Chestform/forms2.js";

/**
 * @param {Player} player
 */
export function VIPEnchants(player) {
    const item = player.getComponent('inventory').container.getItem(player.selectedSlotIndex)
    const vipEnchants = Database.get('vipEnchants', item) ?? {};
    new ChestFormData()
        .title('§6VIP Enchantments')
        .pattern([0, 0], [
            'xxxxxxxxx',
            'xaxlxrxdx',
            'xxxxcxxx',
            'xxxxxxxxx',
            'xxxxxxxxx',
            'xxxxxxxxx',
        ], {
            x: {
                itemName: '',
                itemDesc: [],
                stackSize: 1,
                enchanted: false,
                iconPath: ''
            },
            a: {
                itemName: '§6Mines Pickup',
                itemDesc: ['§7Enchant your tool to auto pickup items while mining'],
                stackSize: 1,
                enchanted: false,
                iconPath: 'textures/items/diamond_pickaxe',
                callback: () => {
                    if (vipEnchants && vipEnchants['Mine Pickup']) return player.sendMessage('§cThis enchantment is already applied to this item')
                    if (!item || !item.typeId.split(':')[1].includes('pickaxe')) return player.sendMessage('§cYou must be holding a pickaxe to use this enchantment')
                    EnchantItem(player, item, { name: 'Mine Pickup', icon: 'textures/items/diamond_pickaxe' })
                }
            },
            l: {
                itemName: '§6Log Catcher',
                itemDesc: ['§7Enchant your axe to chop down trees instantly'],
                stackSize: 1,
                enchanted: false,
                iconPath: 'textures/items/diamond_axe',
                callback: () => {
                    if (vipEnchants && vipEnchants['Log Catcher']) return player.sendMessage('§cThis enchantment is already applied to this item')
                    if (!item || !item.typeId.split(':')[1].includes('axe')) return player.sendMessage('§cYou must be holding an axe to use this enchantment')
                    EnchantItem(player, item, { name: 'Log Catcher', icon: 'textures/items/diamond_axe' })
                }
            },
            r: {
                itemName: '§6Area Damage',
                itemDesc: ['§7Enchant your sword to deal area damage to mobs'],
                stackSize: 1,
                enchanted: false,
                iconPath: 'textures/items/iron_sword',
                callback: () => {
                    if (vipEnchants && vipEnchants['Area Damage']) return player.sendMessage('§cThis enchantment is already applied to this item')
                    if (!item || !item.typeId.split(':')[1].includes('sword')) return player.sendMessage('§cYou must be holding a sword to use this enchantment')
                    EnchantItem(player, item, { name: 'Area Damage', icon: 'textures/items/iron_sword' })
                }
            },
            d: {
                itemName: '§6Drop Pickup',
                itemDesc: ['§7Enchant your sword to pickup items from the ground'],
                stackSize: 1,
                enchanted: false,
                iconPath: 'textures/items/diamond_sword',
                callback: () => {
                    if (vipEnchants && vipEnchants['Drop Pickup']) return player.sendMessage('§cThis enchantment is already applied to this item')
                    if (!item || !item.typeId.split(':')[1].includes('sword')) return player.sendMessage('§cYou must be holding a sword to use this enchantment')
                    EnchantItem(player, item, { name: 'Drop Pickup', icon: 'textures/items/diamond_sword' })
                }
            },
            c: {
                itemName: '§cClose',
                itemDesc: [],
                stackSize: 1,
                enchanted: false,
                iconPath: 'minecraft:barrier'
            }
        })
        .show(player, true)
}

/**
 * @param {Player} player
 * @param {ItemStack} item
 */
function EnchantItem(player, item, enchant) {
    new ChestFormData()
        .title('§6Enchant Item')
        .pattern([0, 0], [
            'xxxxxxxxx',
            'xxxxxxxxx',
            'xcxxixxbx',
            'xxxxxxxxx',
            'xxxxxxxxx',
            'xxxxxxxxx',
        ], {
            c: {
                itemName: '§6Confirm',
                itemDesc: [
                    `§cAre You Sure You Want To Enchant §6${item?.nameTag ? item.nameTag : `§b${formatString(item.typeId.split(':')[1])}`}§c With §6${enchant.name}`,
                    `§6If You Are Sure Click This Button To Enchant The Item`
                ],
                stackSize: 1,
                enchanted: false,
                iconPath: 'textures/items/book_enchanted',
                callback: () => {
                    const vipEnchants = Database.get('vipEnchants', item) ?? {};
                    if (vipEnchants[enchant.name]) return player.sendMessage('§cThis enchantment is already applied to this item')
                    Database.set('vipEnchants', { ...vipEnchants, [enchant.name]: true }, item)
                    item.setLore([
                        `VIP Enchants:`,
                        ...Object.keys(vipEnchants).map((value) => `§7${value}`),
                        `§7${enchant.name}`
                    ])
                    player.getComponent('inventory').container.setItem(player.selectedSlotIndex, item)
                    return player.sendMessage(`§aSuccessfully Enchanted §6${item?.nameTag ? item.nameTag : `§b${formatString(item.typeId.split(':')[1])}`}§a With §6${enchant.name}`)                    
                }
            },
            i: {
                itemName: item?.nameTag ? item.nameTag : `§b${formatString(item.typeId.split(':')[1])}`,
                itemDesc: GetItemEncAndLore(item, enchant.name),
                stackSize: 1,
                enchanted: false,
                iconPath: item.typeId,
                callback: () => EnchantItem(player, item, enchant)
            },
            b: {
                itemName: '§cBack',
                itemDesc: [`§6Click To Go Back To The VIP Enchants Menu`],
                stackSize: 1,
                enchanted: false,
                iconPath: 'textures/ui/cancel',
                callback: () => VIPEnchants(player)
            }
        })
        .show(player, true)
}

/**
 * @param {ItemStack} item
 */
function GetItemEncAndLore(item, CustomLore) {
    if (!(item instanceof ItemStack)) throw new Error('Item Must Be An Instance Of ItemStack');
    const Enchantments = item.getComponent('enchantable').getEnchantments()
    let customLore = `§7${CustomLore}`;
    const vipEnchants = item.getDynamicProperty('vipEnchants');
    if (vipEnchants) customLore += vipEnchants.map((value) => `§7${value}`).join('\n');
    return [
        `${Enchantments.length > 0 ? `§7${Enchantments.map((data) => `${formatString(data.type.id)} ${toRoman(data.level)}`).join('\n')}` : ''}`,
        `§cCustom VIP Enchants:`,
        `§b${customLore}`
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