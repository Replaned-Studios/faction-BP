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


import { world, system, Player } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { setTimer, getTime } from "../../../Extensions/functions";
import { AdminMenu } from "./Admin"
import ChatCommand from "../../../Extensions/ChatHandler";

ChatCommand({
    command: 'adminfaction',
    description: 'Admin Faction Menu',
    alias: ['af'],
    args: false,
    permissions: (player) => player.hasTag('Owner'),
    callback: (player) => {
        system.run(() => AdminFactionMenu(player))
        player.sendMessage('§aOpening Admin Faction Menu - §cPlease Leave The Chat Room')
    }
})

/**
 * @param {Player} player
 */
export default function AdminFactionMenu(player) {
    const factions = player.factions.allFactions;
    const form = new ActionFormData()
    form.title('§cAdmin Faction Menu')
    form.body(`§cWelcome Admin Faction Menu: §7${player.name}§c - What you like to do`)
    factions.forEach((value) => form.button(`§7${value.name}`));
    form.button('§cBack');
    form.show(player).then(({ cancelationReason, canceled, selection }) => {
        if (cancelationReason === 'UserBusy') return AdminFactionMenu(player)
        if (canceled) return;
        if (!factions[selection]) return AdminMenu(player)
        const selectedFaction = factions[selection];
        if (!selectedFaction) return player.sendMessage(`Faction ${selectedFaction.name} is no longer exist.`);
        const { name } = selectedFaction;
        new ActionFormData()
            .title(`§c${name} info`)
            .button('§6Edit Faction', 'textures/ui/icon_recipe_item')
            .button('§6Promote/Demote', 'textures/ui/icon_recipe_item')
            .button('§6Bank', 'textures/ui/icon_recipe_item')
            .button('§6Kick', 'textures/ui/icon_recipe_item')
            .button('§6Faction Info', 'textures/ui/icon_recipe_item')
            .button('§6Invite', 'textures/ui/icon_recipe_item')
            .button('§6Home', 'textures/ui/icon_recipe_item')
            .button('§cDelate Faction', 'textures/ui/icon_recipe_item')
            .button('§cBack', 'textures/ui/cancel')
            .show(player).then(({ canceled, selection }) => {
                if (canceled) return;
                if (!selectedFaction) return player.sendMessage(`Faction ${selectedFaction.name} is no longer exist.`);
                switch (selection) {
                    case 0: EditFaction(player, name); break
                    case 1: PromoteDemote(player, name); break
                    case 2: Bank(player, name); break
                    case 3: Kick(player, name); break
                    case 4: FactionInfo2(player, name); break
                    case 5: Invite(player, name); break
                    case 6: Home(player, name); break
                    case 7: DelateFaction(player, name); break
                    default: AdminMenu(player); break
                }
            });
    });
}

function EditFaction(player, name) {
    const findFaction = player.factions.allFactions.find((faction) => faction.name === name);
    if (!findFaction) return player.sendMessage(`Faction ${name} is no longer exist.`);
    new ModalFormData()
        .title('§bEdit Faction')
        .textField('§bFaction Name:', findFaction.name)
        .textField('§bFaction Description:', findFaction.description)
        .toggle('§aMake Faction Public:', findFaction.privte)
        .show(player).then(({ canceled, formValues: [newname, newdec, public2] }) => {
            if (canceled) return;
            if (!findFaction) return player.sendMessage(`Faction ${name} is no longer exist.`);
            if (newname.length > 1 && newname.length < 3 || newname.length > 15) return player.sendMessage(` Your Name Must Be Atleast 3 And A Max Of 15 Letters`)
            if (newdec.length > 1 && newdec.length < 5 || newdec.length > 80) return player.sendMessage(` The Description Must Be Atleast 5 And A Max Of 80 Letters`)
            player.factions.set(findFaction.name, {
                name: newname.length > 1 ? newname : findFaction.name,
                description: newdec.length > 1 ? newdec : findFaction.description,
                privte: public2 === findFaction.privte ? findFaction.privte : public2
            }).then(() => player.sendMessage(`Faction Details Have Been Updated`))
                .catch((error) => player.sendMessage(`${error}`))
        })
}

