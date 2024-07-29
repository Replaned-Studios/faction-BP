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

import { Player, system, world } from "@minecraft/server";
import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui";
import { setTimer, hasTimerReachedEnd, getTime } from "../../Extensions/functions";

const factionConfig = {
    JoinLimt: 5
}
const buttonMap = {
    owner: ['§aInvite Members', '§bPromote System', '§uFaction Info', '§bEdit Faction', '§6Faction Bank', '§uFaction Home', '§6Other Factions', '§cKick Player', '§cDelete Faction', '§cExit'],
    officer: ['§aInvite Members', '§uFaction Info', '§6Faction Bank', '§uFaction Home', '§6Other Factions', '§cLeave Faction', '§cExit'],
    member: ['§uFaction Info', '§6Faction Bank', '§uFaction Home', '§6Other Factions', '§cLeave Faction', '§cExit'],
    none: ['§aCreate Faction', '§bPublic Factions', '§6Faction Invitations', '§cExit'],
};

export function FactionMenu(player) {
    const factionData = player?.factions?.inFaction;
    const isOwner = factionData ? factionData.leader.id === player.id : false;
    const isOfficer = factionData ? factionData.officers.some(({ id }) => id === player.id) : false;
    const buttonLabels = isOwner ? buttonMap.owner : isOfficer ? buttonMap.officer : factionData ? buttonMap.member : buttonMap.none;
    const form = new ActionFormData()
        .title('§cFaction Manager')
        .body(`§7Hey. Welcome to Faction manager. What would you like to do today?`);
    buttonLabels.forEach(button => form.button(button));
    form.show(player).then(({ canceled, selection, cancelationReason }) => {
        if (cancelationReason === 'UserBusy') return FactionMenu(player);
        if (canceled) return;
        const selectedAction = buttonLabels[selection];
        switch (selectedAction) {
            case '§aInvite Members': FactionInvtePlayers(player); break;
            case '§6Other Factions': Factions(player); break;
            case '§bEdit Faction': EditFaction(player); break;
            case '§cKick Player': KickFaction(player); break;
            case '§uFaction Info': ViewFactionMembers(player); break;
            case '§uFaction Home': FactionHomeMenu(player); break;
            case '§cDelete Faction': DelateFaction(player); break;
            case '§cLeave Faction': LeaveFaction(player); break;
            case '§aCreate Faction': CreateFaction(player); break;
            case '§bPublic Factions': Join_Faction(player); break;
            case '§6Faction Invitations': viewInvites(player); break;
            case '§bPromote System': PromoteSystem(player); break;
            case '§6Faction Bank': FactionBankMenu(player); break;
            case '§cExit': player.sendMessage('Faction Menu Closed'); break;
        }
    });
}

function Factions(player) {
    const allfactions = player.factions.allFactions;
    const form = new ActionFormData()
    form.title('§aFactions')
    form.body(`§aPlease Select A Faction From Below\n${allfactions.length === 0 ? '§cThere Are No Factions!' : ''}`)
    allfactions.forEach(({ name }) => form.button(`§a${name}`, 'textures/items/book_writable'))
    form.button('§cBack', 'textures/ui/cancel');
    form.show(player).then(({ canceled, selection, }) => {
        if (canceled || selection === allfactions.length) return FactionMenu(player);
        const selectedFaction = allfactions[selection];
        const factioninfo = FactionInfo(selectedFaction, ['faction name', 'leader', 'members', 'officers', 'description', 'created', 'privacy'])
        new ActionFormData()
            .title('§aFaction Information')
            .body(`${factioninfo}`)
            .button('§cBack', 'textures/ui/cancel')
            .show(player).then(({ canceled }) => {
                if (canceled) return
                Factions(player)
            })
    })
}

function FactionBankMenu(player) {
    const factionData = player.factions.inFaction;
    if (!player.factions.inFaction) return FactionMenu(player);
    new ActionFormData()
        .title('§aFaction Bank')
        .body(`§aPlease Select A Option From Below\n Balance: ${(parseInt(factionData.balance)).sort}`)
        .button('§aDeposit', 'textures/items/diamond')
        .button('§aWithdraw', 'textures/items/emerald')
        .button('§cClose', 'textures/ui/cancel')
        .show(player).then(({ canceled, selection }) => {
            if (canceled) return
            switch (selection) {
                case 0: Deposit(player); break;
                case 1: Withdraw(player); break;
                case 2: FactionMenu(player); break;
            }
        })
}

