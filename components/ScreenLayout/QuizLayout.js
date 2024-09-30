import { StyleSheet, Text, View,ImageBackground } from "react-native";

const QuizLayout = ({children}) => {
  return (
    <ImageBackground source={require('../../assets/img/bg/vase.jpg')} style={styles.background}>
      {children}
    </ImageBackground>
  );
};

export default QuizLayout;

const styles = StyleSheet.create({
    background:{
        flex:1,
        resizeMode:'cover',
        justifyContent:'center',
        
    }
});