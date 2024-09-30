import React from "react";
import { StyleSheet, Text, View,ImageBackground } from "react-native";
import { useTulipContext } from "../../store/context";

const QuizGameScreen = ({ route }) => {
  const { quizId } = route.params;
  const { quizData } = useTulipContext();

  const currentQuiz = quizData.find(quiz => quiz.id === quizId);

  if (!currentQuiz) {
    return (
      <View style={styles.container}>
        <Text>Quiz not found</Text>
      </View>
    );
  }

  return (
    <ImageBackground source={require('../../assets/img/bg/vase.jpg')} style={styles.container}>
      <Text style={styles.title}>{currentQuiz.title}</Text>
      <Text style={styles.subtitle}>{currentQuiz.questions.length} Questions</Text>
      {/* Add more quiz game logic here */}
    </ImageBackground>
  );
};

export default QuizGameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 16,
  },
});
