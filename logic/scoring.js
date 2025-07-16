export function applyScoring({
  scores,
  selectedPlayerIndex,
  chooserIndex,
  basePoints,
}) {
  const updated = [...scores];
  const isChooser = selectedPlayerIndex === chooserIndex;
  updated[selectedPlayerIndex] += isChooser ? basePoints * 2 : basePoints;
  return updated;
}

export function applyMultiScoring({
  scores,
  selectedPlayersIndexes,
  chooserIndex,
  basePoints,
}) {
  const updated = [...scores];

  selectedPlayersIndexes.forEach((index) => {
    const isChooser = index === chooserIndex;
    updated[index] += isChooser ? basePoints * 2 : basePoints;
  });

  return updated;
}
