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

export function redstone(player) {
    new ChestFormData(`double`)
        .title(`§𝕠§cRedstone Menu`)
        .button(11, '§6§oRedstone Dust', ["§aPrice: $5"], 'textures/items/redstone_dust', 0)
        .button(12, '§6§oRedstone Torch', ["§aPrice: $3"], 'minecraft:redstone_torch', 0)
        .button(13, '§6§oRedstone Block', ["§aPrice: $30"], 'minecraft:redstone_block', 0)
        .button(14, '§6§oRedstone Lamp', ["§aPrice: $20"], 'minecraft:redstone_lamp', 0)
        .button(15, '§6§oRedstone Repeater', ["§aPrice: $20"], 'textures/items/repeater', 0)
        .button(20, '§6§oRedstone Comparator', ["§aPrice: $20"], 'textures/items/comparator', 0)
        .button(21, '§6§oObserver', ["§aPrice: $50"], 'minecraft:observer', 0)
        .button(22, '§6§oPiston', ["§aPrice: $50"], 'minecraft:piston', 0)
        .button(23, '§6§oSticky Piston', ["§aPrice: $75"], 'minecraft:sticky_piston', 0)
        .button(24, '§6§oDispenser', ["§aPrice: $40"], 'minecraft:dispenser', 0)
        .button(29, '§6§oDropper', ["§aPrice: $40"], 'minecraft:dropper', 0)
        .button(30, '§6§oHopper', ["§aPrice: $100"], 'textures/items/hopper', 0)
        .button(40, '§c§lClose', [], 'minecraft:barrier', 0)
        .show(player).then(response => {
            if (response === null || response.canceled) return player.sendMessage(`§cMenu Closed`)
            switch (response.selection) {
                case 49:
                    player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`)
                    break;
                case 11:
                    const title = "Redstone Dust"
                    const price = 5
                    const item = "minecraft:redstone"
                    const data = 0
                    const money = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§c§o${title}`)
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
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 12:
                    const title1 = "Redstone Torch"
                    const price1 = 3
                    const item1 = "minecraft:redstone_torch"
                    const data1 = 0
                    const money1 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§c§o${title1}`)
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
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 13:
                    const title2 = "Redstone Block"
                    const price2 = 30
                    const item2 = "minecraft:redstone_block"
                    const data2 = 0
                    const money2 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§c§o${title2}`)
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
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 14:
                    const title3 = "Redstone Lamp"
                    const price3 = 20
                    const item3 = "minecraft:redstone_lamp"
                    const data3 = 0
                    const money3 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§c§o${title3}`)
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
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 15:
                    const title4 = "Redstone Repeater"
                    const price4 = 20
                    const item4 = "minecraft:repeater"
                    const data4 = 0
                    const money4 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§c§o${title4}`)
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
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 20:
                    const title5 = "Redstone Comparator"
                    const price5 = 20
                    const item5 = "minecraft:comparator"
                    const data5 = 0
                    const money5 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§c§o${title5}`)
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
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 21:
                    const title6 = "Observer"
                    const price6 = 50
                    const item6 = "minecraft:observer"
                    const data6 = 0
                    const money6 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§c§o${title6}`)
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
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 22:
                    const title7 = "Piston"
                    const price7 = 50
                    const item7 = "minecraft:piston"
                    const data7 = 0
                    const money7 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§c§o${title7}`)
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
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 23:
                    const title8 = "Sticky Piston"
                    const price8 = 75
                    const item8 = "minecraft:sticky_piston"
                    const data8 = 0
                    const money8 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§c§o${title8}`)
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
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 24:
                    const title9 = "Dispenser"
                    const price9 = 40
                    const item9 = "minecraft:dispenser"
                    const data9 = 0
                    const money9 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§c§o${title9}`)
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
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 29:
                    const title10 = "Dropper"
                    const price10 = 40
                    const item10 = "minecraft:dropper"
                    const data10 = 0
                    const money10 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§c§o${title10}`)
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
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 30:
                    const title11 = "Hopper"
                    const price11 = 100
                    const item11 = "minecraft:hopper"
                    const data11 = 0
                    const money11 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§c§o${title11}`)
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
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§6${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
            }
        }
        )
}

