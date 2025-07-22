import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, FONTS, RADIUS, SPACING } from "../styles/theme";

export default function FoldsScreen({ navigation, players, onScoreSaved }) {
  const [foldPoints, setFoldPoints] = useState([0, 0, 0, 0]);

  const handleChange = (index, delta) => {
    setFoldPoints((prev) => {
      const newPoints = [...prev];
      const total = newPoints.reduce((a, b) => a + b, 0);
      const updated = newPoints[index] + delta;
      if (updated >= 0 && total + delta <= 80) {
        newPoints[index] = updated;
      }
      return newPoints;
    });
  };

  const handleNext = () => {
  const total = foldPoints.reduce((a, b) => a + b, 0);
  if (total !== 80) {
    alert("Total points must equal 80");
    return;
  }

  // Envoie les plis tels quels (ex: [80, 0, 0, 0]) pour traitement dans handleFolds
  onScoreSaved(foldPoints);
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>folds</Text>

      <View style={styles.scoreBox}>
        <Text style={styles.question}>Distribute the 8 folds</Text>

        <View style={styles.playersBox}>
          <View style={styles.row}>
            {players.slice(0, 2).map((player, index) => (
              <View key={index} style={styles.playerWrapper}>
                <Text style={styles.playerName}>{player}</Text>
                <View style={styles.scoreRow}>
                  <TouchableOpacity
                    style={styles.circleButton}
                    onPress={() => handleChange(index, -10)}
                  >
                    <Text style={styles.circleText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.scoreText}>{foldPoints[index]}</Text>
                  <TouchableOpacity
                    style={styles.circleButton}
                    onPress={() => handleChange(index, 10)}
                  >
                    <Text style={styles.circleText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.row}>
            {players.slice(2).map((player, index) => (
              <View key={index + 2} style={styles.playerWrapper}>
                <Text style={styles.playerName}>{player}</Text>
                <View style={styles.scoreRow}>
                  <TouchableOpacity
                    style={styles.circleButton}
                    onPress={() => handleChange(index + 2, -10)}
                  >
                    <Text style={styles.circleText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.scoreText}>{foldPoints[index + 2]}</Text>
                  <TouchableOpacity
                    style={styles.circleButton}
                    onPress={() => handleChange(index + 2, 10)}
                  >
                    <Text style={styles.circleText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      <Text style={styles.rules}>
        NB: Each fold is worth 10 points. If one player takes all 8 folds, they
        receive -100 instead.
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: COLORS.primary }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.actionText}>cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: COLORS.primary }]}
          onPress={handleNext}
        >
          <Text style={styles.actionText}>next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 70,
    fontFamily: "JotiOne",
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: SPACING.md,
    paddingTop: 40,
  },
  scoreBox: {
    backgroundColor: "#D7C6B4",
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
  },
  question: {
    fontSize: FONTS.normal,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  playersBox: {
    marginTop: 10,
  },
  playerWrapper: {
    marginBottom: 20,
    alignItems: "center",
  },
  playerName: {
    fontWeight: "bold",
    color: "#A85903",
    fontSize: 16,
    marginBottom: 6,
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#A85903",
    justifyContent: "center",
    alignItems: "center",
  },
  circleText: {
    color: COLORS.background,
    fontSize: 20,
    fontWeight: "bold",
  },
  scoreText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#69625aff",
    marginHorizontal: 10,
  },
  rules: {
    fontSize: 13,
    marginVertical: SPACING.md,
    lineHeight: 18,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 'auto',
  },
  actionButton: {
    width: '38%',
    padding: 16,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
  },
  actionText: {
    color: COLORS.background,
    fontSize: 18,
    fontWeight: 'bold',
    color: "#FFA73C",
    fontFamily: "JotiOne",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  playerWrapper: {
    alignItems: "center",
    width: "45%",
  },
});
