// games/kingOfHearts.js

export const KING_POINTS = 100;

/**
 * Ajoute les points pour le joueur qui a pris le roi de cœur.
 * Si c'est lui qui a choisi la partie, il reçoit le double.
 */
export function assignKingOfHearts(scores, receiverIndex, chooserIndex) {
  const updated = [...scores];
  const isChooser = receiverIndex === chooserIndex;
  const points = isChooser ? KING_POINTS * 2 : KING_POINTS;
  updated[receiverIndex] += points;
  return updated;
}
