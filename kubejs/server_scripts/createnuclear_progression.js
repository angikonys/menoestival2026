// =====================================================================
//  Create Nuclear : progression Industrielle -> Électrique -> Nucléaire
//  Les recettes du réacteur demandent des ressources de TFMG
//  (acier, plaques lourdes, mécanismes, pièces électriques, chimie).
//  Ids vérifiés dans createnuclear-1.3.2-beta.3 et tfmg-1.2.0.
//  Recharger en jeu : /reload
// =====================================================================

ServerEvents.recipes(event => {

  // ---------------------------------------------------------------
  // 1. Retire les raccourcis et les recettes remplacées plus bas
  // ---------------------------------------------------------------
  // Acier "maison" de Create Nuclear (fer + poussière de charbon) :
  // l'acier doit maintenant venir de la chaîne TFMG (haut fourneau).
  event.remove({ id: 'createnuclear:mixing/steel' })

  ;[
    'createnuclear:item_application/reactor_casing_from_steel_and_brass_casing',
    'createnuclear:mechanical_crafting/reactor_controller',
    'createnuclear:mechanical_crafting/reactor_core',
    'createnuclear:mechanical_crafting/reactor_cooler',
    'createnuclear:mechanical_crafting/reactor_frame',
    'createnuclear:mechanical_crafting/graphite_rod',
    'createnuclear:crafting/reactor_blueprint_item',
    'createnuclear:pressing/graphene',
    'createnuclear:mixing/uranium_fluid'
  ].forEach(id => event.remove({ id: id }))

  // ---------------------------------------------------------------
  // 2. Ère Industrielle (TFMG) : matériaux de base
  // ---------------------------------------------------------------

  // Graphène : pressage de poussière de coke (four à coke TFMG)
  // au lieu de la poussière de charbon.
  event.custom({
    type: 'create:pressing',
    ingredients: [{ item: 'tfmg:coal_coke_dust' }],
    results: [{ id: 'createnuclear:graphene' }]
  }).id('kubejs:createnuclear/graphene_from_coke')

  // Barre de graphite : plaques lourdes TFMG au lieu de lingots d'acier.
  event.custom({
    type: 'create:mechanical_crafting',
    accept_mirrored: true,
    category: 'misc',
    key: {
      G: { item: 'createnuclear:graphene' },
      S: { item: 'tfmg:heavy_plate' }
    },
    pattern: ['SGS', 'SGS', 'SGS', 'SGS'],
    result: { count: 1, id: 'createnuclear:graphite_rod' }
  }).id('kubejs:createnuclear/graphite_rod')

  // Boîtier de réacteur : boîtier en acier TFMG + plaque lourde
  // (au lieu de boîtier en laiton + lingot d'acier).
  event.custom({
    type: 'create:item_application',
    ingredients: [
      { item: 'tfmg:steel_casing' },
      { item: 'tfmg:heavy_plate' }
    ],
    results: [{ id: 'createnuclear:reactor_casing' }]
  }).id('kubejs:createnuclear/reactor_casing')

  // Plan du réacteur : mécanisme en acier TFMG au lieu du mécanisme de précision.
  event.shaped('createnuclear:reactor_blueprint_item', [
    'SDS',
    'SPS',
    'SES'
  ], {
    S: '#c:ingots/steel',
    D: 'create:display_board',
    P: 'tfmg:steel_mechanism',
    E: 'create:empty_schematic'
  }).id('kubejs:createnuclear/reactor_blueprint_item')

  // Cadre de réacteur : plaques lourdes au lieu de lingots d'acier.
  event.custom({
    type: 'create:mechanical_crafting',
    accept_mirrored: true,
    category: 'misc',
    key: {
      C: { item: 'createnuclear:reactor_casing' },
      S: { item: 'tfmg:heavy_plate' },
      G: { item: 'createnuclear:reinforced_glass' },
      B: { item: 'createnuclear:uranium_bucket' }
    },
    pattern: ['CCCCC', 'CSGSC', 'CGBGC', 'CSGSC', 'CCCCC'],
    result: { count: 1, id: 'createnuclear:reactor_frame' }
  }).id('kubejs:createnuclear/reactor_frame')

  // ---------------------------------------------------------------
  // 3. Ère Électrique (pièces électriques TFMG)
  // ---------------------------------------------------------------

  // Cœur du réacteur : mécanismes en acier + stator et rotor électriques.
  event.custom({
    type: 'create:mechanical_crafting',
    accept_mirrored: true,
    category: 'misc',
    key: {
      C: { item: 'createnuclear:reactor_casing' },
      P: { item: 'tfmg:steel_mechanism' },
      S: { item: 'tfmg:heavy_plate' },
      R: { item: 'tfmg:rotor' },
      T: { item: 'tfmg:stator' },
      B: { item: 'createnuclear:uranium_bucket' }
    },
    pattern: ['CCCCC', 'CPRPC', 'CSBSC', 'CPTPC', 'CCCCC'],
    result: { count: 1, id: 'createnuclear:reactor_core' }
  }).id('kubejs:createnuclear/reactor_core')

  // Refroidisseur : pompes électriques TFMG au lieu de la glace bleue.
  event.custom({
    type: 'create:mechanical_crafting',
    accept_mirrored: true,
    category: 'misc',
    key: {
      C: { item: 'createnuclear:reactor_casing' },
      S: { item: 'tfmg:heavy_plate' },
      G: { item: 'createnuclear:reinforced_glass' },
      I: { item: 'tfmg:electric_pump' }
    },
    pattern: ['CCCCC', 'CSGSC', 'CIGIC', 'CSGSC', 'CCCCC'],
    result: { count: 1, id: 'createnuclear:reactor_cooler' }
  }).id('kubejs:createnuclear/reactor_cooler')

  // Contrôleur du réacteur : circuits imprimés TFMG au lieu des tubes
  // électroniques, observateur de tension au lieu de l'observateur de contenu.
  // L'étoile du Nether et les lingots de netherite sont conservés.
  event.custom({
    type: 'create:mechanical_crafting',
    accept_mirrored: true,
    category: 'misc',
    key: {
      C: { item: 'createnuclear:reactor_casing' },
      N: { item: 'minecraft:netherite_ingot' },
      O: { item: 'tfmg:voltage_observer' },
      T: { item: 'tfmg:circuit_board' },
      V: { item: 'create:item_vault' },
      X: { item: 'minecraft:nether_star' }
    },
    pattern: ['CCCCC', 'CNONC', 'CTXTC', 'CNVNC', 'CCCCC'],
    result: { count: 1, id: 'createnuclear:reactor_controller' }
  }).id('kubejs:createnuclear/reactor_controller')

  // ---------------------------------------------------------------
  // 4. Chimie : l'uranium liquide demande de l'acide sulfurique TFMG
  //    (lixiviation), dans un mélangeur chauffé.
  // ---------------------------------------------------------------
  event.custom({
    type: 'create:mixing',
    heat_requirement: 'heated',
    ingredients: [
      { tag: 'c:dusts/uranium' },
      { type: 'neoforge:single', amount: 100, fluid: 'tfmg:sulfuric_acid' }
    ],
    results: [{ amount: 25, id: 'createnuclear:uranium' }]
  }).id('kubejs:createnuclear/uranium_fluid_leaching')
})
