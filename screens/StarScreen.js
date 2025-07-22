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
  { name: "Diamonds", screen: "DiamondsScreen" },
  { name: "Folds", screen: "FoldsScreen" },
  { name: "Trix", screen: "TrixScreen" },
  { name: "51", screen: "FiftyOneScreen" },
  { name: "Last Fold", screen: "LastFoldScreen" },
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
      fromStar: true, // on indique que c’est une étoile
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Choose a game for Étoile</Text>
      {games.map((game, index) => (
        <TouchableOpacity
          key={index}
          style={styles.gameButton}
          onPress={() => handleSelectGame(game.screen)}
        >
          <Text style={styles.gameText}>{game.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    paddingTop: 60,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: SPACING.lg,
    textAlign: "center",
  },
  gameButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: RADIUS.lg,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  gameText: {
    fontSize: 18,
    color: COLORS.background,
    fontWeight: "bold",
  },
});
