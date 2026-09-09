ItemEvents.modifyTooltips(tooltip => {
    tooltip.add(Object.keys(global.removedItemsWithReplacement), [
        Text.of("This item is disabled").color(0xFF0000),
        Text.gray("If you somehow obtained this item, place it in a crafting grid to convert it into something useful")
    ]);
    tooltip.add(global.removedItemsNoReplacement, [
        Text.of("This item is disabled").color(0xFF0000)
    ]);
});
