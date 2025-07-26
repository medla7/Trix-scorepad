import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { COLORS, RADIUS, SPACING } from "../styles/theme";

export default function StarScreen({
  navigation,
  players,
  currentChooserIndex,
  scores,
  handleGameCompletion,
  route,
  games, // <-- receive games prop from App.js
}) {
  // Map your screens to the game keys
  const gameScreenMap = {
    king: "KingOfHeartsScreen",
    queens: "QueensScreen",
    dimands: "DimandsScreen",
    folds: "FoldsScreen",
    trix: "TrixScreen",
    "51": "51Screen",
    last: "LastFoldScreen",
    general: "GeneraleScreen",
  };

  const handleSelectGame = (gameKey) => {
    const screen = gameScreenMap[gameKey];
    if (!screen) return;
    navigation.navigate(screen, {
      isStarRound: true,
      fromStar: true,
      fromSwitch: route.params?.fromSwitch || false,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Star</Text>

      <Text style={styles.rules}>
        NB: 
        the choosen game will have 2× basepoints.{"\n"}
        you can only choose games who've been already played {"\n"}
        you have the option to switch hands card with anyone(the others should change too)
      </Text>

      <View style={styles.grid}>
        {games
          .filter((g) => g.key !== "star" && g.key !== "switch") // exclude star/switch
          .map((game) => {
            const isPlayed = game.played;
            return (
              <TouchableOpacity
                key={game.key}
                style={[
                  styles.gameButton,
                  !isPlayed && styles.disabled,
                ]}
                onPress={() => isPlayed && handleSelectGame(game.key)}
                disabled={!isPlayed}
              >
                <Text
                  style={[
                    styles.gameText,
                    !isPlayed && styles.crossed,
                  ]}
                >
                  {game.name.toLowerCase()}
                </Text>
              </TouchableOpacity>
            );
          })}
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
    marginVertical: 5,
  },
  gameText: {
    fontFamily: "JotiOne",
    fontSize: 16,
    textTransform: "lowercase",
  },
  crossed: {
    textDecorationLine: "line-through",
    color: "#999",
    fontStyle: "italic",
  },
  disabled: {
    opacity: 0.6,
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