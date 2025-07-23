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
  shouldResetGames = false;
  if (newChooserCount === 10) {
    nextChooserIndex = (currentChooserIndex + 1) % playersLength;
    resetChooserGamesPlayed = 0;
    shouldResetGames = true;
  }

  const gameOver = newTotal === 40;

  return {
    newTotal,
    newChooserCount: resetChooserGamesPlayed,
    nextChooserIndex,
    shouldResetGames,
    gameOver,
  };
}
