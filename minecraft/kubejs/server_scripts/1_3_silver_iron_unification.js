ServerEvents.recipes(event => {
    const EXCLUDED_OUTPUTS = ["minecraft:iron_bars", "minecraft:iron_ingot", "minecraft:iron_block", "minecraft:iron_nugget", "occultism:iron_dust", "create:iron_sheet"];
    const EXCLUDED_MODS = ["occultism"];
    
    event.replaceInput({ input: '#c:ingots/iron' }, '#c:ingots/iron', '#c:ingots/iron_or_silver');
    event.replaceInput({ input: '#c:nuggets/iron' }, '#c:nuggets/iron', '#c:nuggets/iron_or_silver');
    event.replaceInput({ input: '#c:storage_blocks/iron' }, '#c:storage_blocks/iron', '#c:storage_blocks/iron_or_silver');
    event.replaceInput({ input: '#c:plates/iron' }, '#c:plates/iron', '#c:plates/iron_or_silver');
    event.replaceInput({ input: '#c:iron_bars' }, '#c:iron_bars', '#c:iron_or_silver_bars');
    
    // Restore output-based exceptions
    EXCLUDED_OUTPUTS.forEach(output => {
        event.replaceInput({ output: output, input: '#c:ingots/iron' }, '#c:ingots/iron_or_silver', '#c:ingots/iron');
        event.replaceInput({ output: output, input: '#c:nuggets/iron' }, '#c:nuggets/iron_or_silver', '#c:nuggets/iron');
        event.replaceInput({ output: output, input: '#c:storage_blocks/iron' }, '#c:storage_blocks/iron_or_silver', '#c:storage_blocks/iron');
        event.replaceInput({ output: output, input: '#c:plates/iron' }, '#c:plates/iron_or_silver', '#c:plates/iron');
        event.replaceInput({ output: output, input: '#c:iron_bars' }, '#c:iron_or_silver_bars', '#c:iron_bars');
    })
    
    // Restore mod-based exceptions
    EXCLUDED_MODS.forEach(mod => {
        event.replaceInput({ mod: mod, input: '#c:ingots/iron' }, '#c:ingots/iron_or_silver', '#c:ingots/iron');
        event.replaceInput({ mod: mod, input: '#c:nuggets/iron' }, '#c:nuggets/iron_or_silver', '#c:nuggets/iron');
        event.replaceInput({ mod: mod, input: '#c:storage_blocks/iron' }, '#c:storage_blocks/iron_or_silver', '#c:storage_blocks/iron');
        event.replaceInput({ mod: mod, input: '#c:plates/iron' }, '#c:plates/iron_or_silver', '#c:plates/iron');
        event.replaceInput({ mod: mod, input: '#c:iron_bars' }, '#c:iron_or_silver_bars', '#c:iron_bars');

    })
});