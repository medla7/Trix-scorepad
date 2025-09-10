// App.js

import React, { useState, useEffect, useRef } from "react";
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
import QueensScreen from "./screens/QueensScreen";
import DimandsScreen from "./screens/DimandsScreen";
import { handleDimands } from "./games/dimands";
import FoldsScreen from "./screens/FoldsScreen";
import { handleFolds } from "./games/folds";
import GeneraleScreen from "./screens/GeneraleScreen";
import { handleGenerale } from "./games/generale";
import TrixScreen from "./screens/TrixScreen";
import { handleTrix } from "./games/trix";
import StarScreen from "./screens/StarScreen";
import SwitchScreen from "./screens/SwitchScreen";
import { Provider as PaperProvider } from "react-native-paper";
import { saveGameState, loadGameState } from "./logic/storage";

const Stack = createNativeStackNavigator();
export const defaultGameList = [
  { key: "king", name: "ray el 7obb", played: false },
  { key: "queens", name: "dyem", played: false },
  { key: "dimands", name: "dinar", played: false },
  { key: "folds", name: "pliyet", played: false },
  { key: "last", name: "farcha", played: false },
  { key: "trix", name: "solitaire", played: false },
  { key: "51", name: "51", played: false },
  { key: "general", name: "general", played: false },
  { key: "star", name: "etoile", played: false },
  { key: "switch", name: "switch", played: false },
];

