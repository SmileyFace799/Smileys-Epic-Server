LootJS.modifiers(event => {
    for (const grassLength of ["short", "tall"]) {
        event.addBlockModifier(`minecraft:${grassLength}_grass`).addLoot(LootEntry.of("swem:star_worm").limitCount(1, 2).matchTool("#minecraft:hoes").matchTime(12000, 24000).randomChance(0.5));
    }
});
