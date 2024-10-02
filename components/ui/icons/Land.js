import React from 'react';
import { ImageBackground, StyleSheet, View, Text } from 'react-native';

const Land = ({ children, growthProgress }) => {
  return (
    <ImageBackground
      source={require('../../../assets/img/tulipGrow/land.png')}
      style={styles.icon}
      imageStyle={styles.image}>
      {children}
      {growthProgress !== undefined && (
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${growthProgress * 100}%` }]} />
          <Text style={styles.progressText}>{`${Math.round(growthProgress * 100)}%`}</Text>
        </View>
      )}
    </ImageBackground>
  );
};

export default Land;

const styles = StyleSheet.create({
  icon: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  progressBarContainer: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    right: 5,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'green',
  },
  progressText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