function PromoteDemote(player, name) {
    const findFaction = player.factions.allFactions.find((faction) => faction.name === name);
    if (!findFaction) return player.sendMessage(`Faction ${name} is no longer exist.`);
    new ActionFormData()
        .title('§bPromote/Demote')
        .button('§aPromote Member\nTo Officer', 'textures/ui/icon_recipe_item')
        .button('§aPromote Officer\nTo Leader', 'textures/ui/icon_recipe_item')
        .button('§cDemote Officer\nTo Member', 'textures/ui/icon_recipe_item')
        .button('§cBack', 'textures/ui/cancel')
        .show(player).then(({ canceled, selection }) => {
            if (canceled) return;
            if (!findFaction) return player.sendMessage(`Faction ${name} is no longer exist.`);
            switch (selection) {
                case 0: PromoteMembers(player, name); break
                case 1: PromoteOfficers(player, name); break
                case 2: DemoteOfficers(player, name); break
                default: AdminFactionMenu(player); break
            }
        })
}

function PromoteOfficers(player, name) {
    const findFaction = player.factions.allFactions.find((faction) => faction.name === name);
    if (!findFaction) return player.sendMessage(`Faction ${name} is no longer exist.`);
    const officers = findFaction?.officers;
    if (!officers || officers.length === 0) return player.sendMessage(`§cThere are no officers in this faction!`);
    new ModalFormData()
        .title("§aPromote Officer")
        .dropdown("§aSelect Officer:", officers.map(({ name, id }) => `${name}, ID: ${id}`), 0)
        .toggle("§aPromote Officer:", false)
        .show(player).then(({ canceled, cancelationReason, formValues: [Playerindex, Promote] }) => {
            if (canceled) return
            if (!findFaction) return player.sendMessage(`Faction ${name} is no longer exist.`);
            if (!Promote) return player.sendMessage(`§cYou Did Not Promote The Player`)
            const officerToPromote = officers[Playerindex];
            if (!officerToPromote) return player.sendMessage(`§cInvalid officer selection!`);
            const leader = findFaction.leader;
            if (leader.id === officerToPromote.id) return player.sendMessage(`§cYou Can Not Promote The Leader!`);
            player.factions.set(findFaction.name, { leader: officerToPromote, officers: officers.filter(({ id }) => id !== officerToPromote.id), members: [...findFaction.members, leader] })
                .then(() => player.sendMessage(`§aYou Have Promoteed §6${officerToPromote.name} §aTo Leader!`))
        });
}

function DemoteOfficers(player, name) {
    const findFaction = player.factions.allFactions.find((faction) => faction.name === name);
    if (!findFaction) return player.sendMessage(`Faction ${name} is no longer exist.`);
    const officers = findFaction?.officers;
    if (!officers || officers.length === 0) return player.sendMessage(`§cThere are no officers in this faction!`);
    new ModalFormData()
        .title("§aDemote Officer")
        .dropdown("§aSelect Officer:", officers.map(({ name, id }) => `${name}, ID: ${id}`), 0)
        .toggle("§aDemote Officer:", false)
        .show(player).then(({ canceled, cancelationReason, formValues: [Playerindex, Demote] }) => {
            if (canceled) return
            if (!findFaction) return player.sendMessage(`Faction ${name} is no longer exist.`);
            if (!Demote) return player.sendMessage(`§cYou Did Not Demote The Player`)
            const officerToDemote = officers[Playerindex];
            if (!officerToDemote) return player.sendMessage(`§cInvalid officer selection!`);
            const isAlreadyMember = findFaction.members.some(({ id }) => id === officerToDemote.id);
            if (isAlreadyMember) return player.sendMessage(`§cThis Player Is Already A Member!`);
            const newMembers = [...findFaction.members, officerToDemote];
            const remainingOfficers = findFaction.officers.filter(({ id }) => id !== officerToDemote.id);
            player.factions.set(findFaction.name, { officers: remainingOfficers, members: newMembers }).then(() => player.sendMessage(`§aYou Have Demoted §6${officerToDemote.name} §aTo Member!`))
                .catch((error) => player.sendMessage(`§cError demoting officer: ${error.message || error}`));
        });
}

