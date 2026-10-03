ServerEvents.recipes(event => {
    const create = event.recipes.create;

    function dyeing(to, color, from) {
        event.shaped("8x " + to, [
            "AAA",
            "ABA",
            "AAA"
        ], {A: from, B: "#c:dyes/" + color});
    }

    function packing(to, from) {
        event.shaped("4x " + to, [
            "AA",
            "AA"
        ], {A: from});
    }


    // Infested Cobblestone
    create.haunting(["minecraft:infested_cobblestone"], ["minecraft:cobblestone"]);

    // Blackstone
    event.remove({type: "create:haunting", output: "minecraft:blackstone"});
    dyeing("minecraft:blackstone", "black", "minecraft:cobblestone");
    
    // Prismarine Shard
    create.crushing(["3x minecraft:prismarine_shard", CreateItem.of("minecraft:prismarine_shard", 0.5)], ["minecraft:prismarine"]);
    
    // Prismarine
    dyeing("minecraft:prismarine", "cyan", "minecraft:cobblestone");
    create.crushing(["minecraft:prismarine"], ["minecraft:prismarine_bricks"]);

    // Iron Nuggets
    event.remove({type: "create:splashing", input: "minecraft:gravel", output: "minecraft:iron_nugget"});

    // Prismarine Bricks
    event.remove({type: "minecraft:crafting_shapeless", output: "minecraft:prismarine_bricks"});
    packing("minecraft:prismarine_bricks", "minecraft:prismarine");

    // Veridium
    dyeing("create:veridium", "black", "minecraft:prismarine");
    create.crushing(["create:veridium"], ["minecraft:dark_prismarine"]);

    // Copper
    event.remove({type: "create:crushing", input: "create:veridium"});
    create.crushing([CreateItem.of("create:crushed_raw_copper", 0.2), CreateItem.of("spelunkery:raw_copper_nugget", 0.2)], [Ingredient.of("#create:stone_types/veridium")]);

    // Dark Prismarine
    event.remove({type: "minecraft:crafting_shaped", output: "minecraft:dark_prismarine"});
    packing("minecraft:dark_prismarine", "create:veridium");

    // Prismarine Crystals
    event.shapeless("2x minecraft:prismarine_crystals", ["minecraft:prismarine_shard", "#c:gems/quartz"]);
    
    // Glowstone Dust
    event.remove({type: "create:crushing", input: "#c:gems/prismarine"});
    create.crushing([CreateItem.of("minecraft:prismarine_shard", 0.3), CreateItem.of("2x minecraft:glowstone_dust", 0.2)], ["minecraft:prismarine_crystals"]);

    // Limestone
    event.shapeless("2x create:limestone", ["minecraft:diorite", "minecraft:andesite"]);

    // Calcite
    dyeing("minecraft:calcite", "white", "minecraft:diorite");

    // Netherrack
    event.shaped("2x minecraft:netherrack", [
        "AB",
        "BA"
    ], {A: "minecraft:granite", B: "#c:crops/nether_wart"})

    // Sulfur Spike
    create.crushing(["3x minecraft:sulfur_spike", CreateItem.of("minecraft:sulfur_spike", 0.5)], ["minecraft:sulfur"]);

    // Sulfur
    dyeing("minecraft:sulfur", "yellow", "create:limestone");
    
    // Magma Block
    event.shapeless("2x minecraft:magma_block", ["minecraft:netherrack", "minecraft:cobblestone"]);
    
    // Crimsite
    dyeing("create:crimsite", "red", "minecraft:netherrack");

    // Rough Cinnabar
    event.remove({type: "create:crushing", input: "create:crimsite"});
    create.crushing([CreateItem.of("spelunkery:rough_cinnabar", 0.1), CreateItem.of("spelunkery:rough_cinnabar_shard", 0.1)], [Ingredient.of("#create:stone_types/crimsite")]);

    // Basalt
    event.remove({type: "create:splashing", input: "minecraft:magma_block"});
    create.splashing(["minecraft:basalt"], ["minecraft:magma_block"]);
    create.crushing(["minecraft:basalt"], ["minecraft:smooth_basalt"]);
    create.crushing(["minecraft:basalt"], ["minecraft:polished_basalt"]);

    // Lava
    create.mixing(["250x minecraft:lava"], ["minecraft:magma_block"]);

    // Cobbled Deepslate
    event.shapeless("2x minecraft:cobbled_deepslate", ["minecraft:basalt", "minecraft:cobblestone"]);

    // Obsidian
    create.mixing(["minecraft:obsidian"], ["minecraft:lava", "100x minecraft:water"]);

    // Pointed Dripstone
    create.crushing(["3x minecraft:pointed_dripstone", CreateItem.of("minecraft:pointed_dripstone", 0.5)], ["minecraft:dripstone_block"]);

    // Dripstone Block
    create.filling(["minecraft:dripstone_block"], ["minecraft:granite", "125x minecraft:lava"]);

    // Asurine
    dyeing("create:asurine", "light_blue", "minecraft:cobbled_deepslate");

    // Tuff
    event.shapeless("2x minecraft:tuff", ["minecraft:cobbled_deepslate", "minecraft:cobblestone"]);

    // Cinnabar (block)
    const cinnabar_recipes = {
        cinnabar: ["cobblestone", "stone", "cobbled_deepslate", "deepslate"],
        polished_cinnabar: ["polished_deepslate"],
        cinnabar_bricks: ["stone_bricks", "deepslate_bricks"],
        chiseled_cinnabar: ["chiseled_stone_bricks", "chiseled_deepslate"]
    }

    for (let [out, inps] of Object.entries(cinnabar_recipes)) {
        for (let inp of inps) {
            event.shaped("8x minecraft:" + out, [
                "AAA",
                "ABA",
                "AAA"
            ], {A: "minecraft:" + inp, B: "spelunkery:cinnabar"});
        }
    }

    // Zinc
    event.remove({type: "create:crushing", input: "create:asurine"});
    create.crushing([CreateItem.of("create:crushed_raw_zinc", 0.1), CreateItem.of("spelunkery:raw_zinc_nugget", 0.1)], [Ingredient.of("#create:stone_types/asurine")]);

    // Silver
    event.remove({type: "create:crushing", input: "minecraft:tuff"});
    create.crushing([CreateItem.of("create:crushed_raw_silver", 0.1), CreateItem.of("spelunkery:raw_silver_nugget", 0.1)], [Ingredient.of("#create:stone_types/tuff")]);

    // Ochrum
    event.shapeless("8x create:ochrum", ["#c:dusts/glowstone", "minecraft:cobbled_deepslate", "minecraft:cobbled_deepslate", "minecraft:cobbled_deepslate", "minecraft:cobbled_deepslate", "minecraft:cobbled_deepslate", "minecraft:cobbled_deepslate", "minecraft:cobbled_deepslate", "minecraft:cobbled_deepslate"])

    // Gold
    event.remove({type: "create:crushing", input: "create:ochrum"});
    create.crushing([CreateItem.of("create:crushed_raw_gold", 0.1), CreateItem.of("spelunkery:raw_gold_nugget", 0.1)], [Ingredient.of("#create:stone_types/ochrum")]);

});