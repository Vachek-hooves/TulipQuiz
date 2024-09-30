import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const Land = ({ style, children }) => {
  return (  
    <TouchableOpacity style={style}>
      <ImageBackground 
        source={require('../../../assets/img/tulipGrow/land.png')} 
        style={styles.icon}
        imageStyle={styles.image}
      >
     
          {children}
   
      </ImageBackground>
    </TouchableOpacity>
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
        height: '70%',
        // resizeMode: 'cover',
    },
    contentContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