function PromoteMembers(player, name) {
    const findFaction = player.factions.allFactions.find((faction) => faction.name === name);
    if (!findFaction) return player.sendMessage(`Faction ${name} is no longer exist.`);
    const members = findFaction?.members;
    if (!members || members.length === 0) return player.sendMessage(`§cThere are no members in this faction!`);
    new ModalFormData()
        .title("§aPromote Member")
        .dropdown("§aSelect Member:", members.map(({ name, id }) => `${name}, ID: ${id}`), 0)
        .toggle("§aPromote Member:", false)
        .show(player).then(({ canceled, cancelationReason, formValues: [Playerindex, Promote] }) => {
            if (canceled) return
            if (!findFaction) return player.sendMessage(`Faction ${name} is no longer exist.`);
            if (!Promote) return player.sendMessage(`§cYou Did Not Promote The Player`)
            const memberToPromote = members[Playerindex];
            if (!memberToPromote) return player.sendMessage(`§cInvalid member selection!`);
            const isAlreadyOfficer = findFaction.officers.some(({ id }) => id === memberToPromote.id);
            if (isAlreadyOfficer) return player.sendMessage(`§cThis Player Is Already An Officer!`);
            const newOfficers = [...findFaction.officers, memberToPromote];
            const remainingMembers = findFaction.members.filter(({ id }) => id !== memberToPromote.id);
            player.factions.set(findFaction.name, { officers: newOfficers, members: remainingMembers }).then(() => player.sendMessage(`§aYou Have Promoteed §6${memberToPromote.name} §aTo Officer!`))
                .catch((error) => player.sendMessage(`§cError promoteing member: ${error.message || error}`));
        });
}

function Bank(player, name) {
    const findFaction = player.factions.allFactions.find((faction) => faction.name === name);
    if (!findFaction) return player.sendMessage(`Faction ${name} is no longer exist.`);
    const { balance } = findFaction;
    new ActionFormData()
        .title('§bBank')
        .body(`§aBank Balance: §6${balance}`)
        .button(`§aRemove Balance`, 'textures/ui/confirm')
        .button(`§aAdd Balance`, 'textures/ui/confirm')
        .button(`§aSet Balance`, 'textures/ui/confirm')
        .button(`§cBack`, 'textures/ui/cancel')
        .show(player).then(({ canceled, selection }) => {
            if (canceled) return;
            switch (selection) {
                case 0: RemoveBalance(player, name); break
                case 1: AddBalance(player, name); break
                case 2: SetBalance(player, name); break
                default: AdminFactionMenu(player); break
            }
        })
}

function RemoveBalance(player, name) {
    const findFaction = player.factions.allFactions.find((faction) => faction.name === name);
    const balance = findFaction.balance
    new ModalFormData()
        .title('§bRemove Balance')
        .textField('§aRemove Balance:', '0')
        .toggle('§aRemove Balance:', false)
        .show(player).then(({ canceled, cancelationReason, formValues: [Remove, Remove2] }) => {
            if (canceled) return
            if (!findFaction) return player.sendMessage(`Faction ${name} is no longer exist.`);
            if (!Remove2) return player.sendMessage(`§cYou Did Not Remove The Balance`)
            Remove = parseInt(Remove)
            if (isNaN(Remove)) return player.sendMessage(`§cYou Did Not Remove A Number!`)
            if (Remove < 0) return player.sendMessage(`§cYou Can Not Remove Negative Numbers!`)
            if (balance < Remove) return player.sendMessage(`§cYou Can Not Remove More Than The Balance!`)
            player.factions.set(findFaction.name, { balance: balance - Remove }).then(() => player.sendMessage(`§aYou Have Removed §6${Remove} §aFrom The balance!`))
                .catch((error) => player.sendMessage(`§cError removing balance: ${error.message || error}`));
        })
}

