// screens/PlayerSetupScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";



export default function PlayerSetupScreen({ navigation, setPlayers }) {
  const [names, setNames] = useState(["", "", "", ""]);

  const handleChange = (text, index) => {
    const updated = [...names];
    updated[index] = text;
    setNames(updated);
  };

  const handleStart = () => {
    if (names.every((name) => name.trim() !== "")) {
      setPlayers(names);
      navigation.navigate("MainScreen");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TRIX</Text>
      {names.map((name, i) => (
        <TextInput
          key={i}
          placeholder={`add player ${i + 1}`}
          value={name}
          onChangeText={(text) => handleChange(text, i)}
          style={styles.input}
        />
      ))}
      <Text style={styles.note}>NB: the first player is chosen randomly</Text>
      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5EEE6",
    justifyContent: "center",
    padding: 30,
  },
  title: {
    fontSize: 80,
    fontWeight: "bold",
    color: "#A85903",
    textAlign: "center",
    marginBottom: 40,
    fontFamily: "JotiOne",
  },
  input: {
    backgroundColor: "#E6D6C3",
    padding: 12,
    marginVertical: 8,
    borderRadius: 20,
    fontSize: 16,
  },
  note: { marginVertical: 10, fontSize: 12, textAlign: "center" },
  button: {
    backgroundColor: "#A85903",
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { fontSize: 20, fontWeight: "bold", color: "#F5EEE6" },
});
