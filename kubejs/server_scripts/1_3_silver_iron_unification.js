ServerEvents.recipes(event => {
    const EXCLUDED_OUTPUTS = ["minecraft:iron_bars", "minecraft:iron_ingot", "minecraft:iron_block", "minecraft:iron_nugget", "occultism:iron_dust"];
    const EXCLUDED_MODS = ["occultism"];
    
    event.replaceInput({ input: '#c:ingots/iron' }, '#c:ingots/iron', '#c:ingots/iron_or_silver');
    event.replaceInput({ input: '#c:nuggets/iron' }, '#c:nuggets/iron', '#c:nuggets/iron_or_silver');
    event.replaceInput({ input: '#c:storage_blocks/iron' }, '#c:storage_blocks/iron', '#c:storage_blocks/iron_or_silver');

    // Restore output-based exceptions
    EXCLUDED_OUTPUTS.forEach(output => {
        event.replaceInput({ output: output }, '#c:ingots/iron_or_silver', '#c:ingots/iron');
        event.replaceInput({ output: output }, '#c:nuggets/iron_or_silver', '#c:nuggets/iron');
        event.replaceInput({ output: output }, '#c:storage_blocks/iron_or_silver', '#c:storage_blocks/iron');
    })

    // Restore mod-based exceptions
    EXCLUDED_MODS.forEach(mod => {
        event.replaceInput({ mod: mod }, '#c:ingots/iron_or_silver', '#c:ingots/iron');
        event.replaceInput({ mod: mod }, '#c:nuggets/iron_or_silver', '#c:nuggets/iron');
        event.replaceInput({ mod: mod }, '#c:storage_blocks/iron_or_silver', '#c:storage_blocks/iron');
    })
});