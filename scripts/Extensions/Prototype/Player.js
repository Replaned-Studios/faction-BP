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


import { world, Player, system, ItemStack, Entity } from "@minecraft/server";

const prototypes = {
    score: {
        get() {
            const player = this;
            return new Proxy({}, {
                get(_, key) {
                    try {
                        return world.scoreboard.getObjective(key).getScore(player) ?? 0;
                    } catch {
                        return 0;
                    }
                },
                set(_, key, value) {
                    try {
                        world.scoreboard.getObjective(key).setScore(player, value)
                    } catch {
                        player.runCommandAsync(`scoreboard players set @s ${key} ${value}`)
                    }
                    return true;
                },
            })
        },
    },
    addItems: {
        value(items) {
            /** * @type {Player} player */
            const player = this;
            system.run(() => {
                const inv = player.getComponent('inventory').container;
                for (let [item, count, enchants] of items) {
                    const itemStack = new ItemStack(item, count)
                    if (enchants && enchants.length > 0) {
                        const enchantComp = itemStack.getComponent("enchantable")
                        for (const enc of enchants) console.log(JSON.stringify(enc))
                        for (const enchant of enchants) enchantComp.addEnchantment(enchant);
                    }
                    inv.addItem(itemStack);
                }
            })
        }
    },
    factions: {
        get() {
            /**@type {Player} */
            const player = this;
            const defaultFactionData = {
                name: '',
                description: '',
                leader: {},
                members: [],
                claims: {},
                created: Date.now(),
                balance: 0,
                officers: [],
                invites: [],
                privte: false,
            };

            const getFactionKey = (factionName) => `Faction:${factionName}`;
            const getFactionData = (factionName) => Database.get(getFactionKey(factionName)) ?? {}
            const setFactionData = (factionName, factionData) => Database.set(getFactionKey(factionName), factionData)
            return {
                create(factionData) {
                    return new Promise((resolve, reject) => {
                        if (!factionData?.name || !factionData.leader?.id || !factionData.leader?.name || !factionData.hasOwnProperty('privte')) return reject('Networking Error try again later');
                        if (this.exists(factionData.name)) return reject('Faction already exists');

                        setFactionData(factionData.name, { ...defaultFactionData, ...factionData });
                        resolve('Success');

                    });
                },
                FactionData(factionName) {
                    return getFactionData(factionName)
                },
                delete(factionName) {
                    Database.delete(getFactionKey(factionName));
                },
                exists(factionName) {
                    return Database.has(getFactionKey(factionName));
                },
                set(factionName, newFactionData) {
                    return new Promise((resolve, reject) => {
                        if (!this.exists(factionName)) {
                            reject('Faction does not exist');
                        } else {
                            const oldFactionData = getFactionData(factionName);
                            const updatedFactionData = { ...oldFactionData, ...newFactionData };
                            Database.delete(getFactionKey(factionName));
                            setFactionData(updatedFactionData.name || factionName, updatedFactionData);
                            resolve('Success');
                        }
                    });
                },
                get inFaction() {
                    return this.allFactions.find(({ officers, members, leader }) => leader?.id === player.id || officers?.some(({ id }) => id === player.id) || members?.some(({ id }) => id === player.id)) ?? null;
                },
                get allFactions() {
                    return Database.entries().filter(([key]) => key.startsWith('Faction:')).map(([key, value]) => value) ?? [];
                },
                get in() {
                    return this.allFactions.some(({ officers, members, leader }) => leader?.id === player.id || officers?.some(({ id }) => id === player.id) || members?.some(({ id }) => id === player.id)) ?? null;
                }
            };
        }
    },
    auction: {
        get() {
            /**@type {Player} */
            const player = this;
            const auctionTemplate = {
                status: 'open',
                id: 0,
                price: 0,
                item: {},
                seller: { name: player.name, id: player.id },
                bids: [],
                oldbids: [],
                taken: {},
                time: '',
                type: '',
            }
            return {
                get auctions() {
                    return Database.get(`auctions:${player.id}`) ?? []
                },
                add(auction) {
                    return new Promise((res) => {
                        const auctions = Database.get(`auctions:${auction.seller.id}`)  ?? []
                        auction = { ...auctionTemplate, ...auction };
                        const id = Math.floor(Math.random() * 99999999 + 1);
                        auction.id = id;
                        auctions.push(auction);
                        Database.set(`auctions:${auction.seller.id}`, auctions);
                        res(id);
                    });
                },
                remove(id) {
                    if (!this.getAll) return
                    const auctions = this.getAll.find((auction) => auction.id === id);
                    if (!auctions) return;
                    const delatedData = Database.get(`auctions:${auctions.seller.id}`).filter((auction) => auction.id !== id)
                    if (delatedData.length === 0) return Database.delete(`auctions:${auctions.seller.id}`);
                    Database.set(`auctions:${auctions.seller.id}`, delatedData);
                },
                get(id) {
                    return this.getAll?.find((auction) => auction.id === id) ? this.getAll.find((auction) => auction.id === id) : undefined;
                },
                get getAll() {
                   return Database.entries().map(([key, auction]) => key.startsWith('auctions:') && auction).filter(Boolean).flat()
                },
                update(id, data) {
                    const auction = this.getAll.find((auction) => auction.id === id);
                    const auctionArray = Database.get(`auctions:${auction.seller.id}`)
                    if (!auction) return;
                    const index = auctionArray.findIndex((auction) => auction.id === id);
                    auctionArray[index] = { ...auction, ...data };
                    Database.set(`auctions:${auction.seller.id}`, auctionArray);
                }
            }
        }
    },
    itemInfo: {
        /**
         * @param {ItemStack} item
         **/
        value(item) {
            if (!item) return undefined
            const itemEnc = item.getComponent('enchantable');
            const itemInfo = {
                id: item.typeId,
                amount: item.amount,
                lore: item.getLore(),
                nameTag: item.nameTag,
                enchantments: [],
                durability: item.getComponent("durability")?.maxDurability ?
                    item.getComponent("durability")?.maxDurability - (item.getComponent("durability")?.maxDurability - item.getComponent("durability")?.damage) : undefined,
            };
            if (itemEnc && itemEnc.isValid()) {
                for (const enchant of itemEnc.getEnchantments()) {
                    const typeId = enchant.type
                     const level = enchant.level;
                    itemInfo.enchantments.push({ type: typeId, level: level });
                }
            } else enchantments = undefined
            return itemInfo;
        },
    },
    giveItem: {
              
        value(item, count = 1, enchants = []) {
            system.run(() => {
                const inv = this.getComponent('inventory').container;
                const itemStack = new ItemStack(item, count)
                if (enchants && enchants.length > 0) {
                    const enchantComp = itemStack.getComponent('enchantable');
                    for (const enchant of enchants) enchantComp.addEnchantment({ type: enchant.type, level: enchant.level });
                }
                inv.addItem(itemStack);
            })
        }
    },
    kick: {
        value(target, message) {
            this.runCommandAsync(`kick "${target}" ${message}`)
        }
    },
    radiusEntities: {
        value: (radius = 0) => {
            return his?.dimension?.getEntities({location: this.location, maxDistance: radius ** 2 })
        }
    }
}

