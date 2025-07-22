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
  { name: "King of Hearts", screen: "KingOfHeartsScreen" },
  { name: "Queens", screen: "QueensScreen" },
  { name: "Diamonds", screen: "DimandsScreen" },
  { name: "Folds", screen: "FoldsScreen" },
  { name: "Trix", screen: "TrixScreen" },
  { name: "51", screen: "FiftyOneScreen" },
  { name: "Last Fold", screen: "LastFoldScreen" },
  { name: "General", screen: "GeneralScreen" },
];

export default function StarScreen({
  navigation,
  players,
  currentChooserIndex,
  scores,
  handleGameCompletion,
}) {
  const handleSelectGame = (gameScreen) => {
    navigation.navigate(gameScreen, {
      isStarRound: true,
      fromStar: true,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Star</Text>

      <Text style={styles.rules}>
        NB: the chosen game will have 2× basepoints.{"\n"}
        you have the option to switch hands card
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
    backgroundColor: "#F2E9E4", // beige clair
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
     // proche de ton thème
    
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
