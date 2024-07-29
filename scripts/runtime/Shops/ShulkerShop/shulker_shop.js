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


import { world, system, Player, ContainerSlot, WorldBeforeEvents, } from "@minecraft/server";
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

export function shulkermenu(player) {
    new ChestFormData(`double`)
        .title(`§𝕠§2Shulker Menu`)
        .button(11, '§2§lPurple Shulker Box', ['§2Price: §a$5000'], 'minecraft:purple_shulker_box', 0)
        .button(12, '§2§lBlack Shulker Box', ['§2Price: §a$5000'], 'minecraft:black_shulker_box', 0)
        .button(13, '§2§lBlue Shulker Box', ['§2Price: §a$5000'], 'minecraft:blue_shulker_box', 0)
        .button(14, '§2§lBrown Shulker Box', ['§2Price: §a$5000'], 'minecraft:brown_shulker_box', 0)
        .button(15, '§2§lCyan Shulker Box', ['§2Price: §a$5000'], 'minecraft:cyan_shulker_box', 0)
        .button(16, '§2§lGray Shulker Box', ['§2Price: §a$5000'], 'minecraft:gray_shulker_box', 0)
        .button(20, '§2§lGreen Shulker Box', ['§2Price: §a$5000'], 'minecraft:green_shulker_box', 0)
        .button(21, '§2§lLight Blue Shulker Box', ['§2Price: §a$5000'], 'minecraft:light_blue_shulker_box', 0)
        .button(22, '§2§lLight Gray Shulker Box', ['§2Price: §a$5000'], 'minecraft:light_gray_shulker_box', 0)
        .button(23, '§2§lLime Shulker Box', ['§2Price: §a$5000'], 'minecraft:lime_shulker_box', 0)
        .button(24, '§2§lMagenta Shulker Box', ['§2Price: §a$5000'], 'minecraft:magenta_shulker_box', 0)
        .button(25, '§2§lOrange Shulker Box', ['§2Price: §a$5000'], 'minecraft:orange_shulker_box', 0)
        .button(29, '§2§lPink Shulker Box', ['§2Price: §a$5000'], 'minecraft:pink_shulker_box', 0)
        .button(30, '§2§lRed Shulker Box', ['§2Price: §a$5000'], 'minecraft:red_shulker_box', 0)
        .button(31, '§2§lWhite Shulker Box', ['§2Price: §a$5000'], 'minecraft:shulker_box', 0)
        .button(32, '§2§lYellow Shulker Box', ['§2Price: §a$5000'], 'minecraft:yellow_shulker_box', 0)
        .button(40, '§c§lClose', [], 'minecraft:barrier', 0)
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
                    const title = "Purple Shulker Box"
                    const price = 5000
                    const item = "minecraft:purple_shulker_box"
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
                    const title2 = "Black Shulker Box"
                    const price2 = 5000
                    const item2 = "minecraft:black_shulker_box"
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
                case 13:
                    const title3 = "Blue Shulker Box"
                    const price3 = 5000
                    const item3 = "minecraft:blue_shulker_box"
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
                case 14:
                    const title4 = "Brown Shulker Box"
                    const price4 = 5000
                    const item4 = "minecraft:brown_shulker_box"
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
                case 15:
                    const title5 = "Cyan Shulker Box"
                    const price5 = 5000
                    const item5 = "minecraft:cyan_shulker_box"
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
                case 16:
                    const title6 = "Gray Shulker Box"
                    const price6 = 5000
                    const item6 = "minecraft:gray_shulker_box"
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
                case 20:
                    const title7 = "Green Shulker Box"
                    const price7 = 5000
                    const item7 = "minecraft:green_shulker_box"
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
                case 21:
                    const title8 = "Light Blue Shulker Box"
                    const price8 = 5000
                    const item8 = "minecraft:light_blue_shulker_box"
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
                case 22:
                    const title9 = "Light Gray Shulker Box"
                    const price9 = 5000
                    const item9 = "minecraft:light_gray_shulker_box"
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
                case 23:
                    const title10 = "Lime Shulker Box"
                    const price10 = 5000
                    const item10 = "minecraft:lime_shulker_box"
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
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                                player.runCommand(`give @s ${item10} ${res.formValues[0]} ${data10}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§3${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 24:
                    const title11 = "Magenta Shulker Box"
                    const price11 = 5000
                    const item11 = "minecraft:magenta_shulker_box"
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
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                                player.runCommand(`give @s ${item11} ${res.formValues[0]} ${data11}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§3${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 25:
                    const title12 = "Orange Shulker Box"
                    const price12 = 5000
                    const item12 = "minecraft:orange_shulker_box"
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
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                                player.runCommand(`give @s ${item12} ${res.formValues[0]} ${data12}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§3${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 29:
                    const title13 = "Pink Shulker Box"
                    const price13 = 5000
                    const item13 = "minecraft:pink_shulker_box"
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
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                                player.runCommand(`give @s ${item13} ${res.formValues[0]} ${data13}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§3${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 30:
                    const title14 = "Red Shulker Box"
                    const price14 = 5000
                    const item14 = "minecraft:red_shulker_box"
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
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                                player.runCommand(`give @s ${item14} ${res.formValues[0]} ${data14}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§3${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 31:
                    const title15 = "White Shulker Box"
                    const price15 = 5000
                    const item15 = "minecraft:white_shulker_box"
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
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                                player.runCommand(`give @s shulker_box ${res.formValues[0]} ${data15}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§3${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 32:
                    const title16 = "Yellow Shulker Box"
                    const price16 = 5000
                    const item16 = "minecraft:yellow_shulker_box"
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
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                                player.runCommand(`give @s ${item16} ${res.formValues[0]} ${data16}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§3${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
            }
        }
        )
}