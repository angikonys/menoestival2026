// =====================================================================
//  Livre de quêtes FTB donné une seule fois, à la première connexion.
//  Remplace les livres de départ d'Ars Nouveau et d'Advanced Peripherals
//  (désactivés dans leurs configs).
// =====================================================================

const QUEST_BOOK_FLAG = 'menoria_quest_book_given'

PlayerEvents.loggedIn(event => {
  const player = event.player
  const data = player.persistentData
  if (data.getBoolean(QUEST_BOOK_FLAG)) return
  player.give('ftbquests:book')
  data.putBoolean(QUEST_BOOK_FLAG, true)
})
