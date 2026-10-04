/*
* Returns a persistent NBT compound containing the warded chunks
* for this particular dimension.
*
* Example:
*
* slime_wards:
*   "12,7": true
*   "13,7": true
*/

/* UNTESTED AI SLOP, DO NOT ADD WITHOUT TESTING
const SLIME_WARD = 'kubejs:slime_ward'

function getWardedChunks(level) {
    return level.persistentData.getCompound('slime_wards')
}

function chunkKey(pos) {
    return `${pos.x >> 4},${pos.z >> 4}`
}


// Register a chunk when a Slime Ward is placed.
BlockEvents.placed(SLIME_WARD, event => {
    const wards = getWardedChunks(event.level)
    wards.putBoolean(chunkKey(event.block.pos), true)

    console.log(
        `[Slime Ward] Enabled in chunk ${chunkKey(event.block.pos)}`
    )
})


// Remove the chunk when the Slime Ward is broken.
BlockEvents.broken(SLIME_WARD, event => {
    const wards = getWardedChunks(event.level)
    const key = chunkKey(event.block.pos)

    wards.remove(key)

    console.log(`[Slime Ward] Disabled in chunk ${key}`)
})


// Intercept slime spawn-placement checks.
NativeEvents.onEvent(
    'net.neoforged.neoforge.event.entity.living.MobSpawnEvent$SpawnPlacementCheck',
    event => {

        // Only care about vanilla slimes.
        if (event.entityType != 'minecraft:slime') {
            return
        }

        const wards = getWardedChunks(event.level)
        const key = chunkKey(event.pos)

        // No ward in this chunk -> completely normal Minecraft behavior.
        if (!wards.contains(key)) {
            return
        }

        // A Slime Ward exists in this chunk -> prevent the spawn.
        event.setResult(
            Java.loadClass('net.neoforged.bus.api.Event$Result').DENY
        )
    }
)
 */