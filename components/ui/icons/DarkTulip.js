import { Image, StyleSheet } from "react-native";
import React from "react";

const DarkTulip = () => {
  return (
    <Image 
      source={require('../../../assets/img/tulips/orange.png')} 
      style={styles.tulip}
    />
  );
};

export default DarkTulip;

const styles = StyleSheet.create({
  tulip: {
    width: 30,
    height: 50,
    tintColor: 'black'
  }
});
