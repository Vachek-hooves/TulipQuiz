import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Alert, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TabLayout from "../../components/ScreenLayout/TabLayout";
import { useTulipContext } from "../../store/context";

const QuizWelcomeScreen = () => {
  const navigation = useNavigation();
  const { quizData, getTotalScore, unlockQuiz } = useTulipContext();
  const [unlockedQuizId, setUnlockedQuizId] = useState(null);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    setTotalScore(getTotalScore());
  }, [getTotalScore]);

  const handleQuizPress = (quizId) => {
    navigation.navigate("QuizGameScreen", { quizId });
  };

  const handleUnlockQuiz = (quizId) => {
    if (totalScore >= 150) {
      unlockQuiz(quizId);
      setUnlockedQuizId(quizId);
      setTotalScore(prevScore => prevScore - 150);
      Alert.alert("Quiz Unlocked!", "You've successfully unlocked this quiz.");
    } else {
      Alert.alert("Not Enough Points", `You need 150 points to unlock this quiz. Current score: ${totalScore}`);
    }
  };

  return (
    <TabLayout blur={100}>
      <SafeAreaView></SafeAreaView>
      <View style={styles.totalScoreContainer}>
        <Text style={styles.totalScoreText}>Total Score: {totalScore}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Quiz Levels</Text>
        {quizData && quizData.map((quiz) => (
          <TouchableOpacity
            key={quiz.id}
            style={[styles.quizButton, quiz.isLocked && styles.lockedQuiz]}
            onPress={() => quiz.isLocked ? handleUnlockQuiz(quiz.id) : handleQuizPress(quiz.id)}
          >
            <Image source={{ uri: quiz.image }} style={styles.quizImage} />
            <View style={styles.quizInfo}>
              <Text style={styles.quizTitle}>{quiz.title}</Text>
              <View style={styles.quizStats}>
                <Text style={styles.quizQuestions}>{quiz.questions.length} Questions</Text>
                <Text style={styles.quizScore}>Score: {quiz.levelScore}/{quiz.questions.length * 10}</Text>
              </View>
            </View>
            {quiz.isLocked && (
              <View style={styles.lockOverlay}>
                <Text style={styles.lockText}>🔒</Text>
                <Text style={styles.unlockText}>Tap to unlock (150 points)</Text>
              </View>
            )}
            {unlockedQuizId === quiz.id && (
              <View style={styles.unlockedOverlay}>
                <Text style={styles.unlockedText}>Unlocked!</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={{height:80}}></View>
    </TabLayout>
  );
};

const styles = StyleSheet.create({
  totalScoreContainer: {
    backgroundColor: '#4ECDC4',
    padding: 10,
    alignItems: 'center',
    marginBottom:10
  },
  totalScoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
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
  quizStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quizQuestions: {
    fontSize: 14,
    color: "#666",
  },
  quizScore: {
    fontSize: 14,
    color: "#666",
    fontWeight: "bold",
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
  unlockText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  unlockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(76, 175, 80, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  unlockedText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default QuizWelcomeScreen;
