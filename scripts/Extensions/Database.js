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


import { world, Player } from "@minecraft/server";

Object.defineProperty(globalThis, 'Database', {
    get: function () {
        return {
            /**
             * Set a value in the database.
             * @param {string} key - The database key.
             * @param {boolean | number | string | object} value - The value to set.
             * @param {Player} [player=null] - The player for whom to set the database (default: null, i.e., set to world).
             * @example
             * set('auction', JSON.stringify({'dirt': 1})) // set to world
             * set('auction', JSON.stringify({'dirt': 1}), player) // set to player
             */
            set(key, value, player = null) {
                // if (typeof value === 'undefined' || isNaN(value) || value === null) throw new Error('Invalid value');
                if (typeof value === 'object') value = JSON.stringify(value);
                (player || world).setDynamicProperty(key, value);
            },
            /**
           * Get a value from the database.
           * @param {string} key - The database key.
           * @param {Player} [player=null] - The player from whom to get the database (default: null, i.e., get from world).
           * @returns {boolean | number | string | object} The value of the specified key.
           */
            get(key, player = null) {
                let value = (player || world).getDynamicProperty(key);
                try { value = JSON.parse(value); } catch (e) {}
                return value;
            },
            /**
            * Check if a key exists in the database.
            * @param {string} key - The database key.
            * @param {Player} [player=null] - The player to check for the key (default: null, i.e., check in world).
            * @returns {boolean} True if the key exists, false otherwise.
            */
            has(key, player = null) {
                return !!(player || world).getDynamicProperty(key);
            },
            /**
             * Delete a key from the database.
             * @param {string} key - The database key to delete.
             * @param {Player} [player=null] - The player from whom to delete the key (default: null, i.e., delete from world).
             */
            delete(key, player = null) {
                (player || world).setDynamicProperty(key, null);
            },
            /**
             * Retrieves dynamic properties and their values from the specified player or world object.
             * @param {Object} [player=null] - The player class (default is null, i.e., entries from world).
             * @returns {Array} An array of objects, each containing a dynamic property ID as a key and its corresponding value.
             */
            entries(player) {
                return (player || world).getDynamicPropertyIds().map((value) => [value, this.get(value, (player || world))]);
            }
        };
    }
});