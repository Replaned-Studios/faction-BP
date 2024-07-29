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

export { logs }
function logs(player) {
    new ChestFormData(`double`)
        .title(`§n§oLogs Menu`)
        .button(11, '§𝕠§l§nOak Log', [`Price: $2 Each`], "minecraft:oak_log", 0)
        .button(12, '§𝕠§l§nSpruce Log', [`Price: $2 Each`], "minecraft:spruce_log", 0)
        .button(13, '§𝕠§l§nBirch Log', [`Price: $2 Each`], "minecraft:birch_log", 0)
        .button(14, '§𝕠§l§nJungle Log', [`Price: $2 Each`], "minecraft:jungle_log", 0)
        .button(15, '§𝕠§l§nAcacia Log', [`Price: $2 Each`], "minecraft:acacia_log", 0)
        .button(21, '§𝕠§l§nDark Oak Log', [`Price: $2 Each`], "minecraft:dark_oak_log", 0)
        .button(22, '§𝕠§l§nCrimson Log', [`Price: $2 Each`], "minecraft:crimson_stem", 0)
        .button(23, '§𝕠§l§nWarped Log', [`Price: $2 Each`], "minecraft:warped_stem", 0)
        .button(40, '§𝕠§l§cBack', [`§r§7Go Back To The Main Menu`], "minecraft:barrier", 0)
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
            if (response === null || response.canceled) return player.sendMessage(`§cLogs Menu Closed`) && player.runCommand(`playsound random.chestclosed @s ~~~ 1 1 1`);
            switch (response.selection) {
                case 40: menu(player);
                    player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
                    break;
                case 11:
                    const title = "Oak Logs"
                    const price = 2
                    const item = "oak_log"
                    const data = 0
                    const money = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`§n§o${title}`)
                        .textField(`${title} Costs §a$${price}§r Each\nCurrent Balance §a$${money}\n\n§r16 Costs §a$${price * 16}\n§r32 Costs §a$${price * 32}\n§r64 Costs §a$${price * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price * res.formValues[0];
                            if (money < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money} more to buy ${res.formValues[0]} ${title}`)
                            if (money >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item} ${res.formValues[0]} ${data}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§n${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 12:
                    const title1 = "Spruce Logs"
                    const price1 = 2
                    const item1 = "spruce_log"
                    const data1 = 0
                    const money1 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`§n§o${title1}`)
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
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§n${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 13:
                    const title2 = "Birch Logs"
                    const price2 = 2
                    const item2 = "birch_log"
                    const data2 = 0
                    const money2 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`§n§o${title2}`)
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
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§n${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 14:
                    const title3 = "Jungle Logs"
                    const price3 = 2
                    const item3 = "jungle_log"
                    const data3 = 0
                    const money3 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`§n§o${title3}`)
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
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§n${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 15:
                    const title4 = "Acacia Logs"
                    const price4 = 2
                    const item4 = "acacia_log"
                    const data4 = 0
                    const money4 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`§n§o${title4}`)
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
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§n${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 21:
                    const title5 = "Dark Oak Logs"
                    const price5 = 2
                    const item5 = "dark_oak_log"
                    const data5 = 0
                    const money5 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`§n§o${title5}`)
                        .textField(`${title5} Costs §a$${price5}§r Each\nCurrent Balance §a$${money5}\n\n§r16 Costs §a$${price5 * 16}\n§r32 Costs §a$${price5 * 32}\n§r64 Costs §a$${price5 * 64} \n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price5 * res.formValues[0];
                            if (money5 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money5} more to buy ${res.formValues[0]} ${55}`)
                            if (money5 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title5} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`give @s ${item5} ${res.formValues[0]} ${data5}`)
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§n${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 22:
                    const title6 = "Crimson Logs"
                    const price6 = 2
                    const item6 = "crimson_stem"
                    const data6 = 0
                    const money6 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`§n§o${title6}`)
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
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§n${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 23:
                    const title7 = "Warped Logs"
                    const price7 = 2
                    const item7 = "warped_stem"
                    const data7 = 0
                    const money7 = getScore(player, "Money")
                    player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                    new ModalFormData()
                        .title(`§n§o${title7}`)
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
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§n${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
            }
        })
}