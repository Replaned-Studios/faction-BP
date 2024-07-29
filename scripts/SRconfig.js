Object.defineProperty(globalThis, 'SRconfig', {
    value: {
        ServerMenu: {
            MembersItem: 'soulless:menu',

            settings: ['Money', 'Kills', 'Deaths', 'KDR', 'Killstreak', "Coordinates", 'Playtime', 'FactionInfo', 'RealmInfo'],

            Warps: [
                {
                    locationName: 'Wilderness'
                },
                {
                    location: {x: 0.50, y: 115, z: 0.50},
                    locationName: 'Spawn',
                },
                {
                    location: {x: 120.50, y: 100, z: 0.50}, 
                    locationName: 'Shop',
                },
                {
                    location: { x: -70.50, y: 103, z: 2 },
                    locationName: 'Crates',
                }
            ]
        },
        Homes: {
            MaxMemberHomes: 3,
            MaxVIPHomes: 10,
        },
        DatabaseNames: {
            Sidebar: 'SidebarSettings',
            Ban: 'BannedPlayers',
            Mute: 'MutedPlayers',
            Dailyreward: 'DailyRewards',
            Home: 'PlayerHomes',
            TimePlayed: 'Time Played',
            Bounty: 'PlayerBounties',
        },
        ScoreBoards: {
            Money: 'Money',
            Kills: 'Kills',
            Deaths: 'Deaths',
            Killstreak: 'Killstreak',
            Playtime: 'Playtime',
        },
        DefaultSideBarData: {
            'Kills': `§2Kills:`,
            'Deaths': `§cDeaths:`,
            'Money': `§aMoney:`,
            'KDR': `§bKDR:`,
            'Killstreak': `§dKillstreak:`,
            'Playtime': `§mTime Played:`,
            'Coordinates': `§bCords:`,
        },
        GameRuleTurnedOff: [
            'showcoordinates',
            'commandblockoutput',
            'falldamage',
            'domobspawning'
        ],
        MobStackerConfig: {
            maxDistance: 40,
            maxEntities: 100,
            EntityTypes: [
                'chickenstill',
                'creeperstill',
                'cowstill',
                'blazestill',
                'endermanstill',
                'guardianstill',
                'irongolemstill',
                'magmacubestill',
                'pigstill',
                'sheepstill',
                'skeletonstill',
                'slimestill',
                'spiderstill',
                'witherskeletonstill',
                'witherstill',
                'zombiestill'
            ]
        },
        BlockSpawner: {
            LevelOneSpawnerTimer: 80,
            MaxLevel: 10,
            SpawnersIds: [
                'blazespawner',
                'sheepspawner',
                'chickenspawner',
                'cowspawner',
                'pigspawner',
                'zombiespawner',
                'skeletonspawner',
                'spiderspawner',
                'slimespawner',
                'magmacubespawner',
                'endermanspawner',
                'creeperspawner',
                'iron_golem_spawner',
                'witherskeletonspawner',
                'witherspawner',
                'guardianspawner',
                'shulkerspawner',
            ],
            SpawnerViewNames: {
                'blazespawner': 'Blaze',
                'sheepspawner': 'Sheep',
                'chickenspawner': 'Chicken',
                'cowspawner': 'Cow',
                'pigspawner': 'Pig',
                'zombiespawner': 'Zombie',
                'skeletonspawner': 'Skeleton',
                'spiderspawner': 'Spider',
                'slimespawner': 'Slime',
                'magmacubespawner': 'Magma Cube',
                'endermanspawner': 'Enderman',
                'creeperspawner': 'Creeper',
                'irongolemspawner': 'Iron Golem',
            }
        },
        ReedemCode: {
            Codes: [
                {
                    code: '10k',
                    times: 1,
                    callback: (player) => {
                        player.sendMessage(`§aYou have redeemed a code! and received 10k`)
                        player.score.Money = (player.score.Money ?? 0) + 100000
                    }
                },
                {
                    code: "shinydiamonds",
                    times: 1,
                    callback: (player) => {
                        player.sendMessage('§aYou have redeemed a code! and received 64 Diamonds')
                        player.addItems([
                            ['minecraft:diamond', 64]
                        ])
                    }
                },
                {
                    code: 'Discord',
                    times: 1,
                    callback: (player) => {
                        player.sendMessage('§aYou have redeemed a code! and received a Discord Rank')
                        player.addTag('Discord')
                    }
                },
                {
                    code: 'piggy420',
                    times: 1,
                    callback: (player) => {
                        player.sendMessage('§aYou have redeemed a code! and received 100k')
                        player.addItems([
                            ['mrleefy:pigspawner', 1]
                        ])
                    }
                }
            ],
        },
     
        DiscordLink: 'https://discord.gg/nXatwBxgTS',
    }
})