import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TabLayout from "../../components/ScreenLayout/TabLayout";
import { useTulipContext } from "../../store/context";

const QuizWelcomeScreen = () => {
  const navigation = useNavigation();
  const { quizData } = useTulipContext();

  const handleQuizPress = (quizId) => {
    navigation.navigate("QuizGameScreen", { quizId });
  };

  return (
    <TabLayout blur={100}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Quiz Levels</Text>
        {quizData && quizData.map((quiz) => (
          <TouchableOpacity
            key={quiz.id}
            style={[styles.quizButton, quiz.isLocked && styles.lockedQuiz]}
            onPress={() => handleQuizPress(quiz.id)}
            disabled={quiz.isLocked}
          >
            <Image source={{ uri: quiz.image }} style={styles.quizImage} />
            <View style={styles.quizInfo}>
              <Text style={styles.quizTitle}>{quiz.title}</Text>
              <Text style={styles.quizQuestions}>{quiz.questions.length} Questions</Text>
            </View>
            {quiz.isLocked && (
              <View style={styles.lockOverlay}>
                <Text style={styles.lockText}>🔒</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </TabLayout>
  );
};

export default QuizWelcomeScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  quizButton: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quizImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  quizInfo: {
    padding: 16,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  quizQuestions: {
    fontSize: 14,
    color: "#666",
  },
  lockedQuiz: {
    opacity: 0.7,
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  lockText: {
    fontSize: 32,
  },
});
