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

export { dec }
function dec(player) {
    new ChestFormData(`double`)
        .title(`§𝕠§u§oDecoration Menu`)
        .button(12, '§𝕠§l§uWool Menu', [], "minecraft:white_wool", 0)
        .button(13, `§𝕠§l§uFlower Menu`, [], "minecraft:red_flower", 0)
        .button(14, `§𝕠§l§uLush Cave Items`, [], "minecraft:big_dripleaf", 0)
        .button(40, '§𝕠§l§cBack', [`§cGo Back To The Main Menu`], "minecraft:barrier", 0)
        .pattern([0, 0], [
            '_________',
            '_________',
            '_________',
            '_________',
            '_________',
            '_________'
        ], {
        })
        .show(player).then(response => {
            if (response === null || response.canceled) return player.sendMessage(`§cStone Menu Closed`) && player.runCommand(`playsound random.chestclosed @s ~~~ 1 1 1`);
            switch (response.selection) {
                case 40: menu(player);
                    player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
                    break;
                case 12: Wool(player);
                    player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
                    break;
                case 13: Flowers(player);
                    player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
                    break;
                case 14: Lush(player);
                    player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
                    break;
            }
        }
        )
}

function Wool(player) {
    new ChestFormData(`double`)
        .title(`§𝕠§u§oWool Menu`)
        .button(11, '§𝕠§l§uWhite Wool', [`Price: $15`], "minecraft:white_wool", 0)
        .button(12, `§𝕠§l§uOrange Wool`, [`Price: $15`], "minecraft:orange_wool", 0)
        .button(13, `§𝕠§l§uMagenta Wool`, [`Price: $15`], "minecraft:magenta_wool", 0)
        .button(14, `§𝕠§l§uLight Blue Wool`, [`Price: $15`], "minecraft:light_blue_wool", 0)
        .button(15, `§𝕠§l§uYellow Wool`, [`Price: $15`], "minecraft:yellow_wool", 0)
        .button(20, `§𝕠§l§uLime Wool`, [`Price: $15`], "minecraft:lime_wool", 0)
        .button(21, `§𝕠§l§uPink Wool`, [`Price: $15`], "minecraft:pink_wool", 0)
        .button(22, `§𝕠§l§uGray Wool`, [`Price: $15`], "minecraft:gray_wool", 0)
        .button(23, `§𝕠§l§uLight Gray Wool`, [`Price: $15`], "minecraft:light_gray_wool", 0)
        .button(24, `§𝕠§l§uCyan Wool`, [`Price: $15`], "minecraft:cyan_wool", 0)
        .button(29, `§𝕠§l§uPurple Wool`, [`Price: $15`], "minecraft:purple_wool", 0)
        .button(30, `§𝕠§l§uBlue Wool`, [`Price: $15`], "minecraft:blue_wool", 0)
        .button(31, `§𝕠§l§uGreen Wool`, [`Price: $15`], "minecraft:green_wool", 0)
        .button(32, `§𝕠§l§uRed Wool`, [`Price: $15`], "minecraft:red_wool", 0)
        .button(33, `§𝕠§l§uBlack Wool`, [`Price: $15`], "minecraft:black_wool", 0)
        .button(40, '§𝕠§l§cBack', [`§cGo Back To The Decoration Menu`], "minecraft:barrier", 0)
        .pattern([0, 0], [
            '_________',
            '_________',
            '_________',
            '_________',
            '_________',
            '_________'
        ], {
        })
        .show(player).then(response => {
            if (response === null || response.canceled) return player.sendMessage(`§cWool Menu Closed`) && player.runCommand(`playsound random.chestclosed @s ~~~ 1 1 1`);
            switch (response.selection) {
                case 40: dec(player);
                    player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
                    break;
                case 11:
                    const title = "White Wool"
                    const price = 15
                    const item = "minecraft:white_wool"
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
                    const title1 = "Orange Wool"
                    const price1 = 15
                    const item1 = "minecraft:orange_wool"
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
                    const title2 = "Magenta Wool"
                    const price2 = 15
                    const item2 = "minecraft:magenta_wool"
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
                    const title3 = "Light Blue Wool"
                    const price3 = 15
                    const item3 = "minecraft:light_blue_wool"
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
                    const title4 = "Yellow Wool"
                    const price4 = 15
                    const item4 = "minecraft:yellow_wool"
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
                    const title5 = "Lime Wool"
                    const price5 = 15
                    const item5 = "minecraft:lime_wool"
                    const data5 = 0
                    const money5 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`§6§o${title5}`)
                        .textField(`${title5} Costs §a$${price5}§r Each\nCurrent Balance §a$${money5}\n\n§r16 Costs §a$${price5 * 16}\n§r32 Costs §a$${price5 * 32}\n§r64 Costs §a$${price5 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
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
                    const title6 = "Pink Wool"
                    const price6 = 15
                    const item6 = "minecraft:pink_wool"
                    const data6 = 0
                    const money6 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`§6§o${title6}`)
                        .textField(`${title6} Costs §a$${price6}§r Each\nCurrent Balance §a$${money6}\n\n§r16 Costs §a$${price6 * 16}\n§r32 Costs §a$${price6 * 32}\n§r64 Costs §a$${price6 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
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
                    const title7 = "Gray Wool"
                    const price7 = 15
                    const item7 = "minecraft:gray_wool"
                    const data7 = 0
                    const money7 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`${title7}`)
                        .textField(`${title7} Costs §a$${price7}§r Each\nCurrent Balance §a$${money7}\n\n§r16 Costs §a$${price7 * 16}\n§r32 Costs §a$${price7 * 32}\n§r64 Costs §a$${price7 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price7 * res.formValues[0];
                            if (money7 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money7} more to buy ${res.formValues[0]} ${title7}`)
                            if (money7 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title7} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item7} ${res.formValues[0]} ${data7}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`) && player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`)
                        })
                    break;
                case 23:
                    const title8 = "Light Gray Wool"
                    const price8 = 15
                    const item8 = "minecraft:light_gray_wool"
                    const data8 = 0
                    const money8 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData().title(`§6§o${title8}`)
                        .textField(`${title8} Costs §a$${price8}§r Each\nCurrent Balance §a$${money8}\n\n§r16 Costs §a$${price8 * 16}\n§r32 Costs §a$${price8 * 32}\n§r64 Costs §a$${price8 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price8 * res.formValues[0];
                            if (money8 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money8} more to buy ${res.formValues[0]} ${title8}`)
                            if (money8 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title8} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item8} ${res.formValues[0]} ${data8}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`) && player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`)
                        })
                    break;
                case 24:
                    const title9 = "Cyan Wool"
                    const price9 = 15
                    const item9 = "minecraft:cyan_wool"
                    const data9 = 0
                    const money9 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§6§o${title9}`)
                        .textField(`${title9} Costs §a$${price9}§r Each\nCurrent Balance §a$${money9}\n\n§r16 Costs §a$${price9 * 16}\n§r32 Costs §a$${price9 * 32}\n§r64 Costs §a$${price9 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price9 * res.formValues[0];
                            if (money9 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money9} more to buy ${res.formValues[0]} ${title9}`)
                            if (money9 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title9} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item9} ${res.formValues[0]} ${data9}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`) && player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`)
                        })
                    break;
                case 29:
                    const title10 = "Purple Wool"
                    const price10 = 15
                    const item10 = "minecraft:purple_wool"
                    const data10 = 0
                    const money10 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§6§o${title10}`)
                        .textField(`${title10} Costs §a$${price10}§r Each\nCurrent Balance §a$${money10}\n\n§r16 Costs §a$${price10 * 16}\n§r32 Costs §a$${price10 * 32}\n§r64 Costs §a$${price10 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price10 * res.formValues[0];
                            if (money10 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money10} more to buy ${res.formValues[0]} ${title10}`)
                            if (money10 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title10} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item10} ${res.formValues[0]} ${data10}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`) && player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`)
                        })
                    break;
                case 30:
                    const title11 = "Blue Wool"
                    const price11 = 15
                    const item11 = "minecraft:blue_wool"
                    const data11 = 0
                    const money11 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§6§o${title11}`)
                        .textField(`${title11} Costs §a$${price11}§r Each\nCurrent Balance §a$${money11}\n\n§r16 Costs §a$${price11 * 16}\n§r32 Costs §a$${price11 * 32}\n§r64 Costs §a$${price11 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price11 * res.formValues[0];
                            if (money11 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money11} more to buy ${res.formValues[0]} ${title11}`)
                            if (money11 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title11} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item11} ${res.formValues[0]} ${data11}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`) && player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`)
                        })
                    break;
                case 31:
                    const title12 = "Green Wool"
                    const price12 = 15
                    const item12 = "minecraft:green_wool"
                    const data12 = 0
                    const money12 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§6§o${title12}`)
                        .textField(`${title12} Costs §a$${price12}§r Each\nCurrent Balance §a$${money12}\n\n§r16 Costs §a$${price12 * 16}\n§r32 Costs §a$${price12 * 32}\n§r64 Costs §a$${price12 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price12 * res.formValues[0];
                            if (money12 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money12} more to buy ${res.formValues[0]} ${title12}`)
                            if (money12 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title12} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item12} ${res.formValues[0]} ${data12}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`) && player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`)
                        })
                    break;
                case 32:
                    const title13 = "Red Wool"
                    const price13 = 15
                    const item13 = "minecraft:red_wool"
                    const data13 = 0
                    const money13 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§6§o${title13}`)
                        .textField(`${title13} Costs §a$${price13}§r Each\nCurrent Balance §a$${money13}\n\n§r16 Costs §a$${price13 * 16}\n§r32 Costs §a$${price13 * 32}\n§r64 Costs §a$${price13 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price13 * res.formValues[0];
                            if (money13 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money13} more to buy ${res.formValues[0]} ${title13}`)
                            if (money13 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title13} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item13} ${res.formValues[0]} ${data13}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`) && player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`)
                        })
                    break;
                case 33:
                    const title14 = "Black Wool"
                    const price14 = 15
                    const item14 = "minecraft:black_wool"
                    const data14 = 0
                    const money14 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§6§o${title14}`)
                        .textField(`${title14} Costs §a$${price14}§r Each\nCurrent Balance §a$${money14}\n\n§r16 Costs §a$${price14 * 16}\n§r32 Costs §a$${price14 * 32}\n§r64 Costs §a$${price14 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price14 * res.formValues[0];
                            if (money14 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money14} more to buy ${res.formValues[0]} ${title14}`)
                            if (money14 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title14} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item14} ${res.formValues[0]} ${data14}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`) && player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`)
                        })
                    break;
            }
        }
        )
}

