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
  // 1b. Pépites / lingots / blocs d'acier : une seule série de
  //     recettes, sans ère
  //     Create Nuclear a les mêmes recettes que TFMG. Almost Unified
  //     fusionnait les doublons en gardant celles de Create Nuclear,
  //     verrouillées par l'ère nucléaire : pépites et blocs d'acier
  //     étaient infaisables à l'ère du pétrole.
  // ---------------------------------------------------------------
  ;[
    'steel_nugget_from_decompacting',
    'steel_ingot_from_compacting',
    'steel_ingot_from_decompacting',
    'steel_block_from_compacting'
  ].forEach(r => {
    event.remove({ id: `createnuclear:crafting/${r}` })
    event.remove({ id: `createnuclear:crafting/crafting/${r}` })
    event.remove({ id: `tfmg:crafting/materials/${r}` })
  })

  event.shapeless('9x tfmg:steel_nugget', ['#c:ingots/steel'])
    .id('kubejs:tfmg/steel_nugget_from_ingot')
  event.shaped('tfmg:steel_ingot', ['NNN', 'NNN', 'NNN'], { N: '#c:nuggets/steel' })
    .id('kubejs:tfmg/steel_ingot_from_nuggets')
  event.shapeless('9x tfmg:steel_ingot', ['#c:storage_blocks/steel'])
    .id('kubejs:tfmg/steel_ingot_from_block')
  event.shaped('tfmg:steel_block', ['III', 'III', 'III'], { I: '#c:ingots/steel' })
    .id('kubejs:tfmg/steel_block_from_ingots')

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
  // 2b. Aluminium sans électricité (Ère Industrielle)
  //     TFMG ne fait l'aluminium que par électrolyse (électrodes +
  //     courant), verrouillée par l'Ère Électrique. Or l'Ère Aérienne
  //     ne demande que l'Ère Industrielle et exige des tôles d'alu.
  //     Recette de secours au mixeur chauffé (blaze burner), moins rentable
  //     que l'électrolyse (1 lingot contre ~2 en moyenne).
  // ---------------------------------------------------------------
  event.custom({
    type: 'create:mixing',
    heat_requirement: 'heated',
    ingredients: [
      { item: 'tfmg:bauxite_powder' },
      { item: 'tfmg:bauxite_powder' },
      { item: 'tfmg:bauxite_powder' },
      { item: 'tfmg:bauxite_powder' },
      { item: 'tfmg:coal_coke_dust' }
    ],
    results: [{ id: 'tfmg:aluminum_ingot' }]
  }).id('kubejs:tfmg/aluminum_from_bauxite_mixing')

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
