import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS, SPACING } from '../styles/theme';

export default function KingOfHeartsScreen({ navigation, players, onScoreSaved }) {
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(null);

  const handleSelect = (index) => {
    setSelectedPlayerIndex(index);
  };

  const handleNext = () => {
    if (selectedPlayerIndex !== null) {
      onScoreSaved(selectedPlayerIndex);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>king of hearts</Text>

      <View style={styles.scoreBox}>
        <Text style={styles.question}>who got the king?</Text>

        <View style={styles.buttonsRow}>
          {players.map((player, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.playerButton,
                selectedPlayerIndex === index && styles.playerButtonSelected,
              ]}
              onPress={() => handleSelect(index)}
            >
              <Text
                style={[
                  styles.playerText,
                  selectedPlayerIndex === index && styles.playerTextSelected,
                ]}
              >
                {player}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={styles.rules}>
        NB: players can’t play any heart card in the first of any round until someone do it
        in the next play. Can’t play the king of hearts until there is a fold containing a
        heart card. Who will get the king will receive 100 points.
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: COLORS.primary }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.actionText}>cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: COLORS.primary }]}
          onPress={handleNext}
        >
          <Text style={styles.actionText}>next</Text>
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
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 70,
    fontFamily: 'JotiOne',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: SPACING.md,
    paddingTop: 40,
  },
  scoreBox: {
    backgroundColor: '#D7C6B4',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
  },
  question: {
    fontSize: FONTS.normal,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  playerButton: {
    backgroundColor: '#A85903',
    borderRadius: RADIUS.md,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 5,
    width: '48%',
    alignItems: 'center',
  },
  playerButtonSelected: {
    backgroundColor: COLORS.background,
    borderColor: '#A85903',
    borderWidth: 2,
  },
  playerText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  playerTextSelected: {
    color: '#A85903',
  },
  rules: {
    fontSize: 13,
    marginVertical: SPACING.md,
    lineHeight: 18,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  actionButton: {
    width: '48%',
    padding: 16,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
  },
  actionText: {
    color: COLORS.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
