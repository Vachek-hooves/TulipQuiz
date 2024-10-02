import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TabLayout from "../../components/ScreenLayout/TabLayout";
import LinearGradient from 'react-native-linear-gradient';

const AboutTulipsScreen = () => {
  const navigation = useNavigation();

  const buttons = [
    { title: "Tulip Types", screen: "TulipsTypesScreen", color: ['#FF6B6B', '#FF8E53'] },
    { title: "Tulip Care", screen: "TulipsCaringScreen", color: ['#4ECDC4', '#45B7AF'] },
    { title: "Tulip Festivals", screen: "TulipFestivalsScreen", color: ['#FF69B4', '#FF1493'] },
  ];

  return (
    <TabLayout>
      <ImageBackground 
        // source={require('../../assets/img/tulipGrow/tulip_field_background.jpg')}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Discover Tulips</Text>
          <Text style={styles.subtitle}>Explore the world of these beautiful flowers</Text>
          {buttons.map((button, index) => (
            <TouchableOpacity 
              key={index}
              onPress={() => navigation.navigate(button.screen)}
              style={styles.buttonContainer}
            >
              <LinearGradient
                colors={button.color}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.button}
              >
                <Text style={styles.buttonText}>{button.title}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ImageBackground>
    </TabLayout>
  );
};

export default AboutTulipsScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 20,
    borderRadius: 25,
    overflow: 'hidden',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
