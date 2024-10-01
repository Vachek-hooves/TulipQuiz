import React from "react";
import { ImageBackground, StyleSheet, View, Dimensions, Text,SafeAreaView } from "react-native";
import Land from '../../components/ui/icons/Land';  
import DarkTulip from '../../components/ui/icons/DarkTulip';
import IconGoBack from '../../components/ui/icons/IconGoBack';
import TotalScoreDisplay from '../../components/ui/interface/TotalScoreDisplay';

const { width: screenWidth } = Dimensions.get('window');
const GRID_SIZE = 3;
const LAND_SIZE = screenWidth / GRID_SIZE;

const TulipFarmScreen = () => {
  return (
    <ImageBackground source={require('../../assets/img/tulipGrow/grass.jpg')} style={styles.background}>
        <SafeAreaView ></SafeAreaView>
      {/* <View style={styles.overlay}> */}
        <View style={styles.header}>
          <TotalScoreDisplay />
        </View>
        <View style={styles.farmGrid}>
          {Array.from({length: 9}).map((_, index) => (
            <Land key={index} style={styles.land}>
              <DarkTulip />
            </Land>
          ))}
        </View>
        <IconGoBack style={styles.backIcon} />
      {/* </View> */}
    </ImageBackground>
  );
};

export default TulipFarmScreen;

const styles = StyleSheet.create({ 
  background: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)', // Add a slight overlay for better text visibility
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  farmGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: screenWidth,
    height: screenWidth,
  },
  land: {
    width: LAND_SIZE,
    height: LAND_SIZE,
    // transform: [{rotate: '45deg'}]
  },
  backIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
});
