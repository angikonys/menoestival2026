// =====================================================================
//  Recettes des Plans d'ère (établi mécanique de Create).
//  S = schéma vierge au centre de chaque recette.
//  Chaque plan n'utilise que des objets débloqués AVANT l'ère visée.
//  Recharger en jeu : /reload
// =====================================================================

ServerEvents.recipes(event => {
  const plan = (id, pattern, key) => {
    const k = { S: { item: 'create:empty_schematic' } }
    Object.keys(key).forEach(letter => { k[letter] = { item: key[letter] } })
    event.custom({
      type: 'create:mechanical_crafting',
      accept_mirrored: true,
      category: 'misc',
      key: k,
      pattern: pattern,
      result: { count: 1, id: 'kubejs:' + id }
    }).id('kubejs:mechanical_crafting/' + id)
  }

  // Ère Industrielle : Create de base
  plan('plan_industrial_era', [
    'LML',
    'MSM',
    'LVL'
  ], {
    L: 'create:brass_ingot',
    M: 'create:precision_mechanism',
    V: 'create:steam_engine'
  })

  // Ère Électrique : TFMG sans électricité
  plan('plan_electric_era', [
    'PAP',
    'DSD',
    'PEP'
  ], {
    P: 'tfmg:heavy_plate',
    A: 'tfmg:steel_mechanism',
    D: 'tfmg:steel_distillation_controller',
    E: 'tfmg:regular_engine'
  })

  // Ère Nucléaire : électricité + ordinateurs
  plan('plan_nuclear_era', [
    'PCPCP',
    'CGTGC',
    'POSOP',
    'CGNGC',
    'PCPCP'
  ], {
    P: 'tfmg:heavy_plate',
    C: 'tfmg:circuit_board',
    G: 'tfmg:generator',
    T: 'tfmg:transformer',
    O: 'computercraft:computer_advanced',
    N: 'minecraft:nether_star'
  })

  // Ère Aérienne : TFMG
  plan('plan_sky_era', [
    'FAF',
    'CSC',
    'FAF'
  ], {
    F: 'tfmg:aluminum_sheet',
    A: 'tfmg:steel_mechanism',
    C: 'tfmg:rubber_sheet'
  })

  // Conquête Spatiale : électricité
  plan('plan_space_conquest', [
    'FPFPF',
    'PMCMP',
    'FOSOF',
    'PMWMP',
    'FPFPF'
  ], {
    F: 'tfmg:aluminum_sheet',
    P: 'tfmg:heavy_plate',
    M: 'tfmg:electric_motor',
    C: 'tfmg:circuit_board',
    O: 'computercraft:computer_advanced',
    W: 'computercraft:wireless_modem_advanced'
  })

  // Ère Aérienne Avancée : Creating Space + Aéronautique
  plan('plan_sky_advanced_era', [
    'RGR',
    'CSC',
    'RFR'
  ], {
    R: 'creatingspace:moon_regolith',
    G: 'simulated:gyroscopic_mechanism',
    C: 'tfmg:circuit_board',
    F: 'creatingspace:rocket_engine'
  })

  // Ère Militaire : TFMG
  plan('plan_military_era', [
    'BTB',
    'ASA',
    'BPB'
  ], {
    B: 'tfmg:rebar_concrete',
    T: 'minecraft:tnt',
    A: 'tfmg:steel_mechanism',
    P: 'tfmg:cast_iron_ingot'
  })

  // Ère Militaire Avancée : Big Cannons + électricité
  plan('plan_military_advanced_era', [
    'NCN',
    'RSR',
    'NAN'
  ], {
    N: 'createbigcannons:nethersteel_ingot',
    C: 'tfmg:circuit_board',
    R: 'createbigcannons:recoil_spring',
    A: 'createbigcannons:cannon_mount'
  })
})
