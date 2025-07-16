export function updateGameFlow({
  totalGamesPlayed,
  chooserGamesPlayed,
  currentChooserIndex,
  playersLength,
}) {
  const newTotal = totalGamesPlayed + 1;
  const newChooserCount = chooserGamesPlayed + 1;

  let nextChooserIndex = currentChooserIndex;
  let resetChooserGamesPlayed = newChooserCount;

  if (newChooserCount === 10) {
    nextChooserIndex = (currentChooserIndex + 1) % playersLength;
    resetChooserGamesPlayed = 0;
  }

  const gameOver = newTotal === 40;

  return {
    newTotal,
    newChooserCount: resetChooserGamesPlayed,
    nextChooserIndex,
    gameOver,
  };
}
