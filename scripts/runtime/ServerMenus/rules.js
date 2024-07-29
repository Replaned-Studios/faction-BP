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


import { ActionFormData, FormCancelationReason } from "@minecraft/server-ui";
import { world, Player, system } from "@minecraft/server";

world.afterEvents.itemUse.subscribe((data) => {
  switch (data.itemStack.typeId) {
    case "soulless:rulebook":
      Rules_Gui(data.source);
      break;
  }
});

/**
 * 
 * @param {Player} player 
 */
export function Rules_Gui(player) {
  const From1 = new ActionFormData()
    .title("§cRules")
    .body("")
    .button("§cGeneral Rules", "textures/items/emerald")
    .button("§cCombat Rules", "textures/items/iron_sword")
    .button("§cBanned Items", "textures/blocks/bedrock")
    .show(player).then(async ({ canceled, selection, cancelationReason }) => {
      if (cancelationReason === FormCancelationReason.UserBusy) return Rules_Gui(player);
      if (canceled) return;
      const From2 = new ActionFormData()
     
      switch (selection) {
        case 0: // GenraL Rules
          From2.title("§cGeneral Rules")
            .body(
              "General Rules Of The Server Using Loopholes To Bypass These Will Result In A Ban\nRule 1: No Spamming Chat\nRule 2: No Digging Trench Around Wild Spawn\nRule 3: No Filling People’s Inventory’s With Items\nRule 4: No Scamming\nRule 5: No Tp Trapping\nRule 6: No Hacking Perm Ban\nRule 7: No X-ray\nNo Offensive Faction Names"
            )
          break;
        case 1:
          From2.title("§cCombat Rules")
            .body(
              "Combat Rules Of The Server:\nRule 1: No C-Logging\nRule 2: No Auto Clickers\nRule 3: No Spawn Trapping/Killing\nRule 4: No Tp Trapping"
            )
          break;
        case 2: // Banned Items
          From2.title("§cBanned Items")
            .body(
              "Banned Items:\nDrip Leafs Due To Duplication\nTop Layered Snow (Due To X-Ray)\nKelp (Due To Duping)\nInstant Damage 2 Potions/Arrows\nEnd Crystals & Loadstones\n\nYou Also Have Water Breathing To Stop Realms Dupe Glitch Using Alt Accounts"
            )
          break;
      }

      From2.button("OK", "textures/ui/check")
        .button('Back', 'textures/ui/cancel')
        .show(player).then(({ canceled, selection }) => {
          if (canceled) return;
          if (selection === 1) return Rules_Gui(player)
        })
    
      });
}