/**
 * @param {Player} player
 */
function AddBalance(player, name) {
    const findFaction = player.factions.allFactions.find((faction) => faction.name === name);
    const balance = findFaction.balance
    new ModalFormData()
        .title('§bAdd Balance')
        .textField('§aAdd Balance:', '0')
        .toggle('§aAdd Balance:', false)
        .show(player).then(({ canceled, cancelationReason, formValues: [Add, Add2] }) => {
            if (canceled) return
            if (!findFaction) return player.sendMessage(`Faction ${name} is no longer exist.`);
            if (!Add2) return player.sendMessage(`§cYou Did Not Add The Balance`)
            Add = parseInt(Add)
            if (isNaN(Add)) return player.sendMessage(`§cYou Did Not Add A Number!`)
            if (Add < 0) return player.sendMessage(`§cYou Can Not Add Negative Numbers!`)
            player.factions.set(findFaction.name, { balance: balance + Add }).then(() => player.sendMessage(`§aYou Have Added §6${Add} §aTo The balance!`))
                .catch((error) => player.sendMessage(`§cError adding balance: ${error.message || error}`));
        })
}

function SetBalance(player, name) {
    const findFaction = player.factions.allFactions.find((faction) => faction.name === name);
    const balance = findFaction.balance
    new ModalFormData()
        .title('§bSet Balance')
        .textField('§aSet Balance:', '0')
        .toggle('§aSet Balance:', false)
        .show(player).then(({ canceled, cancelationReason, formValues: [Set, Set2] }) => {
            if (canceled) return
            if (!findFaction) return player.sendMessage(`Faction ${name} is no longer exist.`);
            if (!Set2) return player.sendMessage(`§cYou Did Not Set The Balance`)
            Set = parseInt(Set)
            if (isNaN(Set)) return player.sendMessage(`§cYou Did Not Set A Number!`)
            if (Set < 0) return player.sendMessage(`§cYou Can Not Set Negative Numbers!`)
            player.factions.set(findFaction.name, { balance: Set }).then(() => player.sendMessage(`§aYou Have Set The balance To §6${Set}!`))
                .catch((error) => player.sendMessage(`§cError setting balance: ${error.message || error}`));
        })
}

function Kick(player, name) {
    const findFaction = player.factions.allFactions.find((faction) => faction.name === name);
    if (!findFaction) return player.sendMessage(`Faction ${name} is no longer exist.`);
    const members = findFaction?.members;
    const officers = findFaction?.officers;
    const combine = members.concat(officers)
    if (combine.length === 0) return player.sendMessage(`§cThere Are No Members Or pOfficers In This Faction!`)
    new ModalFormData()
        .title("§aKick Player")
        .dropdown("§aSelect Player:", combine.map(({ name, id }) => `${name}, ID: ${id}`), 0)
        .toggle("§aKick Player:", false)
        .show(player).then(({ canceled, cancelationReason, formValues: [Playerindex, Kick] }) => {
            if (canceled) return
            if (!Kick) return player.sendMessage(`§cYou Did Not Kick The Player`)
            if (!findFaction) return player.sendMessage(`Faction ${name} is no longer exist.`);
            const findUserMembers = members.find(({ id }) => id === combine[Playerindex].id)
            const findUserOfficers = officers.find(({ id }) => id === combine[Playerindex].id)
            if (!findUserMembers && !findUserOfficers) return player.sendMessage(`§cThis Player Is Not In Your Faction!`)
            if (findUserMembers) {
                player.factions.set(findFaction.name, { members: members.filter(({ id }) => id !== combine[Playerindex].id) }).then(() => {
                    player.sendMessage(`§aYou Have Kicked §6${combine[Playerindex].name} §aFrom §6${findFaction.name}!`)
                }).catch((error) => {
                    player.sendMessage(`§c${error}`)
                })
            } else
                player.factions.set(findFaction.name, { officers: officers.filter(({ id }) => id !== combine[Playerindex].id) }).then(() => {
                    player.sendMessage(`§aYou Have Kicked §6${combine[Playerindex].name} §aFrom §6${findFaction.name}!`)
                }).catch((error) => {
                    player.sendMessage(`§c${error}`)
                })
        })
}

