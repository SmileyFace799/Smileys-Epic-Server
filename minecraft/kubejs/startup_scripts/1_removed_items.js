function fromEntries(entries) {
  const obj = {};
  for (const [k, v] of entries) {
    obj[k] = v;
  }
  return obj;
}

function mapToObj(array, keyMapper, valueMapper) {
  return fromEntries(array.map(i => [keyMapper(i), valueMapper(i)]));
}

global.removedItems = Object.assign(
  {
    // Red alloy
    "projectred_core:red_ingot": "minecraft:iron_ingot",
    "projectred_core:red_iron_comp": "minecraft:iron_ingot",

    // Silicons
    "projectred_core:infused_silicon": "minecraft:redstone_block",
    "projectred_core:red_silicon_comp": "minecraft:redstone_block",
    "projectred_core:energized_silicon": "minecraft:glowstone",
    "projectred_core:glow_silicon_comp": "minecraft:glowstone",
    "projectred_core:electrotine_silicon": "minecraft:redstone_block",
    "projectred_core:electrotine_silicon_comp": "minecraft:redstone_block",
    "projectred_core:silicon": "minecraft:coal_block",
    "projectred_core:boule": "minecraft:coal_block",
    "projectred_core:sand_coal_comp": "minecraft:coal_block",

    // Electrotine / Low power stuff
    "projectred_transmission:low_load_framed_power_wire": "projectred_transmission:framed_red_alloy_wire",
    "projectred_transmission:low_load_power_wire": "projectred_transmission:red_alloy_wire",
    "projectred_core:electrotine_generator": "minecraft:blast_furnace",
    "projectred_core:electrotine_ingot": "minecraft:iron_ingot",
    "projectred_core:electrotine_iron_comp": "minecraft:iron_ingot",
    "projectred_core:electrotine_dust": "minecraft:redstone",

    // Gems
    "projectred_core:ruby": "minecraft:diamond",
    "projectred_core:sapphire": "minecraft:diamond",
    "projectred_core:peridot": "minecraft:diamond",

    // Coils & Motor
    "projectred_core:motor": "4x minecraft:redstone",
    "projectred_core:draw_plate": null,
    "projectred_core:copper_coil": "minecraft:copper_ingot",
    "projectred_core:iron_coil": "minecraft:iron_ingot",
    "projectred_core:gold_coil": "minecraft:gold_ingot",

    // Sail
    "projectred_core:sail": "48x minecraft:string",
    "projectred_core:woven_cloth": "8x minecraft:string",

    // Netherite plate
    "swem:plate_netherite": "minecraft:netherite_scrap",

    // Cantazarite dye
    "swem:cantazarite_dye": "swem:cantazarite",

    // SWEM ores
    "swem:cantazarite_ore": "6x swem:cantazarite",
    "swem:star_worm_cobble": "4x swem:star_worm",

    // Non-infinite construction wands
    "reconstructedwands:stone_wand": "reconstructedwands:infinity_wand",
    "reconstructedwands:iron_wand": "reconstructedwands:infinity_wand",
    "reconstructedwands:diamond_wand": "reconstructedwands:infinity_wand",
    "reconstructedwands:netherite_wand": "reconstructedwands:infinity_wand"
  },
  // Illumars
  mapToObj(global.colors, color => `projectred_core:${color}_illumar`, _ => "2x minecraft:glowstone_dust")
);
global.removedItemsNoReplacement = Object.entries(global.removedItems).filter(([from, to]) => to === null).map(([from, to]) => from);
global.removedItemsWithReplacement = fromEntries(Object.entries(global.removedItems).filter(([from, to]) => to !== null));

BlockEvents.modification(event => {
  for (const item in global.removedItems) {
    event.modify(item, block => {
      block.setDestroySpeed(0.5);
      block.setRequiresTool(false);
    })
  }
})
