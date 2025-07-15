// screens/LastFoldScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { COLORS, FONTS, RADIUS, SPACING } from '../styles/theme';

export default function LastFoldScreen({
  players,
  scores,
  setScores,
  chooserIndex,
  onScoreSaved,
  navigation,
}) {
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(null);

  const handleSelect = (index) => {
    setSelectedPlayerIndex(index);
  };

  const handleNext = () => {
    if (selectedPlayerIndex === null) {
      Alert.alert('Selection Required', 'Please select a player.');
      return;
    }
    onScoreSaved(selectedPlayerIndex); // Le score sera appliqué dans App.js
  };

  const handleCancel = () => {
    navigation.navigate('MainScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Last Fold</Text>
      <Text style={styles.subtitle}>Who got the last fold?</Text>

      {players.map((player, index) => {
        const isSelected = selectedPlayerIndex === index;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleSelect(index)}
            style={[
              styles.playerButton,
              isSelected && styles.selectedButton,
            ]}
          >
            <Text
              style={[
                styles.playerText,
                isSelected && styles.selectedText,
              ]}
            >
              {player}
            </Text>
          </TouchableOpacity>
        );
      })}

      <View style={styles.actions}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'JotiOne',
    fontSize: 56,
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: FONTS.medium,
    marginBottom: 20,
  },
  playerButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    marginVertical: 8,
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: COLORS.background,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  playerText: {
    color: COLORS.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedText: {
    color: COLORS.primary,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  cancelButton: {
    backgroundColor: COLORS.gray,
    padding: 12,
    borderRadius: RADIUS.md,
    width: '48%',
    alignItems: 'center',
  },
  cancelText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: RADIUS.md,
    width: '48%',
    alignItems: 'center',
  },
  nextText: {
    color: COLORS.background,
    fontWeight: 'bold',
  },
});
