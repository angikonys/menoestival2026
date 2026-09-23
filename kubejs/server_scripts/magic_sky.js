// =====================================================================
//  Civilisation ésotérique : lévitite et roue à Starbuncle par la magie
//  Chaque école peut produire la lévitite et la roue sans passer par
//  une autre école. Les objets restent verrouillés par l'ère
//  "Navigation céleste" (pack_sky_nav) : ces recettes ne servent
//  qu'après l'Ascension ésotérique (ou la voie steampunk).
//  Recharger en jeu : /reload
// =====================================================================

ServerEvents.recipes(event => {

  // ---------------------------------------------------------------
  // Lévitite
  // ---------------------------------------------------------------

  // Ars Nouveau : chambre d'imprégnation
  event.custom({
    type: 'ars_nouveau:imbuement',
    input: { item: 'minecraft:end_stone' },
    output: { count: 2, id: 'aeronautics:levitite' },
    pedestalItems: [
      { item: 'ars_nouveau:air_essence' },
      { tag: 'c:gems/source' },
      { item: 'minecraft:phantom_membrane' }
    ],
    source: 2000
  }).id('kubejs:magic_sky/levitite_imbuement')

  // Eidolon : creuset
  event.custom({
    type: 'eidolon_repraised:crucible',
    steps: [
      { items: [{ item: 'minecraft:end_stone' }, { item: 'minecraft:end_stone' }] },
      { stirs: 1, items: [{ item: 'eidolon_repraised:ender_calx' }, { item: 'minecraft:phantom_membrane' }] },
      { items: [{ item: 'eidolon_repraised:soul_shard' }, { item: 'minecraft:feather' }] }
    ],
    result: { id: 'aeronautics:levitite', count: 2 }
  }).id('kubejs:magic_sky/levitite_crucible')

  // Mahou Tsukai : poudres de catalyseur et essence féerique
  event.shaped('2x aeronautics:levitite', [
    'EPE',
    'FEF',
    'EPE'
  ], {
    E: 'minecraft:end_stone',
    P: 'mahoutsukai:powdered_ender',
    F: 'mahoutsukai:fae_essence'
  }).id('kubejs:magic_sky/levitite_mahou')

  // ---------------------------------------------------------------
  // Roue à Starbuncle (Ars Creo) : la recette d'origine demande un
  // charme de Starbuncle (Ars). Variantes pour les autres écoles.
  // ---------------------------------------------------------------
  event.shapeless('ars_creo:starbuncle_wheel', [
    'create:water_wheel',
    'eidolon_repraised:lesser_soul_gem',
    'eidolon_repraised:soul_shard',
    'eidolon_repraised:soul_shard'
  ]).id('kubejs:magic_sky/starbuncle_wheel_eidolon')

  event.shapeless('ars_creo:starbuncle_wheel', [
    'create:water_wheel',
    'mahoutsukai:fae_essence',
    'mahoutsukai:powdered_gold',
    'mahoutsukai:attuned_emerald'
  ]).id('kubejs:magic_sky/starbuncle_wheel_mahou')
})
