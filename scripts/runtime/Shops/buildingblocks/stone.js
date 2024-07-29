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


import { ModalFormData } from "@minecraft/server-ui";
import { ChestFormData } from "../../../Extensions/Chestform/forms.js";
import { getScore } from "./building_blocks.js";
import { menu } from "./building_blocks.js";

export { stone }
function stone(player) {
    new ChestFormData(`double`)
        .title(`§𝕠§8§oStone Menu`)
        .button(11, '§𝕠§l§8Cobblestone', [`Price: $1 Each`], "minecraft:cobblestone", 0)
        .button(12, '§𝕠§l§8Stone Bricks', [`Price: $4 Each`], "minecraft:stonebrick", 0)
        .button(13, '§𝕠§l§8Mossy Cobblestone', [`Price: $4 Each`], "minecraft:mossy_cobblestone", 0)
        .button(14, '§𝕠§l§8Andesite', [`Price: $1 Each`], "textures/blocks/stone_andesite", 0)
        .button(15, '§𝕠§l§8Polished Andesite', [`Price: $4 Each`], "textures/blocks/stone_andesite_smooth", 0)
        .button(20, '§𝕠§l§8Deepslate', [`Price: $1 Each`], "textures/blocks/deepslate/deepslate", 0)
        .button(21, '§𝕠§l§8Polished Deepslate', [`Price: $4 Each`], "textures/blocks/deepslate/polished_deepslate", 0)
        .button(22, '§𝕠§l§8Granite', [`Price: $1 Each`], "textures/blocks/stone_granite", 0)
        .button(23, '§𝕠§l§8Polished Granite', [`Price: $4 Each`], "textures/blocks/stone_granite_smooth", 0)
        .button(24, '§𝕠§l§8Blackstone', [`Price: $1 Each`], "minecraft:blackstone", 0)
        .button(29, '§𝕠§l§8Polished Blackstone', [`Price: $4 Each`], "minecraft:polished_blackstone", 0)
        .button(30, '§𝕠§l§8Polished Blackstone Bricks', [`Price: $4 Each`], "minecraft:polished_blackstone_bricks", 0)
        .button(31, '§𝕠§l§8Cracked Polished Blackstone Bricks', [`Price: $4 Each`], "minecraft:cracked_polished_blackstone_bricks", 0)
        .button(32, '§𝕠§l§8Chiseled Polished Blackstone', [`Price: $4 Each`], "minecraft:chiseled_polished_blackstone", 0)
        .button(33, '§𝕠§l§8Gilded Blackstone', [`Price: $4 Each`], "minecraft:gilded_blackstone", 0)
        .button(40, '§𝕠§l§cBack', [`§r§7Go Back To The Main Menu`], "minecraft:barrier", 0)
        .pattern([0, 0], [
            '_________',
            '_________',
            '_________',
            '_________',
            '_________',
            '_________'
        ], {
            x: { data: { itemName: [], itemDesc: [], enchanted: false, stackAmount: 1 }, iconPath: 'textures/ui/cointier_backdrop' }
        })
        .show(player).then(response => {
            if (response === null || response.canceled) return player.sendMessage(`§cStone Menu Closed`) && player.runCommand(`playsound random.chestclosed @s ~~~ 1 1 1`);
            switch (response.selection) {
                case 40: menu(player);
                    player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
                    break;
                case 11:
                    const title = "Cobblestone"
                    const price = 1
                    const item = "cobblestone"
                    const data = 0
                    const money = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`§8§o${title}`)
                        .textField(`${title} Costs §a$${price} Each\nCurrent Balance §a$${money}\n\n§r16 Costs §a$${price * 16}\n§r32 Costs §a$${price * 32}\n§r64 Costs §a$${price * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price * res.formValues[0];
                            if (money < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money} more to buy ${res.formValues[0]} ${title}`)
                            if (money >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item} ${res.formValues[0]} ${data}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 12:
                    const title1 = "Stone Bricks"
                    const price1 = 4
                    const item1 = "stonebrick"
                    const data1 = 0
                    const money1 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`§8§o${title1}`)
                        .textField(`${title1} Costs §a$${price1}§r Each\nCurrent Balance §a$${money1}\n\n§r16 Costs §a$${price1 * 16}\n§r32 Costs §a$${price1 * 32}\n§r64 Costs §a$${price1 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price1 * res.formValues[0];
                            if (money1 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money1} more to buy ${res.formValues[0]} ${title1}`)
                            if (money1 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title1} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item1} ${res.formValues[0]} ${data1}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 13:
                    const title2 = "Mossy Cobblestone"
                    const price2 = 4
                    const item2 = "mossy_cobblestone"
                    const data2 = 0
                    const money2 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`§8§o${title2}`)
                        .textField(`${title2} Costs §a$${price2}§r Each\nCurrent Balance §a$${money2}\n\n§r16 Costs §a$${price2 * 16}\n§r32 Costs §a$${price2 * 32}\n§r64 Costs §a$${price2 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price2 * res.formValues[0];
                            if (money2 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money2} more to buy ${res.formValues[0]} ${title2}`)
                            if (money2 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title2} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item2} ${res.formValues[0]} ${data2}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 14:
                    const title3 = "Andesite"
                    const price3 = 1
                    const item3 = "stone"
                    const data3 = 5
                    const money3 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`§8§o${title3}`)
                        .textField(`${title3} Costs §a$${price3} Each\nCurrent Balance §a$${money3}\n\n§r16 Costs §a$${price3 * 16}\n§r32 Costs §a$${price3 * 32}\n§r64 Costs §a$${price3 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price3 * res.formValues[0];
                            if (money3 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money3} more to buy ${res.formValues[0]} ${title3}`)
                            if (money3 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title3} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item3} ${res.formValues[0]} ${data3}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 15:
                    const title4 = "Polished Andesite"
                    const price4 = 4
                    const item4 = "stone"
                    const data4 = 6
                    const money4 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`§8§o${title4}`)
                        .textField(`${title4} Costs §a$${price4} Each\nCurrent Balance §a$${money4}\n\n§r16 Costs §a$${price4 * 16}\n§r32 Costs §a$${price4 * 32}\n§r64 Costs §a$${price4 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price4 * res.formValues[0];
                            if (money4 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money4} more to buy ${res.formValues[0]} ${title4}`)
                            if (money4 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title4} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item4} ${res.formValues[0]} ${data4}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 20:
                    const title5 = "Deepslate"
                    const price5 = 1
                    const item5 = "deepslate"
                    const data5 = 0
                    const money5 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`§8§o${title5}`)
                        .textField(`${title5} Costs §a$${price5} Each\nCurrent Balance §a$${money5}\n\n§r16 Costs §a$${price5 * 16}\n§r32 Costs §a$${price5 * 32}\n§r64 Costs §a$${price5 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price5 * res.formValues[0];
                            if (money5 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money5} more to buy ${res.formValues[0]} ${title5}`)
                            if (money5 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title5} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item5} ${res.formValues[0]} ${data5}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 21:
                    const title6 = "Polished Deepslate"
                    const price6 = 4
                    const item6 = "polished_deepslate"
                    const data6 = 0
                    const money6 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`§8§o${title6}`)
                        .textField(`${title6} Costs §a$${price6} Each\nCurrent Balance §a$${money6}\n\n§r16 Costs §a$${price6 * 16}\n§r32 Costs §a$${price6 * 32}\n§r64 Costs §a$${price6 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price6 * res.formValues[0];
                            if (money6 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money6} more to buy ${res.formValues[0]} ${title6}`)
                            if (money6 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title6} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item6} ${res.formValues[0]} ${data6}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 22:
                    const title7 = "Granite"
                    const price7 = 1
                    const item7 = "stone"
                    const data7 = 1
                    const money7 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`§8§o${title7}`)
                        .textField(`${title7} Costs §a$${price7} Each\nCurrent Balance §a$${money7}\n\n§r16 Costs §a$${price7 * 16}\n§r32 Costs §a$${price7 * 32}\n§r64 Costs §a$${price7 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price7 * res.formValues[0];
                            if (money7 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money7} more to buy ${res.formValues[0]} ${title7}`)
                            if (money7 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title7} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item7} ${res.formValues[0]} ${data7}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 23:
                    const title8 = "Polished Granite"
                    const price8 = 4
                    const item8 = "stone"
                    const data8 = 2
                    const money8 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`§8§o${title8}`)
                        .textField(`${title8} Costs §a$${price8} Each\nCurrent Balance §a$${money8}\n\n§r16 Costs §a$${price8 * 16}\n§r32 Costs §a$${price8 * 32}\n§r64 Costs §a$${price8 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price8 * res.formValues[0];
                            if (money8 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money8} more to buy ${res.formValues[0]} ${title8}`)
                            if (money8 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title8} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item8} ${res.formValues[0]} ${data8}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 24:
                    const title9 = "Blackstone"
                    const price9 = 1
                    const item9 = "blackstone"
                    const data9 = 0
                    const money9 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`${title9}`)
                        .textField(`${title9} Costs §a$${price9} Each\nCurrent Balance §a$${money9}\n\n§r16 Costs §a$${price9 * 16}\n§r32 Costs §a$${price9 * 32}\n§r64 Costs §a$${price9 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price9 * res.formValues[0];
                            if (money9 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money9} more to buy ${res.formValues[0]} ${title9}`)
                            if (money9 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title9} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item9} ${res.formValues[0]} ${data9}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 29:
                    const title10 = "Polished Blackstone"
                    const price10 = 4
                    const item10 = "polished_blackstone"
                    const data10 = 0
                    const money10 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`${title10}`)
                        .textField(`${title10} Costs §a$${price10} Each\nCurrent Balance §a$${money10}\n\n§r16 Costs §a$${price10 * 16}\n§r32 Costs §a$${price10 * 32}\n§r64 Costs §a$${price10 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price10 * res.formValues[0];
                            if (money10 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money10} more to buy ${res.formValues[0]} ${title10}`)
                            if (money10 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title10} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item10} ${res.formValues[0]} ${data10}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 30:
                    const title11 = "Polished Blackstone Bricks"
                    const price11 = 4
                    const item11 = "polished_blackstone_bricks"
                    const data11 = 0
                    const money11 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`${title11}`)
                        .textField(`${title11} Costs §a$${price11} Each\nCurrent Balance §a$${money11}\n\n§r16 Costs §a$${price11 * 16}\n§r32 Costs §a$${price11 * 32}\n§r64 Costs §a$${price11 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price11 * res.formValues[0];
                            if (money11 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money11} more to buy ${res.formValues[0]} ${title11}`)
                            if (money11 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title11} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item11} ${res.formValues[0]} ${data11}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 31:
                    const title12 = "Cracked Polished Blackstone Bricks"
                    const price12 = 4
                    const item12 = "cracked_polished_blackstone_bricks"
                    const data12 = 0
                    const money12 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`${title12}`)
                        .textField(`${title12} Costs §a$${price12} Each\nCurrent Balance §a$${money12}\n\n§r16 Costs §a$${price12 * 16}\n§r32 Costs §a$${price12 * 32}\n§r64 Costs §a$${price12 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price12 * res.formValues[0];
                            if (money12 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money12} more to buy ${res.formValues[0]} ${title12}`)
                            if (money12 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title12} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item12} ${res.formValues[0]} ${data12}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 32:
                    const title13 = "Chiseled Polished Blackstone"
                    const price13 = 4
                    const item13 = "chiseled_polished_blackstone"
                    const data13 = 0
                    const money13 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`${title13}`)
                        .textField(`${title13} Costs §a$${price13} Each\nCurrent Balance §a$${money13}\n\n§r16 Costs §a$${price13 * 16}\n§r32 Costs §a$${price13 * 32}\n§r64 Costs §a$${price13 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price13 * res.formValues[0];
                            if (money13 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money13} more to buy ${res.formValues[0]} ${title13}`)
                            if (money13 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title13} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item13} ${res.formValues[0]} ${data13}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 33:
                    const title14 = "Gilded Blackstone"
                    const price14 = 4
                    const item14 = "gilded_blackstone"
                    const data14 = 0
                    const money14 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`${title14}`)
                        .textField(`${title14} Costs §a$${price14} Each\nCurrent Balance §a$${money14}\n\n§r16 Costs §a$${price14 * 16}\n§r32 Costs §a$${price14 * 32}\n§r64 Costs §a$${price14 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price14 * res.formValues[0];
                            if (money14 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money14} more to buy ${res.formValues[0]} ${title14}`)
                            if (money14 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title14} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item14} ${res.formValues[0]} ${data14}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
            }
        }
        )
}
