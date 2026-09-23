// =====================================================================
//  Hauteur de construction liée à la Navigation céleste
//  Le monde va jusqu'à Y 1023 (Tectonic, global_terrain.max_y = 1024),
//  mais sans la Navigation céleste on ne peut pas poser de bloc à partir de
//  Y 320, la limite standard de Minecraft. Cette ère est accordée par la
//  voie steampunk (Ère Aérienne) OU par l'Ascension ésotérique (magie).
//  Recharger en jeu : /reload
// =====================================================================

const SKY_STAGE = 'pack_sky_nav'
const STANDARD_LIMIT = 320 // premier Y interdit (vanilla : 319 max)

BlockEvents.placed(event => {
  const player = event.player
  if (event.block.y < STANDARD_LIMIT) return

  // Seuls les vrais joueurs sont vérifiés : les machines (déployeurs Create,
  // contraptions et dirigeables qui se démontent en altitude) ne sont pas bloquées.
  if (!player || player.fake) return

  if (player.creative || player.spectator) return
  if (player.stages.has(SKY_STAGE)) return

  player.setStatusMessage(Text.red("Il faut la Navigation céleste pour construire au-dessus de Y " + STANDARD_LIMIT))
  event.cancel()
})
