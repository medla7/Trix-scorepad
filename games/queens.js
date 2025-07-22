import { applyMultiScoring } from '../logic/scoring';

export function handleQueens(scores, selectedPlayersIndexes, chooserIndex, isStarRound=false) {
  const basePoints = isStarRound ? 20 * 2 : 20;
  return applyMultiScoring({
    scores,
    selectedPlayersIndexes,
    chooserIndex,
    basePoints,
  });
}
