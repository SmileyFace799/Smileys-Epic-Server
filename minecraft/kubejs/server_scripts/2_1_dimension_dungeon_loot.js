/*
LootJS.modifiers(event => {
    event
        .addTableModifier(LootType.CHEST)
        .customAction((context, loot) => {

            // Get the dimension where the loot table is being rolled.
            const dimension = context.level.dimension;
            console.log([dimension.namespace, dimension.path]);
            // Only modify Instanced Not Infinite dimensions.
            if (
                dimension.namespace !== 'instancednotinfinite' ||
                !dimension.path.startsWith('instances/')
            ) {
                return
            }

            // Take a snapshot of the original loot.
            // We must not iterate over `loot` while adding to it,
            // otherwise the newly-added items could be processed again.
            loot.addItem(Item.of('minecraft:paper').withCustomName('This is inside a pocket dimension!'));
            const originalLoot = []
            loot.forEach(i => originalLoot.push(i));

            for (let i = 0; i < 1; ++i) {
                originalLoot.forEach(item => {
                    loot.addItem(item.copy())
                })
            }
        })
})
 */