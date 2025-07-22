export function handleTrix(scores, selectedIndexes, chooserIndex, isStarRound=false) {
  const updated = [...scores];

  const first = selectedIndexes[0];
  const second = selectedIndexes[1];

  if (first !== undefined) {
    updated[first] += -100 * (first === chooserIndex ? 2 : 1) * (isStarRound?2:1);
  }

  if (second !== undefined) {
    updated[second] +=-50 * (second === chooserIndex ? 2 : 1) * (isStarRound?2:1);
  }

  return updated;
}
