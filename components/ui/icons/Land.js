import { Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const Land = ({ style, children }) => {
  return (  
    <TouchableOpacity style={style}>
      <Image 
        source={require('../../../assets/img/tulipGrow/land.png')} 
        style={[styles.icon, style]}
      >
        {children}
      </Image>
    </TouchableOpacity>
  );
};

export default Land;

const styles = StyleSheet.create({  
    icon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    }
});
