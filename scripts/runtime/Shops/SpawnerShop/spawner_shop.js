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

export function spawnermenu(player) {
    new ChestFormData(`double`)
        .title(`§𝕠§5Spawner Menu`)
        .button(11, '§6§5Stone Cutter', ['Price: §a$5000\n\n§6Stone Cutters Are Used To Cut Up Your Spawners\nAnd Turn Leveled Up Spawners Into\nLevel 1 Spawners\nFor Example A Level 10 Will Be 10 Level 1 Spawners'], 'minecraft:stonecutter', 0)
        .button(12, '§6§5Chicken Spawner', ['Price: §a$25k\n\nPlease Remember:\nSpawners Only Level Up to Level 10\n\n§cYOU MUST LEVEL UP YOUR SPAWNERS'], 'textures/items/egg_chicken', 1, true)
        .button(13, '§6§5Pig Spawner', ['Price: §a$75k\n\nPlease Remember:\nSpawners Only Level Up to Level 10\n\n§cYOU MUST LEVEL UP YOUR SPAWNERS'], 'textures/items/egg_pig', 1, true)
        .button(14, '§6§5Sheep Spawner', ['Price: §a$150k\n\nPlease Remember:\nSpawners Only Level Up to Level 10\n\n§cYOU MUST LEVEL UP YOUR SPAWNERS'], 'textures/items/egg_sheep', 1, true)
        .button(15, '§6§5Cow Spawner', ['Price: §a$400k\n\nPlease Remember:\nSpawners Only Level Up to Level 10\n\n§cYOU MUST LEVEL UP YOUR SPAWNERS'], 'textures/items/egg_cow', 1, true)
        .button(20, '§6§5Spider Spawner', ['Price: §a$500k\n\nPlease Remember:\nSpawners Only Level Up to Level 10\n\n§cYOU MUST LEVEL UP YOUR SPAWNERS'], 'textures/items/egg_spider', 1, true)
        .button(30, '§6§5Guardian Spawner', ['Price: §a$3.4m\n\nPlease Remember:\nSpawners Only Level Up to Level 10\n\n§cYOU MUST LEVEL UP YOUR SPAWNERS'], 'textures/items/egg_guardian', 1, true)
        .button(22, '§6§5Skeleton Spawner', ['Price: §a$1.1m\n\nPlease Remember:\nSpawners Only Level Up to Level 10\n\n§cYOU MUST LEVEL UP YOUR SPAWNERS'], 'textures/items/egg_skeleton', 1, true)
        .button(23, '§6§5Slime Spawner', ['Price: §a$1.6m\n\nPlease Remember:\nSpawners Only Level Up to Level 10\n\n§cYOU MUST LEVEL UP YOUR SPAWNERS'], 'textures/items/egg_slime', 1, true)
        .button(24, '§5Magma Cube Spawner', ['Price: §a$2.3m\n\nPlease Remember:\nSpawners Only Level Up to Level 10\n\n§cYOU MUST LEVEL UP YOUR SPAWNERS'], 'textures/items/egg_lava_slime', 1, true)
        .button(29, '§5Blaze Spawner', ['Price: §a$3m\n\nPlease Remember:\nSpawners Only Level Up to Level 10\n\n§cYOU MUST LEVEL UP YOUR SPAWNERS'], 'textures/items/egg_blaze', 1, true)
        .button(21, '§6§5Zombie Spawner', ['Price: §a$750k\n\nPlease Remember:\nSpawners Only Level Up to Level 10\n\n§cYOU MUST LEVEL UP YOUR SPAWNERS'], 'textures/items/egg_zombie', 1, true)
        .button(31, '§6§5Wither Skeleton Spawner', ['Price: §a$4m\n\nPlease Remember:\nSpawners Only Level Up to Level 10\n\n§cYOU MUST LEVEL UP YOUR SPAWNERS'], 'textures/items/egg_wither', 1, true)
        .button(32, '§6§5Wither Spawner', ['Price: §a$7m\n\nPlease Remember:\nSpawners Only Level Up to Level 10\n\n§cYOU MUST LEVEL UP YOUR SPAWNERS'], 'textures/items/egg_wither', 1, true)
        .button(33, '§6§5Iron Golem Spawner', ['Price: §a$10m\n\nPlease Remember:\nSpawners Only Level Up to Level 10\n\n§cYOU MUST LEVEL UP YOUR SPAWNERS'], 'minecraft:iron_golem_spawn_egg', 1)
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
            q: { data: { itemName: 'More Planned To Come', itemDesc: [], enchanted: false, stackAmount: 1 }, iconPath: 'minecraft:element_0' },

        })
        .show(player).then(response => {
            if (response === null || response.canceled) return player.sendMessage(`§cMenu Closed`)
            switch (response.selection) {
                case 49:
                    player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`)
                    break;
                case 11:
                    const title = "Stone Cutter"
                    const price = 5000
                    const item = "minecraft:stonecutter_block"
                    const data = 0
                    const money = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§5§o${title}`)
                        .textField(`${title} Costs §a$${price}§r Each\nCurrent Balance §a$${money}\n\n§r10 Costs §a$${price * 10}\n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price * res.formValues[0];
                            if (money < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money} more to buy ${res.formValues[0]} ${title}`)
                            if (money >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                                player.runCommand(`give @s ${item} ${res.formValues[0]} ${data}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§5${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 12:
                    const title1 = "Chicken Spawner"
                    const price1 = 25000
                    const item1 = "mrleefy:chickenspawner"
                    const data1 = 0
                    const money1 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§5§o${title1}`)
                        .textField(`${title1} Costs §a$${price1}§r Each\nCurrent Balance §a$${money1}\n\n§r10 Costs §a$${price1 * 10}\n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price1 * res.formValues[0];
                            if (money1 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money1} more to buy ${res.formValues[0]} ${title1}`)
                            if (money1 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title1} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                                player.runCommand(`give @s ${item1} ${res.formValues[0]} ${data1}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§5${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 13:
                    const title2 = "Pig Spawner"
                    const price2 = 75000
                    const item2 = "mrleefy:pigspawner"
                    const data2 = 0
                    const money2 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§5§o${title2}`)
                        .textField(`${title2} Costs §a$${price2}§r Each\nCurrent Balance §a$${money2}\n\n§r10 Costs §a$${price2 * 10}\n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price2 * res.formValues[0];
                            if (money2 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money2} more to buy ${res.formValues[0]} ${title2}`)
                            if (money2 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title2} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                                player.runCommand(`give @s ${item2} ${res.formValues[0]} ${data2}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§5${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 14:
                    const title3 = "Sheep Spawner"
                    const price3 = 150000
                    const item3 = "mrleefy:sheepspawner"
                    const data3 = 0
                    const money3 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§5§o${title3}`)
                        .textField(`${title3} Costs §a$${price3}§r Each\nCurrent Balance §a$${money3}\n\n§r10 Costs §a$${price3 * 10}\n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price3 * res.formValues[0];
                            if (money3 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money3} more to buy ${res.formValues[0]} ${title3}`)
                            if (money3 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title3} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                                player.runCommand(`give @s ${item3} ${res.formValues[0]} ${data3}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§5${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 15:
                    const title4 = "Cow Spawner"
                    const price4 = 400000
                    const item4 = "mrleefy:cowspawner"
                    const data4 = 0
                    const money4 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§5§o${title4}`)
                        .textField(`${title4} Costs §a$${price4}§r Each\nCurrent Balance §a$${money4}\n\n§r10 Costs §a$${price4 * 10}\n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price4 * res.formValues[0];
                            if (money4 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money4} more to buy ${res.formValues[0]} ${title4}`)
                            if (money4 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title4} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                                player.runCommand(`give @s ${item4} ${res.formValues[0]} ${data4}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§5${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 20:
                    const title5 = "Spider Spawner"
                    const price5 = 500000
                    const item5 = "mrleefy:spiderspawner"
                    const data5 = 0
                    const money5 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§5§o${title5}`)
                        .textField(`${title5} Costs §a$${price5}§r Each\nCurrent Balance §a$${money5}\n\n§r10 Costs §a$${price5 * 10}\n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price5 * res.formValues[0];
                            if (money5 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money5} more to buy ${res.formValues[0]} ${title5}`)
                            if (money5 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title5} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                                player.runCommand(`give @s ${item5} ${res.formValues[0]} ${data5}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§5${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 30:
                    const title6 = "Guardian Spawner"
                    const price6 = 3400000
                    const item6 = "mrleefy:guardianspawner"
                    const data6 = 0
                    const money6 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§5§o${title6}`)
                        .textField(`${title6} Costs §a$${price6}§r Each\nCurrent Balance §a$${money6}\n\n§r10 Costs §a$${price6 * 10}\n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price6 * res.formValues[0];
                            if (money6 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money6} more to buy ${res.formValues[0]} ${title6}`)
                            if (money6 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title6} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                                player.runCommand(`give @s ${item6} ${res.formValues[0]} ${data6}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§5${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 22:
                    const title7 = "Skeleton Spawner"
                    const price7 = 1100000
                    const item7 = "mrleefy:skeletonspawner"
                    const data7 = 0
                    const money7 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§5§o${title7}`)
                        .textField(`${title7} Costs §a$${price7}§r Each\nCurrent Balance §a$${money7}\n\n§r10 Costs §a$${price7 * 10}\n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price7 * res.formValues[0];
                            if (money7 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money7} more to buy ${res.formValues[0]} ${title7}`)
                            if (money7 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title7} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                                player.runCommand(`give @s ${item7} ${res.formValues[0]} ${data7}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§5${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 23:
                    const title8 = "Slime Spawner"
                    const price8 = 1600000
                    const item8 = "mrleefy:slimespawner"
                    const data8 = 0
                    const money8 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§5§o${title8}`)
                        .textField(`${title8} Costs §a$${price8}§r Each\nCurrent Balance §a$${money8}\n\n§r10 Costs §a$${price8 * 10}\n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price8 * res.formValues[0];
                            if (money8 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money8} more to buy ${res.formValues[0]} ${title8}`)
                            if (money8 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title8} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                                player.runCommand(`give @s ${item8} ${res.formValues[0]} ${data8}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§5${res.formValues[0]} §cIs Not A Valid Amount!`)

                        })
                    break;
                case 24:
                    const title9 = "Magma Cube Spawner"
                    const price9 = 2300000
                    const item9 = "mrleefy:magmacubespawner"
                    const data9 = 0
                    const money9 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§5§o${title9}`)
                        .textField(`${title9} Costs §a$${price9}§r Each\nCurrent Balance §a$${money9}\n\n§r10 Costs §a$${price9 * 10}\n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price9 * res.formValues[0];
                            if (money9 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money9} more to buy ${res.formValues[0]} ${title9}`)
                            if (money9 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title9} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                                player.runCommand(`give @s ${item9} ${res.formValues[0]} ${data9}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§5${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 29:
                    const title10 = "Blaze Spawner"
                    const price10 = 3000000
                    const item10 = "mrleefy:blazespawner"
                    const data10 = 0
                    const money10 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§5§o${title10}`)
                        .textField(`${title10} Costs §a$${price10}§r Each\nCurrent Balance §a$${money10}\n\n§r10 Costs §a$${price10 * 10}\n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price10 * res.formValues[0];
                            if (money10 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money10} more to buy ${res.formValues[0]} ${title10}`)
                            if (money10 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title10} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                                player.runCommand(`give @s ${item10} ${res.formValues[0]} ${data10}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§5${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 21:
                    const title11 = "Zombie Spawner"
                    const price11 = 750000
                    const item11 = "mrleefy:zombiespawner"
                    const data11 = 0
                    const money11 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§5§o${title11}`)
                        .textField(`${title11} Costs §a$${price11}§r Each\nCurrent Balance §a$${money11}\n\n§r10 Costs §a$${price11 * 10}\n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price11 * res.formValues[0];
                            if (money11 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money11} more to buy ${res.formValues[0]} ${title11}`)
                            if (money11 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title11} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                                player.runCommand(`give @s ${item11} ${res.formValues[0]} ${data11}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§5${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 31:
                    const title12 = "Wither Skeleton Spawner"
                    const price12 = 4000000
                    const item12 = "mrleefy:witherskeletonspawner"
                    const data12 = 0
                    const money12 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§5§o${title12}`)
                        .textField(`${title12} Costs §a$${price12}§r Each\nCurrent Balance §a$${money12}\n\n§r10 Costs §a$${price12 * 10}\n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price12 * res.formValues[0];
                            if (money12 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money12} more to buy ${res.formValues[0]} ${title12}`)
                            if (money12 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title12} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                                player.runCommand(`give @s ${item12} ${res.formValues[0]} ${data12}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§5${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 32:
                    const title13 = "Wither Spawner"
                    const price13 = 7000000
                    const item13 = "mrleefy:witherspawner"
                    const data13 = 0
                    const money13 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§5§o${title13}`)
                        .textField(`${title13} Costs §a$${price13}§r Each\nCurrent Balance §a$${money13}\n\n§r10 Costs §a$${price13 * 10}\n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price13 * res.formValues[0];
                            if (money13 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money13} more to buy ${res.formValues[0]} ${title13}`)
                            if (money13 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title13} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                                player.runCommand(`give @s ${item13} ${res.formValues[0]} ${data13}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§5${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
                case 33:
                    const title14 = "Iron Golem Spawner"
                    const price14 = 10000000
                    const item14 = "mrleefy:iron_golem_spawner"
                    const data14 = 0
                    const money14 = getScore(player, "Money")
                    new ModalFormData()
                        .title(`§5§o${title14}`)
                        .textField(`${title14} Costs §a$${price14}§r Each\nCurrent Balance §a$${money14}\n\n§r10 Costs §a$${price14 * 10}\n\n§rEnter How Much You Wanna Buy`, `Example: 100`)
                        .show(player).then(res => {
                            const cost = price14 * res.formValues[0];
                            if (money14 < cost && res.formValues[0] > 0) return player.sendMessage(`§cYou do not have enough money! you need $${cost - money14} more to buy ${res.formValues[0]} ${title14}`)
                            if (money14 >= cost && res.formValues[0] > 0) {
                                player.sendMessage(`§aYou have purchased ${res.formValues[0]} ${title14} for $${cost}`);
                                player.runCommand(`scoreboard players remove @s Money ${cost}`);
                                player.runCommand(`playsound mob.villager.yes @s ~~~ 1 1 1`)
                                player.runCommand(`give @s ${item14} ${res.formValues[0]} ${data14}`)
                            }
                            else player.runCommand(`playsound mob.villager.no @s ~~~ 1 1 1`) && player.sendMessage(`§5${res.formValues[0]} §cIs Not A Valid Amount!`)
                        })
                    break;
            }
        }
        )
}