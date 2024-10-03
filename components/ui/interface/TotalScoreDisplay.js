import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTulipContext } from '../../../store/context';

const TotalScoreDisplay = () => {
  const { getTotalScore, getMaxPossibleScore } = useTulipContext();

  const totalScore = getTotalScore();
  const maxScore = getMaxPossibleScore();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Total Score: {totalScore} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default TotalScoreDisplay;