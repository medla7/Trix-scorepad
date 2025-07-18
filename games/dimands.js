// games/diamonds.js
import { applyMultiScoring } from '../logic/scoring';

export function handleDimands(scores, selectedPlayersIndexes, chooserIndex) {
    const basePoints = 10;
  return applyMultiScoring({
    scores,
    selectedPlayersIndexes,
    chooserIndex,
    basePoints,
  });
}
