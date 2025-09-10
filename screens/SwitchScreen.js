import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { COLORS, RADIUS, SPACING } from "../styles/theme";

const games = [
  { name: "ray el 7obb", screen: "KingOfHeartsScreen" },
  { name: "dyem", screen: "QueensScreen" },
  { name: "dinar", screen: "DimandsScreen" },
  { name: "pliyet", screen: "FoldsScreen" },
  { name: "solitaire", screen: "TrixScreen" },
  { name: "51", screen: "51Screen" },
  { name: "farcha", screen: "LastFoldScreen" },
  { name: "General", screen: "GeneraleScreen" },
  { name: "etoile", screen: "StarScreen" }, 
];

export default function SwitchScreen({ navigation }) {
  const handleSelectGame = (gameScreen) => {
  if (gameScreen === "StarScreen") {
    navigation.navigate("StarScreen", {
      isStarRound: true,
      fromStar: true,
      fromSwitch: true, // <== très important
    });
  } else {
    navigation.navigate(gameScreen, {
      fromSwitch: true,
    });
  }
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Switch</Text>

      <Text style={styles.rules}>
        NB: No special rule applies.{"\n"}
        You can choose to play any game including star.
      </Text>

      <View style={styles.grid}>
        {games.map((game, index) => (
          <TouchableOpacity
            key={index}
            style={styles.gameButton}
            onPress={() => handleSelectGame(game.screen)}
          >
            <Text style={styles.gameText}>{game.name.toLowerCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelText}>cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F2E9E4",
    padding: SPACING.md,
    alignItems: "center",
  },
  title: {
    fontSize: 70,
    fontFamily: "JotiOne",
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: SPACING.md,
    paddingTop: 40,
  },
  rules: {
    fontSize: 13,
    color: "#000",
    textAlign: "center",
    marginBottom: SPACING.lg,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 10,
    columnGap: 10,
    width: "100%",
    paddingHorizontal: 10,
  },
  gameButton: {
    width: "47%",
    backgroundColor: "#D9D9D9",
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    alignItems: "center",
  },
  gameText: {
    fontFamily: "JotiOne",
    fontSize: 16,
    textTransform: "lowercase",
  },
  cancelButton: {
    marginTop: 40,
    backgroundColor: "#944400",
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 30,
  },
  cancelText: {
    color: "#FFA73C",
    fontSize: 20,
    fontFamily: "JotiOne",
    textAlign: "center",
  },
});
