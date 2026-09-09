ServerEvents.recipes(event => {
    const create = event.recipes.create;

    // REMOVED
    // Cantazarite -> Blaze rod
    event.remove({type: "minecraft:crafting_shaped", output: "minecraft:blaze_rod", input: "swem:cantazarite"});
    
    // Cantazarite Dye -> Orange Dye
    event.remove({type: "minecraft:crafting_shapeless", output: "minecraft:orange_dye", input: "swem:cantazarite_dye"});

    // Netherite plate -> Netherite Ingot
    event.remove({type: "minecraft:crafting_shapeless", output: "minecraft:netherite_ingot", input: "swem:plate_netherite"});

    // Star Worm Cobble -> Star Worm
    event.remove({type: "minecraft:crafting_shaped", output: "swem:star_worm", input: "#swem:star_worm_cobble"});

    // ADDED / CHANGED

    // Red alloy wires
    event.remove({type: "minecraft:crafting_shaped", output: "projectred_transmission:red_alloy_wire"});
    event.shaped("9x projectred_transmission:red_alloy_wire", [
        "AAA",
        "BBB",
        "AAA"
    ], {A: "#c:dusts/redstone", B: "#c:ingots/copper"});

    // Insulated wires
    for (const color of global.colors) {
        event.remove({type: "minecraft:crafting_shaped", output: `projectred_transmission:${color}_insulated_wire`});
        event.remove({type: "minecraft:crafting_shapeless", output: `projectred_transmission:${color}_insulated_wire`});
        
        event.shapeless(`3x projectred_transmission:${color}_insulated_wire`, ["projectred_transmission:red_alloy_wire", "projectred_transmission:red_alloy_wire", "projectred_transmission:red_alloy_wire", `minecraft:${color}_wool`]);
        event.shapeless(`3x projectred_transmission:${color}_insulated_wire`, ["#projectred_transmission:insulated_wire", "#projectred_transmission:insulated_wire", "#projectred_transmission:insulated_wire", `minecraft:${color}_dye`]);
        
        event.remove({type: "minecraft:crafting_shapeless", output: `projectred_transmission:${color}_framed_insulated_wire`});
        event.shapeless(`3x projectred_transmission:${color}_framed_insulated_wire`, ["#projectred_transmission:framed_insulated_wire", "#projectred_transmission:framed_insulated_wire", "#projectred_transmission:framed_insulated_wire", `minecraft:${color}_dye`]);
    }

    // Circuit plates
    event.remove({type: "minecraft:smelting", output: "projectred_core:plate"});
    event.shaped("4x projectred_core:plate", ["AA"], {A: "minecraft:smooth_stone"});
    event.shaped("2x projectred_core:plate", ["AA"], {A: "minecraft:smooth_stone_slab"});

    // Multimeter
    event.remove({type: "minecraft:crafting_shaped", output: "projectred_core:multimeter"});
    event.shaped("projectred_core:multimeter", [
        "A A",
        "BCD",
        "BED"
    ], {A: "#c:ingots/iron", B: "#c:dyes/black", C: "#c:dyes/green", D: "#c:dyes/red", E: "#c:dusts/glowstone"});

    // Silicon chips
    event.remove({type: "minecraft:crafting_shaped", output: "projectred_core:silicon_chip"});
    event.shaped("projectred_core:silicon_chip", [
        " A ",
        "BBB"
    ], {A: "#c:storage_blocks/redstone", B: "projectred_core:plate"});
    event.remove({type: "minecraft:crafting_shaped", output: "projectred_core:energized_silicon_chip"});
    event.shaped("projectred_core:energized_silicon_chip", [
        " A ",
        "BBB"
    ], {A: "minecraft:glowstone", B: "projectred_core:plate"});

    // Bus input panel
    event.remove({type: "minecraft:crafting_shaped", output: "projectred_integration:bus_input_panel_gate"});
    event.shaped("projectred_integration:bus_input_panel_gate", [
        "ABA",
        "ACA",
        "AAA"
    ], {A: "projectred_core:bundled_plate", B: "projectred_core:conductive_plate", C: "#c:dusts/glowstone"});

    // Warp stone
    event.remove({type: "minecraft:crafting_shaped", output: "waystones:warp_stone"});
    event.shaped("waystones:warp_stone", [
        "AAA",
        "ABA",
        "AAA"
    ], {A: "waystones:warp_dust", B: "minecraft:ghast_tear"});

    // Warp dust
    event.remove({type: "minecraft:crafting_shapeless", output: "waystones:warp_dust"});
    event.shapeless("2x waystones:warp_dust", ["#c:ender_pearls", "#c:gems/amethyst"]);

    // Waystones
    const waystoneReplacement = [
        ["waystones:waystone", "stone_brick", true],
        ["waystones:mossy_waystone", "mossy_stone_brick", true],
        ["waystones:sandy_waystone", "sandstone", false],
        ["waystones:deepslate_waystone", "polished_deepslate", false],
        ["waystones:blackstone_waystone", "blackstone", false],
        ["waystones:end_stone_waystone", "end_stone_brick", true]
    ];
    let material_plural;
    for (const [waystone, material, pluralize_material] of waystoneReplacement) {
        material_plural = pluralize_material ? material + "s" : material
        event.remove({type: "minecraft:crafting_shaped", output: waystone});
        event.remove({type: "minecraft:crafting_shapeless", output: waystone});
        event.shaped(waystone, [
            " A ",
            " B ",
            "ACA"
        ], {A: material + "_slab", B: "#waystones:warp_stones", C: material_plural});
        event.shapeless(waystone, ["#waystones:waystones", material_plural]);
        event.shapeless(waystone, ["#waystones:sharestones", material_plural]);
    }

    // Portstones
    event.remove({type: "minecraft:crafting_shaped", output: "waystones:white_portstone"});
    event.shaped("waystones:white_portstone", [
        " A ",
        " B ",
        "ACA"
    ], {A: "minecraft:stone_brick_slab", B: "waystones:warp_dust", C: "minecraft:stone_bricks"});
    event.shapeless("waystones:white_portstone", ["#waystones:portstones", "minecraft:stone_bricks"]);
    for (const color of global.colors) {
        if (color === "white") continue;
        event.remove({type: "minecraft:crafting_shaped", output: `waystones:${color}_portstone`});
        event.shapeless(`waystones:${color}_portstone`, ["#waystones:portstones", `#c:dyes/${color}`]);

        // Sharestones
        event.remove({type: "minecraft:crafting_shaped", output: `waystones:${color}_sharestone`});
        event.shapeless(`waystones:${color}_sharestone`, ["#waystones:waystones", `#c:dyes/${color}`]);
        event.shapeless(`waystones:${color}_sharestone`, ["#waystones:sharestones", `#c:dyes/${color}`]);
    }

    // Warp plate
    event.remove({type: "minecraft:crafting_shaped", output: "waystones:warp_plate"});
    event.shaped("waystones:warp_plate", [
        "A",
        "B"
    ], {A: "#waystones:warp_stones", B: "minecraft:stone_pressure_plate"});

    // Vendor
    event.remove({type: "minecraft:crafting_shaped", output: "numismatics:vendor"});
    event.shaped("numismatics:vendor", [
        " A ",
        " B ",
        "CDC"
    ], {A: "#c:glass_blocks/colorless", B: "#c:ingots/gold", C: "#c:dusts/redstone", D: "#minecraft:wooden_slabs"});

    for (const color of global.colors) {
        // Bank cards
        event.remove({type: "minecraft:crafting_shaped", output: `numismatics:${color}_card`});
        event.shaped(`numismatics:${color}_card`, ["ABC"], {A: "#c:ingots/gold", B: "#c:ingots/iron", C: `#c:dyes/${color}`});
        event.shapeless(`numismatics:${color}_card`, ["#numismatics:cards", `#c:dyes/${color}`]);

        // ID cards
        event.remove({type: "minecraft:crafting_shaped", output: `numismatics:${color}_id_card`});
        event.shaped(`numismatics:${color}_id_card`, [
            " A ",
            "BCD"
        ], {A: `#c:dyes/${color}`, B: "#c:ingots/iron", C: "#c:paper", D: "#c:nuggets/gold"});
        event.shapeless(`numismatics:${color}_id_card`, ["#numismatics:id_cards", `#c:dyes/${color}`]);
    }

    // Bank terminal
    event.remove({type: "minecraft:crafting_shapeless", output: "numismatics:bank_terminal"});
    event.shaped("numismatics:bank_terminal", [
        "  A",
        " BA",
        "AAA"
    ], {A: "#c:ingots/iron", B: "#c:storage_blocks/redstone"});

    // Shavings
    const shavingsReplacement = [
        ["oak", "medium"],
        ["birch", "light"],
        ["spruce", "dark"],
        ["jungle", "light"],
        ["acacia", "medium"],
        ["dark_oak", "dark"]
    ];

    for (const [leafType, shavingType] of shavingsReplacement) {
        event.remove({type: "minecraft:smelting", output: `swem:${shavingType}_shavings`});
        event.shaped(`8x swem:${shavingType}_shavings`, [
            "AAA",
            "ABA",
            "AAA"
        ], {A: `minecraft:${leafType}_leaves`, B: "minecraft:dried_kelp"});
    }

    // Sweet feed
    event.remove({type: "minecraft:crafting_shapeless", output: "swem:sweet_feed"});
    event.shapeless("swem:sweet_feed", ["#c:eggs", "#c:nuggets/iron", "minecraft:sugar", "swem:oat_bushel"]);

    // Rose feed
    event.remove({type: "minecraft:crafting_shapeless", output: "swem:feed_rose"});
    event.shapeless("swem:feed_rose", ["swem:sweet_feed", "#minecraft:flowers"]);

    // Cantazarite anvil
    event.remove({output: "swem:cantazarite_block", input: "swem:cantazarite_anvil"});
    event.remove({type: "minecraft:crafting_shaped", output: "swem:cantazarite_anvil"});
    event.shaped("swem:cantazarite_anvil", [
        " A ",
        "ABA",
        " A "
    ], {A: "swem:cantazarite_block", B: "#minecraft:anvil"});

    // Cantazarite
    event.shapeless("swem:cantazarite", ["#c:gems/lapis", "#c:dyes/orange"]);

    // Block'o'water
    event.remove({type: "minecraft:crafting_shaped", output: "swem:block_o_water"});
    event.shaped("swem:block_o_water", [
        "ABA",
        "BCB",
        "ABA"
    ], {A: "swem:rivet_gold", B: "#c:glass_panes/colorless", C: "minecraft:water_bucket"});

    // Withered Amethyst Horse Armor
    event.remove({type: "minecraft:crafting_shapeless", output: "swem:horse_armor_amethyst_withered"});
    event.shaped("swem:horse_armor_amethyst_withered", [
        " A ",
        "BCB",
        " A "
    ], {A: "#minecraft:coals", B: "#c:bones", C: "#swem:amethyst_horse_armors"});
    event.shaped("swem:horse_armor_amethyst_withered", [
        " A ",
        "BCB",
        " A "
    ], {A: "#c:bones", B: "#minecraft:coals", C: "#swem:amethyst_horse_armors"});

    // Infinity wand
    event.remove({type: "minecraft:crafting_shaped", output: "reconstructedwands:infinity_wand"});
    event.shaped("reconstructedwands:infinity_wand", [
        " AA",
        " BA",
        "B  "
    ], {A: "#c:obsidians/crying", B: "#c:rods/wooden"});

    // Blackstone
    event.remove({type: "create:haunting", output: "minecraft:blackstone"});
    event.shapeless("minecraft:blackstone", ["#c:cobblestones", "#c:dyes/black"]);

    // Infested Cobblestone
    create.haunting(["minecraft:infested_cobblestone"], ["minecraft:cobblestone"]);

    // Nugget of Experience
    for (const stone of ["stone", "stone_bricks", "mossy_stone_bricks", "cracked_stone_bricks", "chiseled_stone_bricks", "deepslate"]) {
        create.crushing([CreateItem.of("create:experience_nugget")], [`minecraft:infested_${stone}`]);
    }
});

MoreJS.registerPotionBrewing(event => {
    // Cantazarite potion
    event.removeCustomBrewing({ingredient: "swem:cantazarite_dye"});
    event.addCustomBrewing("swem:cantazarite", "minecraft:potion[potion_contents={potion:\"minecraft:awkward\"}]", "swem:cantazarite_potion");

    // Health XP potion
    event.addCustomBrewing("swem:cantazarite", "minecraft:potion[potion_contents={potion:\"minecraft:healing\"}]", "swem:health_xp_potion");
})
