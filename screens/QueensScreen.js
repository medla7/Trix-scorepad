// screens/QueensScreen.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, FONTS, RADIUS, SPACING } from "../styles/theme";

export default function QueensScreen({ navigation, players, onScoreSaved }) {
  const [queenPoints, setQueenPoints] = useState([0, 0, 0, 0]);

  const handleIncrement = (index) => {
    const total = queenPoints.reduce((sum, val) => sum + val, 0);
    if (total < 80) {
      const updated = [...queenPoints];
      updated[index] += 20;
      setQueenPoints(updated);
    }
  };

  const handleDecrement = (index) => {
    if (queenPoints[index] > 0) {
      const updated = [...queenPoints];
      updated[index] -= 20;
      setQueenPoints(updated);
    }
  };

  const handleNext = () => {
    const total = queenPoints.reduce((sum, val) => sum + val, 0);
    if (total === 80) {
      const selectedIndexes = [];
      queenPoints.forEach((value, i) => {
        const times = value / 20;
        for (let j = 0; j < times; j++) selectedIndexes.push(i);
      });
      onScoreSaved(selectedIndexes);
    } else {
      alert("Total must be exactly 80 points");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>queens</Text>
      <View style={styles.scoreBox}>
        <Text style={styles.question}>who got the king?</Text>
        <View style={styles.buttonsRow}>
          {players.map((player, index) => (
            <View key={index} style={styles.playerCol}>
              <TouchableOpacity
                style={styles.circleBtn}
                onPress={() => handleDecrement(index)}
              >
                <Text style={styles.circleText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.playerScore}>{queenPoints[index]}</Text>
              <TouchableOpacity
                style={styles.circleBtn}
                onPress={() => handleIncrement(index)}
              >
                <Text style={styles.circleText}>+</Text>
              </TouchableOpacity>
              <Text style={styles.playerName}>{player}</Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.rules}>
        NB: For each queen the player gets 20 points.
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
  buttonsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  playerCol: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  circleBtn: {
    backgroundColor: "#A85903",
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  circleText: {
    color: COLORS.background,
    fontSize: 24,
    fontWeight: "bold",
  },
  playerScore: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 4,
  },
  playerName: {
    color: COLORS.primary,
    fontWeight: "bold",
    marginTop: 4,
  },
  rules: {
    fontSize: 13,
    marginVertical: SPACING.md,
    lineHeight: 18,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
  },
  actionButton: {
    width: "48%",
    padding: 16,
    borderRadius: RADIUS.lg,
    alignItems: "center",
  },
  actionText: {
    color: COLORS.background,
    fontSize: 18,
    fontWeight: "bold",
  },
});
