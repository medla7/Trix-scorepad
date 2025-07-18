// games/folds.js
import { applyMultiScoring } from "../logic/scoring";

export function handleFolds(scores, foldPoints, chooserIndex) {
  const totalFolds = foldPoints.reduce((a, b) => a + b, 0);
  const basePoints = 10;
  if (totalFolds !== 80) {
    console.warn("Invalid total folds:", totalFolds);
    return scores; // ne rien faire si la somme n'est pas 80
  }

  const maxFolds = Math.max(...foldPoints);
  const isOnlyOne = foldPoints.filter((p) => p === maxFolds).length === 1;

  if (isOnlyOne && maxFolds === 80) {
    // Seul un joueur a pris tous les plis -> -100 points
    const updated = [...scores];
    const index = foldPoints.findIndex((p) => p === 80);
    updated[index] -= 100;
    return updated;
  }

  // Sinon, logique normale : chaque pli = 10 pts
  const selectedIndexes = [];
  foldPoints.forEach((folds, playerIndex) => {
    const count = folds / 10;
    for (let i = 0; i < count; i++) {
      selectedIndexes.push(playerIndex);
    }
  });

  return applyMultiScoring({
    scores,
    selectedPlayersIndexes: selectedIndexes,
    chooserIndex,
    basePoints,
  });
}
