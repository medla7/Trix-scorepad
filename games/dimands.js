// games/diamonds.js
import { applyMultiScoring } from '../logic/scoring';

export function handleDimands(scores, selectedPlayersIndexes, chooserIndex , isStarRound = false) {
    const basePoints = isStarRound ? 10 * 2 : 10;
  return applyMultiScoring({
    scores,
    selectedPlayersIndexes,
    chooserIndex,
    basePoints,
  });
}


