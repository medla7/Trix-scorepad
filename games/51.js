import { applyScoring } from '../logic/scoring';

export function handle51(scores, selectedPlayerIndex, chooserIndex) {
  const basePoints = 510;
  return applyScoring({
    scores,
    selectedPlayerIndex,
    chooserIndex,
    basePoints,
  });
}