export default function App() {
  const [chooserGamesPlayed, setChooserGamesPlayed] = useState(0);
  const [totalGamesPlayed, setTotalGamesPlayed] = useState(0);
  const [history, setHistory] = useState([]);
  const [fontsLoaded] = useFonts({
    JotiOne: JotiOne_400Regular,
  });

  const [players, setPlayers] = useState([]);
  const [scores, setScores] = useState([0, 0, 0, 0]);
  const [games, setGames] = useState([...defaultGameList]);
  const [currentChooserIndex, setCurrentChooserIndex] = useState(
    Math.floor(Math.random() * 4)
  );
  const [initialRoute, setInitialRoute] = useState("PlayerSetup");

  // Navigation ref for programmatic navigation
  const navigationRef = useRef();

  // Load saved state on mount
  useEffect(() => {
    async function init() {
      const saved = await loadGameState();
      if (saved) {
        setScores(saved.scores);
        setGames(saved.games);
        setCurrentChooserIndex(saved.currentChooserIndex);
        setChooserGamesPlayed(saved.chooserGamesPlayed);
        setTotalGamesPlayed(saved.totalGamesPlayed);
        setPlayers(saved.players);
        setHistory(saved.history || []);
        if (saved.players && saved.players.length > 0) {
          setInitialRoute("MainScreen");
        }
      }
    }
    init();
  }, []);

  // Always render the same hooks in the same order!

  const handleGameCompletion = (gameKey, updatedScores) => {
    // Save current state to history before updating
    setHistory((prev) => [
      ...prev,
      {
        scores,
        games,
        currentChooserIndex,
        chooserGamesPlayed,
        totalGamesPlayed,
      },
    ]);
    // Reset scores that are multiples of 1000
    const resetPlayers = [];
    const adjustedScores = updatedScores.map((s, i) => {
      if (s !== 0 && s % 1000 === 0) {
        resetPlayers.push(players[i]);
        return 0;
      }
      return s;
    });

    setScores(adjustedScores);

    // Update games list
    const updatedGames = games.map((g) =>
      g.key === gameKey ? { ...g, played: true } : g
    );

    const result = updateGameFlow({
      totalGamesPlayed,
      chooserGamesPlayed,
      currentChooserIndex,
      playersLength: players.length,
    });

    if (result.shouldResetGames) {
      setGames(defaultGameList);
    } else {
      setGames(updatedGames);
    }

    setTotalGamesPlayed(result.newTotal);
    setChooserGamesPlayed(result.newChooserCount);
    setCurrentChooserIndex(result.nextChooserIndex);

    if (result.gameOver) {
      Alert.alert("Game Over", "All 40 games have been played!");
    }

    saveGameState({
      scores: adjustedScores,
      games: result.shouldResetGames ? defaultGameList : updatedGames,
      currentChooserIndex: result.nextChooserIndex,
      chooserGamesPlayed: result.newChooserCount,
      totalGamesPlayed: result.newTotal,
      players: players,
      history,
    });

    return resetPlayers;
  };

  const undoLastGame = () => {
    setHistory((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      setScores(last.scores);
      setGames(last.games);
      setCurrentChooserIndex(last.currentChooserIndex);
      setChooserGamesPlayed(last.chooserGamesPlayed);
      setTotalGamesPlayed(last.totalGamesPlayed);
      return prev.slice(0, -1);
    });
  };

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <PaperProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={initialRoute}
        >
          <Stack.Screen name="PlayerSetup">
            {(props) => (
              <PlayerSetupScreen {...props} setPlayers={setPlayers} />
            )}
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
                totalGamesPlayed={totalGamesPlayed}
                setTotalGamesPlayed={setTotalGamesPlayed}
                chooserGamesPlayed={chooserGamesPlayed}
                setChooserGamesPlayed={setChooserGamesPlayed}
                undoLastGame={undoLastGame} 
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="KingOfHeartsScreen">
            {(props) => {
              const isStarRound = props.route.params?.isStarRound || false;
              const fromStar = props.route.params?.fromStar || false;
              const fromSwitch = props.route.params?.fromSwitch || false;
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
                    let roundName = "king";
                    if (fromSwitch) roundName = "switch";
                    else if (fromStar) roundName = "star";
                    const rps = handleGameCompletion(roundName, updated);
                    props.navigation.navigate("MainScreen", { rps });
                  }}
                />
              );
            }}
          </Stack.Screen>

          <Stack.Screen name="LastFoldScreen">
            {(props) => {
              const isStarRound = props.route.params?.isStarRound || false;
              const fromStar = props.route.params?.fromStar || false;
              const fromSwitch = props.route.params?.fromSwitch || false;
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
                    let roundName = "last";
                    if (fromSwitch) roundName = "switch";
                    else if (fromStar) roundName = "star";
                    const rps = handleGameCompletion(roundName, updated);
                    props.navigation.navigate("MainScreen", { rps });
                  }}
                />
              );
            }}
          </Stack.Screen>

          <Stack.Screen name="51Screen">
            {(props) => {
              const isStarRound = props.route.params?.isStarRound || false;
              const fromStar = props.route.params?.fromStar || false;
              const fromSwitch = props.route.params?.fromSwitch || false;
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
                    let roundName = "51";
                    if (fromSwitch) roundName = "switch";
                    else if (fromStar) roundName = "star";
                    const rps = handleGameCompletion(roundName, updated);
                    props.navigation.navigate("MainScreen", { rps });
                  }}
                />
              );
            }}
          </Stack.Screen>

          <Stack.Screen name="QueensScreen">
            {(props) => {
              const isStarRound = props.route.params?.isStarRound || false;
              const fromStar = props.route.params?.fromStar || false;
              const fromSwitch = props.route.params?.fromSwitch || false;
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
                    let roundName = "queens";
                    if (fromSwitch) roundName = "switch";
                    else if (fromStar) roundName = "star";
                    const rps = handleGameCompletion(roundName, updated);
                    props.navigation.navigate("MainScreen", { rps });
                  }}
                />
              );
            }}
          </Stack.Screen>

          <Stack.Screen name="DimandsScreen">
            {(props) => {
              const isStarRound = props.route.params?.isStarRound || false;
              const fromStar = props.route.params?.fromStar || false;
              const fromSwitch = props.route.params?.fromSwitch || false;
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
                    let roundName = "dimands";
                    if (fromSwitch) roundName = "switch";
                    else if (fromStar) roundName = "star";
                    const rps = handleGameCompletion(roundName, updated);
                    props.navigation.navigate("MainScreen", { rps });
                  }}
                />
              );
            }}
          </Stack.Screen>

          <Stack.Screen name="FoldsScreen">
            {(props) => {
              const isStarRound = props.route.params?.isStarRound || false;
              const fromStar = props.route.params?.fromStar || false;
              const fromSwitch = props.route.params?.fromSwitch || false;
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
                    let roundName = "folds";
                    if (fromSwitch) roundName = "switch";
                    else if (fromStar) roundName = "star";
                    const rps = handleGameCompletion(roundName, updated);
                    props.navigation.navigate("MainScreen", { rps });
                  }}
                />
              );
            }}
          </Stack.Screen>

          <Stack.Screen name="GeneraleScreen">
            {(props) => {
              const isStarRound = props.route.params?.isStarRound || false;
              const fromStar = props.route.params?.fromStar || false;
              const fromSwitch = props.route.params?.fromSwitch || false;
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
                    let roundName = "general";
                    if (fromSwitch) roundName = "switch";
                    else if (fromStar) roundName = "star";
                    const rps = handleGameCompletion(roundName, updated);
                    props.navigation.navigate("MainScreen", { rps });
                  }}
                />
              );
            }}
          </Stack.Screen>

          <Stack.Screen name="TrixScreen">
            {(props) => {
              const isStarRound = props.route.params?.isStarRound || false;
              const fromStar = props.route.params?.fromStar || false;
              const fromSwitch = props.route.params?.fromSwitch || false;
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
                    let roundName = "trix";
                    if (fromSwitch) roundName = "switch";
                    else if (fromStar) roundName = "star";
                    const rps = handleGameCompletion(roundName, updated);
                    props.navigation.navigate("MainScreen", { rps });
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
                games={games}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="SwitchScreen">
            {(props) => (
              <SwitchScreen
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
    </PaperProvider>
  );
}