Object.defineProperties(Player.prototype, prototypes);

Object.defineProperties(Entity.prototype, {
    radiusEntities: {
        value: (radius = 0) => {
            return this?.dimension?.getEntities({location: this.location, maxDistance: radius ** 2 })
        }
    }
})

const numberprototypes = {
    sort: {
        get() {
            const number = this.valueOf();
            if (number === 0) return "0";
            const suffixes = ["", "k", "m", "b", "t", "q", "Q", "s", "S", "o", "n", "d", "U", "D", "T", "Qt", "Qd", "Sd", "Od", "Nd", "V", "Uv", "Dv"];
            const power = Math.floor(Math.log10(Math.abs(number)) / 3);
            const math = Math.abs(number) / Math.pow(10, power * 3)
            return `${number < 0 ? "-" : ""}${(math > 1000 ? math.toFixed(2) : math.toFixed(2))}${suffixes[power]}`.toUpperCase()
        },
        configurable: true
    },
    toRoman: {
        /**
         * @returns {string}
         */
        get() {
            let num = this.valueOf();
            const lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
            let roman = '';
            for (let i in lookup) {
                while (num >= lookup[i]) {
                    roman += i;
                    num -= lookup[i];
                }
            }
            return roman;
        },
        configurable: true
    }
}

Object.defineProperties(Number.prototype, numberprototypes);

const stringprototypes = {
    formatString: {
        get() {
            this.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
        }
    }
}

Object.defineProperties(String.prototype, stringprototypes);