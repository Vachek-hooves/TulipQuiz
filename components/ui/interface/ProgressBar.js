import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ProgressBar = ({ progress }) => {
  const animatedProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 500, // Adjust this value to control the speed of the animation
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const width = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.progressBarContainer, { width }]}>
        <LinearGradient
          colors={['#FF6B6B', '#4ECDC4']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.progressBar}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarContainer: {
    height: '100%',
  },
  progressBar: {
    flex: 1,
    borderRadius: 5,
  },
});

export default ProgressBar;