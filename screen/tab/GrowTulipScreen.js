import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from "react-native";
import TabLayout from "../../components/ScreenLayout/TabLayout";
import LinearGradient from 'react-native-linear-gradient';

const GrowTulipScreen = ({navigation}) => {
  return (
    <TabLayout>
      <ImageBackground 
        // source={require('../../assets/img/tulipGrow/tulip_field_background.jpg')} 
        source={require('../../assets/img/bg/tulipField.png')}
        style={styles.background}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Welcome to Tulip Farming</Text>
          <Text style={styles.subtitle}>Grow and Prosper!</Text>
          <Text style={styles.description}>
            Embark on a journey to become the ultimate tulip farmer. 
            Test your knowledge, grow beautiful tulips, and watch your garden flourish!
          </Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate('TulipFarmScreen')}
            style={styles.buttonContainer}
          >
            <LinearGradient
              colors={['#FF6B6B', '#4ECDC4']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Open Farm</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TabLayout>
  );
};

export default GrowTulipScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
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
    fontSize: 24,
    fontWeight: '600',
    color: '#4ECDC4',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '80%',
    overflow: 'hidden',
    borderRadius: 25,
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
