import React from "react";
import { StyleSheet, View, ImageBackground,SafeAreaView } from "react-native";

const QuizLayout = ({children}) => {
  return (
    <ImageBackground source={require('../../assets/img/bg/vase.jpg')} style={styles.background}>
      <SafeAreaView style={styles.contentContainer}>
      </SafeAreaView>
        {children}
    </ImageBackground>
  );
};

export default QuizLayout;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  contentContainer: {
    // flex: 1,
    // backgroundColor: 'rgba(255, 255, 255, 0.1)', // This adds a slight white overlay to improve content visibility
  }
});