function Deposit(player) {
    const factionData = player.factions.inFaction;
    if (!player.factions.inFaction) return FactionMenu(player);
    new ModalFormData()
        .title("§aDeposit")
        .textField("§aAmount:", "Amount")
        .toggle("§aDeposit:", false)
        .show(player).then(({ canceled, formValues: [Amount, Deposit] }) => {
            if (canceled) return
            if (!player.factions.inFaction) return FactionMenu(player);
            if (!Deposit) return player.sendMessage(`§cYou Did Not Deposit The Money!`);
            Amount = parseInt(Amount);
            if (isNaN(Amount)) return player.sendMessage(`§cYou Did Not Enter A Number!`);
            if (Amount < 1) return player.sendMessage(`§cYou Must Deposit Atleast 1$!`);
            if (Amount > player.score.Money) return player.sendMessage(`§cYou Do Not Have Enough Money!`);
            player.score.Money = player.score.Money - Amount;
            const currentBalance = parseInt(factionData.balance);
            if (isNaN(currentBalance)) return player.sendMessage(`§cInvalid faction balance!`);
            player.factions.set(factionData.name, { balance: currentBalance + Amount }).then(() => player.sendMessage(`§aYou Have Deposited §6${Amount}$ §aInto The Faction Bank!`))
                .catch((error) => player.sendMessage(`§c${error}`))
        })
}

function Withdraw(player) {
    const factionData = player.factions.inFaction;
    if (!player.factions.inFaction) return FactionMenu(player);
    new ModalFormData()
        .title("§aWithdraw")
        .textField("§aAmount:", "Amount")
        .toggle("§aWithdraw:", false)
        .show(player).then(({ canceled, formValues: [Amount, Withdraw] }) => {
            if (canceled) return
            if (!player.factions.inFaction) return FactionMenu(player);
            if (!Withdraw) return player.sendMessage(`§cYou Did Not Withdraw The Money!`);
            Amount = parseInt(Amount);
            if (isNaN(Amount)) return player.sendMessage(`§cYou Did Not Enter A Number!`);
            if (Amount < 1) return player.sendMessage(`§cYou Must Withdraw Atleast 1$!`);
            if (Amount > parseInt(factionData.balance)) return player.sendMessage(`§cThe Faction Does Not Have Enough Money!`);
            player.score.Money = player.score.Money + Amount;
            player.factions.set(factionData.name, { balance: parseInt(factionData.balance) - Amount }).then(() => player.sendMessage(`§aYou Have Withdrawn §6${Amount}$ §aFrom The Faction Bank!`))
                .catch((error) => player.sendMessage(`§c${error}`))
        })
}

function PromoteSystem(player) {
    const factionData = player.factions.inFaction;
    if (!player.factions.inFaction) return FactionMenu(player);
    new ActionFormData()
        .title('§aPromote System')
        .body(`§aPlease Select A Option From Below`)
        .button('§aPromote Member\nTo Officer', 'textures/ui/icon_recipe_item')
        .button('§aPromote Officer\nTo Leader', 'textures/ui/icon_recipe_item')
        .button('§cDemote Officer\nTo Member', 'textures/ui/icon_recipe_item')
        .button('§cClose', 'textures/ui/cancel')
        .show(player).then(({ canceled, selection, }) => {
            if (canceled) return
            switch (selection) {
                case 0: PromoteMember(player); break;
                case 1: PromoteOfficer(player); break;
                case 2: DemoteOfficers(player); break;
                case 3: FactionMenu(player); break;
            }
        })
}

