// =====================================================================
//  Doublons de ressources entre addons + uranium par Ore Excavation
//  Ids vérifiés dans : createbigcannons 5.11.7, createnuclear 1.3.2,
//  createoreexcavation 1.6.8 (+ Plus 0.2.5), tfmg 1.2.0.
//  Recharger en jeu : /reload
// =====================================================================

ServerEvents.recipes(event => {

  // ---------------------------------------------------------------
  // 1. Acier : uniquement via le haut fourneau TFMG
  //    Big Cannons faisait 2 acier avec 2 fer + 1 charbon au mixeur.
  // ---------------------------------------------------------------
  event.remove({ id: 'createbigcannons:mixing/alloy_steel' })

  // ---------------------------------------------------------------
  // 2. Moulage de l'acier fondu de Big Cannons aligné sur TFMG
  //    Avant : 90 mB -> 1 lingot, alors que TFMG compte 144 mB par lingot.
  //    Couler l'acier fondu TFMG chez Big Cannons donnait +60 % de lingots.
  //    (La fonte d'un lingot chez Big Cannons reste à 90 mB : le
  //     coût des canons ne change pas et la boucle fonte/moulage perd.)
  // ---------------------------------------------------------------
  event.remove({ id: 'createbigcannons:compacting/forge_steel_ingot' })
  event.remove({ id: 'createbigcannons:compacting/forge_steel_nugget' })

  event.custom({
    type: 'create:compacting',
    ingredients: [{ type: 'neoforge:tag', amount: 144, tag: 'c:molten_steel' }],
    results: [{ id: 'createbigcannons:steel_ingot' }]
  }).id('kubejs:cbc/forge_steel_ingot_144')

  event.custom({
    type: 'create:compacting',
    ingredients: [{ type: 'neoforge:tag', amount: 16, tag: 'c:molten_steel' }],
    results: [{ id: 'createbigcannons:steel_scrap' }]
  }).id('kubejs:cbc/forge_steel_nugget_16')

  // ---------------------------------------------------------------
  // 3. Uranium : plus de poudre d'uranium en broyant du granit
  //    (recette ajoutée par Create Nuclear, Create n'en a pas d'origine)
  // ---------------------------------------------------------------
  event.remove({ id: 'create:crushing/granite' })

  // ---------------------------------------------------------------
  // 4. Gisement d'uranium pour Create Ore Excavation : setup lourd
  //    - gisements rares (environ 1 tous les 384 blocs)
  //    - foreuse en netherite ou foreuse ultime obligatoire
  //    - 2048 SU, 60 s par cycle
  //    - lixiviation : 250 mB d'acide sulfurique TFMG par cycle
  //    - sous-produit : plomb brut TFMG
  // ---------------------------------------------------------------
  event.custom({
    type: 'createoreexcavation:vein',
    amountMultiplierMax: 6.0,
    amountMultiplierMin: 2.0,
    biomeWhitelist: 'minecraft:is_overworld',
    finite: 'default',
    icon: { count: 1, id: 'createnuclear:raw_uranium' },
    name: '{"translate":"item.createnuclear.raw_uranium"}',
    placement: { salt: 928374651, separation: 96, spacing: 384 },
    priority: 0
  }).id('kubejs:ore_vein_type/uranium')

  event.custom({
    type: 'createoreexcavation:drilling',
    drill: { tag: 'create_ore_excavation_plus:powerfull_drills' },
    fluid: {
      amount: 250,
      ingredient: { fluid: 'tfmg:sulfuric_acid' }
    },
    output: [
      { id: 'createnuclear:raw_uranium' },
      { chance: 0.25, id: 'tfmg:raw_lead' }
    ],
    priority: 0,
    stress: 2048,
    ticks: 1200,
    veinId: 'kubejs:ore_vein_type/uranium'
  }).id('kubejs:drilling/uranium')
})
