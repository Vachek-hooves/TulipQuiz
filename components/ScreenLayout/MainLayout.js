import { StyleSheet, Text, View,ImageBackground,SafeAreaView } from "react-native";
import React from "react";

const MainLayout = ({children}) => {
  return (
    <ImageBackground source={require('../../assets/img/bg/Mainbg.jpg')} style={styles.background}>
      <SafeAreaView style={styles.container}>
        {children}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});