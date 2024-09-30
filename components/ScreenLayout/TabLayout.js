import { StyleSheet, Text, View,ImageBackground } from "react-native";
import React from "react";

const TabLayout = ({children,blur=3}) => {
  return (
    <ImageBackground source={require('../../assets/img/bg/Mainbg.jpg')} style={styles.background} blurRadius={blur}>
    {children}
    </ImageBackground>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
    background:{
        flex:1,
        resizeMode:'cover',
        justifyContent:'center',
    }
});
