// App.js
import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlayerSetupScreen from "./screens/PlayerSetupScreen";
import MainScreen from "./screens/MainScreen";
import KingOfHeartsScreen from "./screens/KingOfHeartsScreen";
import LastFoldScreen from "./screens/LastFoldScreen";
import { useFonts } from "expo-font";
import { JotiOne_400Regular } from "@expo-google-fonts/joti-one";
import { handleKingOfHearts } from "./games/kingOfHearts";
import { handleLastFold } from "./games/lastFold";
import { updateGameFlow } from "./logic/gameFlow";
import FiftyOneScreen from "./screens/51Screen";
import { handle51 } from "./games/51";
import { handleQueens } from "./games/queens";
import QueensScreen from "./screens/QueensScreen"; // à créer
import DimandsScreen from "./screens/DimandsScreen";
import { handleDimands } from "./games/dimands";
import FoldsScreen from "./screens/FoldsScreen";
import { handleFolds } from "./games/folds";
import GeneraleScreen from "./screens/GeneraleScreen";
import { handleGenerale } from "./games/generale";
import TrixScreen from "./screens/TrixScreen";
import { handleTrix } from "./games/trix";
import StarScreen from "./screens/StarScreen";

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

  const handleGameCompletion = (gameKey, updatedScores) => {
    setScores(updatedScores);

    const updatedGames = games.map((g) =>
      g.key === gameKey ? { ...g, played: true } : g
    );
    setGames(updatedGames);

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
  };

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
          {(props) => {
            const isStarRound = props.route.params?.isStarRound || false;
            const fromStar = props.route.params?.fromStar || false;

            return (
              <KingOfHeartsScreen
                {...props}
                players={players}
                onScoreSaved={(selectedIndex) => {
                  const updated = handleKingOfHearts(
                    scores,
                    selectedIndex,
                    currentChooserIndex,
                    isStarRound
                  );

                  handleGameCompletion(
                    fromStar ? "star" : "king", // ⚠️ très important
                    updated
                  );

                  props.navigation.navigate("MainScreen");
                }}
              />
            );
          }}
        </Stack.Screen>

        <Stack.Screen name="LastFoldScreen">
          {(props) => {
            const isStarRound = props.route.params?.isStarRound || false;
            const fromStar = props.route.params?.fromStar || false;

            return (
              <LastFoldScreen
                {...props}
                players={players}
                onScoreSaved={(selectedIndex) => {
                  const updated = handleLastFold(
                    scores,
                    selectedIndex,
                    currentChooserIndex,
                    isStarRound
                  );

                  handleGameCompletion(
                    fromStar ? "star" : "last", // ⚠️ très important
                    updated
                  );

                  props.navigation.navigate("MainScreen");
                }}
              />
            );
          }}
        </Stack.Screen>

        <Stack.Screen name="51Screen">
         {(props) => {
            const isStarRound = props.route.params?.isStarRound || false;
            const fromStar = props.route.params?.fromStar || false;

            return (
              <FiftyOneScreen
                {...props}
                players={players}
                onScoreSaved={(selectedIndex) => {
                  const updated = handle51(
                    scores,
                    selectedIndex,
                    currentChooserIndex,
                    isStarRound
                  );

                  handleGameCompletion(
                    fromStar ? "star" : "51", // ⚠️ très important
                    updated
                  );

                  props.navigation.navigate("MainScreen");
                }}
              />
            );
          }}
        </Stack.Screen>

        <Stack.Screen name="QueensScreen">
          {(props) => {
            const isStarRound = props.route.params?.isStarRound || false;
            const fromStar = props.route.params?.fromStar || false;

            return (
              <QueensScreen
                {...props}
                players={players}
                onScoreSaved={(selectedIndex) => {
                  const updated = handleQueens(
                    scores,
                    selectedIndex,
                    currentChooserIndex,
                    isStarRound
                  );

                  handleGameCompletion(
                    fromStar ? "star" : "queens", // ⚠️ très important
                    updated
                  );

                  props.navigation.navigate("MainScreen");
                }}
              />
            );
          }}
        </Stack.Screen>

        <Stack.Screen name="DimandsScreen">
          {(props) => {
            const isStarRound = props.route.params?.isStarRound || false;
            const fromStar = props.route.params?.fromStar || false;

            return (
              <DimandsScreen
                {...props}
                players={players}
                onScoreSaved={(selectedIndex) => {
                  const updated = handleDimands(
                    scores,
                    selectedIndex,
                    currentChooserIndex,
                    isStarRound
                  );

                  handleGameCompletion(
                    fromStar ? "star" : "dimands", // ⚠️ très important
                    updated
                  );

                  props.navigation.navigate("MainScreen");
                }}
              />
            );
          }}
        </Stack.Screen>
        <Stack.Screen name="FoldsScreen">
          {(props) => {
            const isStarRound = props.route.params?.isStarRound || false;
            const fromStar = props.route.params?.fromStar || false;

            return (
              <FoldsScreen
                {...props}
                players={players}
                onScoreSaved={(selectedIndex) => {
                  const updated = handleFolds(
                    scores,
                    selectedIndex,
                    currentChooserIndex,
                    isStarRound
                  );

                  handleGameCompletion(
                    fromStar ? "star" : "folds", // ⚠️ très important
                    updated
                  );

                  props.navigation.navigate("MainScreen");
                }}
              />
            );
          }}
        </Stack.Screen>
        <Stack.Screen name="GeneraleScreen">
          {(props) => {
            const isStarRound = props.route.params?.isStarRound || false;
            const fromStar = props.route.params?.fromStar || false;

            return (
              <GeneraleScreen
                {...props}
                players={players}
                onScoreSaved={(selectedIndex) => {
                  const updated = handleGenerale(
                    scores,
                    selectedIndex,
                    currentChooserIndex,
                    isStarRound
                  );

                  handleGameCompletion(
                    fromStar ? "star" : "general", // ⚠️ très important
                    updated
                  );

                  props.navigation.navigate("MainScreen");
                }}
              />
            );
          }}
        </Stack.Screen>
        <Stack.Screen name="TrixScreen">
          {(props) => {
            const isStarRound = props.route.params?.isStarRound || false;
            const fromStar = props.route.params?.fromStar || false;

            return (
              <TrixScreen
                {...props}
                players={players}
                onScoreSaved={(selectedIndex) => {
                  const updated = handleTrix(
                    scores,
                    selectedIndex,
                    currentChooserIndex,
                    isStarRound
                  );

                  handleGameCompletion(
                    fromStar ? "star" : "trix", // ⚠️ très important
                    updated
                  );

                  props.navigation.navigate("MainScreen");
                }}
              />
            );
          }}
        </Stack.Screen>
        <Stack.Screen name="StarScreen">
          {(props) => (
            <StarScreen
              {...props}
              players={players}
              currentChooserIndex={currentChooserIndex}
              scores={scores}
              handleGameCompletion={handleGameCompletion}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
