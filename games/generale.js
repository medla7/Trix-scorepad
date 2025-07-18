// games/generale.js
import { applyMultiScoring } from "../logic/scoring";

export function handleGenerale(scores, selectedPlayersIndexes, chooserIndex) {
  const total = scores.reduce((a, b) => a + b, 0);

  if (total !== 440) {
    alert("Total score must be exactly 440");
    return null;
  }

  const onlyOneHasScore = scores.filter((s) => s > 0).length === 1;
  const indexWith440 = scores.findIndex((s) => s === 440);

  const finalScores = [...scores];

  if (onlyOneHasScore && indexWith440 !== -1) {
    finalScores[indexWith440] = -440;
  }

  return applyMultiScoring({
    scores: finalScores,
    basePoints: 1, // chaque point est compté directement
  });
}
