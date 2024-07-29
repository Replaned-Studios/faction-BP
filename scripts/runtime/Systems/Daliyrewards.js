/**
 * This code is developed by the_boss9345 (Discord).
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

import { Player, system, world } from '@minecraft/server';
import { getTime, hasTimerReachedEnd, setTimer } from '../../Extensions/functions';
import { ChestFormData } from '../../Extensions/Chestform/forms';
import newEntity from '../../Extensions/EntityHandler';

newEntity('soulless:dailyreward', { nameTag: '§dDaily Rewards' }, ((player, target) => {
    system.run(() => mainform(player, target))
}))

// Daily reward items configuration
const rewardItems = [
    { 
        callback: ((player) => {
            player.runCommandAsync(`scoreboard players add "${player.name}" Money 10000`)
            player.sendMessage(`§c<§dDaily Reward§c> §bYou have won 10k`)
        })
    },
    {
        callback: ((player) => {
            player.runCommandAsync(`scoreboard players add "${player.name}" Money 10000`)
            player.sendMessage(`§c<§dDaily Reward§c> §bYou have won 10k`)
        })
    },
    {
        callback: ((player) => {
            player.runCommandAsync(`scoreboard players add "${player.name}" Money 10000`)
            player.sendMessage(`§c<§dDaily Reward§c> §bYou have won 10k`)
        })
    },
    {
        callback: ((player) => {
            player.addItems([
                ['minecraft:diamond', 32]
            ])
            player.sendMessage(`§c<§dDaily Reward§c> §bYou have won 20 Diamonds`)
        })
    },
    {
        callback: ((player) => {
            player.addItems([
                ['mrleefy:chickenspawner', 1]
            ])
            player.sendMessage(`§c<§dDaily Reward§c> §bYou have won 1 chicken spawner`)
        })
    },
    {
        callback: ((player) => {
            player.addItems([
                ['mrleefy:pigspawner', 1]
            ])
            player.sendMessage(`§c<§dDaily Reward§c> §bYou have won 1 pig spawner`)
        })
    },
    {
        callback: ((player) => {
            player.addItems([
                ['minecraft:iron_ingot', 64]
            ])
            player.sendMessage(`§c<§dDaily Reward§c> §bYou have won 64 Iron Ingots`)
        })
    },
    {
        callback: ((player) => {
            player.addItems([
                ['minecraft:diamond', 64]
            ])
            player.sendMessage(`§c<§dDaily Reward§c> §bYou have won 64 Diamonds`)
        })
    },
    {
        callback: ((player) => {
            player.runCommandAsync(`scoreboard players add "${player.name}" Money 20000`)
            player.sendMessage(`§c<§dDaily Reward§c> §bYou have won 20k`)
        })
    },
    {
        callback: ((player) => {
            player.runCommandAsync(`scoreboard players add "${player.name}" Money 30000`)
            player.sendMessage(`§c<§dDaily Reward§c> §bYou have won 30k`)
        })
    },
    {
        callback: ((player) => {
            player.runCommandAsync(`scoreboard players add "${player.name}" Money 40000`)
            player.sendMessage(`§c<§dDaily Reward§c> §bYou have won 40k`)
        })
    },
    {
        callback: ((player) => {
            player.runCommandAsync(`scoreboard players add "${player.name}" Money 50000`)
            player.sendMessage(`§c<§dDaily Reward§c> §bYou have won 50k`)
        })
    },
    {
        callback: ((player) => {
            player.addItems([
                ['minecraft:netherite_ingot', 2]
            ])
            player.sendMessage(`§c<§dDaily Reward§c> §bYou have won 2 Netherite Ingots`)
        })
    },
    {
        callback: ((player) => {
            player.addItems([
                ['minecraft:netherite_scrap', 3]
            ])
            player.sendMessage(`§c<§dDaily Reward§c> §bYou have won 3 Netherite Scraps`)
        })
    }
]



/**
 * 
 * @param {Player} player 
 * @returns 
 */