function PromoteOfficer(player) {
    const factionData = player.factions.inFaction;
    if (!player.factions.inFaction) return FactionMenu(player);
    if (factionData.leader.id !== player.id) return player.sendMessage(`§cYOu Not The Leader of this faction!`)
    const officers = factionData?.officers;
    if (!officers || officers.length === 0) return player.sendMessage(`§cThere are no officers in your faction!`);
    new ModalFormData()
        .title("§aPromote Officer")
        .dropdown("§aSelect Officer:", officers.map(({ name, id }) => `${name}, ID: ${id}`), 0)
        .toggle("§aPromote Officer:", false)
        .show(player).then(({ canceled, formValues: [Playerindex, Promote] }) => {
            if (canceled) return
            if (factionData.leader.id !== player.id) return player.sendMessage(`§cYOu Not The Leader of this faction!`)
            if (!Promote) return player.sendMessage(`§cYou Did Not Promote The Player`)
            const officerToPromote = officers[Playerindex];
            if (!officerToPromote) return player.sendMessage(`§cInvalid officer selection!`);
            const leader = factionData.leader;
            if (leader.id === officerToPromote.id) return player.sendMessage(`§cYou Can Not Promote The Leader!`);
            player.factions.set(factionData.name, { leader: officerToPromote, officers: officers.filter(({ id }) => id !== officerToPromote.id), members: [...factionData.members, leader] })
                .then(() => player.sendMessage(`§aYou Have Promoteed §6${officerToPromote.name} §aTo Leader!`))
        });
}
function DemoteOfficers(player) {
    const factionData = player.factions.inFaction;
    if (!player.factions.inFaction) return FactionMenu(player);
    if (factionData.leader.id !== player.id) return player.sendMessage(`§cYou Not The Leader of this faction!`)
    const officers = factionData.officers;
    if (!officers || officers.length === 0) return player.sendMessage(`§cThere are no officers in your faction!`);
    new ModalFormData()
        .title("§aDemote Officer")
        .dropdown("§aSelect Officer:", officers.map(({ name, id }) => `${name}, ID: ${id}`), 0)
        .toggle("§aDemote Officer:", false)
        .show(player).then(({ canceled, formValues: [Playerindex, Demote] }) => {
            if (canceled) return
            if (!Demote) return player.sendMessage(`§cYou Did Not Demote The Player`)
            if (factionData.leader.id !== player.id) return player.sendMessage(`§cYOu Not The Leader of this faction!`)
            const officerToDemote = officers[Playerindex];
            if (!officerToDemote) return player.sendMessage(`§cInvalid officer selection!`);
            const isAlreadyMember = factionData.members.some(({ id }) => id === officerToDemote.id);
            if (isAlreadyMember) return player.sendMessage(`§cThis Player Is Already A Member!`);
            const newMembers = [...factionData.members, officerToDemote];
            const remainingOfficers = factionData.officers.filter(({ id }) => id !== officerToDemote.id);
            player.factions.set(factionData.name, { officers: remainingOfficers, members: newMembers }).then(() => player.sendMessage(`§aYou Have Demoted §6${officerToDemote.name} §aTo Member!`))
                .catch((error) => player.sendMessage(`§cError demoting officer: ${error.message || error}`));
        });
}
function PromoteMember(player) {
    const factionData = player.factions.inFaction;
    if (!player.factions.inFaction) return FactionMenu(player);
    if (factionData.leader.id !== player.id) return player.sendMessage(`§cYOu Not The Leader of this faction!`)
    const members = factionData.members;
    if (!members || members.length === 0) return player.sendMessage(`§cThere Are No Members To Promote In Your Faction!`);
    new ModalFormData()
        .title("§aPromote Member")
        .dropdown("§aSelect Member:", members.map(({ name, id }) => `${name}, ID: ${id}`), 0)
        .toggle("§aPromote Member:", false)
        .show(player).then(({ canceled, formValues: [Playerindex, Promote] }) => {
            if (canceled) return;
            if (factionData.leader.id !== player.id) return player.sendMessage(`§cYOu Not The Leader of this faction!`)
            if (!Promote) return player.sendMessage(`§cYou Did Not Promote The Player`);
            const memberToPromotee = members[Playerindex];
            if (!memberToPromotee) return player.sendMessage(`§cInvalid member selection!`);
            const isAlreadyOfficer = factionData.officers.some(({ id }) => id === memberToPromotee.id);
            if (isAlreadyOfficer) return player.sendMessage(`§cThis Player Is Already An Officer!`);
            const newOfficers = [...factionData.officers, memberToPromotee];
            const remainingMembers = factionData.members.filter(({ id }) => id !== memberToPromotee.id);
            player.factions.set(factionData.name, { officers: newOfficers, members: remainingMembers }).then(() => player.sendMessage(`§aYou Have Promoteed §6${memberToPromotee.name} §aTo Officer!`))
                .catch((error) => player.sendMessage(`§cError promoteing member: ${error.message || error}`));
        });
}
/**
 * 
 * @param {Player} player 
 */