function FactionInfo2(player, factionName) {
    const findFaction = player.factions.allFactions.find((faction) => faction.name === factionName);
    if (!findFaction) return player.sendMessage(`Faction ${factionName} is no longer exist.`);
    const factioninfo = FactionInfo(findFaction, ['faction name', 'leader', 'members', 'officers', 'balance', 'description', 'created', 'privacy'])
    new ActionFormData()
        .title('§6Faction Information')
        .body(`§e${factioninfo}`)
        .button('§4Back')
        .show(player).then(({ canceled, selection }) => {
            if (canceled) return
            if (selection === 0) return AdminFactionMenu(player)
        })
}

function Invite(player, name) {
    const findFaction = player.factions.allFactions.find((faction) => faction.name === name);
    if (!findFaction) return player.sendMessage(`Faction ${name} is no longer exist.`);
    const worldsPlayers = world.getPlayers().filter(value => !value.factions.allFactions.some(({ members, leader }) => leader.id === value.id || members.some(({ id }) => id === value.id)))
    new ModalFormData()
        .title('§aInvite Players')
        .dropdown('§aPlease Select The Player You Want To Invite To Your Faction', ['§bPick Player', ...worldsPlayers.map(value => value.name)], 0)
        .toggle('§aAre You Sure You Want To Invite This Player', false)
        .show(player).then(({ canceled, formValues: [selectedPlayerIndex, confirm] }) => {
            if (canceled || !confirm || selectedPlayerIndex == 0) return AdminFactionMenu(player)
            if (!findFaction) return player.sendMessage(`Faction ${name} is no longer exist.`);
            const invitataionsdata = findFaction.invites
            const target = worldsPlayers[selectedPlayerIndex - 1]
            if (player.factions.allFactions.some(({ leader, officers, members }) => leader.id === target.id || officers.some(({ id }) => id === target.id) || members.some(({ id }) => id === target.id))) return player.sendMessage(`§cThis Player Is Already In A Faction!`)
            const findinvites = findFaction.invites.find(({ id }) => id == target.id)
            if (invitataionsdata.some((value) => value.id == target.id)) return player.sendMessage(`You Have Already Invited This Player!\n§cYou Have §6${getTime(findinvites.time).minutes} §cMinutes §6${getTime(findinvites.time).seconds} §cSeconds Left To Invite Them!`)
            player.factions.set(findFaction.name, { invites: [...findFaction.invites, { id: target.id, name: target.name, time: setTimer(30, 'seconds') }] }).then(() => {
                player.sendMessage(`You Have Invited §6${target.name} §aTo Your Faction`);
                target.sendMessage(`You Have Been Invited To §6${findFaction.name} §aFaction By §6${player.name}`)
            })
                .catch((error) => player.sendMessage(` ${error}`))
        })
}

function Home(player, name) {
    const findFaction = player.factions.allFactions.find((faction) => faction.name === name);
    if (!findFaction) return player.sendMessage(`Faction ${name} is no longer exist.`);
    new ActionFormData()
        .title('§bHome')
        .button(`§aSet Home`, 'textures/ui/confirm')
        .button(`§aGo To Home`, 'textures/ui/confirm')
        .button(`§cDelete Home`, 'textures/ui/confirm')
        .button(`§cBack`, 'textures/ui/cancel')
        .show(player).then(({ canceled, selection }) => {
            if (canceled) return;
            switch (selection) {
                case 0: SetHome(player, name); break
                case 1: GoHome(player, name); break
                case 2: DeleteHome(player, name); break
                default: AdminFactionMenu(player); break
            }
        })
}

