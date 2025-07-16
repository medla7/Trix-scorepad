import { applyMultiScoring } from '../logic/scoring';

export function handleQueens(scores, selectedPlayersIndexes, chooserIndex) {
    const basePoints = 20;
  return applyMultiScoring({
    scores,
    selectedPlayersIndexes,
    chooserIndex,
    basePoints,
  });
}
