ServerEvents.tags("item", event => {
    for (const color of global.colors) {
        event.add("waystones:portstones", `waystones:${color}_portstone`);
    }

    event.add("c:hidden_from_recipe_viewers", ["cb_microblock:microblock", "chiselsandbits:block_bit"]);
    
    // SILVER
    // Ingot
    event.add("minecraft:beacon_payment_items", "occultism:silver_ingot");

    event.add("c:ingots/iron_or_silver", ["minecraft:iron_ingot", "occultism:silver_ingot"]);
    event.add("c:nuggets/iron_or_silver", ["minecraft:iron_nugget", "occultism:silver_nugget"]);
    event.add("c:storage_blocks/iron_or_silver", ["minecraft:iron_block", "occultism:silver_block"]);
});

ServerEvents.tags("block", event => {
    // SILVER
    event.add("minecraft:beacon_base_blocks", "occultism:silver_block");
});