function Join_Faction(player) {
    const Factions = player.factions.allFactions.filter(({ privte, members, officers }) => privte !== false && members?.some(({ id }) => id !== player.id) && (members?.length && officers.length) < factionConfig.JoinLimt);
    const form = new ActionFormData()
    form.title('§aJoin Faction')
    form.body(`§aPlease Select A Faction From Below\n${Factions.length === 0 ? '§cThere Are No Factions!' : ''}`);
    Factions.forEach(({ name }) => form.button(`§a${name}`));
    form.button('§cClose', 'textures/ui/cancel');
    form.show(player).then(({ canceled, selection, }) => {
        if (canceled || selection === Factions.length) return FactionMenu(player);
        /**@type {import('../../Extensions/Prototype/Player').FactionData} */
        const selectedFaction = Factions[selection];
        const { name, members, privte } = selectedFaction;
        const factioninfo = FactionInfo(selectedFaction, ['faction name', 'leader', 'members', 'officers', 'description', 'created', 'privacy'])
        new ActionFormData()
            .title('§aFaction Information')
            .body(`${factioninfo}`)
            .button('§aYes')
            .button('§cBack')
            .show(player).then(({ canceled, selection }) => {
                if (canceled) return
                if (selection === 1) return FactionMenu(player);
                if (player.factions.inFaction) return player.sendMessage(`You are allready in a faction`)
                if ((selectedFaction.members.length + selectedFaction.officers.length) >= factionConfig.JoinLimt) return player.sendMessage(`§cThis Faction Is Full!`)
                if (privte === false) return player.sendMessage(`This Faction Is Private!`)
                player.factions.set(name, { members: [...members, { id: player.id, name: player.name }] }).then(() => {
                    player.sendMessage(`§aYou Have Joined §6${name}!`)
                    const findowner = world.getPlayers({ name: selectedFaction.leader.name })[0]
                    if (findowner) return findowner.sendMessage(`§aYour Faction Has A New Member §6${player.name}!`)
                })
                    .catch((error) => player.sendMessage(`§c${error}`))
            })
    });
}

/**
 * 
 * @param {Player} player 
 * @returns 
 */
function LeaveFaction(player) {
    const factionData = player.factions.inFaction;
    if (!player.factions.inFaction) return FactionMenu(player);
    if (factionData.leader.id === player.id) return player.sendMessage(`§cYou Can Not Leave The Faction You Are The Leader Of ${factionData.name}!`);
    if (factionData.members.every(({ id }) => id !== player.id) && factionData.officers.every(({ id }) => id !== player.id)) return player.sendMessage(`§cYou Are Not In A Faction!`)
    const factioninfo = FactionInfo(factionData, ['faction name', 'leader', 'members', 'officers', 'description', 'created', 'privacy'])
    new ActionFormData()
        .title('§aLeave Faction')
        .body(`§6Are You Sure You Want To Leave\n${factioninfo}`)
        .button('§aYes')
        .button('§cBack')
        .show(player).then(({ canceled, selection }) => {
            if (canceled) return
            if (selection === 1) return FactionMenu(player);
            if (factionData.leader.id === player.id) return player.sendMessage(`§cYou Can Not Leave The Faction You Are The Leader Of ${factionData.name}!`);
            if (factionData.members.every(({ id }) => id !== player.id) && factionData.officers.every(({ id }) => id !== player.id)) return player.sendMessage(`§cYou Are Not In A Faction To Leave One!`);

            if (factionData.officers.some(({ id }) => id === player.id)) {
                player.factions.set(factionData.name, { officers: factionData.officers.filter(({ id }) => id !== player.id) })
                    .then(() => {
                        player.sendMessage(`§aYou Have Left §6${factionData.name}!`)
                    })
                    .catch((error) => {
                        player.sendMessage(`§c${error}`)
                    })
            } else {
                player.factions.set(factionData.name, { members: factionData.members.filter(({ id }) => id !== player.id) })
                    .then(() => {
                        player.sendMessage(`§aYou Have Left §6${factionData.name}!`)
                        const findowner = world.getPlayers({ name: factionData.leader.name })[0]
                        if (findowner) return findowner.sendMessage(`§aYour Faction Member §6${player.name} §aHas Left The Faction!`)
                    }).catch((error) => {
                        player.sendMessage(`§c${error}`)
                    })
            }
        })
}

function ViewFactionMembers(player) {
    const factionData = player.factions.inFaction;
    if (!player.factions.inFaction) return FactionMenu(player);
    const factioninfo = FactionInfo(factionData, ['faction name', 'leader', 'members', 'officers', 'balance', 'description', 'created', 'privacy'])
    new ActionFormData()
        .title('§6Faction Members')
        .body(`§eFaction Information:\n${factioninfo}`)
        .button('§4Back')
        .show(player).then(({ canceled, selection }) => {
            if (canceled) return
            if (selection === 0) return FactionMenu(player)
        })
}


