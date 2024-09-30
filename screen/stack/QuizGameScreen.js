import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import { useTulipContext } from "../../store/context";
import LinearGradient from 'react-native-linear-gradient';
import QuizLayout from "../../components/ScreenLayout/QuizLayout";

const QuizGameScreen = ({ route, navigation }) => {
  const { quizId } = route.params;
  const { quizData } = useTulipContext();
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const quiz = quizData.find(q => q.id === quizId);
    setCurrentQuiz(quiz);
  }, [quizId, quizData]);

  const handleAnswer = (selectedAnswer) => {
    const currentQuestion = currentQuiz.questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex + 1 < currentQuiz.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
  };

  if (!currentQuiz) {
    return (
      <View style={styles.container}>
        <Text>Loading quiz...</Text>
      </View>
    );
  }

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  return (
    <QuizLayout>
      <LinearGradient 
        colors={['rgba(255, 107, 107, 0.6)', 'rgba(78, 205, 196, 0.7)']} 
        style={styles.gradientOverlay}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.quizTitle}>{currentQuiz.title}</Text>
        
        {showResult ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Quiz Complete!</Text>
            <Text style={styles.resultScore}>
              Your score: {score} / {currentQuiz.questions.length}
            </Text>
            <Image
              source={require('../../assets/img/bg/vase.jpg')}
              style={styles.resultImage}
              />
            <TouchableOpacity style={styles.restartButton} onPress={restartQuiz}>
              <Text style={styles.restartButtonText}>Restart Quiz</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleAnswer(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
            <Text style={styles.progressText}>
              Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
            </Text>
          </View>
        )}
      </ScrollView>
    </QuizLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  quizTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "center",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  questionContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    padding: 20,
    width: "100%",
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  optionButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
  },
  progressText: {
    fontSize: 14,
    color: "#333",
    textAlign: 'center',
    marginTop: 10,
  },
  resultContainer: {
    alignItems: "center",
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  resultScore: {
    fontSize: 22,
    color: "#FFFFFF",
    marginBottom: 30,
  },
  resultImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 30,
  },
  restartButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 15,
  },
  restartButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6B6B",
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    // height: 200, // Adjust this value to control how far down the gradient extends
   height:'100%'
  },
});

export default QuizGameScreen;