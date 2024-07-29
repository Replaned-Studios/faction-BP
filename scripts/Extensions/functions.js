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


import { Player, system, world, ItemStack } from "@minecraft/server";

export const formatTime = (milliseconds) => ({
    days: Math.floor(milliseconds / (1000 * 60 * 60 * 24)),
    hours: Math.floor((milliseconds / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((milliseconds / (1000 * 60)) % 60),
    seconds: Math.floor((milliseconds / 1000) % 60),
});

export const getTime = (timerInfo) => {
    const timeRemaining = new Date(timerInfo.targetDate).getTime() - Date.now();
    return formatTime(timeRemaining);
};

/**
 * 
 * @param { number } value 
 * @param { 'hours' | 'days' | 'minutes' | 'seconds' } unit
 * @returns 
 */
export const setTimer = (value, unit) => {
    const targetDate = new Date();
    switch (unit) {
        case 'hours':
            targetDate.setHours(targetDate.getHours() + value);
            break;
        case 'days':
            targetDate.setDate(targetDate.getDate() + value);
            break;
        case 'minutes':
            targetDate.setMinutes(targetDate.getMinutes() + value);
            break;
        case 'seconds':
            targetDate.setSeconds(targetDate.getSeconds() + value);
            break;
    }
    return { value, unit, targetDate };
};

export function hasTimerReachedEnd(targetDate) {
    if (!(targetDate instanceof Date)) targetDate = new Date(targetDate);
    return Date.now() >= targetDate;
}

export function wait(time) {
    return new Promise((resolve) => {
        const waitTimeout = system.runTimeout(() => {
            system.clearRun(waitTimeout);
            resolve();
        }, time);
    });
}

export function UserTime(player) {
    const playdatabase = Database.get('PlayTime', player) ?? {}
    const playtime = playdatabase['playTime'] ?? 0
    const lastLogin = playdatabase['lastLogin'] ?? Date.now()
    let time = playtime + (Date.now() - lastLogin)
    const formattedTime = formatTime(time)
    const times = [
        formattedTime.days > 0 && `${formattedTime.days}d`,
        formattedTime.hours > 0 && `${formattedTime.hours}h`,
        formattedTime.minutes > 0 && `${formattedTime.minutes}m`,
        formattedTime.seconds > 0 && `${formattedTime.seconds}s`
    ].filter(Boolean)
    return times.length > 0 ? times.join(' ') : '0s'
}

world.afterEvents.playerSpawn.subscribe(({ player, initialSpawn }) => {
    if (!initialSpawn) return
    const database = Database.get('PlayTime', player) ?? {}
    database['lastLogin'] = Date.now()
    Database.set('PlayTime', database, player)
})

world.beforeEvents.playerLeave.subscribe(({ player }) => {
    const playTime = UserTime(player)
    const database = Database.get('PlayTime', player) ?? {}
    database['playTime'] = database['playTime'] ? database['playTime'] + (Date.now() - database['lastLogin']) : Date.now() - database['lastLogin']
    Database.set('PlayTime', database, player)
})

function findItem(player, item) {
    const inv = player.getComponent('inventory').container
    const items = Array.from({ length: inv.size }).map((_, i) => inv.getItem(i)?.clone()).filter(v => v !== undefined)
    return items.find(v => v.typeId === item.id && v.amount >= (item.amount || 1)) ? { item: items.find(v => v.typeId === item.id && v.amount >= (item.amount || 1)), slot: items.findIndex(v => v.typeId === item.id && v.amount >= (item.amount || 1)) } : false
}

export function radiusCheck(player, x, y, z, radius) {
    const playerLocation = player.location;
    const playerX = playerLocation.x;
    const playerY = playerLocation.y;
    const playerZ = playerLocation.z;
    const distanceSquared = (playerX - x) ** 2 + (playerY - y) ** 2 + (playerZ - z) ** 2;
    const radiusSquared = radius ** 2;
    return distanceSquared <= radiusSquared;
}


/**
 * Adds items to a player's inventory.
 *
 * @param {Player} player - The player object.
 * @param {Array<[Item, number, Array<Enchantment>]>} items - An array of items to add, where each item is represented by [item, count, enchants].
 * @param {Array<Enchantment>=} enchants - Optional array of enchantments to apply to all items.
 */
export function addItems(player, items) {
  try {
    const inv = player.getComponent('inventory').container;
    for (let [item, count, enchants] of items) {
      const itemStack = new ItemStack(item, count)
      if (enchants && enchants.length > 0) {
        const enchantComp = itemStack.getComponent("enchantable");
        for (const enchant of enchants) enchantComp.addEnchantment({type: enchant.type, level: enchant.level});
      }
      inv.addItem(itemStack);
    }
  } catch (error) {
    throw new Error(error)
  }
} 