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


import { world, Player} from "@minecraft/server";
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

export function foodmenu(player) {
    new ChestFormData(`double`)
        .title(`§𝕠§3§oFood Menu`)
        .button(11, '§𝕠§3Bread', ['§𝕠§oPrice: §a$5'], 'minecraft:bread', 0)
        .button(12, '§𝕠§3Steak', ['§𝕠§oPrice: §a$10\n\n§aNot For Vegans'], 'minecraft:cooked_beef', 0)
        .button(13, '§𝕠§3Porkchop', ['§𝕠§oPrice: §a$20\n\n§aNot For Vegans'], 'minecraft:cooked_porkchop', 0)
        .button(14, '§𝕠§3Chicken', ['§𝕠§oPrice: §a$20\n\n§aNot For Vegans'], 'minecraft:cooked_chicken', 0)
        .button(15, '§𝕠§3Mutton', ['§𝕠§oPrice: §a$20\n\n§aNot For Vegans'], 'textures/items/mutton_cooked', 0)
        .button(20, '§a§3Seeds', ['§𝕠§oPrice: §a$5'], 'minecraft:wheat_seeds', 0)
        .button(21, '§a§3Melon Seeds', ['§𝕠§oPrice: §a$10'], 'minecraft:melon_seeds', 0)
        .button(22, '§a§3Pumpkin Seeds', ['§𝕠§oPrice: §a$10'], 'minecraft:pumpkin_seeds', 0)
        .button(23, '§a§3Sugar Cane', ['§𝕠§oPrice: §a$30'], 'textures/items/reeds', 0)
        .button(24, '§a§3Berries', ['§𝕠§oPrice: §a$30'], 'minecraft:sweet_berries', 0)
        .button(29, '§a§3Carrots', ['§𝕠§oPrice: §a$30'], 'minecraft:carrot', 0)
        .button(30, '§a§3Potatoes', ['§𝕠§oPrice: §a$30'], 'minecraft:potato', 0)
        .button(31, '§a§3Beetroot', ['§𝕠§oPrice: §a$30'], 'minecraft:beetroot', 0)
        .button(32, '§a§3Cocoa Beans', ['§𝕠§oPrice: §a$5'], 'textures/items/dye_powder_brown', 0)
        .button(33, '§a§3Cactus', ['§𝕠§oPrice: §a$30'], 'minecraft:cactus', 0)
        .button(38, '§a§3Bamboo', ['§𝕠§oPrice: §a$30'], 'minecraft:bamboo', 0)
        .button(39, '§a§3Golden Apples', ['§𝕠§oPrice: §a$5000'], 'minecraft:golden_apple', 0)
        .button(40, '§a§3Golden Carrots', ['§𝕠§oPrice: §a$150'], 'minecraft:golden_carrot', 0)
        .button(41, '§a§3Nether Wart', ['§𝕠§oPrice: §a$5'], 'minecraft:nether_wart', 0)
        .button(49, '§c§lClose', [], 'minecraft:barrier', 0)
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
                case 49:
                    player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`)
                    break;
                case 11:
                    const title = "Bread"
                    const price = 20
                    const item = "minecraft:bread"
                    const data = 0
                    const money = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§3§o${title}`)
                        .textField(`${title} Costs §a$${price}§r Each\nCurrent Balance §a$${money}\n\n§r16 Costs §a$${price * 16}\n§r32 Costs §a$${price * 32}\n§r64 Costs §a$${price * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price * res.formValues[0];
                            if (money < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money} more to buy ${res.formValues[0]} ${title}`)
                            if (money >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                                player.runCommand(`give @s ${item} ${res.formValues[0]} ${data}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§3${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 12:
                    const title1 = "Steak"
                    const price1 = 20
                    const item1 = "minecraft:cooked_beef"
                    const data1 = 0
                    const money1 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§3§o${title1}`)
                        .textField(`${title1} Costs §a$${price1}§r Each\nCurrent Balance §a$${money1}\n\n§r16 Costs §a$${price1 * 16}\n§r32 Costs §a$${price1 * 32}\n§r64 Costs §a$${price1 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price1 * res.formValues[0];
                            if (money1 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money1} more to buy ${res.formValues[0]} ${title1}`)
                            if (money1 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title1} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                                player.runCommand(`give @s ${item1} ${res.formValues[0]} ${data1}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§3${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 13:
                    const title2 = "Porkchop"
                    const price2 = 20
                    const item2 = "minecraft:cooked_porkchop"
                    const data2 = 0
                    const money2 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§3§o${title2}`)
                        .textField(`${title2} Costs §a$${price2}§r Each\nCurrent Balance §a$${money2}\n\n§r16 Costs §a$${price2 * 16}\n§r32 Costs §a$${price2 * 32}\n§r64 Costs §a$${price2 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price2 * res.formValues[0];
                            if (money2 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money2} more to buy ${res.formValues[0]} ${title2}`)
                            if (money2 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title2} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                                player.runCommand(`give @s ${item2} ${res.formValues[0]} ${data2}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§3${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 14:
                    const title3 = "Chicken"
                    const price3 = 20
                    const item3 = "minecraft:cooked_chicken"
                    const data3 = 0
                    const money3 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§3§o${title3}`)
                        .textField(`${title3} Costs §a$${price3}§r Each\nCurrent Balance §a$${money3}\n\n§r16 Costs §a$${price3 * 16}\n§r32 Costs §a$${price3 * 32}\n§r64 Costs §a$${price3 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price3 * res.formValues[0];
                            if (money3 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money3} more to buy ${res.formValues[0]} ${title3}`)
                            if (money3 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title3} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                                player.runCommand(`give @s ${item3} ${res.formValues[0]} ${data3}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§3${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 15:
                    const title4 = "Mutton"
                    const price4 = 20
                    const item4 = "minecraft:cooked_mutton"
                    const data4 = 0
                    const money4 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§3§o${title4}`)
                        .textField(`${title4} Costs §a$${price4}§r Each\nCurrent Balance §a$${money4}\n\n§r16 Costs §a$${price4 * 16}\n§r32 Costs §a$${price4 * 32}\n§r64 Costs §a$${price4 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price4 * res.formValues[0];
                            if (money4 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money4} more to buy ${res.formValues[0]} ${title4}`)
                            if (money4 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title4} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                                player.runCommand(`give @s ${item4} ${res.formValues[0]} ${data4}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§3${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 20:
                    const title5 = "Seeds"
                    const price5 = 5
                    const item5 = "minecraft:wheat_seeds"
                    const data5 = 0
                    const money5 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§3§o${title5}`)
                        .textField(`${title5} Costs §a$${price5}§r Each\nCurrent Balance §a$${money5}\n\n§r16 Costs §a$${price5 * 16}\n§r32 Costs §a$${price5 * 32}\n§r64 Costs §a$${price5 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price5 * res.formValues[0];
                            if (money5 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money5} more to buy ${res.formValues[0]} ${title5}`)
                            if (money5 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title5} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                                player.runCommand(`give @s ${item5} ${res.formValues[0]} ${data5}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§3${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 21:
                    const title6 = "Melon Seeds"
                    const price6 = 10
                    const item6 = "minecraft:melon_seeds"
                    const data6 = 0
                    const money6 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§3§o${title6}`)
                        .textField(`${title6} Costs §a$${price6}§r Each\nCurrent Balance §a$${money6}\n\n§r16 Costs §a$${price6 * 16}\n§r32 Costs §a$${price6 * 32}\n§r64 Costs §a$${price6 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price6 * res.formValues[0];
                            if (money6 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money6} more to buy ${res.formValues[0]} ${title6}`)
                            if (money6 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title6} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                                player.runCommand(`give @s ${item6} ${res.formValues[0]} ${data6}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§3${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 22:
                    const title7 = "Pumpkin Seeds"
                    const price7 = 10
                    const item7 = "minecraft:pumpkin_seeds"
                    const data7 = 0
                    const money7 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§3§o${title7}`)
                        .textField(`${title7} Costs §a$${price7}§r Each\nCurrent Balance §a$${money7}\n\n§r16 Costs §a$${price7 * 16}\n§r32 Costs §a$${price7 * 32}\n§r64 Costs §a$${price7 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price7 * res.formValues[0];
                            if (money7 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money7} more to buy ${res.formValues[0]} ${title7}`)
                            if (money7 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title7} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                                player.runCommand(`give @s ${item7} ${res.formValues[0]} ${data7}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§3${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 23:
                    const title8 = "Sugar Cane"
                    const price8 = 30
                    const item8 = "minecraft:sugar_cane"
                    const data8 = 0
                    const money8 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§3§o${title8}`)
                        .textField(`${title8} Costs §a$${price8}§r Each\nCurrent Balance §a$${money8}\n\n§r16 Costs §a$${price8 * 16}\n§r32 Costs §a$${price8 * 32}\n§r64 Costs §a$${price8 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price8 * res.formValues[0];
                            if (money8 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money8} more to buy ${res.formValues[0]} ${title8}`)
                            if (money8 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title8} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                                player.runCommand(`give @s ${item8} ${res.formValues[0]} ${data8}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§3${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 24:
                    const title9 = "Berries"
                    const price9 = 30
                    const item9 = "minecraft:sweet_berries"
                    const data9 = 0
                    const money9 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§3§o${title9}`)
                        .textField(`${title9} Costs §a$${price9}§r Each\nCurrent Balance §a$${money9}\n\n§r16 Costs §a$${price9 * 16}\n§r32 Costs §a$${price9 * 32}\n§r64 Costs §a$${price9 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price9 * res.formValues[0];
                            if (money9 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money9} more to buy ${res.formValues[0]} ${title9}`)
                            if (money9 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title9} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                                player.runCommand(`give @s ${item9} ${res.formValues[0]} ${data9}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§3${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 29:
                    const title10 = "Carrots"
                    const price10 = 30
                    const item10 = "minecraft:carrot"
                    const data10 = 0
                    const money10 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§3§o${title10}`)
                        .textField(`${title10} Costs §a$${price10}§r Each\nCurrent Balance §a$${money10}\n\n§r16 Costs §a$${price10 * 16}\n§r32 Costs §a$${price10 * 32}\n§r64 Costs §a$${price10 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price10 * res.formValues[0];
                            if (money10 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money10} more to buy ${res.formValues[0]} ${title10}`)
                            if (money10 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title10} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`) && player.runCommand(`give @s ${item10} ${res.formValues[0]} ${data10}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§3${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 30:
                    const title11 = "Potatoes"
                    const price11 = 30
                    const item11 = "minecraft:potato"
                    const data11 = 0
                    const money11 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§3§o${title11}`)
                        .textField(`${title11} Costs §a$${price11}§r Each\nCurrent Balance §a$${money11}\n\n§r16 Costs §a$${price11 * 16}\n§r32 Costs §a$${price11 * 32}\n§r64 Costs §a$${price11 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price11 * res.formValues[0];
                            if (money11 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money11} more to buy ${res.formValues[0]} ${title11}`)
                            if (money11 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title11} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`) && player.runCommand(`give @s ${item11} ${res.formValues[0]} ${data11}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§3${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 31:
                    const title12 = "Beetroot"
                    const price12 = 30
                    const item12 = "minecraft:beetroot"
                    const data12 = 0
                    const money12 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§3§o${title12}`)
                        .textField(`${title12} Costs §a$${price12}§r Each\nCurrent Balance §a$${money12}\n\n§r16 Costs §a$${price12 * 16}\n§r32 Costs §a$${price12 * 32}\n§r64 Costs §a$${price12 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price12 * res.formValues[0];
                            if (money12 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money12} more to buy ${res.formValues[0]} ${title12}`)
                            if (money12 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title12} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`) && player.runCommand(`give @s ${item12} ${res.formValues[0]} ${data12}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§3${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 32:
                    const title13 = "Cocoa Beans"
                    const price13 = 5
                    const item13 = "minecraft:cocoa_beans"
                    const data13 = 0
                    const money13 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§3§o${title13}`)
                        .textField(`${title13} Costs §a$${price13}§r Each\nCurrent Balance §a$${money13}\n\n§r16 Costs §a$${price13 * 16}\n§r32 Costs §a$${price13 * 32}\n§r64 Costs §a$${price13 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price13 * res.formValues[0];
                            if (money13 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money13} more to buy ${res.formValues[0]} ${title13}`)
                            if (money13 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title13} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`) && player.runCommand(`give @s ${item13} ${res.formValues[0]} ${data13}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§3${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 33:
                    const title14 = "Cactus"
                    const price14 = 30
                    const item14 = "minecraft:cactus"
                    const data14 = 0
                    const money14 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§3§o${title14}`)
                        .textField(`${title14} Costs §a$${price14}§r Each\nCurrent Balance §a$${money14}\n\n§r16 Costs §a$${price14 * 16}\n§r32 Costs §a$${price14 * 32}\n§r64 Costs §a$${price14 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price14 * res.formValues[0];
                            if (money14 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money14} more to buy ${res.formValues[0]} ${title14}`)
                            if (money14 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title14} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`) && player.runCommand(`give @s ${item14} ${res.formValues[0]} ${data14}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§3${res.formValues[0]}§c Is Not A Valid Amount!`)
                        })
                    break;
                case 38:
                    const title15 = "Bamboo"
                    const price15 = 30
                    const item15 = "minecraft:bamboo"
                    const data15 = 0
                    const money15 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§3§o${title15}`)
                        .textField(`${title15} Costs §a$${price15}§r Each\nCurrent Balance §a$${money15}\n\n§r16 Costs §a$${price15 * 16}\n§r32 Costs §a$${price15 * 32}\n§r64 Costs §a$${price15 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price15 * res.formValues[0];
                            if (money15 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money15} more to buy ${res.formValues[0]} ${title15}`)
                            if (money15 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title15} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`) && player.runCommand(`give @s ${item15} ${res.formValues[0]} ${data15}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§3${res.formValues[0]}§c Is Not A Valid Amount!`)
                        })
                    break;
                case 39:
                    const title16 = "Golden Apples"
                    const price16 = 5000
                    const item16 = "minecraft:golden_apple"
                    const data16 = 0
                    const money16 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§3§o${title16}`)
                        .textField(`${title16} Costs §a$${price16}§r Each\nCurrent Balance §a$${money16}\n\n§r16 Costs §a$${price16 * 16}\n§r32 Costs §a$${price16 * 32}\n§r64 Costs §a$${price16 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price16 * res.formValues[0];
                            if (money16 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money16} more to buy ${res.formValues[0]} ${title16}`)
                            if (money16 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title16} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`) && player.runCommand(`give @s ${item16} ${res.formValues[0]} ${data16}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§c${res.formValues[0]}§c Is Not A Valid Amount!`)
                        })
                    break;
                case 40:
                    const title17 = "Golden Carrots"
                    const price17 = 150
                    const item17 = "minecraft:golden_carrot"
                    const data17 = 0
                    const money17 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§3§o${title17}`)
                        .textField(`${title17} Costs §a$${price17}§r Each\nCurrent Balance §a$${money17}\n\n§r16 Costs §a$${price17 * 16}\n§r32 Costs §a$${price17 * 32}\n§r64 Costs §a$${price17 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price17 * res.formValues[0];
                            if (money17 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money17} more to buy ${res.formValues[0]} ${title17}`)
                            if (money17 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title17} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`) && player.runCommand(`give @s ${item17} ${res.formValues[0]} ${data17}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§c${res.formValues[0]}§c Is Not A Valid Amount!`)
                        })
                    break;
                case 41:
                    const title18 = "Nether Wart"
                    const price18 = 5
                    const item18 = "minecraft:nether_wart"
                    const data18 = 0
                    const money18 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§3§o${title18}`)
                        .textField(`${title18} Costs §a$${price18}§r Each\nCurrent Balance §a$${money18}\n\n§r16 Costs §a$${price18 * 16}\n§r32 Costs §a$${price18 * 32}\n§r64 Costs §a$${price18 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price18 * res.formValues[0];
                            if (money18 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money18} more to buy ${res.formValues[0]} ${title18}`)
                            if (money18 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title18} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`) && player.runCommand(`give @s ${item18} ${res.formValues[0]} ${data18}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§c${res.formValues[0]}§c Is Not A Valid Amount!`)
                        })
                    break;
            }
        })
};