function CreateFaction(player) {
    new ModalFormData()
        .title("§aCreate Faction")
        .textField("§bWelcome to Factions\n\nPlease enter the faction name:", "Faction Name")
        .textField("§b<Optional> Provide a brief description of your faction:", "Description")
        .toggle("§aMake It Public:", false)
        .show(player).then(({ formValues: [FactionName, Factiondes, factionprivacy], canceled }) => {
            if (canceled) return FactionMenu(player)
            if (player.factions.inFaction) return player.sendMessage(` You are allready in a faction`)
            if (FactionName.length < 3 || FactionName.length > 15) return player.sendMessage(`§cYour Name Must Be Atleast 3 And A Max Of 15 Letters`)
            if (FactionName.includes('§')) return player.sendMessage(`§cYou Can Not Use Color Codes In Your Faction Name!`)
            if (Factiondes.length < 0 || Factiondes.length > 80) return player.sendMessage(`§cThe Description Must Be Atleast 5 And A Max Of 80 Letters`)
            if (Factiondes.includes('§')) return player.sendMessage(`§cYou Can Not Use Color Codes In Your Faction Description!`)
            player.factions.create({
                name: FactionName,
                description: Factiondes,
                leader: { id: player.id, name: player.name },
                privte: factionprivacy
            }).then(() => player.sendMessage(`§aYou Have Created Your Faction\n§6Name:§7 ${FactionName}\n§6Description§7: ${Factiondes}\n§cPrivacy§7: ${factionprivacy ? 'Public' : 'Private'}`))
                .catch((error) => player.sendMessage(`§c${error}`))
        })
}


function DelateFaction(player) {
    const factionData = player.factions.inFaction;
    if (factionData.leader.id !== player.id) return player.sendMessage(`§cYou Not The Leader of this faction!`)
    if (!player.factions.inFaction) return FactionMenu(player);
    const { name } = factionData;
    const factioninfo = FactionInfo(factionData, ['faction name', 'leader', 'members', 'officers', 'description', 'created', 'privacy'])
    new ActionFormData()
        .title('§aDelete Faction')
        .body(`§6Are You Sure You Want To Delete\n${factioninfo}\n\n§6<EVERYTHING WILL BE DELETED>`)
        .button('§aConfirmed')
        .button('§cBack')
        .show(player).then(({ canceled, selection }) => {
            if (canceled) return
            if (factionData.leader.id !== player.id) return player.sendMessage(`§cYou Not The Leader of this faction!`)
            if (selection === 1) return FactionMenu(player);
            player.factions.delete(name)
            player.sendMessage(`§aYou Have Deleted §6${name}!`)
        })
}

function KickFaction(player) {
    const factionData = player.factions.inFaction;
    if (!player.factions.inFaction) return FactionMenu(player);
    if (factionData.leader.id !== player.id) return player.sendMessage(`§cYOu Not The Leader of this faction!`)
    const combine = factionData.members.concat(factionData.officers)
    if (combine.length === 0) return player.sendMessage(`§cThere Are No Players In Your Faction!`)
    const form = new ActionFormData()
    form.title('§aKick Player')
    form.body(`§aPlease Select A Player From Below\n${combine.length === 0 ? '§cThere Are No Players In Your Faction!' : ''}`)
    combine.forEach(({ name }) => form.button(`§a${name}`, 'textures/items/book_writable'))
    form.button('§cBack', 'textures/ui/cancel')
    form.show(player).then(({ canceled, selection }) => {
        if (canceled) return
        if (selection === combine.length || !player.factions.inFaction || factionData.leader.id !== player.id) return FactionMenu(player)
        const Playerindex = selection;
        const findUserMembers = factionData.members.find(({ id }) => id === combine[Playerindex].id)
        const findUserOfficers = factionData.officers.find(({ id }) => id === combine[Playerindex].id)
        if (!findUserMembers && !findUserOfficers) return player.sendMessage(`§cThis Player Is Not In Your Faction!`)
        if (findUserMembers) {
            player.factions.set(factionData.name, { members: factionData.members.filter(({ id }) => id !== combine[Playerindex].id) }).then(() => {
                player.sendMessage(`§aYou Have Kicked §6${combine[Playerindex].name} §aFrom §6${factionData.name}!`)
            }).catch((error) => player.sendMessage(`§c${error}`))
        } else
            player.factions.set(factionData.name, { officers: factionData.officers.filter(({ id }) => id !== combine[Playerindex].id) }).then(() => {
                player.sendMessage(`§aYou Have Kicked §6${combine[Playerindex].name} §aFrom §6${factionData.name}!`)
            }).catch((error) => player.sendMessage(`§c${error}`))

    })
}

