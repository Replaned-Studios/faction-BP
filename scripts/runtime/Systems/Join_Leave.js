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

import { world } from "@minecraft/server";

world.afterEvents.playerSpawn.subscribe(({ initialSpawn, player }) => {
    if (!initialSpawn) return
    world.setDefaultSpawnLocation({x: 0.50, y: 105, z: 1.50})
    if (player.hasTag(ACconfig.Tags.CombatTag)) player.removeTag(ACconfig.Tags.CombatTag)
        
    const settingsdata = SRconfig.ServerMenu.settings.reduce((acc, setting) => {
        acc[setting] = true
        return acc
    }, {})
    if (!Database.has(SRconfig.DatabaseNames.Sidebar, player)) Database.set(SRconfig.DatabaseNames.Sidebar, settingsdata, player)
})