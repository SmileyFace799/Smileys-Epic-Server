LootJS.lootTables(event => {
    const removeLoot = [
        "swem:plate_netherite",
        "swem:cantazarite_dye",
        "swem:star_worm_cobble"
    ];
    for (const table of event.modifyLootTables(global.regexAny).tables) {
        table.pools.forEach(pool => {
            for (const loot of removeLoot) {
                pool.entries.removeItem(loot);
            }
        });
    }

    // SMITHING TEMPLATES
    // 1. Safe global ID collection list to completely bypass Java filter crashes
    let allTableIds = event.getLootTableIds();

    allTableIds.forEach(resourceLocation => {
        let id = resourceLocation.toString();

        if (id.includes('chests/')) {

            // 2. DYNAMIC MATCHING FOR VILLAGES
            if (id.includes('village')) {
                let table = event.getLootTable(id); 
                if (table) {
                    // FIX: Creates a brand new independent pool so vanilla loot quantities stay normal!
                    table.createPool(pool => {
                        pool.rolls(1); // Only sets 1 roll for OUR custom templates pool
                        
                        pool.addEntry(LootEntry.of('kubejs:stone_to_copper_upgrade_template').withWeight(70).randomChance(0.20));
                        pool.addEntry(LootEntry.of('kubejs:copper_to_iron_upgrade_template').withWeight(30).randomChance(0.20));
                    });
                }
            }

            // 3. DYNAMIC MATCHING FOR MINESHAFTS
            if (id.includes('mineshaft')) {
                let table = event.getLootTable(id);
                if (table) {
                    table.createPool(pool => {
                        pool.rolls(1);
                        
                        pool.addEntry(LootEntry.of('kubejs:stone_to_copper_upgrade_template').withWeight(40).randomChance(0.20));
                        pool.addEntry(LootEntry.of('kubejs:copper_to_iron_upgrade_template').withWeight(45).randomChance(0.20));
                        pool.addEntry(LootEntry.of('kubejs:iron_to_gold_upgrade_template').withWeight(15).randomChance(0.20));
                    });
                }
            }

            // 4. DYNAMIC MATCHING FOR DUNGEONS, PYRAMIDS & STRONGHOLDS
            if (id.includes('dungeon') || 
                id.includes('pyramid') || 
                id.includes('stronghold') || 
                id.includes('temple') || 
                id.includes('lost_structure') ||
                id.includes('epic_') ||
                id.includes('structure_chest')) {
                    
                let table = event.getLootTable(id);
                if (table) {
                    table.createPool(pool => {
                        pool.rolls(1);
                        
                        pool.addEntry(LootEntry.of('kubejs:copper_to_iron_upgrade_template').withWeight(30).randomChance(0.15));
                        pool.addEntry(LootEntry.of('kubejs:iron_to_gold_upgrade_template').withWeight(45).randomChance(0.15));
                        pool.addEntry(LootEntry.of('kubejs:gold_to_diamond_upgrade_template').withWeight(25).randomChance(0.15));
                    });
                }
            }
        }
    });
});
