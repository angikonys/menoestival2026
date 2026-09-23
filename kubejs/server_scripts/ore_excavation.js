// =====================================================================
//  Create Ore Excavation plus exigeant : un fluide de forage par minerai
//  + gisements TFMG (plomb, nickel, bauxite).
//  Ids vérifiés : createoreexcavation 1.6.8, Ore Excavation Plus 0.2.5,
//  tfmg 1.2.0. Recharger en jeu : /reload
// =====================================================================

// Foreuses "diamant ou mieux" (le mod n'a pas ce tag par défaut)
ServerEvents.tags('item', event => {
  event.add('kubejs:diamond_plus_drills', [
    'createoreexcavation:diamond_drill',
    'createoreexcavation:netherite_drill',
    'create_ore_excavation_plus:ultimate_drill'
  ])
})

ServerEvents.recipes(event => {
  const BASIC = { tag: 'createoreexcavation:drills' }
  const DIAMOND = { tag: 'kubejs:diamond_plus_drills' }
  const POWERFUL = { tag: 'create_ore_excavation_plus:powerfull_drills' }
  const fluid = (id, mb) => ({ amount: mb, ingredient: { fluid: id } })

  // Remplace une recette de forage existante par la même avec un fluide
  const drill = (oldId, newKey, veinId, output, drillTag, fl, stress, ticks) => {
    if (oldId) event.remove({ id: oldId })
    event.custom({
      type: 'createoreexcavation:drilling',
      drill: drillTag,
      fluid: fl,
      output: output,
      priority: 0,
      stress: stress,
      ticks: ticks,
      veinId: veinId
    }).id('kubejs:drilling/' + newKey)
  }
  const V = 'createoreexcavation:ore_vein_type/'

  // --- Métaux de base : eau ------------------------------------------
  drill('createoreexcavation:drilling/coal', 'coal', V + 'coal',
    [{ id: 'minecraft:coal' }], BASIC, fluid('minecraft:water', 100), 256, 200)
  drill('createoreexcavation:drilling/iron', 'iron', V + 'iron',
    [{ id: 'minecraft:raw_iron' }], BASIC, fluid('minecraft:water', 100), 256, 600)
  drill('createoreexcavation:drilling/copper', 'copper', V + 'copper',
    [{ id: 'minecraft:raw_copper' }], BASIC, fluid('minecraft:water', 100), 256, 600)

  // --- Huile de lubrification TFMG (raffinerie) ----------------------
  drill('createoreexcavation:drilling/zinc', 'zinc', V + 'zinc',
    [{ id: 'create:raw_zinc' }], BASIC, fluid('tfmg:lubrication_oil', 50), 256, 600)
  drill('createoreexcavation:drilling/gold', 'gold', V + 'gold',
    [{ id: 'minecraft:raw_gold' }], BASIC, fluid('tfmg:lubrication_oil', 50), 192, 600)
  drill('createoreexcavation:drilling/redstone', 'redstone', V + 'redstone',
    [{ id: 'createoreexcavation:raw_redstone' }], BASIC, fluid('tfmg:lubrication_oil', 50), 256, 600)
  drill('create_ore_excavation_plus:drilling/raw_lapis_lazuli', 'lapis',
    'create_ore_excavation_plus:ore_vein_type/raw_lapis_lazuli_vein',
    [{ id: 'create_ore_excavation_plus:raw_lapis_lazuli' }], BASIC, fluid('tfmg:lubrication_oil', 50), 256, 400)

  // --- Nether : lave --------------------------------------------------
  drill('createoreexcavation:drilling/quartz', 'quartz', V + 'quartz',
    [{ id: 'minecraft:quartz' }], BASIC, fluid('minecraft:lava', 250), 512, 1200)
  drill('createoreexcavation:drilling/nether_gold', 'nether_gold', V + 'nether_gold',
    [{ id: 'minecraft:gold_nugget' }, { id: 'minecraft:gold_nugget' }], BASIC, fluid('minecraft:lava', 250), 192, 400)
  drill('createoreexcavation:drilling/glowstone', 'glowstone', V + 'glowstone',
    [{ id: 'minecraft:glowstone_dust' }], BASIC, fluid('minecraft:lava', 250), 256, 1200)

  // --- Pierres précieuses : fluide de refroidissement TFMG -----------
  drill('createoreexcavation:drilling/diamond', 'diamond', V + 'diamond',
    [{ id: 'createoreexcavation:raw_diamond' }], POWERFUL, fluid('tfmg:cooling_fluid', 250), 1024, 1200)
  drill('createoreexcavation:drilling/emerald', 'emerald', V + 'emerald',
    [{ id: 'createoreexcavation:raw_emerald' }], POWERFUL, fluid('tfmg:cooling_fluid', 250), 1024, 1200)
  drill('create_ore_excavation_plus:drilling/hardened_diamond', 'hardened_diamond', V + 'hardened_diamond',
    [{ id: 'createoreexcavation:raw_diamond' }, { chance: 0.1, id: 'minecraft:diamond' }],
    POWERFUL, fluid('tfmg:cooling_fluid', 500), 1024, 400)

  // --- Nouveaux gisements TFMG ---------------------------------------
  const vein = (key, icon, name, salt, spacing, separation, min, max) => {
    event.custom({
      type: 'createoreexcavation:vein',
      amountMultiplierMax: max,
      amountMultiplierMin: min,
      biomeWhitelist: 'minecraft:is_overworld',
      finite: 'default',
      icon: { count: 1, id: icon },
      name: '{"translate":"' + name + '"}',
      placement: { salt: salt, separation: separation, spacing: spacing },
      priority: 0
    }).id('kubejs:ore_vein_type/' + key)
  }

  vein('lead', 'tfmg:raw_lead', 'item.tfmg.raw_lead', 551923047, 128, 8, 8.0, 24.0)
  drill(null, 'lead', 'kubejs:ore_vein_type/lead',
    [{ id: 'tfmg:raw_lead' }], BASIC, fluid('minecraft:water', 100), 256, 600)

  vein('nickel', 'tfmg:raw_nickel', 'item.tfmg.raw_nickel', 773410259, 128, 8, 6.0, 18.0)
  drill(null, 'nickel', 'kubejs:ore_vein_type/nickel',
    [{ id: 'tfmg:raw_nickel' }], BASIC, fluid('tfmg:lubrication_oil', 50), 256, 600)

  vein('bauxite', 'tfmg:bauxite', 'block.tfmg.bauxite', 318845672, 192, 16, 6.0, 18.0)
  drill(null, 'bauxite', 'kubejs:ore_vein_type/bauxite',
    [{ id: 'tfmg:bauxite' }], DIAMOND, fluid('tfmg:lubrication_oil', 50), 512, 600)

  // --- Pierres de Create (générables à l'infini par Mechanical Extruder)
  //     Rendement du broyage divisé par 4 : bon pour démarrer,
  //     mais Ore Excavation devient la vraie source de métaux ensuite.
  const stone = (name, crushed, nugget, chance) => {
    event.remove({ id: 'create:crushing/' + name })
    event.custom({
      type: 'create:crushing',
      ingredients: [{ item: 'create:' + name }],
      processing_time: 250,
      results: [
        { chance: chance, id: crushed },
        { chance: chance, id: nugget }
      ]
    }).id('kubejs:crushing/' + name + '_reduced')
  }
  stone('crimsite', 'create:crushed_raw_iron', 'minecraft:iron_nugget', 0.1)    // avant 0.4
  stone('asurine', 'create:crushed_raw_zinc', 'create:zinc_nugget', 0.075)      // avant 0.3
  stone('ochrum', 'create:crushed_raw_gold', 'minecraft:gold_nugget', 0.05)     // avant 0.2
  stone('veridium', 'create:crushed_raw_copper', 'create:copper_nugget', 0.2)   // avant 0.8
})
