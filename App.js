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
import { updateGamesList, updateChooserIfNeeded } from "./logic/gameFlow";

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
                const updatedScores = applyScore(
                  scores,
                  selectedPlayerIndex,
                  currentChooserIndex,
                  100
                );
                setScores(updatedScores);

                const updatedGames = updateGamesList(games, "king");
                setGames(updatedGames);

                setTotalGamesPlayed((prev) => {
                  const total = prev + 1;
                  if (total === 40) {
                    Alert.alert("Game Over", "All 40 games have been played!");
                  }
                  return total;
                });

                updateChooserIfNeeded(
                  currentChooserIndex,
                  chooserGamesPlayed,
                  setCurrentChooserIndex,
                  setChooserGamesPlayed,
                  players
                );

                props.navigation.navigate("MainScreen");
              }}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