function Flowers(player) {
    new ChestFormData(`double`)
        .title(`§𝕠§u§oFlower Menu`)
        .button(11, '§𝕠§l§uDandelion', [`Price: $5\n\nUsing Dye Textures\nTo Show Color Of Flowers\nNot 100% Correct`], "textures/items/dye_powder_yellow", 0)
        .button(12, `§𝕠§l§uRed Flower`, [`Price: $5\n\nUsing Dye Textures\nTo Show Color Of Flowers\nNot 100% Correct`], "textures/items/dye_powder_red", 0)
        .button(13, `§𝕠§l§uBlue Orchid`, [`Price: $5\n\nUsing Dye Textures\nTo Show Color Of Flowers\nNot 100% Correct`], "textures/items/dye_powder_light_blue", 0)
        .button(14, `§𝕠§l§uAllium`, [`Price: $5\n\nUsing Dye Textures\nTo Show Color Of Flowers\nNot 100% Correct`], "textures/items/dye_powder_magenta", 0)
        .button(15, `§𝕠§l§uAzure Bluet`, [`Price: $5\n\nUsing Dye Textures\nTo Show Color Of Flowers\nNot 100% Correct`], "textures/items/dye_powder_silver", 0)
        .button(20, `§𝕠§l§uRed Tulip`, [`Price: $5\n\nUsing Dye Textures\nTo Show Color Of Flowers\nNot 100% Correct`], "textures/items/dye_powder_red", 0)
        .button(21, `§𝕠§l§uOrange Tulip`, [`Price: $5\n\nUsing Dye Textures\nTo Show Color Of Flowers\nNot 100% Correct`], "textures/items/dye_powder_orange", 0)
        .button(22, `§𝕠§l§uWhite Tulip`, [`Price: $5\n\nUsing Dye Textures\nTo Show Color Of Flowers\nNot 100% Correct`], "textures/items/dye_powder_white", 0)
        .button(23, `§𝕠§l§uPink Tulip`, [`Price: $5\n\nUsing Dye Textures\nTo Show Color Of Flowers\nNot 100% Correct`], "textures/items/dye_powder_pink", 0)
        .button(24, `§𝕠§l§uOxeye Daisy`, [`Price: $5\n\nUsing Dye Textures\nTo Show Color Of Flowers\nNot 100% Correct`], "textures/items/dye_powder_silver", 0)
        .button(40, '§𝕠§l§cBack', [`§cGo Back To The Decoration Menu`], "minecraft:barrier", 0)
        .pattern([0, 0], [
            '_________',
            '_________',
            '_________',
            '_________',
            '_________',
            '_________'
        ],
            { x: { data: { itemName: [], itemDesc: [], enchanted: false, stackAmount: 1 }, iconPath: 'textures/ui/cointier_backdrop' } })
        .show(player).then(response => {
            if (response === null || response.canceled) return player.sendMessage(`§cFlower Menu Closed`) && player.runCommand(`playsound random.chestclosed @s ~~~ 1 1 1`);
            switch (response.selection) {
                case 40: dec(player);
                    player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
                    break;
                case 11:
                    const title = "Dandelion"
                    const price = 15
                    const item = "minecraft:yellow_flower"
                    const data = 0
                    const money = getScore(player, "Money")
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
                    const title1 = "Red Flower"
                    const price1 = 15
                    const item1 = "minecraft:red_flower"
                    const data1 = 0
                    const money1 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§6§o${title1}`)
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
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`)
                        })
                    break;
                case 13:
                    const title2 = "Blue Orchid"
                    const price2 = 15
                    const item2 = "minecraft:red_flower"
                    const data2 = 1
                    const money2 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§6§o${title2}`)
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
                            else player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`) && player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`)

                        })
                    break;
                case 14:
                    const title3 = "Allium"
                    const price3 = 15
                    const item3 = "minecraft:red_flower"
                    const data3 = 2
                    const money3 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§6§o${title3}`)
                        .textField(`${title3} Costs §a$${price3}§r Each\nCurrent Balance §a$${money3}\n\n§r16 Costs §a$${price3 * 16}\n§r32 Costs §a$${price3 * 32}\n§r64 Costs §a$${price3 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price3 * res.formValues[0];
                            if (money3 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money3} more to buy ${res.formValues[0]} ${title3}`)
                            if (money3 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title3} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item3} ${res.formValues[0]} ${data3}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount`)
                        })
                    break;
                case 15:
                    const title4 = "Azure Bluet"
                    const price4 = 15
                    const item4 = "minecraft:red_flower"
                    const data4 = 3
                    const money4 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§6§o${title4}`)
                        .textField(`${title4} Costs §a$${price4}§r Each\nCurrent Balance §a$${money4}\n\n§r16 Costs §a$${price4 * 16}\n§r32 Costs §a$${price4 * 32}\n§r64 Costs §a$${price4 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price4 * res.formValues[0];
                            if (money4 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money4} more to buy ${res.formValues[0]} ${title4}`)
                            if (money4 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title4} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item4} ${res.formValues[0]} ${data4}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount`)
                        })
                    break;
                case 20:
                    const title5 = "Red Tulip"
                    const price5 = 15
                    const item5 = "minecraft:red_flower"
                    const data5 = 4
                    const money5 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§6§o${title5}`)
                        .textField(`${title5} Costs §a$${price5}§r Each\nCurrent Balance §a$${money5}\n\n§r16 Costs §a$${price5 * 16}\n§r32 Costs §a$${price5 * 32}\n§r64 Costs §a$${price5 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price5 * res.formValues[0];
                            if (money5 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money5} more to buy ${res.formValues[0]} ${title5}`)
                            if (money5 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title5} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item5} ${res.formValues[0]} ${data5}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount`)
                        })
                    break;
                case 21:
                    const title6 = "Orange Tulip"
                    const price6 = 15
                    const item6 = "minecraft:red_flower"
                    const data6 = 15
                    const money6 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§6§o${title6}`)
                        .textField(`${title6} Costs §a$${price6}§r Each\nCurrent Balance §a$${money6}\n\n§r16 Costs §a$${price6 * 16}\n§r32 Costs §a$${price6 * 32}\n§r64 Costs §a$${price6 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price6 * res.formValues[0];
                            if (money6 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money6} more to buy ${res.formValues[0]} ${title6}`)
                            if (money6 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title6} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item6} ${res.formValues[0]} ${data6}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount`)
                        })
                    break;
                case 22:
                    const title7 = "White Tulip"
                    const price7 = 15
                    const item7 = "minecraft:red_flower"
                    const data7 = 6
                    const money7 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§6§o${title7}`)
                        .textField(`${title7} Costs §a$${price7}§r Each\nCurrent Balance §a$${money7}\n\n§r16 Costs §a$${price7 * 16}\n§r32 Costs §a$${price7 * 32}\n§r64 Costs §a$${price7 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price7 * res.formValues[0];
                            if (money7 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money7} more to buy ${res.formValues[0]} ${title7}`)
                            if (money7 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title7} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item7} ${res.formValues[0]} ${data7}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount`)
                        })
                    break;
                case 23:
                    const title8 = "Pink Tulip"
                    const price8 = 15
                    const item8 = "minecraft:red_flower"
                    const data8 = 7
                    const money8 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§6§o${title8}`)
                        .textField(`${title8} Costs §a$${price8}§r Each\nCurrent Balance §a$${money8}\n\n§r16 Costs §a$${price8 * 16}\n§r32 Costs §a$${price8 * 32}\n§r64 Costs §a$${price8 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price8 * res.formValues[0];
                            if (money8 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money8} more to buy ${res.formValues[0]} ${title8}`)
                            if (money8 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title8} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item8} ${res.formValues[0]} ${data8}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount`)
                        })
                    break;
                case 24:
                    const title9 = "Oxeye Daisy"
                    const price9 = 15
                    const item9 = "minecraft:red_flower"
                    const data9 = 8
                    const money9 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§6§o${title9}`)
                        .textField(`${title9} Costs §a$${price9}§r Each\nCurrent Balance §a$${money9}\n\n§r16 Costs §a$${price9 * 16}\n§r32 Costs §a$${price9 * 32}\n§r64 Costs §a$${price9 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price9 * res.formValues[0];
                            if (money9 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money9} more to buy ${res.formValues[0]} ${title9}`)
                            if (money9 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title9} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item9} ${res.formValues[0]} ${data9}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.sendMessage(`§6${res.formValues[0]} Is Not A Valid Amount`)
                        })
                    break;
            }
        }
        )
}

