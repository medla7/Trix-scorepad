import { applyScoring } from '../logic/scoring';

export function handleKingOfHearts(scores, selectedPlayerIndex, chooserIndex, isStarRound = false) {
  const basePoints = isStarRound ? 100 * 2 : 100;

  return applyScoring({
    scores,
    selectedPlayerIndex,
    chooserIndex,
    basePoints,
  });
}
