// =====================================================================
//  Objets de la progression magique
//  (nécessite un redémarrage complet du jeu après modification)
// =====================================================================

StartupEvents.registry('item', event => {
  // Récompense du chapitre Archimage : maîtrise des trois écoles.
  event.create('archmage_seal')
    .displayName("Sceau de l'Archimage")
    .maxStackSize(1)
    .rarity('epic')
})