/**
 * 
 * @param {Player} player 
 * @returns 
 */
function EditFaction(player) {
    const factionData = player.factions.inFaction;
    if (!player.factions.inFaction) return FactionMenu(player);
    if (!factionData.officers.some(({ id }) => id === player.id) && !factionData.leader.id === player.id) return player.sendMessage(`§cYu Must Be The Leader Or Officer To Edit The Faction!`)
    new ModalFormData()
        .title('§bEdit Faction')
        .textField('§bFaction Name:', factionData.name)
        .textField('§bFaction Description:', factionData.description)
        .toggle('§aMake Faction Public:', factionData.privte)
        .show(player).then(({ canceled, formValues: [newname, newdec, public2] }) => {
            if (canceled) return;
            if (!player.factions.inFaction) return FactionMenu(player);
            if (!factionData.officers.some(({ id }) => id === player.id) && !factionData.leader.id === player.id) return player.sendMessage(`§cYu Must Be The Leader Or Officer To Edit The Faction!`)
            if (newname.length > 1 && newname.length < 3 || newname.length > 15) return player.sendMessage(` Your Name Must Be Atleast 3 And A Max Of 15 Letters`)
            if (newname.includes('§')) return player.sendMessage(`§cYou Can Not Use Color Codes In Your Faction Name!`)
            if (newdec.length > 1 && newdec.length < 5 || newdec.length > 80) return player.sendMessage(` The Description Must Be Atleast 5 And A Max Of 80 Letters`)
            if (newdec.includes('§')) return player.sendMessage(`§cYou Can Not Use Color Codes In Your Faction Description!`)
            player.factions.set(factionData.name, {
                name: newname.length > 1 ? newname : factionData.name,
                description: newdec.length > 1 ? newdec : factionData.description,
                privte: public2 === factionData.privte ? factionData.privte : public2
            }).then(() => player.sendMessage(`Faction Details Have Been Updated`))
                .catch((error) => player.sendMessage(`${error}`))
        })
}
/**
 * 
 * @param {Player} player 
 * @returns 
 */
function FactionInvtePlayers(player) {
    const factionData = player.factions.inFaction;
    if (!player.factions.inFaction) return FactionMenu(player);
    if ((factionData.members.length + factionData.officers.length) >= factionConfig.JoinLimt) return player.sendMessage(`§cThis Faction Is Full!`)
    if (factionData.leader.id !== player.id && !factionData.officers.some(({ id }) => id === player.id)) return player.sendMessage(`§cYou Must Be The Leader Or Officer To Invite Players!`)
    const worldsPlayers = world.getPlayers().filter(value => !value.factions.allFactions.some(({ members, leader, officers }) => leader.id === value.id || officers.some(({ id }) => id === value.id) || members.some(({ id }) => id === value.id)))
    new ModalFormData()
        .title('§aInvite Players')
        .dropdown('§aPlease Select The Player You Want To Invite To Your Faction', ['§bPick Player', ...worldsPlayers.map(value => value.name)], 0)
        .toggle('§aAre You Sure You Want To Invite This Player', false)
        .show(player).then(({ canceled, formValues: [selectedPlayerIndex, confirm] }) => {
            if (canceled) return FactionMenu(player);
            if (!confirm || selectedPlayerIndex == 0) return FactionMenu(player)
            if (!player.factions.inFaction) return player.sendMessage(`You are allready left the Faction`)
            if (factionData.leader.id !== player.id && !factionData.officers.some(({ id }) => id === player.id)) return player.sendMessage(`§cYou Must Be The Leader Or Officer To Invite Players!`)
            if ((factionData.members.length + factionData.officers.length) >= factionConfig.JoinLimt) return player.sendMessage(`§cThis Faction Is Full!`)
            const invitataionsdata = factionData.invites
            const target = worldsPlayers[selectedPlayerIndex - 1]
            if (player.factions.allFactions.some(({ leader, officers, members }) => leader.id === target.id || officers.some(({ id }) => id === target.id) || members.some(({ id }) => id === target.id))) return player.sendMessage(`§cThis Player Is Already In A Faction!`)
            const findinvites = factionData.invites.find(({ id }) => id == target.id)
            if (invitataionsdata.some((value) => value.id == target.id)) return player.sendMessage(`You Have Already Invited This Player!\n§cYou Have §6${getTime(findinvites.time).seconds} §cSeconds Left To Invite Them!`)
            player.factions.set(factionData.name, { invites: [...factionData.invites, { id: target.id, name: target.name, time: setTimer(30, 'seconds') }] }).then(() => {
                player.sendMessage(`§6You Have Invited §6${target.name} §aTo Your Faction`);
                target.sendMessage(`§6You Have Been Invited To §6${factionData.name} §aFaction By §6${player.name} §aYou Have §630 §aSeconds To Accept The Invite!`)
            })
                .catch((error) => player.sendMessage(`${error}`))
        })
}

