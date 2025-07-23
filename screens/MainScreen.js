// screens/MainScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, FONTS, RADIUS, SPACING } from "../styles/theme";
import { Snackbar } from "react-native-paper";
import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";

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
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const route = useRoute();
  const resetPlayers = route.params?.rps || [];
  // 👉 écoute les changements dans scores
  useEffect(() => {
    //const resetPlayers = players.filter((_, i) => (scores[i]%1000 === 0) && (scores[i]!=0));
    if (resetPlayers.length > 0) {
      const msg = `${resetPlayers.join(", ")} ${
        resetPlayers.length > 1
          ? "their scores have been reset to 0"
          : "his/her score has been reset to 0"
      } `;
      setSnackbarMessage(msg);
      setSnackbarVisible(true);
      route.params.rps = [];
    }
  }, [route.params?.rps]);
  const handleGamePress = (key) => {
    switch (key) {
      case "king":
        navigation.navigate("KingOfHeartsScreen");
        break;
      case "last":
        navigation.navigate("LastFoldScreen");
        break;
      case "51":
        navigation.navigate("51Screen");
        break;
      case "queens":
        navigation.navigate("QueensScreen");
        break;
      case "dimands":
        navigation.navigate("DimandsScreen");
        break;
      case "folds":
        navigation.navigate("FoldsScreen");
        break;
      case "general":
        navigation.navigate("GeneraleScreen");
        break;
      case "trix":
        navigation.navigate("TrixScreen");
        break;
      case "star":
        navigation.navigate("StarScreen");
        break;
      case "switch":
        navigation.navigate("SwitchScreen");
        break;
      default:
        console.warn(`Unknown game key: ${key}`);
    }
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

      <Text style={styles.subtitle}>
        {" "}
        {players[currentChooserIndex]} choose the game to play
      </Text>
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
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={4000}
        style={{
          backgroundColor: "#A85903", // or COLORS.primary if you use a theme
          borderRadius: 12,
          padding: 16,
        }}
        action={{
          label: "OK",
          onPress: () => setSnackbarVisible(false),
          labelStyle: {
            color: "white",
            fontWeight: "bold",
          },
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
          {snackbarMessage}
        </Text>
      </Snackbar>
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
  scoreTitle: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#A85903",
    fontFamily: "JotiOne",
  },
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
    width: "47%",
    backgroundColor: "#D9D9D9",
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    alignItems: "center",
    marginVertical: 10,
  },
  btnText: { fontFamily: "JotiOne", fontSize: 16, textTransform: "lowercase" },
  crossed: {
    textDecorationLine: "line-through",
    color: "#999",
    fontStyle: "italic",
  },
  disabled: { opacity: 0.6 },
});
