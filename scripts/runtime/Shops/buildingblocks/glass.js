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
import { getScore, menu } from "./building_blocks.js";
import { Player } from "@minecraft/server";

/**
 * 
 * @param {Player} player 
 */
export { glass };
function glass(player) {
    new ChestFormData(`double`)
        .title(`§𝕠§b§oGlass Blocks`)
        .button(11, '§l§𝕠§bGlass Clear', [`Price: $1 Each`], "minecraft:glass", 0)
        .button(12, `§l§𝕠§bWhite Stained Glass`, [`Price: $2 Each`], "textures/blocks/glass_white", 0)
        .button(13, `§l§𝕠§bOrange Stained Glass`, [`Price: $2 Each`], "textures/blocks/glass_orange", 0)
        .button(14, `§l§𝕠§bMagenta Stained Glass`, [`Price: $2 Each`], "textures/blocks/glass_magenta", 0)
        .button(15, `§l§𝕠§bLight Blue Stained Glass`, [`Price: $2 Each`], "textures/blocks/glass_light_blue", 0)
        .button(20, `§l§𝕠§bLime Stained Glass`, [`Price: $2 Each`], "textures/blocks/glass_lime", 0)
        .button(21, `§l§𝕠§bPink Stained Glass`, [`Price: $2 Each`], "textures/blocks/glass_pink", 0)
        .button(22, `§l§𝕠§bGray Stained Glass`, [`Price: $2 Each`], "textures/blocks/glass_gray", 0)
        .button(23, `§l§𝕠§bLight Gray Stained Glass`, [`Price: $2 Each`], "textures/blocks/glass_silver", 0)
        .button(24, `§l§𝕠§bCyan Stained Glass`, [`Price: $2 Each`], "textures/blocks/glass_cyan", 0)
        .button(29, `§l§𝕠§bBlue Stained Glass`, [`Price: $2 Each`], "textures/blocks/glass_blue", 0)
        .button(30, `§l§𝕠§bBrown Stained Glass`, [`Price: $2 Each`], "textures/blocks/glass_brown", 0)
        .button(31, `§l§𝕠§bGreen Stained Glass`, [`Price: $2 Each`], "textures/blocks/glass_green", 0)
        .button(32, `§l§𝕠§bRed Stained Glass`, [`Price: $2 Each`], "textures/blocks/glass_red", 0)
        .button(33, `§l§𝕠§bBlack Stained Glass`, [`Price: $2 Each`], "textures/blocks/glass_black", 0)
        .button(40, `§l§𝕠§cBack`, [], "minecraft:barrier", 0, false)
        .button(41, `§l§𝕠§cNext Page`, [], "textures/ui/arrow_right", 0, true)
        .pattern([0, 0], [
            '_________',
            '_________',
            '_________',
            '_________',
            '_________',
            '_________'
        ], {
            x: { data: { itemName: '', itemDesc: [], enchanted: false, stackAmount: 1 }, iconPath: 'textures/ui/cointier_backdrop' }
        })
        .show(player).then(response => {
            if (response === null || response.canceled) return player.sendMessage(`§cGlass Menu Closed`) && player.runCommand(`playsound random.chestclosed @s ~~~ 1 1 1`);
            switch (response.selection) {
                case 40: menu(player);
                    player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
                    break;
                case 11:
                    const title = "Glass Clear"
                    const price = 1
                    const item = "minecraft:glass"
                    const data = 0
                    const money = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`§6§o${title}`)
                        .textField(`${title} Costs §a$${price}§r Each\nCurrent Balance §a$${player.score.Money}\n\n§r16 Costs §a$${price * 16}\n§r32 Costs §a$${price * 32}\n§r64 Costs §a$${price * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
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
                    const title1 = "White Stained Glass"
                    const price1 = 2
                    const item1 = "minecraft:white_stained_glass"
                    const data1 = 0
                    const money1 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`§6§o${title1}`)
                        .textField(`${title1} Costs §a$${price1}§r Each\nCurrent Balance §a$${player.score.Money}\n\n§r16 Costs §a$${price1 * 16}\n§r32 Costs §a$${price1 * 32}\n§r64 Costs §a$${price1 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
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
                    const title2 = "Orange Stained Glass"
                    const price2 = 2
                    const item2 = "orange_stained_glass"
                    const data2 = 0
                    const money2 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`§6§o${title2}`)
                        .textField(`${title2} Costs §a$${price2}§r Each\nCurrent Balance §a$${player.score.Money}\n\n§r16 Costs §a$${price2 * 16}\n§r32 Costs §a$${price2 * 32}\n§r64 Costs §a$${price2 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
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
                    const title3 = "Magenta Stained Glass"
                    const price3 = 2
                    const item3 = "magenta_stained_glass"
                    const data3 = 0
                    const money3 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`§6§o${title3}`)
                        .textField(`${title3} Costs §a$${price3}§r Each\nCurrent Balance §a$${player.score.Money}\n\n§r16 Costs §a$${price3 * 16}\n§r32 Costs §a$${price3 * 32}\n§r64 Costs §a$${price3 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
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
                    const title4 = "Light Blue Stained Glass"
                    const price4 = 2
                    const item4 = "light_blue_stained_glass"
                    const data4 = 0
                    const money4 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`§6§o${title4}`)
                        .textField(`${title4} Costs §a$${price4}§r Each\nCurrent Balance §a$${player.score.Money}\n\n§r16 Costs §a$${price4 * 16}\n§r32 Costs §a$${price4 * 32}\n§r64 Costs §a$${price4 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
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
                    const title6 = "Lime Stained Glass"
                    const price6 = 2
                    const item6 = "lime_stained_glass"
                    const data6 = 0
                    const money6 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`§6§o${title6}`)
                        .textField(`${title6} Costs §a$${price6}§r Each\nCurrent Balance §a$${player.score.Money}\n\n§r16 Costs §a$${price6 * 16}\n§r32 Costs §a$${price6 * 32}\n§r64 Costs §a$${price6 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
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
                case 21:
                    const title7 = "Pink Stained Glass"
                    const price7 = 2
                    const item7 = "pink_stained_glass"
                    const data7 = 0
                    const money7 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`§6§o${title7}`)
                        .textField(`${title7} Costs §a$${price7}§r Each\nCurrent Balance §a$${player.score.Money}\n\n§r16 Costs §a$${price7 * 16}\n§r32 Costs §a$${price7 * 32}\n§r64 Costs §a$${price7 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
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
                case 22:
                    const title8 = "Gray Stained Glass"
                    const price8 = 2
                    const item8 = "gray_stained_glass"
                    const data8 = 0
                    const money8 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`${title8}`)
                        .textField(`${title8} Costs §a$${price8}§r Each\nCurrent Balance §a$${player.score.Money}\n\n§r16 Costs §a$${price8 * 16}\n§r32 Costs §a$${price8 * 32}\n§r64 Costs §a$${price8 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
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
                case 23:
                    const title9 = "Light Gray Stained Glass"
                    const price9 = 2
                    const item9 = "light_gray_stained_glass"
                    const data9 = 0
                    const money9 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`§6§o${title9}`)
                        .textField(`${title9} Costs §a$${price9}§r Each\nCurrent Balance §a$${player.score.Money}\n\n§r16 Costs §a$${price9 * 16}\n§r32 Costs §a$${price9 * 32}\n§r64 Costs §a$${price9 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price9 * res.formValues[0];
                            if (money9 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money9} more to buy ${res.formValues[0]} ${title9}`)
                            if (money9 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title9} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item9} ${res.formValues[0]} ${data9}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 24:
                    const title10 = "Cyan Stained Glass"
                    const price10 = 2
                    const item10 = "cyan_stained_glass"
                    const data10 = 0
                    const money10 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`§6§o${title10}`)
                        .textField(`${title10} Costs §a$${price10}§r Each\nCurrent Balance §a$${player.score.Money}\n\n§r16 Costs §a$${price10 * 16}\n§r32 Costs §a$${price10 * 32}\n§r64 Costs §a$${price10 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price10 * res.formValues[0];
                            if (money10 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money10} more to buy ${res.formValues[0]} ${title10}`)
                            if (money10 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title10} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item10} ${res.formValues[0]} ${data10}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 29:
                    const title12 = "Blue Stained Glass"
                    const price12 = 2
                    const item12 = "blue_stained_glass"
                    const data12 = 0
                    const money12 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`§6§o${title12}`)
                        .textField(`${title12} Costs §a$${price12}§r Each\nCurrent Balance §a$${player.score.Money}\n\n§r16 Costs §a$${price12 * 16}\n§r32 Costs §a$${price12 * 32}\n§r64 Costs §a$${price12 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price12 * res.formValues[0];
                            if (money12 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money12} more to buy ${res.formValues[0]} ${title12}`)
                            if (money12 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title12} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item12} ${res.formValues[0]} ${data12}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 30:
                    const title13 = "Brown Stained Glass"
                    const price13 = 2
                    const item13 = "brown_stained_glass"
                    const data13 = 0
                    const money13 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`§6§o${title13}`)
                        .textField(`${title13} Costs §a$${price13}§r Each\nCurrent Balance §a$${player.score.Money}\n\n§r16 Costs §a$${price13 * 16}\n§r32 Costs §a$${price13 * 32}\n§r64 Costs §a$${price13 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price13 * res.formValues[0];
                            if (money13 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money13} more to buy ${res.formValues[0]} ${title13}`)
                            if (money13 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title13} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item13} ${res.formValues[0]} ${data13}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 31:
                    const title14 = "Green Stained Glass"
                    const price14 = 2
                    const item14 = "green_stained_glass"
                    const data14 = 0
                    const money14 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`§6§o${title14}`)
                        .textField(`${title14} Costs §a$${price14}§r Each\nCurrent Balance §a$${player.score.Money}\n\n§r16 Costs §a$${price14 * 16}\n§r32 Costs §a$${price14 * 32}\n§r64 Costs §a$${price14 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price14 * res.formValues[0];
                            if (money14 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money14} more to buy ${res.formValues[0]} ${title14}`)
                            if (money14 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title14} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item14} ${res.formValues[0]} ${data14}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 32:
                    const title15 = "Red Stained Glass"
                    const price15 = 2
                    const item15 = "red_stained_glass"
                    const data15 = 0
                    const money15 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`§6§o${title15}`)
                        .textField(`${title15} Costs §a$${price15}§r Each\nCurrent Balance §a$${player.score.Money}\n\n§r16 Costs §a$${price15 * 16}\n§r32 Costs §a$${price15 * 32}\n§r64 Costs §a$${price15 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price15 * res.formValues[0];
                            if (money15 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money15} more to buy ${res.formValues[0]} ${title15}`)
                            if (money15 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title15} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item15} ${res.formValues[0]} ${data15}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 33:
                    const title16 = "Black Stained Glass"
                    const price16 = 2
                    const item16 = "black_stained_glass"
                    const data16 = 0
                    const money16 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`§6§o${title16}`)
                        .textField(`${title16} Costs §a$${price16}§r Each\nCurrent Balance §a$${player.score.Money}\n\n§r16 Costs §a$${price16 * 16}\n§r32 Costs §a$${price16 * 32}\n§r64 Costs §a$${price16 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price16 * res.formValues[0];
                            if (money16 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money16} more to buy ${res.formValues[0]} ${title16}`)
                            if (money16 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title16} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item16} ${res.formValues[0]} ${data16}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 41: page2(player);
                    player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
                    break;


            }
        }
        )
}
function page2(player) {
    new ChestFormData(`double`)
        .title(`§b§oGlass Pane Blocks`)
        .button(11, '§l§𝕠§bGlass Pane Clear', [`Price: $1 Each`], "minecraft:glass_pane", 0)
        .button(12, '§l§𝕠§bWhite Glass Pane', [`Price: $2 Each`], "textures/blocks/glass_white", 0)
        .button(13, '§l§𝕠§bOrange Glass Pane', [`Price: $2 Each`], "textures/blocks/glass_orange", 0)
        .button(14, '§l§𝕠§bMagenta Glass Pane', [`Price: $2 Each`], "textures/blocks/glass_magenta", 0)
        .button(15, '§l§𝕠§bLight Blue Glass Pane', [`Price: $2 Each`], "textures/blocks/glass_light_blue", 0)
        .button(20, '§l§𝕠§bLime Glass Pane', [`Price: $2 Each`], "textures/blocks/glass_lime", 0)
        .button(21, '§l§𝕠§bPink Glass Pane', [`Price: $2 Each`], "textures/blocks/glass_pink", 0)
        .button(22, '§l§𝕠§bGray Glass Pane', [`Price: $2 Each`], "textures/blocks/glass_gray", 0)
        .button(23, '§l§𝕠§bLight Gray Glass Pane', [`Price: $2 Each`], "textures/blocks/glass_silver", 0)
        .button(24, '§l§𝕠§bCyan Glass Pane', [`Price: $2 Each`], "textures/blocks/glass_cyan", 0)
        .button(29, '§l§𝕠§bBlue Glass Pane', [`Price: $2 Each`], "textures/blocks/glass_blue", 0)
        .button(30, '§l§𝕠§bBrown Glass Pane', [`Price: $2 Each`], "textures/blocks/glass_brown", 0)
        .button(31, '§l§𝕠§bGreen Glass Pane', [`Price: $2 Each`], "textures/blocks/glass_green", 0)
        .button(32, '§l§𝕠§bRed Glass Pane', [`Price: $2 Each`], "textures/blocks/glass_red", 0)
        .button(33, '§l§𝕠§bBlack Glass Pane', [`Price: $2 Each`], "textures/blocks/glass_black", 0)
        .button(40, '§l§𝕠§bBack', [`§rGo Back To The Menu`], "minecraft:barrier", 0)
        .button(39, '§l§𝕠§bPrevious Page', [`§rGo Back To The Previous Page`], "textures/ui/arrow_left", 0)
        .pattern([0, 0], [
            '_________',
            '_________',
            '_________',
            '_________',
            '_________',
            '_________'
        ], {
            x: { data: { itemName: '', itemDesc: [], enchanted: false, stackAmount: 1 }, iconPath: 'textures/ui/cointier_backdrop' }
        })
        .show(player).then(response => {
            if (response === null || response.canceled) return player.sendMessage(`§cGlass Menu Closed`) && player.runCommand(`playsound random.chestclosed @s ~~~ 1 1 1`);
            switch (response.selection) {
                case 39: glass(player);
                    player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
                    break;
                case 40: menu(player);
                    player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
                    break;
                case 11:
                    const title = "Glass Pane Clear"
                    const price = 1
                    const item = "minecraft:glass_pane"
                    const data = 0
                    const money = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`§6§o${title}`)
                        .textField(`${title} Costs §a$${price}§r Each\nCurrent Balance §a$${player.score.Money}\n\n§r16 Costs §a$${price * 16}\n§r32 Costs §a$${price * 32}\n§r64 Costs §a$${price * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
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
                    const title1 = "White Glass Pane"
                    const price1 = 2
                    const item1 = "minecraft:white_stained_glass_pane"
                    const data1 = 0
                    const money1 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)

                    new ModalFormData()
                        .title(`§6§o${title1}`)
                        .textField(`${title1} Costs §a$${price1}§r Each\nCurrent Balance §a$${player.score.Money}\n\n§r16 Costs §a$${price1 * 16}\n§r32 Costs §a$${price1 * 32}\n§r64 Costs §a$${price1 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {

                            const cost = price1 * res.formValues[0];
                            if (money1 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money1} more to buy ${res.formValues[0]} ${title1}`)
                            if (money1 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title1} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item1} ${res.formValues[0]} ${data1}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }

                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]}§c Is Not A Valid Amount!`)

                        })
                    break;
                case 13:
                    const title2 = "Orange Glass Pane"
                    const price2 = 2
                    const item2 = "minecraft:orange_stained_glass_pane"
                    const data2 = 0
                    const money2 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)

                    new ModalFormData()
                        .title(`§6§o${title2}`)
                        .textField(`${title2} Costs §a$${price2}§r Each\nCurrent Balance §a$${player.score.Money}\n\n§r16 Costs §a$${price2 * 16}\n§r32 Costs §a$${price2 * 32}\n§r64 Costs §a$${price2 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {

                            const cost = price2 * res.formValues[0];
                            if (money2 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money2} more to buy ${res.formValues[0]} ${title2}`)
                            if (money2 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title2} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item2} ${res.formValues[0]} ${data2}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }

                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]}§c Is Not A Valid Amount!`)

                        })
                    break;
                case 14:
                    const title3 = "Magenta Glass Pane"
                    const price3 = 2
                    const item3 = "minecraft:magenta_stained_glass_pane"
                    const data3 = 0
                    const money3 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)

                    new ModalFormData()
                        .title(`§6§o${title3}`)
                        .textField(`${title3} Costs §a$${price3}§r Each\nCurrent Balance §a$${player.score.Money}\n\n§r16 Costs §a$${price3 * 16}\n§r32 Costs §a$${price3 * 32}\n§r64 Costs §a$${price3 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {

                            const cost = price3 * res.formValues[0];
                            if (money3 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money3} more to buy ${res.formValues[0]} ${title3}`)
                            if (money3 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title3} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item3} ${res.formValues[0]} ${data3}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }

                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]}§c Is Not A Valid Amount!`)

                        })
                    break;
                case 15:
                    const title4 = "Light Blue Glass Pane"
                    const price4 = 2
                    const item4 = "minecraft:light_blue_stained_glass_pane"
                    const data4 = 0
                    const money4 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)

                    new ModalFormData()
                        .title(`§6§o${title4}`)
                        .textField(`${title4} Costs §a$${price4}§r Each\nCurrent Balance §a$${player.score.Money}\n\n§r16 Costs §a$${price4 * 16}\n§r32 Costs §a$${price4 * 32}\n§r64 Costs §a$${price4 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {

                            const cost = price4 * res.formValues[0];
                            if (money4 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money4} more to buy ${res.formValues[0]} ${title4}`)
                            if (money4 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title4} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item4} ${res.formValues[0]} ${data4}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }

                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]}§c Is Not A Valid Amount!`)

                        })
                    break;
                case 20:
                    const title6 = "Lime Glass Pane"
                    const price6 = 2
                    const item6 = "minecraft:lime_stained_glass_pane"
                    const data6 = 0
                    const money6 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)

                    new ModalFormData()
                        .title(`§6§o${title6}`)
                        .textField(`${title6} Costs §a$${price6}§r Each\nCurrent Balance §a$${player.score.Money}\n\n§r16 Costs §a$${price6 * 16}\n§r32 Costs §a$${price6 * 32}\n§r64 Costs §a$${price6 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {

                            const cost = price6 * res.formValues[0];
                            if (money6 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money6} more to buy ${res.formValues[0]} ${title6}`)
                            if (money6 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title6} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item6} ${res.formValues[0]} ${data6}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }

                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]}§c Is Not A Valid Amount!`)

                        })
                    break;
                case 21:
                    const title7 = "Pink Glass Pane"
                    const price7 = 2
                    const item7 = "minecraft:pink_stained_glass_pane"
                    const data7 = 0
                    const money7 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)

                    new ModalFormData()
                        .title(`§6§o${title7}`)
                        .textField(`${title7} Costs §a$${price7}§r Each\nCurrent Balance §a$${player.score.Money}\n\n§r16 Costs §a$${price7 * 16}\n§r32 Costs §a$${price7 * 32}\n§r64 Costs §a$${price7 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {

                            const cost = price7 * res.formValues[0];
                            if (money7 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money7} more to buy ${res.formValues[0]} ${title7}`)
                            if (money7 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title7} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item7} ${res.formValues[0]} ${data7}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }

                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]}§c Is Not A Valid Amount!`)

                        })
                    break;
                case 22:
                    const title8 = "Gray Glass Pane"
                    const price8 = 2
                    const item8 = "minecraft:gray_stained_glass_pane"
                    const data8 = 0
                    const money8 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)

                    new ModalFormData()
                        .title(`§6§o${title8}`)
                        .textField(`${title8} Costs §a$${price8}§r Each\nCurrent Balance §a$${player.score.Money}\n\n§r16 Costs §a$${price8 * 16}\n§r32 Costs §a$${price8 * 32}\n§r64 Costs §a$${price8 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {

                            const cost = price8 * res.formValues[0];
                            if (money8 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money8} more to buy ${res.formValues[0]} ${title8}`)
                            if (money8 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title8} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item8} ${res.formValues[0]} ${data8}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }

                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]}§c Is Not A Valid Amount!`)

                        })
                    break;
                case 23:
                    const title9 = "Light Gray Glass Pane"
                    const price9 = 2
                    const item9 = "minecraft:light_gray_stained_glass_pane"
                    const data9 = 0
                    const money9 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)

                    new ModalFormData().title(`§6§o${title9}`).textField(`${title9} Costs §a$${price9}§r Each\nCurrent Balance §a$${player.score.Money}\n\n§r16 Costs §a$${price9 * 16}\n§r32 Costs §a$${price9 * 32}\n§r64 Costs §a$${price9 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`).show(player).then(res => {
                        const cost = price9 * res.formValues[0];
                        if (money9 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money9} more to buy ${res.formValues[0]} ${title9}`)
                        if (money9 >= cost && res.formValues[0] > 0) {
                            player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title9} for $${cost}`);
                            player.runCommand(`scoreboard players remove @s Money ${cost}`);
                            player.runCommand(`give @s ${item9} ${res.formValues[0]} ${data9}`)
                            player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                        } else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]}§c Is Not A Valid Amount!`)
                    })
                    break;
                case 24:
                    const title10 = "Cyan Glass Pane"
                    const price10 = 2
                    const item10 = "minecraft:cyan_stained_glass_pane"
                    const data10 = 0
                    const money10 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)

                    new ModalFormData().title(`§6§o${title10}`).textField(`${title10} Costs §a$${price10}§r Each\nCurrent Balance §a$${player.score.Money}\n\n§r16 Costs §a$${price10 * 16}\n§r32 Costs §a$${price10 * 32}\n§r64 Costs §a$${price10 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`).show(player).then(res => {
                        const cost = price10 * res.formValues[0];
                        if (money10 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money10} more to buy ${res.formValues[0]} ${title10}`)
                        if (money10 >= cost && res.formValues[0] > 0) {
                            player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title10} for $${cost}`);
                            player.runCommand(`scoreboard players remove @s Money ${cost}`);
                            player.runCommand(`give @s ${item10} ${res.formValues[0]} ${data10}`)
                            player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                        } else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]}§c Is Not A Valid Amount!`)
                    })
                    break;
                case 29:
                    const title12 = "Blue Glass Pane"
                    const price12 = 2
                    const item12 = "minecraft:blue_stained_glass_pane"
                    const data12 = 0
                    const money12 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)

                    new ModalFormData().title(`§6§o${title12}`).textField(`${title12} Costs §a$${price12}§r Each\nCurrent Balance §a$${player.score.Money}\n\n§r16 Costs §a$${price12 * 16}\n§r32 Costs §a$${price12 * 32}\n§r64 Costs §a$${price12 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`).show(player).then(res => {
                        const cost = price12 * res.formValues[0];
                        if (money12 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money12} more to buy ${res.formValues[0]} ${title12}`)
                        if (money12 >= cost && res.formValues[0] > 0) {
                            player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title12} for $${cost}`);
                            player.runCommand(`scoreboard players remove @s Money ${cost}`);
                            player.runCommand(`give @s ${item12} ${res.formValues[0]} ${data12}`)
                            player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                        } else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]}§c Is Not A Valid Amount!`)
                    })
                    break;
                case 30:
                    const title13 = "Brown Glass Pane"
                    const price13 = 2
                    const item13 = "minecraft:brown_stained_glass_pane"
                    const data13 = 0
                    const money13 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)

                    new ModalFormData().title(`§6§o${title13}`).textField(`${title13} Costs §a$${price13}§r Each\nCurrent Balance §a$${player.score.Money}\n\n§r16 Costs §a$${price13 * 16}\n§r32 Costs §a$${price13 * 32}\n§r64 Costs §a$${price13 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`).show(player).then(res => {
                        const cost = price13 * res.formValues[0];
                        if (money13 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money13} more to buy ${res.formValues[0]} ${title13}`)
                        if (money13 >= cost && res.formValues[0] > 0) {
                            player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title13} for $${cost}`);
                            player.runCommand(`scoreboard players remove @s Money ${cost}`);
                            player.runCommand(`give @s ${item13} ${res.formValues[0]} ${data13}`)
                            player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                        } else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]}§c Is Not A Valid Amount!`)
                    })
                    break;
                case 31:
                    const title14 = "Green Glass Pane"
                    const price14 = 2
                    const item14 = "minecraft:green_stained_glass_pane"
                    const data14 = 0
                    const money14 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)

                    new ModalFormData().title(`§6§o${title14}`).textField(`${title14} Costs §a$${price14}§r Each\nCurrent Balance §a$${player.score.Money}\n\n§r16 Costs §a$${price14 * 16}\n§r32 Costs §a$${price14 * 32}\n§r64 Costs §a$${price14 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`).show(player).then(res => {
                        const cost = price14 * res.formValues[0];
                        if (money14 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money14} more to buy ${res.formValues[0]} ${title14}`)
                        if (money14 >= cost && res.formValues[0] > 0) {
                            player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title14} for $${cost}`);
                            player.runCommand(`scoreboard players remove @s Money ${cost}`);
                            player.runCommand(`give @s ${item14} ${res.formValues[0]} ${data14}`)
                            player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                        } else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]}§c Is Not A Valid Amount!`)
                    })
                    break;
                case 32:
                    const title15 = "Red Glass Pane"
                    const price15 = 2
                    const item15 = "minecraft:red_stained_glass_pane"
                    const data15 = 0
                    const money15 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)

                    new ModalFormData().title(`§6§o${title15}`).textField(`${title15} Costs §a$${price15}§r Each\nCurrent Balance §a$${player.score.Money}\n\n§r16 Costs §a$${price15 * 16}\n§r32 Costs §a$${price15 * 32}\n§r64 Costs §a$${price15 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`).show(player).then(res => {
                        const cost = price15 * res.formValues[0];
                        if (money15 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money15} more to buy ${res.formValues[0]} ${title15}`)
                        if (money15 >= cost && res.formValues[0] > 0) {
                            player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title15} for $${cost}`);
                            player.runCommand(`scoreboard players remove @s Money ${cost}`);
                            player.runCommand(`give @s ${item15} ${res.formValues[0]} ${data15}`)
                            player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                        } else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]}§c Is Not A Valid Amount!`)
                    })
                    break;
                case 33:
                    const title16 = "Black Glass Pane"
                    const price16 = 2
                    const item16 = "minecraft:black_stained_glass_pane"
                    const data16 = 0
                    const money16 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData().title(`§6§o${title16}`).textField(`${title16} Costs §a$${price16}§r Each\nCurrent Balance §a$${player.score.Money}\n\n§r16 Costs §a$${price16 * 16}\n§r32 Costs §a$${price16 * 32}\n§r64 Costs §a$${price16 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`).show(player).then(res => {
                        const cost = price16 * res.formValues[0];
                        if (money16 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money16} more to buy ${res.formValues[0]} ${title16}`)
                        if (money16 >= cost && res.formValues[0] > 0) {
                            player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title16} for $${cost}`);
                            player.runCommand(`scoreboard players remove @s Money ${cost}`);
                            player.runCommand(`give @s ${item16} ${res.formValues[0]} ${data16}`)
                            player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                        } else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]}§c Is Not A Valid Amount!`)
                    })
                    break;
            }
        }
        )
}