function viewInvites(player) {
    const factionData = player.factions.allFactions.filter(({ invites, members, officers }) => invites.some(({ id }) => id === player.id && !hasTimerReachedEnd(invites.find(({ id }) => id === player.id).time.targetDate)) && (members.length + officers.length) < factionConfig.JoinLimt)
    const form = new ActionFormData()
        .title('§aFaction Invites')
        .body(`§aPlease Select A Faction From Below\n${factionData.length === 0 ? '§cThere Are No Factions!' : ''}`);
    factionData.forEach(({ name }) => form.button(`§a${name}\n§c${getTime(factionData.find(({ name }) => name === name).invites.find(({ id }) => id === player.id).time).seconds} §aSeconds Left`, 'textures/items/book_writable'));
    form.button('§cClose', 'textures/ui/cancel');
    form.show(player).then(({ canceled, selection, }) => {
        if (canceled || selection === factionData.length) return FactionMenu(player);
        const selectedFaction = factionData[selection];
        if ((selectedFaction.members.length + selectedFaction.officers.length) >= factionConfig.JoinLimt) return player.sendMessage(`§cThis Faction Is Full!`)
        if (hasTimerReachedEnd(selectedFaction.invites.find(({ id }) => id === player.id).time.targetDate)) return player.sendMessage(`§cYou Have Been Removed From The Invites List!`)
        const { name, members } = selectedFaction;
        const factioninfo = FactionInfo(selectedFaction, ['faction name', 'leader', 'members', 'officers', 'description', 'created', 'privacy'])
        new ActionFormData()
            .title('§aFaction Info')
            .body(`§6Faction Info:\n${factioninfo}`)
            .button('§aYes')
            .button('§cBack')
            .show(player).then(({ canceled, selection }) => {
                if (canceled) return
                if (selection === 1) return FactionMenu(player);
                if (hasTimerReachedEnd(selectedFaction.invites.find(({ id }) => id === player.id).time.targetDate)) return player.sendMessage(`§cYou Have Been Removed From The Invites List!`)
                if (player.factions.inFaction) return player.sendMessage(`You are allready in a faction`)
                if ((selectedFaction.members.length + selectedFaction.officers.length) >= factionConfig.JoinLimt) return player.sendMessage(`§cThis Faction Is Full!`)
                if (!selectedFaction.invites.some(({ id }) => id === player.id)) return player.sendMessage(`You Have Not Been Invited To This Faction!`)
                player.factions.set(name, { members: [...members, { id: player.id, name: player.name }] }).then(() => {
                    player.sendMessage(`§aYou Have Joined §6${name}!`)
                    const findowner = world.getPlayers({ name: selectedFaction.leader.name })[0]
                    if (findowner) return findowner.sendMessage(`§a${player.name} §aHas Joined Your Faction!`)
                })
                    .catch((error) => player.sendMessage(`§c${error}`))
            })
    });
}

function FactionHomeMenu(player) {
    const factionData = player.factions.inFaction;
    if (!player.factions.inFaction) return FactionMenu(player);
    new ActionFormData()
        .title('§cFaction Manager')
        .body(`§7Hey. Welcome to Faction manager.`)
        .button('§bGo Home', 'textures/ui/icon_recipe_item')
        .button('§bSet Home', 'textures/ui/icon_recipe_item')
        .button('§cDelete Home', 'textures/ui/cancel')
        .button('§cExit', 'textures/ui/cancel')
        .show(player).then(({ canceled, selection, }) => {
            if (canceled) return;
            if (!player.factions.inFaction) return FactionMenu(player);
            const selectedAction = selection;
            switch (selectedAction) {
                case 0: GoHome(player); break;
                case 1:
                    if (factionData.members.some(({ id }) => id === player.id)) return player.sendMessage(`§cYou Must Be A Officer Or Owner To Set The Home`)
                    SetHome(player);
                    break;
                case 2:
                    if (factionData.members.some(({ id }) => id === player.id)) return player.sendMessage(`§cYou Must Be A Officer Or Owner To Delete The Home`)
                    DeleteHome(player); break;
                case 3: FactionMenu(player); break;
            }
        });
}

