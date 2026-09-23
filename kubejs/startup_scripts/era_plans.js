// =====================================================================
//  Plans d'ère : un objet-clé par ère, rendu dans la quête finale.
//  Textures : kubejs/assets/kubejs/textures/item/<id>.png
//  (nécessite un redémarrage complet du jeu après modification)
// =====================================================================

StartupEvents.registry('item', event => {
  const plan = (id, name) => {
    event.create(id)
      .displayName(name)
      .maxStackSize(16)
      .rarity('rare')
  }

  plan('plan_industrial_era', "Plans de l'Ère Industrielle")
  plan('plan_electric_era', "Plans de l'Ère Électrique")
  plan('plan_nuclear_era', "Plans de l'Ère Nucléaire")
  plan('plan_sky_era', "Plans de l'Ère Aérienne")
  plan('plan_space_conquest', 'Plans de la Conquête Spatiale')
  plan('plan_sky_advanced_era', "Plans de l'Ère Aérienne Avancée")
  plan('plan_military_era', "Plans de l'Ère Militaire")
  plan('plan_military_advanced_era', "Plans de l'Ère Militaire Avancée")
})
