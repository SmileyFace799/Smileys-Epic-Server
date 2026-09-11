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

    /*
    function registerOrb(name, structures) {
        event.create("orb_" + name.toLowerCase())
            .displayName(name + " orb")
            .tooltip("Used for making pocket dimensions of: " + structures.join(", "))
            .rarity("rare")
            .maxStackSize(64);
    }

    // Orb list
    registerOrb("Desert", ["Desert Temples"]);
    registerOrb("Emerald", ["Villages"]);
    registerOrb("Jungle", ["Jungle Temples"]);
    registerOrb("Nether", ["Bastions", "Nether Fortresses"]);
    registerOrb("Ocean", ["Ocean Monuments", "Shipwrecks"]);
     */
});