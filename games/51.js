import { applyScoring } from '../logic/scoring';

export function handle51(scores, selectedPlayerIndex, chooserIndex, isStarRound=false) {
    const basePoints = isStarRound ? 510 * 2 : 510;
  return applyScoring({
    scores,
    selectedPlayerIndex,
    chooserIndex,
    basePoints,
  });
}
