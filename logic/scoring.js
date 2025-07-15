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