/**
 * 
 * @param {Player} player 
 * @returns 
 */
function SetHome(player) {
    if (player.hasTag('safe')) return player.sendMessage(`§cYou Cannot Set A Home While In Safe Pleace!`)
    const factionData = player.factions.inFaction;
    if (!player.factions.inFaction) return FactionMenu(player);
    if (!factionData.leader.id === player.id && !factionData.officers.some(({ id }) => id === player.id)) return player.sendMessage(`§cYou Must Be A Officer Or Owner To Set The Home`)
    const { claims } = factionData;
    if (claims?.location) return player.sendMessage(`§cYou Allready Have A Faction Home!`);
    new ModalFormData()
        .title("§aSet Home")
        .toggle("§aDo You Want To Set This Home To Your Current Position?", true)
        .show(player).then(({ canceled, formValues: [Confirm] }) => {
            if (canceled) return
            if (!player.factions.inFaction) return FactionMenu(player);
            if (!factionData.leader.id === player.id && !factionData.officers.some(({ id }) => id === player.id)) return player.sendMessage(`§cYou Must Be A Officer Or Owner To Set The Home`)
            if (!Confirm) return player.sendMessage(`§cHome Not Set!`)
            player.factions.set(factionData.name, { claims: { location: player.location, dimension: player.dimension.id } })
            player.sendMessage(`§aHome Set\n§cFaction Name:§7 ${factionData.name}!`)
        })
}

function GoHome(player) {
    const factionData = player.factions.inFaction;
    if (!player.factions.inFaction) return FactionMenu(player);
    const { claims } = factionData;
    if (!claims?.location) return player.sendMessage(`§cYou Dont Have A Faction Home!\nYour Faction Is... Well... Homeless!`);
    player.teleport(claims.location, { dimension: world.getDimension(claims.dimension) })
    player.sendMessage(`§aTeleported To Your Faction Home`)
}

function DeleteHome(player) {
    const factionData = player.factions.inFaction;
    if (!player.factions.inFaction) return FactionMenu(player);
    if (!factionData.leader.id === player.id && !factionData.officers.some(({ id }) => id === player.id)) return player.sendMessage(`§cYou Must Be A Officer Or Owner To Set The Home`)
    const { claims } = factionData;
    if (!claims?.location) return player.sendMessage(`§cYou Allready Have A Faction Home!`);
    new ModalFormData()
        .title("§aDelete Home")
        .toggle("§aAre You Sure You Want To Delete Your Faction Home?", false)
        .show(player).then(({ canceled, formValues: [Confirm] }) => {
            if (canceled) return
            if (!player.factions.inFaction) return FactionMenu(player);
            if (!factionData.leader.id === player.id && !factionData.officers.some(({ id }) => id === player.id)) return player.sendMessage(`§cYou Must Be A Officer Or Owner To Set The Home`)
            if (!Confirm) return player.sendMessage(`§cHome Not Deleted!`)
            player.factions.set(factionData.name, { claims: null })
            player.sendMessage(`§aHome Deleted`)
        })
}

/**
 * @param {Player} player
 * @param {['owner', 'officer', 'member', 'balance', 'description', 'name', 'privacy']} request
 * @returns {string} 
 */
function FactionInfo(factionData, request = []) {
    const { name, leader, members, description, created, balance, officers } = factionData;
    const memberNames = members.length === 0 ? 'None' : members.map(({ name }) => name).join(', ');
    const officerNames = officers.length === 0 ? 'None' : officers.map(({ name }) => name).join(', ');
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

system.runInterval(() => {
    world.getPlayers().map((player) => {
        const allFactions = player.factions.allFactions.filter(({ invites }) => invites.some(({ id }) => id === player.id))
        allFactions.forEach(({ invites, name }) => 
            invites.forEach(({ time }, index) => {
                if (hasTimerReachedEnd(time.targetDate)) return player.factions.set(name, { invites: invites.filter((_, i) => i !== index) })
            })
        )
        if (!player.factions.inFaction) return player.nameTag = `${player.name}`
        const factionData = player.factions.inFaction;
        player.nameTag = `${factionData.name} - ${factionData.leader.id === player.id ? 'Leader' : factionData.officers.some(({ id }) => id === player.id) ? 'Officer' : 'Member'}\n§a${player.name}`
    })
}, 90)