function mainform(player, target) {
    if (/^.*\(\d+\)$/.test(player.name)) return player.sendMessage(`§c<System>§7: You are not allowed to use the daily reward system.`);
    const playerdata = Database.get(SRconfig.DatabaseNames.Dailyreward, player) ?? {}
    new ChestFormData(`large`)
        .title('§dDaily §bRewards')
        .button(31, '§l§cExit', [''], 'textures/blocks/barrier')
        .button(21, '§l§bClaim Daily Reward', [``], "textures/ui/icon_blackfriday", 0,)
        .button(23, '§6See §dDaily §bRewards', [``], "minecraft:chest", 0)
        .show(player)
        .then(({ selection, canceled }) => {
            if (canceled || selection === 31) return player.sendMessage('§cDaily Rewards Closed');
            if (selection === 23) return dailrewards(player, target)
            if (Database.has(SRconfig.DatabaseNames.Dailyreward, player) && !hasTimerReachedEnd(playerdata.targetDate)) {
                const time = getTime(playerdata);
                return player.sendMessage(`§c<§dDaily Reward§c>§7 Time left §aDays§7: ${time.days}, §aHours§7: ${time.hours}, §aMinutes§7: ${time.minutes}, §aSeconds§7: ${time.seconds}`);
            }
            target.runCommandAsync('summon fireworks_rocket')
            rewardItems[Math.floor(Math.random() * rewardItems.length)].callback(player)
            player.playSound('random.levelup');
            const nextRewardTime = setTimer(12, 'hours');
            player.sendMessage(`§c<§dDaily Reward§c> §bYou have claimed your daily reward. The next reward will be available in §aDays§7: ${getTime(nextRewardTime).days}, §aHours§7: ${getTime(nextRewardTime).hours}, §aMinutes§7: ${getTime(nextRewardTime).minutes}, §aSeconds§7: ${getTime(nextRewardTime).seconds}`);
            Database.set(SRconfig.DatabaseNames.Dailyreward, JSON.stringify({ targetDate: nextRewardTime.targetDate }), player);
        });
}

//// daily reward list form
function dailrewards(player, target) {
    new ChestFormData(`large`)
        .title(`§dDaily §bRewards`)
        .button(0, '§l§cBack', [''], 'textures/blocks/barrier')
        .button(11, '§l§6Chicken Spawner', [`\nLevel 1`], "textures/items/egg_chicken", 0, true)
        .button(12, '§l§6Pig Spawner', [`\nLevel 1`], "textures/items/egg_pig", 0, true)
        .button(13, '§l§632 Diamonds', [''], "minecraft:diamond", 32)
        .button(14, '§l§664 Diamonds', [''], "minecraft:diamond", 64)
        .button(15, '§l§664 Iron Ingots', [''], "minecraft:iron_ingot", 64)
        .button(20, '§l§610k Money', [''], "textures/ui/icon_best3", 0, true)
        .button(21, '§l§620k Money', [''], "textures/ui/icon_best3", 0, true)
        .button(22, '§l§630k Money', [''], "textures/ui/icon_best3", 0, true)
        .button(23, '§l§640k Money', [''], "textures/ui/icon_best3", 0, true)
        .button(24, '§l§650k Money', [''], "textures/ui/icon_best3", 0, true)
        .button(29, '§l§63 Netherite scraps', [''], "textures/items/netherite_scrap", 3)
        .button(30, '§l§62 netherite ingots', [''], "textures/items/netherite_ingot", 2)
        .button(31, '§l§6More Rewards Coming Soon', [''], "textures/ui/icon_blackfriday", 0, true)
        .show(player).then(response => {
            if (response.canceled) return mainform(player, target)
            switch (response.selection) {
                case 0:
                    mainform(player, target)
                    break
            }
        })
};
///////////
