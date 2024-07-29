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


import { Entity, Player, world } from '@minecraft/server'

interface ScoreManger {
    [key: string]: number
}

type FactionData = {
    name: string,
    description: string,
    leader: { name: string, id: number },
    members: [{ name: string, id: number }],
    claims: {},
    privte: boolean,
    created: number,
    balance: number,
    logs: [],
    bans: [],
    officers: [{ name: string, id: number }],
    invites: [],
}


interface Factions {
    create(factionData: FactionData): Promise<string>
    FactionData(factionName: string): FactionData
    delete(factionName: string): void
    exists(factionName: string): boolean
    set(factionName: string, newFactionData: FactionData): Promise<string>
    inFaction: FactionData
    in: boolean
    allFactions: FactionData[]
}

export interface itemObject {
    id: string,
    amount: number,
    nameTag: string,
    lore: string[],
    enchantments: [{
        type: string,
        level: number
    }] | undefined,
    durability: number | undefined,
}

export interface Auction {
    status: 'open' | 'closed';
    id: number;
    item: itemObject;
    seller: { name: string; id: number };
    price: number;
    bids: { name: string; id: number; amount: number }[];
    oldbids:[{ name: string; id: number; amount: number }]
    taken: { [key: number]: string }
    time: string;
    type: 'bid' | 'fixed';
}

type addAuctionReqmantes = {
    item: itemObject;
    price: number;
    time: string;
    type: 'bid' | 'buy'
}

interface AuctionHouse {
    auctions: Auction[];
    add(auction: addAuctionReqmantes): Promise<number> | undefined
    remove(auctionId: number): void;
    get(auctionId: number): Auction | undefined;
    update(auctionId: number, data: Auction): void;
    getAll: Auction[];
}


declare module "@minecraft/server" {
    interface Player {
        score: ScoreManger
        factions: Factions
        kick(target: Player, reason: string): void
        addItems(items: [string, number, Enchantment][]): void
        giveItem(item: string, amount: number, Enchantments: Enchantment[]): void;
        auction: AuctionHouse;  
        radiusEntities(radius: number): Entity[]
    }
    interface Entity {
        radiusEntities(radius: number): Entity[]
    }
}

declare global {
    interface Number {
        sort: string | null
        toRoman: string | null
    }
    interface String {
        formatString: string | null
    }
}