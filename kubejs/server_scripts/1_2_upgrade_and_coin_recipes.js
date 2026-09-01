ServerEvents.recipes(event => {
    // 1. Define our tool and armor types to scan for (including spears)
    const toolTypes = ['sword', 'pickaxe', 'axe', 'shovel', 'hoe', 'spear'];
    const armorTypes = ['helmet', 'chestplate', 'leggings', 'boots'];
    const allTypes = toolTypes.concat(armorTypes);

    // 2. Define our tier progression rules
    const tiers = [
        { name: 'copper',   template: 'kubejs:stone_to_copper_upgrade_template' },
        { name: 'iron',     template: 'kubejs:copper_to_iron_upgrade_template' },
        { name: 'gold',     template: 'kubejs:iron_to_gold_upgrade_template' },
        { name: 'golden',   template: 'kubejs:iron_to_gold_upgrade_template' }, 
        { name: 'diamond',  template: 'kubejs:gold_to_diamond_upgrade_template' }
    ];

    // 3. Scan the entire item registry
    Item.list.forEach(item => {
        if (!item || item.id === 'minecraft:air') return;

        let itemId = item.id.toString(); 

        // --- EXCLUSION FILTERS ---
        if (itemId.startsWith('swem:') || itemId.startsWith('iceandfire:')) return;
        
        let idParts = itemId.split(':');
        if (idParts.length < 2) return;
        let path = idParts[1]; 

        tiers.forEach(tier => {
            let hasTierKeyword = path.startsWith(tier.name + '_') || path.endsWith('_' + tier.name) || path.includes('_' + tier.name + '_');
            let hasTypeKeyword = allTypes.some(type => path.endsWith('_' + type) || path.startsWith(type + '_'));

            if (hasTierKeyword && hasTypeKeyword) {
                let detectedType = allTypes.find(type => path.endsWith('_' + type) || path.startsWith(type + '_'));
                let baseItem = null;

                // --- CALCULATION PATHS (Base Inputs) ---
                if (tier.name === 'copper') {
                    if (toolTypes.includes(detectedType)) {
                        baseItem = `minecraft:stone_${detectedType}`;
                    } else if (armorTypes.includes(detectedType)) {
                        baseItem = `minecraft:leather_${detectedType}`;
                    }
                } 
                else if (tier.name === 'iron') {
                    baseItem = `minecraft:copper_${detectedType}`;
                } 
                else if (tier.name === 'gold' || tier.name === 'golden') {
                    baseItem = `minecraft:iron_${detectedType}`;
                } 
                else if (tier.name === 'diamond') {
                    baseItem = Item.exists(`minecraft:golden_${detectedType}`) ? `minecraft:golden_${detectedType}` : `minecraft:iron_${detectedType}`;
                }

                if (baseItem && (baseItem.startsWith('swem:') || baseItem.startsWith('iceandfire:'))) baseItem = null;

                // --- SMITHING TABLE LOGIC ---
                // Example: Upgrading a stone_hoe (baseItem) using a copper_hoe (itemId) as the ingredient
                let requiredToolIngredient = itemId;

                if (baseItem && Item.exists(baseItem) && itemId !== baseItem) {
                    event.smithing(
                        itemId,                  // Output (e.g., minecraft:copper_hoe)
                        tier.template,           // Template (e.g., kubejs:stone_to_copper_upgrade_template)
                        baseItem,                // Base Item to be upgraded (e.g., minecraft:stone_hoe)
                        requiredToolIngredient   // Smithing Ingredient (e.g., minecraft:copper_hoe)
                    ).id(`kubejs:dynamic_upgrade_${itemId.replace(':', '_')}`);
                }
            }
        });
    });

    // ==========================================
    // SECTION 2: TEMPLATE DUPLICATION RECIPES
    // ==========================================
    // Back to using raw material ingots/gems for the crafting table duplication recipe
    const templateDuplicates = [
        ['kubejs:stone_to_copper_upgrade_template', 'minecraft:copper_ingot'], 
        ['kubejs:copper_to_iron_upgrade_template', 'minecraft:iron_ingot'],
        ['kubejs:iron_to_gold_upgrade_template', 'minecraft:gold_ingot'],
        ['kubejs:gold_to_diamond_upgrade_template', 'minecraft:diamond']
    ];

    templateDuplicates.forEach(([templateId, materialIngot]) => {
        event.shaped(
            Item.of(templateId, 2), 
            [
                'SBS',
                'SDS',
                'SSS'
            ], 
            {
                S: '#c:stones',       // Outer ring universally accepts any common stone tag alternative
                B: materialIngot,     // Middle top: Uses the raw ingot/gem material
                D: templateId         // Exact center slot: Template to copy
            }
        ).id(`kubejs:duplicate_${templateId.replace(':', '_')}`);
    });

    // 1. Copper Coinstack -> 64x Spur Coins (Total Value: 64 Spurs)
    // 1 Loop | Consumes 1x Copper Nugget
    event.recipes.createSequencedAssembly(
        'numismatics:spur', 
        'create:copper_nugget', 
        [
            event.recipes.create.deploying('create:incomplete_precision_mechanism', ['create:incomplete_precision_mechanism', 'create:copper_nugget']),
            event.recipes.create.pressing('create:incomplete_precision_mechanism', 'create:incomplete_precision_mechanism')
        ]
    ).transitionalItem('create:incomplete_precision_mechanism').loops(128);

    // 2. Zinc Coinstack -> 8x Bevel Coins (Total Value: 64 Spurs)
    // 8 Loops | Consumes 8x Zinc Nuggets total
    event.recipes.createSequencedAssembly(
        'numismatics:bevel', 
        'create:zinc_nugget', 
        [
            event.recipes.create.deploying('create:incomplete_precision_mechanism', ['create:incomplete_precision_mechanism', 'create:zinc_nugget']),
            event.recipes.create.pressing('create:incomplete_precision_mechanism', 'create:incomplete_precision_mechanism')
        ]
    ).transitionalItem('create:incomplete_precision_mechanism').loops(64);

    // 4. Iron Coinstack -> 4x Iron Sprocket Coins (Total Value: 64 Spurs)
    // 16 Loops | Consumes 16x Iron Nuggets total
    event.recipes.createSequencedAssembly(
        'numismatics:sprocket', 
        'minecraft:iron_nugget', 
        [
            event.recipes.create.deploying('create:incomplete_precision_mechanism', ['create:incomplete_precision_mechanism', 'minecraft:iron_nugget']),
            event.recipes.create.pressing('create:incomplete_precision_mechanism', 'create:incomplete_precision_mechanism')
        ]
    ).transitionalItem('create:incomplete_precision_mechanism').loops(32);

    // 5. Brass Coinstack -> 1x Brass Cog Coin (Total Value: 64 Spurs)
    // 32 Loops | Consumes 32x Brass Nuggets total
    event.recipes.createSequencedAssembly(
        'numismatics:cog', 
        'create:brass_nugget', 
        [
            event.recipes.create.deploying('create:incomplete_precision_mechanism', ['create:incomplete_precision_mechanism', 'create:brass_nugget']),
            event.recipes.create.pressing('create:incomplete_precision_mechanism', 'create:incomplete_precision_mechanism')
        ]
    ).transitionalItem('create:incomplete_precision_mechanism').loops(16);

    // 6. Gold Coinstack -> 1x Gold Crown Coin (Total Value: 512 Spurs)
    // 8 Loops | Consumes 8x Diamonds total
    event.recipes.createSequencedAssembly(
        'numismatics:crown', 
        'minecraft:gold_nugget', 
        [
            event.recipes.create.deploying('create:incomplete_precision_mechanism', ['create:incomplete_precision_mechanism', 'minecraft:diamond']),
            event.recipes.create.pressing('create:incomplete_precision_mechanism', 'create:incomplete_precision_mechanism')
        ]
    ).transitionalItem('create:incomplete_precision_mechanism').loops(8);

    // 7. Netherite Coinstack -> 1x Netherite Sun Coin (Total Value: 4,096 Spurs)
    // 4 Loops | Consumes 4x Netherite Scraps total
    event.recipes.createSequencedAssembly(
        'numismatics:sun', 
        'minecraft:netherite_scrap', 
        [
            event.recipes.create.deploying('create:incomplete_precision_mechanism', ['create:incomplete_precision_mechanism', 'minecraft:netherite_scrap']),
            event.recipes.create.pressing('create:incomplete_precision_mechanism', 'create:incomplete_precision_mechanism')
        ]
    ).transitionalItem('create:incomplete_precision_mechanism').loops(4);
});