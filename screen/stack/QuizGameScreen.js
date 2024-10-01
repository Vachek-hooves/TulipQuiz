import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Dimensions } from "react-native";
import { useTulipContext } from "../../store/context";
import LinearGradient from 'react-native-linear-gradient';
import QuizLayout from "../../components/ScreenLayout/QuizLayout";

const { width } = Dimensions.get('window');

const QuizGameScreen = ({ route, navigation }) => {
  const { quizId } = route.params;
  const { quizData } = useTulipContext();
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    const quiz = quizData.find(q => q.id === quizId);
    setCurrentQuiz(quiz);
  }, [quizId, quizData]);

  const handleAnswer = (selected) => {
    const currentQuestion = currentQuiz.questions[currentQuestionIndex];
    const isCorrect = selected === currentQuestion.answer;
    
    setSelectedAnswer(selected);
    setLastAnswerCorrect(isCorrect);

    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex + 1 < currentQuiz.questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setLastAnswerCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const renderOptionButton = (option) => {
    const isSelected = option === selectedAnswer;
    const isCorrect = option === currentQuiz.questions[currentQuestionIndex].answer;
    
    let gradientColors = ['#FF6B6B', '#4ECDC4'];
    let textColor = '#333';

    if (isSelected) {
      if (isCorrect) {
        gradientColors = ['#4CAF50', '#45a049'];
        textColor = '#4CAF50';
      } else {
        gradientColors = ['#F44336', '#d32f2f'];
        textColor = '#F44336';
      }
    }

    return (
      <TouchableOpacity
        key={option}
        onPress={() => handleAnswer(option)}
        disabled={selectedAnswer !== null}
      >
        <LinearGradient
          colors={gradientColors}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.optionGradientBorder}
        >
          <View style={styles.optionButton}>
            <Text style={[styles.optionText, { color: textColor }]}>{option}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setLastAnswerCorrect(null);
    setSelectedAnswer(null);
  };

  if (!currentQuiz) {
    return (
      <View style={styles.container}>
        <Text>Loading quiz...</Text>
      </View>
    );
  }

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];
  const remainingQuestions = currentQuiz.questions.length - currentQuestionIndex - 1;

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
          <>
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>{currentQuestion.question}</Text>
              {currentQuestion.options.map((option) => renderOptionButton(option))}
            </View>
            <View style={styles.feedbackContainer}>
              {lastAnswerCorrect !== null && (
                <Text style={[styles.feedbackText, lastAnswerCorrect ? styles.correctAnswer : styles.incorrectAnswer]}>
                  {lastAnswerCorrect ? "Correct!" : "Incorrect!"}
                </Text>
              )}
              <Text style={styles.progressText}>
                Correct: {score} | Remaining: {remainingQuestions}
              </Text>
            </View>
          </>
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
    // justifyContent: 'center',
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
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    padding: 20,
    width: "100%",
    
  },
  questionText: {
    fontSize: 23,
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center",
    color:'#FFFFFF',
    height:110,
    color:'green',
    lineHeight:32,
    letterSpacing:0.5
  },
  optionGradientBorder: {
    borderRadius: 15,
    padding: 3, // Increased from 2 to 3
    marginBottom: 15,
    width: width * 0.9, // 90% of screen width for better responsiveness
    alignSelf: 'center',
  },
  optionButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12, // Slightly reduced to maintain the overall shape
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50, // Ensure a minimum height for better touch targets
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
    color: '#333',
    fontWeight: '600', // Added for better readability
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
  feedbackContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  correctAnswer: {
    color: '#4CAF50',
  },
  incorrectAnswer: {
    color: '#F44336',
  },
  progressText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default QuizGameScreen;