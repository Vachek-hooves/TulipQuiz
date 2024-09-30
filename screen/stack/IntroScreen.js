import { StyleSheet, Text, View, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import MainLayout from "../../components/ScreenLayout/MainLayout";

const IntroScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnims = useRef("Welcome".split('').map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const animations = scaleAnims.map((anim, index) => 
      Animated.timing(anim, {
        toValue: 1,
        duration: 1000,
        delay: index * 100,
        useNativeDriver: true,
      })
    );

    Animated.stagger(100, [
      ...animations,
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <MainLayout>
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          {"Welcome".split('').map((letter, index) => (
            <Animated.Text
              key={index}
              style={[
                styles.welcomeLetter,
                {
                  opacity: scaleAnims[index],
                  transform: [
                    { scale: scaleAnims[index] },
                    {
                      translateY: scaleAnims[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [70, 0], // Increased from 50 to 70
                      }),
                    },
                  ],
                },
              ]}
            >
              {letter}
            </Animated.Text>
          ))}
        </View>
        <Animated.Text style={[styles.appName, { opacity: fadeAnim }]}>
          Tulip Quiz: Discover Holland
        </Animated.Text>
      </View>
    </MainLayout>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeContainer: {
    flexDirection: 'row',
    marginBottom: 36, // Increased from 20 to 30
  },
  welcomeLetter: {
    fontSize: 58, // Increased from 32 to 48
    fontWeight: 'bold',
    color: 'white',
  },
  appName: {
    fontSize: 42, // Increased from 28 to 36
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});
