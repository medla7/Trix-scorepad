// App.js
import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlayerSetupScreen from "./screens/PlayerSetupScreen";
import MainScreen from "./screens/MainScreen";
import KingOfHeartsScreen from "./screens/KingOfHeartsScreen";
import { useFonts } from "expo-font";
import { JotiOne_400Regular } from "@expo-google-fonts/joti-one";
import { handleKingOfHearts } from "./games/kingOfHearts";
import { applyScoring } from "./logic/scoring";
import { updateGameFlow } from "./logic/gameFlow";

import LastFoldScreen from "./screens/LastFoldScreen";
import { handleLastFold } from "./games/lastFold";

const Stack = createNativeStackNavigator();

export default function App() {
  const [chooserGamesPlayed, setChooserGamesPlayed] = useState(0);
  const [totalGamesPlayed, setTotalGamesPlayed] = useState(0);

  const [fontsLoaded] = useFonts({
    JotiOne: JotiOne_400Regular,
  });

  const [players, setPlayers] = useState([]);
  const [scores, setScores] = useState([0, 0, 0, 0]);
  const [games, setGames] = useState([
    { key: "king", name: "king of hearts", played: false },
    { key: "queens", name: "queens", played: false },
    { key: "dimands", name: "dimands", played: false },
    { key: "folds", name: "folds", played: false },
    { key: "last", name: "last fold", played: false },
    { key: "trix", name: "trix", played: false },
    { key: "51", name: "51", played: false },
    { key: "general", name: "general", played: false },
    { key: "star", name: "star", played: false },
    { key: "switch", name: "switch", played: false },
  ]);
  const [currentChooserIndex, setCurrentChooserIndex] = useState(
    Math.floor(Math.random() * 4)
  );

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PlayerSetup">
          {(props) => <PlayerSetupScreen {...props} setPlayers={setPlayers} />}
        </Stack.Screen>

        <Stack.Screen name="MainScreen">
          {(props) => (
            <MainScreen
              {...props}
              players={players}
              scores={scores}
              setScores={setScores}
              games={games}
              setGames={setGames}
              currentChooserIndex={currentChooserIndex}
              setCurrentChooserIndex={setCurrentChooserIndex}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="KingOfHeartsScreen">
  {(props) => (
    <KingOfHeartsScreen
      {...props}
      players={players}
      scores={scores}
      setScores={setScores}
      chooserIndex={currentChooserIndex}
      onScoreSaved={(selectedPlayerIndex) => {
        // 1. Appliquer le score via ta logique
        const updated = handleKingOfHearts(
          scores,
          selectedPlayerIndex,
          currentChooserIndex
        );
        setScores(updated);

        // 2. Marquer le jeu comme joué
        const updatedGames = games.map((g) =>
          g.key === "king" ? { ...g, played: true } : g
        );
        setGames(updatedGames);

        // 3. Gérer le changement de joueur
        const result = updateGameFlow({
          totalGamesPlayed,
          chooserGamesPlayed,
          currentChooserIndex,
          playersLength: players.length,
        });
        setTotalGamesPlayed(result.newTotal);
        setChooserGamesPlayed(result.newChooserCount);
        setCurrentChooserIndex(result.nextChooserIndex);

        if (result.gameOver) {
          Alert.alert("Game Over", "All 40 games have been played!");
        }

        props.navigation.navigate("MainScreen");
      }}
    />
  )}
</Stack.Screen>


        <Stack.Screen name="LastFoldScreen">
          {(props) => (
            <LastFoldScreen
              {...props}
              players={players}
              scores={scores}
              setScores={setScores}
              chooserIndex={currentChooserIndex}
              onScoreSaved={(selectedPlayerIndex) => {
                const updatedScores = handleLastFold(
                  scores,
                  selectedPlayerIndex,
                  currentChooserIndex
                );
                setScores(updatedScores);

                const updatedGames = games.map((g) =>
                  g.key === "last" ? { ...g, played: true } : g
                );
                setGames(updatedGames);

                const newTotal = totalGamesPlayed + 1;
                const newChooserCount = chooserGamesPlayed + 1;

                setTotalGamesPlayed(newTotal);
                setChooserGamesPlayed(newChooserCount);

                if (newChooserCount === 10) {
                  const nextChooser =
                    (currentChooserIndex + 1) % players.length;
                  setCurrentChooserIndex(nextChooser);
                  setChooserGamesPlayed(0);
                }

                if (newTotal === 40) {
                  Alert.alert("Game Over", "All 40 games have been played!");
                }

                props.navigation.navigate("MainScreen");
              }}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
