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
import { ModalFormData } from "@minecraft/server-ui";

export { getScore };
function getScore(player, objective, alwaysnumber = true) {
    try {
        return world.scoreboard
            .getObjective(objective)
            .getScore(player.scoreboardIdentity);
    } catch {
        return 0;
    }
}
// shop imports
import { logs } from "./logs.js";
import { stone } from "./stone.js";
import { glass } from "./glass.js";
import { dec } from "./dec.js";


/**
 * 
 * @param {Player} player 
 */

export function menu(player) {
    new ChestFormData(`double`)
        .title(`§𝕠§6§oBuilding Blocks Main Menu`)
        .button(11, '§𝕠§nLogs', [], "minecraft:oak_log", 0)
        .button(12, `§𝕠§l§8Stone Blocks`, [], "minecraft:stonebrick", 0)
        .button(13, `§𝕠§l§bGlass Blocks`, [], "minecraft:glass", 0)
        .button(14, `§𝕠§l§uDecoration Blocks`, [`Wool\nFlowers\nLush Cave Items`], "minecraft:white_wool", 0)
        .button(15, `§𝕠§l§6Misc Blocks`, [`\nLet me know what you guys want in this menu`], "textures/items/bucket_empty", 0, true)
        .button(31, '§c§lClose', [], 'minecraft:barrier', 0)
        .pattern([0, 0], [
            '_________',
            '_l_____r_',
            '_________',
            '_________',
            '_________',
            '_________'
        ], {
            l: { data: { itemName: '§𝕠§6Building Menu', itemDesc: [], enchanted: true, stackAmount: 1 }, iconPath: "textures/ui/hammer_l" },
            r: { data: { itemName: '§𝕠§6Building Menu', itemDesc: [], enchanted: true, stackAmount: 1 }, iconPath: "textures/ui/hammer_r" },

        })
        .show(player).then(response => {
            if (response === null || response.canceled) return player.sendMessage(`§cMenu Closed`)
            switch (response.selection) {
                case 11:
                    logs(player);
                    player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
                    break;
                case 12:
                    stone(player);
                    player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
                    break;
                case 13:
                    glass(player);
                    player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
                    break;
                case 14:
                    dec(player);
                    player.runCommand(`playsound random.chestopen @s ~~~ 1 1 1`)
                    break;
                case 15:
                    misc(player);
                    player.sendMessage(`§cComing Soon!`)
                    break;
            }
        })
};

function misc(player) {
    new ChestFormData(`double`)
        .title(`§𝕠§6§oBuilding Blocks Main Menu`)
        .button(11, '§𝕠Obsidian', [`Price: §a1000`], "minecraft:obsidian", 0)
        .button(12, '§𝕠Crying Obsidian', [`Price: §a1000`], "minecraft:crying_obsidian", 0)
        .button(13, `§𝕠§lGlowstone`, [`Price: §a1000`], "minecraft:glowstone", 0)
        .button(14, `§𝕠§lDirt`, [`Price: §a10`], "textures/blocks/dirt", 0)
        .button(31, '§c§lClose', [], 'minecraft:barrier', 0)
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
                case 11:
                    const title = "Obsidian"
                    const price = 1000
                    const item = "minecraft:obsidian"
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
                        const title3 = "Crying Obsidian"
                        const price3 = 1000
                        const item3 = "minecraft:crying_obsidian"
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
                case 13:
                    const title2 = "Glowstone"
                    const price2 = 1000
                    const item2 = "minecraft:glowstone"
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
                    const title4 = "Dirt"
                    const price4 = 10
                    const item4 = "minecraft:dirt"
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
            }
        })
};