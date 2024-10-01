import React, { useState, useEffect, useContext, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TulipQuiz } from '../data/tulipQuiz';

export const TulipContext = createContext({});

export const TulipProvider = ({ children }) => {
  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('TulipQuiz');
        if (storedData !== null) {
          setQuizData(JSON.parse(storedData));
        } else {
          // If no stored data, use the default TulipQuiz and save it
          setQuizData(TulipQuiz);
          await AsyncStorage.setItem('TulipQuiz', JSON.stringify(TulipQuiz));
        }
      } catch (error) {
        console.error('Error loading quiz data:', error);
        setQuizData(TulipQuiz); // Fallback to default data if there's an error
      }
    };

    loadQuizData();
  }, []);

  const updateQuizScore = async (quizId, newScore) => {
    const updatedQuizData = quizData.map(quiz => 
      quiz.id === quizId ? { ...quiz, levelScore: newScore } : quiz
    );
    setQuizData(updatedQuizData);
    try {
      await AsyncStorage.setItem('TulipQuiz', JSON.stringify(updatedQuizData));
    } catch (error) {
      console.error('Error saving updated quiz data:', error);
    }
  };

  const value = {
    quizData,
    updateQuizScore,
  };

  return (
    <TulipContext.Provider value={value}>{children}</TulipContext.Provider>
  );
};

export const useTulipContext = () => {
  const context = useContext(TulipContext);
  if (!context) {
    throw new Error('useTulipContext must be used within a TulipProvider');
  }
  return context;
};
