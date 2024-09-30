import { ImageBackground, StyleSheet, View, Dimensions } from "react-native";
import Land from '../../components/ui/icons/Land';

const { width: screenWidth } = Dimensions.get('window');
const GRID_SIZE = 3;
const LAND_SIZE = screenWidth / GRID_SIZE;

const TulipFarmScreen = () => {
  return (
    <ImageBackground source={require('../../assets/img/tulipGrow/grass.jpg')} style={styles.background}>
      <View style={styles.farmGrid}>
       {
        Array.from({length: 9}).map((_, index) => (
          <Land key={index} style={styles.land} />
        ))
       }
      </View>
    </ImageBackground>
  );
};

export default TulipFarmScreen;

const styles = StyleSheet.create({ 
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
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
  },
});
