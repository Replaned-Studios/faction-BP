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

import { Player, world } from '@minecraft/server';
/**
 * @typedef {Object} ChatCommand
 * @property {string} command - The command name - ex: 'help'
 * @property {string} description - The command description - ex: 'Server'
 * @property {string[] | Array} alias - The command alias - ex: ['h']
 * @property {{[key: string]: 'number' | 'string' | 'boolean', required?: [string] | undefined}} args - The command arguments - ex: { 'target': 'string', 'page': 'number', required: ['target']} 
 * @property {(player: Player) => Boolean} permissions - The command permissions - ex: (player) => player.isOp()
 * @property {(player: Player, args: Object | undefined, commandString: string) => void} callback - The command callback - ex: (player, args, commandString) => { player.sendMessage('Hello World') }
 */

/** @type {ChatCommand[]} */
export const commands = [];
const prefix = '.';
let CommandInitialized = false;

/**
 * @function
 * @param {ChatCommand} CommandObject
 * @returns {void}
 */
export default function ChatCommand(CommandObject /**@type {{command, description, alias, args, permissions, callback}}*/) {
    if (!CommandObject.command || !CommandObject.command.length === 0) throw new Error('command Name is required');
    commands.push(Object.assign({ description: '', alias: [], args: false, permissions: false, callback: () => { } }, CommandObject));
    if (CommandInitialized) return;
    CommandInitialized = true;
    world.beforeEvents.chatSend.subscribe((data) => {
        const { message, sender: player } = data;
        if (!message.startsWith(prefix)) return;
        data.cancel = true;
        const commandString = message.slice(prefix.length).trim();
        const matchedCommand = commands.find(({ command, alias }) => new RegExp(`^${command}(\\s|$)`, 'i').test(commandString) || (alias && alias.some(a => new RegExp(`^${a}(\\s|$)`, 'i').test(commandString))));
        const findCommandString = commands.reduce((result, { command, alias }) => !result && new RegExp(`^${command}(\\s|$)`, 'i').test(commandString) ? command : result || (alias && alias.find(v => new RegExp(`^${v}(\\s|$)`, 'i').test(commandString))) || null, null);
        if (matchedCommand && (!matchedCommand.permissions || matchedCommand.permissions(player))) {
            if (matchedCommand.args) {
                const input = commandString.slice(findCommandString.length).match(/(?:[^\s"]+|"[^"]*")+/g) || ''
                const requiredArgs = matchedCommand.args.required || [];
                const parsedArgs = {};
                const errors = [];
                Object.entries(matchedCommand.args).forEach(([arg, type], index) => {
                    if (arg === 'required') return
                    if (requiredArgs.length > 0 && requiredArgs.includes(arg) && !input[index]) return errors.push(`§c'§f${arg}§c' is required`);
                    if (requiredArgs.length > 0 && !input[index]) return;
                    const typedata = {
                        'number': (() => isNaN(parseInt(input[index])) ? errors.push(`§c'§f${arg}§c' is not a Number`) : parsedArgs[arg] = parseInt(input[index])),
                        "boolean": (() => !['true', 'false'].includes(input[index]) ? errors.push(`§c'§f${arg}§c' is not a true or false`) : parsedArgs[arg] = JSON.parse(input[index])),
                        "string": (() => (!isNaN(parseInt(input[index])) || ['true', 'false'].includes(input[index]) || typeof input[index] !== 'string') ? errors.push(`§c'§f${arg}§c' is not a string`) : parsedArgs[arg] = input[index])
                    }
                    typedata[type]()
                })
                if (errors.length > 0) return player.sendMessage(`§cError parsing command arguments: ${errors.join(', ')}`);
                matchedCommand.callback(player, parsedArgs, findCommandString);
            } else matchedCommand.callback(player, undefined, findCommandString);
        } else player.sendMessage(`§cUnknown command: ${commandString}, Please check that the command exists and that you have permission to use it.`);
    });
}


ChatCommand({
    command: 'help',
    alias: ['h'],
    description: 'List all commands',
    callback: (player) => {
        const commandsList = commands
            .filter(({ permissions }) => !permissions || permissions(player))
            .map(({ command, description, alias }) => {
                const aliasText = Array.isArray(alias) ? alias.join(', ') : `§7No Aliases`;
                return `\n§2${command}§f - ${description}, §7Aliases: §f${aliasText}`;
            })
            .join('');
        player.sendMessage({
            rawtext: [
                {
                    text: `§2--- Help Page ---${commandsList}`,
                }
            ],
        });
    }

})