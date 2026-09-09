StartupEvents.registry('item', event => {
    
    // Registers the templates as generic items to prevent builder mismatches
    function registerTemplate(id, name) {
        event.create(id)
            .displayName(name)
            .maxStackSize(64);
    }

    // Your template list remains identical:
    registerTemplate('stone_to_copper_upgrade_template', 'Copper Upgrade Smithing Template');
    registerTemplate('copper_to_iron_upgrade_template', 'Iron Upgrade Smithing Template');
    registerTemplate('iron_to_gold_upgrade_template', 'Gold Upgrade Smithing Template');
    registerTemplate('gold_to_diamond_upgrade_template', 'Diamond Upgrade Smithing Template');
});
