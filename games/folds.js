// games/folds.js
import { applyMultiScoring } from "../logic/scoring";

export function handleFolds(
  scores,
  foldPoints,
  chooserIndex,
  isStarRound = false
) {
  const totalFolds = foldPoints.reduce((a, b) => a + b, 0);
  const basePoints = isStarRound ? 10 * 2 : 10;

  // Vérifier que la somme totale est bien 80
  if (totalFolds !== 80) {
    console.warn("Invalid total folds:", totalFolds);
    return scores;
  }

  const maxFolds = Math.max(...foldPoints);
  const isOnlyOne = foldPoints.filter((p) => p === maxFolds).length === 1;

  // Cas spécial : un seul joueur a tout pris (80 plis)
  if (maxFolds === 80 && isOnlyOne) {
    const updated = [...scores];
    const index = foldPoints.findIndex((p) => p === 80);
    updated[index] -=
      100 * (isStarRound ? 2 : 1) * (index === chooserIndex ? 2 : 1);
    return updated;
  }

  // Sinon, logique normale : chaque pli = +10 points
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
