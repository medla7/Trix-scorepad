// logic/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveGameState(state) {
  const json = JSON.stringify(state);
  await AsyncStorage.setItem('game_state', json);
}

export async function loadGameState() {
  const json = await AsyncStorage.getItem('game_state');
  return json ? JSON.parse(json) : null;
}
