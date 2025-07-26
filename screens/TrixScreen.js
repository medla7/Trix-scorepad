import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { COLORS, FONTS, RADIUS, SPACING } from "../styles/theme";

export default function TrixScreen({ navigation, players, onScoreSaved }) {
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  const handleSelect = (index) => {
    if (selectedIndexes.includes(index)) {
      // Deselect if already selected
      setSelectedIndexes(selectedIndexes.filter((i) => i !== index));
    } else if (selectedIndexes.length < 2) {
      setSelectedIndexes([...selectedIndexes, index]);
    }
  };

  const handleNext = () => {
    if (selectedIndexes.length !== 2) {
      alert("Please select two players");
      return;
    }
    onScoreSaved(selectedIndexes);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      
    >
      <Text style={styles.title}>trix</Text>

      <View style={styles.scoreBox}>
        <Text style={styles.question}>Choose two winners</Text>
        <View style={styles.row}>
          {players.slice(0, 2).map((player, index) => {
            const idx = index;
            const label =
              selectedIndexes[0] === idx
                ? "1st"
                : selectedIndexes[1] === idx
                ? "2nd"
                : "0";
            return (
              <TouchableOpacity
                key={idx}
                onPress={() => handleSelect(idx)}
                style={styles.playerWrapper}
              >
                <Text style={styles.playerName}>{player}</Text>
                <View style={styles.label}>
                  <Text style={styles.labelText}>{label}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.row}>
          {players.slice(2).map((player, index) => {
            const idx = index + 2;
            const label =
              selectedIndexes[0] === idx
                ? "1st"
                : selectedIndexes[1] === idx
                ? "2nd"
                : "0";
            return (
              <TouchableOpacity
                key={idx}
                onPress={() => handleSelect(idx)}
                style={styles.playerWrapper}
              >
                <Text style={styles.playerName}>{player}</Text>
                <View style={styles.label}>
                  <Text style={styles.labelText}>{label}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <Text style={styles.rules}>
        NB: 1st = -100 pts, 2nd = -50 pts. Chooser gets double if selected.
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
    </KeyboardAvoidingView>
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
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  playerWrapper: {
    alignItems: "center",
    width: "45%",
  },
  playerName: {
    fontWeight: "bold",
    color: "#A85903",
    fontSize: 16,
    marginBottom: 6,
  },
  label: {
    backgroundColor: "#A85903",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    width: 80,
    alignItems: "center",
  },
  labelText: {
    color: COLORS.background,
    fontSize: 18,
    fontWeight: "bold",
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
});
