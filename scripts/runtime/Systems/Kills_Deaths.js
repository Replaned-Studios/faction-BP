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

world.afterEvents.entityDie.subscribe(({ damageSource, deadEntity }) => {
    deadEntity.sendMessage(`§cYou died by ${damageSource.cause === "entityAttack" ? damageSource.damagingEntity.name : damageSource.cause}`)
    deadEntity.score.Deaths = (deadEntity.score.Deaths ?? 0) + 1
    deadEntity.score.Killstreak = 0
    if (damageSource.cause === "entityAttack") {
        const killer = damageSource.damagingEntity
        killer.score.Kills = (killer.score.Kills ?? 0) + 1
        killer.score.Killstreak = (killer.score.Killstreak ?? 0) + 1
        killer.sendMessage(`§aYou killed ${deadEntity.name}`)
    }
}, { entityTypes: ["minecraft:player"] });