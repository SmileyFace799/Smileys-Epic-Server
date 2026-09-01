ServerEvents.tags('block', blockTag => {
    for (const item in global.removedItems) {
        blockTag.removeAllTagsFrom(item);
    }
});
ServerEvents.tags('fluid', fluidTag => {
    for (const item in global.removedItems) {
        fluidTag.removeAllTagsFrom(item);
    }
});
ServerEvents.tags('item', itemTag => {
    for (const item in global.removedItems) {
        itemTag.removeAllTagsFrom(item);
        itemTag.add("c:hidden_from_recipe_viewers", item);
    }
});

ServerEvents.recipes(recipe => {
    for (const [from, to] of Object.entries(global.removedItemsWithReplacement)) {
        recipe.remove({output: from});
        recipe.shapeless(to, [from]);
    }
    for (const item of global.removedItemsNoReplacement) {
        recipe.remove({output: item});
    }
});

LootJS.lootTables(event => {
    for (const [from, to] of Object.entries(global.removedItemsWithReplacement)) {
        for (const table of event.modifyLootTables(global.regexAny).tables) {
            table.pools.forEach(pool => pool.entries.replaceItem(from, to.split("x ")[1] ?? to, true));
        }
    }
    for (const item of global.removedItemsNoReplacement) {
        for (const table of event.modifyLootTables(global.regexAny).tables) {
            table.pools.forEach(pool => pool.entries.removeItem(item));
        }
    }
});

LootJS.modifiers(event => {
    for (const [from, to] of Object.entries(global.removedItemsWithReplacement)) {
        event.addBlockModifier(from).removeLoot(ItemFilter.ANY).addLoot(to);
    }
    for (const item of global.removedItemsNoReplacement) {
        event.addBlockModifier(item).removeLoot(ItemFilter.ANY).addLoot(item);
    }
});
