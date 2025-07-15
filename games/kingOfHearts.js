import { applyScoring } from '../logic/scoring';

export function handleKingOfHearts(scores, selectedPlayerIndex, chooserIndex) {
  const basePoints = 100;
  return applyScoring({
    scores,
    selectedPlayerIndex,
    chooserIndex,
    basePoints,
  });
}
