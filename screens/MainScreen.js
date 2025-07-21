// screens/MainScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, FONTS, RADIUS, SPACING } from '../styles/theme';

export default function MainScreen({
  navigation,
  players,
  scores,
  setScores,
  games,
  setGames,
  currentChooserIndex,
  setCurrentChooserIndex,
}) {
  const handleGamePress = (key) => {
  if (key === "king") {
    navigation.navigate("KingOfHeartsScreen");
  } else if (key === "last") {
    navigation.navigate("LastFoldScreen");
  }
   else if (key === "51") {
    navigation.navigate("51Screen");
  }
   else if (key === "queens") {
    navigation.navigate("QueensScreen");
  }
   else if (key === "dimands") {
    navigation.navigate("DimandsScreen");
  }
   else if (key === "folds") {
    navigation.navigate("FoldsScreen");
  }
   else if (key === "general") {
    navigation.navigate("GeneraleScreen");
  }
   else if (key === "trix") {
    navigation.navigate("TrixScreen");
  }
  // ... les autres jeux
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>TRIX</Text>
      <View style={styles.scoreBox}>
        <Text style={styles.scoreTitle}>scores</Text>
        <View style={styles.row}>
          {players.map((p, i) => (
            <View key={i} style={styles.col}>
              <Text style={styles.name}>{p}</Text>
              <Text>{scores[i]}</Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.subtitle}> {players[currentChooserIndex]} choose the game to play</Text>
      <View style={styles.grid}>
        {games.map((game) => (
          <TouchableOpacity
            key={game.key}
            disabled={game.played}
            style={[styles.btn, game.played && styles.disabled]}
            onPress={() => handleGamePress(game.key)}
          >
            <Text style={[styles.btnText, game.played && styles.crossed]}>
              {game.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5EEE6", padding: 24 },
  title: {
    fontSize: 70,
    fontFamily: FONTS.family,
    color: "#A85903",
    textAlign: "center",
    paddingTop: 30,
  },
  scoreBox: {
    backgroundColor: "#D7C6B4",
    padding: 12,
    borderRadius: 20,
    marginVertical: 10,
  },
  scoreTitle: { textAlign: "center", fontWeight: "bold", color: "#A85903" },
  row: { flexDirection: "row", justifyContent: "space-around", marginTop: 10 },
  col: { alignItems: "center" },
  name: { fontWeight: "bold", fontSize: 14 },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  btn: {
    width: "48%",
    backgroundColor: "#E0E0E0",
    padding: 12,
    marginVertical: 6,
    borderRadius: 12,
    alignItems: "center",
  },
  btnText: { fontSize: 16 },
  crossed: {
    textDecorationLine: "line-through",
    color: "#999",
    fontStyle: "italic",
  },
  disabled: { opacity: 0.6 },
});