function SetHome(player, name) {
    const findFaction = player.factions.allFactions.find((faction) => faction.name === name);
    if (!findFaction) return player.sendMessage(`Faction ${name} is no longer exist.`);
    const { claims } = findFaction;
    if (claims?.location) return player.sendMessage(`§cYou Allready Have A Faction Home!`);
    new ModalFormData()
        .title("§aSet Home")
        .toggle("§aDo You Want To Set This Home To Your Current Position?", true)
        .show(player).then(({ canceled, cancelationReason, formValues: [Confirm] }) => {
            if (canceled) return
            if (!findFaction) return player.sendMessage(`Faction ${name} is no longer exist.`);
            if (!Confirm) return player.sendMessage(`§cHome Not Set!`)
            player.factions.set(findFaction.name, { claims: { location: player.location, dimension: player.dimension.id } })
            player.sendMessage(`§aHome Set\n§cLocation: x:§7 ${Math.floor(player.location.x)}, §cy:§7 ${Math.floor(player.location.y)}, §cz:§7 ${Math.floor(player.location.z)}\n§cNamed:§7 ${findFaction.name}!`)
        })
}

function GoHome(player, name) {
    const findFaction = player.factions.allFactions.find((faction) => faction.name === name);
    const { claims } = findFaction;
    if (!claims?.location) return player.sendMessage(`§cYou Do Not Have A Faction Home!`);
    player.teleport(claims.location, { dimension: world.getDimension(claims.dimension) })
    player.sendMessage(`§aTeleported To Your Faction Home!`)
}

function DeleteHome(player, name) {
    const findFaction = player.factions.allFactions.find((faction) => faction.name === name);
    const { claims } = findFaction;
    if (!claims?.location) return player.sendMessage(`§cYou Do Not Have A Faction Home!`);
    new ModalFormData()
        .title("§aDelete Home")
        .toggle("§aDo You Want To Delete This Home?", true)
        .show(player).then(({ canceled, cancelationReason, formValues: [Confirm] }) => {
            if (canceled) return
            if (!findFaction) return player.sendMessage(`Faction ${name} is no longer exist.`);
            if (!Confirm) return player.sendMessage(`§cHome Not Deleted!`)
            player.factions.set(findFaction.name, { claims: null })
            player.sendMessage(`§aHome Deleted!`)
        })
}

function DelateFaction(player, name) {
    const findFaction = player.factions.allFactions.find((faction) => faction.name === name);
    if (!findFaction) return player.sendMessage(`Faction ${name} is no longer exist.`);
    new ModalFormData()
        .title("§aDelete Faction")
        .toggle("§aAre You Sure You Want To Delete This Faction?", false)
        .show(player).then(({ canceled, cancelationReason, formValues: [Confirm] }) => {
            if (canceled) return
            if (!findFaction) return player.sendMessage(`Faction ${name} is no longer exist.`);
            if (!Confirm) return player.sendMessage(`§cFaction Not Deleted!`)
            player.factions.delete(findFaction.name)
            player.sendMessage(`§aFaction Deleted!`)
        })
}


/**
 * @param {Player} player
 * @param {['owner', 'officer', 'member', 'balance', 'description', 'name', 'privacy']} request
 * @returns {string} 
 */
function FactionInfo(factionData, request = []) {
    const { name, leader, members, description, created, balance, officers } = factionData;
    const memberNames = members.length === 0 ? 'Zero Members' : members.map(({ name }) => name).join(', ');
    const officerNames = officers.length === 0 ? 'Zero Officers' : officers.map(({ name }) => name).join(', ');
    const formattedDate = new Date(created).toLocaleString();
    const infoarray = [
        `§6Faction Name: §7${name}`,
        `§6Balance: §7${balance}`,
        `§6Leader: §7${leader.name}`,
        `§6Members: §7${memberNames}`,
        `§6Officers: §7${officerNames}`,
        `§6Description: §7${description.length === 0 ? 'No Description' : description}`,
        `§6Created: §7${formattedDate}`,
        `§6Privacy: §7${factionData.private ? 'Public' : 'Private'}`
    ].filter((value) => request.includes(value.split(':')[0].replace('§6', '').toLowerCase()))
    return infoarray.join('\n')
}
