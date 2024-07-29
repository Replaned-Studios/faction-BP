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


import { world, system } from "@minecraft/server";
import { ActionFormData, ModalFormData, FormCancelationReason } from "@minecraft/server-ui";
import { CratesInfo } from "../../Systems/Crates"

/**
 * @param {Player} player
 */
export default function CreatesBuy(player) {
    const arrayCrateInfo = Object.entries(CratesInfo);
    const form = new ActionFormData()
    form.title("§l§6Buy Crate Keys")
    form.body("§7Select A Crate key To Buy")
    arrayCrateInfo.forEach(([crateName, crateInfo]) => {
        form.button(`§a${crateName} §7- §a$${crateInfo.price}`, 'textures/items/diamond')
    })
    form.button("§cExit")
    form.show(player).then(({ canceled, selection }) => {
        if (canceled) return;
        if (selection == arrayCrateInfo.length) return player.sendMessage("§cYou have canceled the purchase")
        const [crateName, crateInfo] = arrayCrateInfo[selection]
        new ModalFormData()
            .title(`§l§6Buy ${crateName} Crate Keys`)
            .textField("§7How many keys would you like to buy?", "")
            .toggle
    })
}