function Lush(player) {
    new ChestFormData(`double`)
        .title(`§𝕠§u§oLush Menu`)
        .button(11, 'Sporee Blossom', [`Price: $5\n`], "minecraft:spore_blossom", 0)
        .button(12, `Azalea`, [`Price: $5\n`], "minecraft:azalea", 0)
        .button(13, `Flowering Azalea`, [`Price: $5\n`], "minecraft:flowering_azalea", 0)
        .button(14, `Moss Block`, [`Price: $5\n`], "minecraft:moss_block", 0)
        .button(15, `Moss Carpet`, [`Price: $5\n`], "minecraft:moss_carpet", 0)
        .button(20, `Glow Lichen`, [`Price: $5\n`], "minecraft:glow_lichen", 0)
        .button(21, `Glow Berries`, [`Price: $5\n`], "textures/items/glow_berries", 0)
        .button(40, '§𝕠§l§cBack', [`§cGo Back To The Decoration Menu`], "minecraft:barrier", 0)
        .pattern([0, 0], [
            '_________',
            '_________',
            '_________',
            '_________',
            '_________',
            '_________'
        ],
            { x: { data: { itemName: [], itemDesc: [], enchanted: false, stackAmount: 1 }, iconPath: 'textures/ui/cointier_backdrop' } })
        .show(player).then(response => {
            if (response === null || response.canceled) return player.sendMessage(`§cLush Menu Closed`) && player.runCommand(`playsound random.chestclosed @s ~~~ 1 1 1`);
            switch (response.selection) {
                case 40: dec(player);
                    break;
                case 11:
                    const title = "Sporee Blossom"
                    const price = 15
                    const item = "minecraft:spore_blossom"
                    const data = 0
                    const money = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§6§o${title}`)
                        .textField(`${title} Costs §a$${price}§r Each\nCurrent Balance §a$${player.score.Money}\n\n§r16 Costs §a$${price * 16}\n§r32 Costs §a$${price * 32}\n§r64 Costs §a$${price * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price * res.formValues[0];
                            if (money < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money} more to buy ${res.formValues[0]} ${title}`)
                            if (money >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                                player.runCommand(`give @s ${item} ${res.formValues[0]} ${data}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 12:
                    const title1 = "Azalea"
                    const price1 = 15
                    const item1 = "minecraft:azalea"
                    const data1 = 0
                    const money1 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§6§o${title1}`)
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
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`)
                        })
                    break;
                case 13:
                    const title2 = "Flowering Azalea"
                    const price2 = 15
                    const item2 = "minecraft:flowering_azalea"
                    const data2 = 0
                    const money2 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§6§o${title2}`)
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
                            else player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`) && player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`)

                        })
                    break;
                case 14:
                    const title3 = "Moss Block"
                    const price3 = 15
                    const item3 = "minecraft:moss_block"
                    const data3 = 0
                    const money3 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§6§o${title3}`)
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
                            else player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 15:
                    const title4 = "Moss Carpet"
                    const price4 = 15
                    const item4 = "minecraft:moss_carpet"
                    const data4 = 0
                    const money4 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§6§o${title4}`)
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
                            else player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 20:
                    const title5 = "Glow Lichen"
                    const price5 = 15
                    const item5 = "minecraft:glow_lichen"
                    const data5 = 0
                    const money5 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§6§o${title5}`)
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
                            else player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 21:
                    const title6 = "Glow Berries"
                    const price6 = 15
                    const item6 = "minecraft:glow_berries"
                    const data6 = 0
                    const money6 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§6§o${title6}`)
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
                            else player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;

            }
        }
        )
}
