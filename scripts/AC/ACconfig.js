Object.defineProperty(globalThis, 'ACconfig', {
        value: {
            OwnerNames: ['SIW Soulless', 'THE BOSS9345'], 
            Tags: {
            AdminTags: ['Owner', 'Admin', 'Moderator', 'Helper'],
            skipPlayers: ['Owner', 'Admin', 'Moderator'],
            CombatTag: 'incombat',
            VIP: "VIP"
        },
        SafeZone: {
            RemoveEntityTypes: [
                'tnt',
                'arrow',
                'thrown_trident',
                'potion',
                'lingering_potion',
                'splash_potion',
                'snowball',
                'fishing_hook'
            ]
        },
        BannedItems: [
            'firework_star',
            'firework_star_overlay',
            'ender_pearl',
            'end_crystal',
            'filled_map',
            'empty_map',
            'map',
            'kelp',
            'snow_layer',
            'big_dripleaf',
            'small_dripleaf_block',
            'mob_spawner',
            'respawn_anchor'
        ],
        KillEntitys: [
            'blaze',
            'warden',
            'ender_dragon',
            'villager_v2',
            'wither',
            'endermite',
            'spider',
            'zombie',
            'skeleton',
            'ender_crystal',
            'cave_spider',
            'trident',
            'bow',
            'crossbow',
            'fishing_rod',
            'zombie_villager'
        ],
        BannedBlocks: [
         'respawn_anchor',   
        ]
    }
})