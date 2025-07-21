export function handleTrix(scores, selectedIndexes, chooserIndex) {
  const updated = [...scores];

  const first = selectedIndexes[0];
  const second = selectedIndexes[1];

  if (first !== undefined) {
    updated[first] += first === chooserIndex ? -100 * 2 : -100;
  }

  if (second !== undefined) {
    updated[second] += second === chooserIndex ? -50 * 2 : -50;
  }

  return updated;
}
