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


import { Player, system } from "@minecraft/server";
/**
 * 
 * @param {Player} player 
 * @param {{
*  [key: string]: { price: number, amount?: number,}}} items 
    * @returns 
    */
export async function sellPad(player, items) {
    const inv = inventory(player);
    let messages = [];
    for (const [name, { price, amount }] of Object.entries(items)) {
        const itemAmount = inv.items[name]?.amount || 0;
        if (!items[name]) continue;
        const sellableAmount = amount ? Math.floor(itemAmount / amount) * amount : itemAmount;
        const totalPrice = Math.floor(sellableAmount / amount) * price;
        player.hasTag('VIP') ? player.score.Money += totalPrice * 1.1 : player.score.Money += totalPrice
        player.runCommandAsync(`clear @s ${name} 0 ${sellableAmount}`);
        if (sellableAmount > 0) {
            const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1).replace(/_/g, ' ');
            if (sellableAmount === 1 || sellableAmount > 1) {
                messages.push({ item: capitalizedName, amount: sellableAmount, price: totalPrice })
            }
        }
    }
    if (messages.length === 0) return;
    const price = messages.map(({ price }) => price).reduce((acc, price) => acc + price)
    player.sendMessage(`§6Selling ${messages.map(({ item, amount }) => `${amount} ${item}`).join(', ')} For $${player.hasTag('VIP') ? Math.floor(price * 1.1) : Math.floor(price)}`);
}

/**
 *  
 * @param {Player} player 
 * @returns 
 */
function inventory(player) {
    const inv = player.getComponent('inventory').container;
    return {
        items: Array.from({ length: 36 }).map((_, i) => inv.getItem(i)).filter(Boolean).reduce((acc, item, i) => {
            const name = item.typeId.split(':')[1] || item.typeId;
            acc[name] = { name, amount: (acc[name]?.amount || 0) + item.amount };
            return acc;
        }, {}),
    }
};