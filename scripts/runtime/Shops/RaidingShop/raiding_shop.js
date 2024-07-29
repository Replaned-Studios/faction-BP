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

export function raidmenu(player) {
    new ChestFormData(`double`)
        .title(`§𝕠§u§uRaid Menu`)
        .button(11, '§6§uTNT', ['§𝕠§oPrice: §a$1000'], 'minecraft:tnt', 0, true)
        .button(12, '§6§uInvis 3 Mins', ['§𝕠§oPrice: §a$2000'], 'textures/items/potion_bottle_invisibility', 0, true)
        .button(13, '§6§uInstant Health 1', ['§𝕠§oPrice: §a$3000'], 'textures/items/potion_bottle_splash_regeneration', 0, true)
        .button(14, '§6§uWeakness 1', ['§𝕠§oPrice: §a$1500'], 'textures/items/potion_bottle_splash_weakness', 0, true)
        .button(15, '§6§uSwiftness 2\n1 Min', ['§𝕠§oPrice: §a$2000'], 'textures/items/potion_bottle_splash_moveSpeed', 0, true)
        .button(20, '§6§uEnder Pearls', ['§𝕠§oPrice: §a$125'], 'textures/items/ender_pearl', 0, true)
        .button(21, '§6§uEnder Chest', ['§𝕠§oPrice: §a$25000'], 'minecraft:ender_chest', 0, true)
        .button(22, '§6§uGolden Apple', ['§𝕠§oPrice: §a$5000'], 'minecraft:golden_apple', 0)
        .button(23, '§6§uCorus Fruit', ['§𝕠§oPrice: §a$500'], 'textures/items/chorus_fruit', 0, true)
        .button(24, '§6§uFireworks', ['§𝕠§oPrice: §a$200'], 'textures/items/fireworks', 0, true)
        .button(29, '§6§uElytra', ['§𝕠§oPrice: §a$250000'], 'textures/items/elytra', 0, true)
        .button(30, '§6§uTotem', ['§𝕠§oPrice: §a$200000'], 'textures/items/totem', 0, true)
        .button(31, '§6§uShield', ['§𝕠§oPrice: §a$500'], 'textures/ui/empty_armor_slot_shield', 0, true)
        .button(32, '§6§uWater Bucket', ['§𝕠§oPrice: §a$500'], 'textures/items/bucket_water', 0, true)
        .button(33, '§6§uLava Bucket', ['§𝕠§oPrice: §a$1000'], 'textures/items/bucket_lava', 0, true)
        .button(38, '§6§uXp Bottles', ['§𝕠§oPrice: §a$2000'], 'textures/items/experience_bottle', 0, true)
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
                    const title = "TNT"
                    const price = 1000
                    const item = "minecraft:tnt"
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
                    const title1 = "Invis 3 Mins"
                    const price1 = 2000
                    const item1 = "minecraft:potion"
                    const data1 = 7
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
                    const title2 = "Instant Health 1"
                    const price2 = 3000
                    const item2 = "minecraft:splash_potion"
                    const data2 = 21
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
                    const title3 = "Weakness 3 Mins"
                    const price3 = 1500
                    const item3 = "minecraft:splash_potion"
                    const data3 = 35
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
                    const title4 = "Swiftness 2\n1 Min"
                    const price4 = 2000
                    const item4 = "minecraft:splash_potion"
                    const data4 = 16
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
                    const title5 = "Ender Pearls"
                    const price5 = 125
                    const item5 = "minecraft:ender_pearl"
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
                    const title6 = "Ender Chest"
                    const price6 = 25000
                    const item6 = "minecraft:ender_chest"
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
                    const title7 = "Golden Apple"
                    const price7 = 5000
                    const item7 = "minecraft:golden_apple"
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
                    const title8 = "Corus Fruit"
                    const price8 = 500
                    const item8 = "minecraft:chorus_fruit"
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
                    const title9 = "Fireworks"
                    const price9 = 200
                    const item9 = "minecraft:firework_rocket"
                    const data9 = 3
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
                    const title10 = "Elytra"
                    const price10 = 250000
                    const item10 = "minecraft:elytra"
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
                case 30:
                    const title11 = "Totem"
                    const price11 = 200000
                    const item11 = "minecraft:totem_of_undying"
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
                case 31:
                    const title12 = "Shield"
                    const price12 = 500
                    const item12 = "minecraft:shield"
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
                case 32:
                    const title13 = "Water Bucket"
                    const price13 = 500
                    const item13 = "minecraft:water_bucket"
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
                case 33:
                    const title14 = "Lava Bucket"
                    const price14 = 1000
                    const item14 = "minecraft:lava_bucket"
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
                case 38:
                    const title15 = "Xp Bottle"
                    const price15 = 2000
                    const item15 = "minecraft:experience_bottle"
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
                                player.runCommand(`give @s ${item15} ${res.formValues[0]} ${data15}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§3${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
            }
        }
        )
}