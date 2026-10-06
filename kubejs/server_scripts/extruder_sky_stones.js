// =====================================================================
//  Extrudeur en laiton : pierres liées à l'altitude, partout
//  Les recettes de base du Mechanical Extruder imposent une hauteur :
//  andésite, diorite et granite entre Y 0 et 60, deepslate sous Y 0.
//  Une base dans le ciel ne peut donc pas les produire.
//  Ces variantes "advanced" demandent le Mechanical Brass Extruder et
//  un bloc catalyseur de la pierre voulue (posé sous l'extrudeur,
//  comme pour l'obsidienne avancée), mais fonctionnent à toute altitude.
//  Eau et lave ne sont pas consommées, comme pour les recettes de base.
//  Recharger en jeu : /reload
// =====================================================================

ServerEvents.recipes(event => {
  const brass = (name, result, extra) => {
    const r = {
      type: 'create_mechanical_extruder:extruding',
      advanced: true,
      blockIngredients: {
        first: { blocks: 'minecraft:water' },
        second: { blocks: 'minecraft:lava' }
      },
      catalyst: { blocks: result },
      result: { id: result }
    }
    if (extra) r.requirements = extra
    event.custom(r).id('menoria:extruding/brass_' + name)
  }

  // Y 0 → 60 dans la recette de base
  brass('andesite', 'minecraft:andesite')
  brass('diorite', 'minecraft:diorite')
  brass('granite', 'minecraft:granite')

  // Sous Y 0 dans la recette de base (même limite de vitesse : 16 RPM max)
  brass('deepslate', 'minecraft:deepslate', [{ type: 'mechanicals:max_speed', value: 16.0 }])

  // Tuf : ne se trouve qu'en profondeur, aucune recette d'extrudeur à l'origine
  brass('tuff', 'minecraft:tuff')
})
