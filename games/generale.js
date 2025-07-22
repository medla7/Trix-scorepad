export function handleGenerale(currentScores, manualScores, chooserIndex ,isStarRound=false) {
  const total = manualScores.reduce((a, b) => a + b, 0);
  if (total !== 440) {
    alert("Total score must be exactly 440");
    return null;
  }

  const indexWith440 = manualScores.findIndex((s) => s === 440);
  const onlyOneHasScore = manualScores.filter((s) => s > 0).length === 1;

  const updated = [...currentScores];

  if (onlyOneHasScore && indexWith440 !== -1) {
    updated[indexWith440] += -440 * (isStarRound?2:1);
    return updated;
  }

  // Sinon on ajoute les points, en doublant ceux du chooser
  for (let i = 0; i < manualScores.length; i++) {
    const earned = manualScores[i];
    if (earned > 0) {
      updated[i] += (i === chooserIndex ? earned * 2 : earned)*(isStarRound?2:1);
    }
  }

  return updated;
}
