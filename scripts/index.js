// Description: Importing all the Configs
export * from './SRconfig.js'
export * from './AC/ACconfig.js'

// Description: Importing all the Extensions
export * from './Extensions/Database.js'
export * from './Extensions/ChatHandler.js'
export * from './Extensions/Prototype/Player.js'

// Description: Importing all the extensions
import './Extensions/VipEncHanlder.js'
import './Extensions/CratesHanlder.js'
    
// Description: Importing all the AntiCheat
import './AC/index.js';
import './AC/SpawnProtection.js';
import './AC/clog.js';


// Description: Importing all the runtime systems 
import './runtime/Shops/index.js'
import './runtime/SellPad/index.js' 
import './runtime/ChatRanks/index.js'
import './runtime/ServerMenus/index.js'

// Description: Importing all the runtime systems
import './runtime/Systems/Daliyrewards.js'  
import './runtime/Systems/Factions.js'
import './runtime/Systems/Kills_Deaths.js'
import './runtime/Systems/SideBar.js'
import './runtime/Systems/Join_Leave.js'
import './runtime/Systems/StarterKit.js'
import './runtime/Systems/Bounty.js'
import './runtime/Systems/LeaderBoard.js'
import './runtime/Systems/Safezone.js'
import './runtime/Systems/TPa.js'
import './runtime/Systems/mobstackers.js'
import './runtime/Systems/Spawners.js'
import './runtime/Systems/Runtime.js'


// Description: Importing all the runtime Admin systems
import './runtime/Systems/AdminStuff/Admin.js';
import './runtime/Systems/AdminStuff/AdminFaction.js';
import './runtime/Systems/AdminStuff/Ban.js';
import './runtime/Systems/AdminStuff/Mute.js';

import { world } from '@minecraft/server'
import { commands } from './Extensions/ChatHandler.js'

console.warn(`\n§7[§cDatabase§7] §rSuccessfully loaded!\n§7Registered Properties Count: ${world.getDynamicPropertyIds().length}\n§7Registered Properties: §a${world.getDynamicPropertyIds().join(', ')}\n§7Total Bytes: §a${world.getDynamicPropertyTotalByteCount()}`);
console.warn(`§6${commands.length} ChatCommand(s) initialized!`);