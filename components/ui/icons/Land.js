import {ImageBackground, StyleSheet} from 'react-native';

const Land = ({children}) => {
  return (
    <ImageBackground
      source={require('../../../assets/img/tulipGrow/land.png')}
      style={styles.icon}
      imageStyle={styles.image}>
      {children}
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
});
