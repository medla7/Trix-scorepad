// logic/gameFlow.js

export const updateGamesList = (games, gameKey) => {
  return games.map((g) =>
    g.key === gameKey ? { ...g, played: true } : g
  );
};

export const updateChooserIfNeeded = (
  chooserIndex,
  chooserGamesPlayed,
  setChooserIndex,
  setChooserGamesPlayed,
  players
) => {
  const updated = chooserGamesPlayed + 1;

  if (updated >= 10) {
    const nextChooser = (chooserIndex + 1) % players.length;
    setChooserIndex(nextChooser);
    setChooserGamesPlayed(0);
  } else {
    setChooserGamesPlayed(updated);
  }
};
