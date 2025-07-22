import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { COLORS, FONTS, RADIUS, SPACING } from "../styles/theme";

export default function GeneraleScreen({ navigation, players, onScoreSaved }) {
  const [scores, setScores] = useState(["", "", "", ""]);

  const handleChange = (index, value) => {
    const newScores = [...scores];
    newScores[index] = value.replace(/[^0-9]/g, "");
    setScores(newScores);
  };

  const handleNext = () => {
  const numericScores = scores.map((val) => parseInt(val || "0", 10));
  const total = numericScores.reduce((sum, val) => sum + val, 0);

  if (total !== 440) {
    alert("Total score must equal 440");
    return;
  }

  onScoreSaved(numericScores);
};


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>generale</Text>

      <View style={styles.scoreBox}>
        <View style={styles.row}>
          {players.slice(0, 2).map((player, index) => (
            <View key={index} style={styles.playerWrapper}>
              <Text style={styles.playerName}>{player}</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={scores[index]}
                onChangeText={(value) => handleChange(index, value)}
              />
            </View>
          ))}
        </View>

        <View style={styles.row}>
          {players.slice(2).map((player, index) => (
            <View key={index + 2} style={styles.playerWrapper}>
              <Text style={styles.playerName}>{player}</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={scores[index + 2]}
                onChangeText={(value) => handleChange(index + 2, value)}
              />
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.rules}>
        NB: For each point in generale the player gets manual score. Total must
        be 440. If one player gets all, he receives -440. The chooser always
        receives double.
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
  input: {
    backgroundColor: "#A85903",
    color: COLORS.background,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    width: 80,
    textAlign: "center",
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
