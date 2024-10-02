import React, { useState, useEffect, useContext, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TulipQuiz } from '../data/tulipQuiz';

export const TulipContext = createContext({});

export const TulipProvider = ({ children }) => {
  const [quizData, setQuizData] = useState(null);
  const [plantedTulips, setPlantedTulips] = useState(Array(12).fill(null));

  useEffect(() => {
    const loadData = async () => {
      try {
        const [storedQuizData, storedPlantedTulips] = await Promise.all([
          AsyncStorage.getItem('TulipQuiz'),
          AsyncStorage.getItem('PlantedTulips')
        ]);

        if (storedQuizData !== null) {
          setQuizData(JSON.parse(storedQuizData));
        } else {
          setQuizData(TulipQuiz);
          await AsyncStorage.setItem('TulipQuiz', JSON.stringify(TulipQuiz));
        }

        if (storedPlantedTulips !== null) {
          setPlantedTulips(JSON.parse(storedPlantedTulips));
        }
      } catch (error) {
        console.error('Error loading data:', error);
        setQuizData(TulipQuiz);
      }
    };

    loadData();
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

  const updateTotalScore = async (newScore) => {
    const updatedQuizData = quizData.map((quiz, index) => 
      index === 0 ? { ...quiz, levelScore: newScore } : quiz
    );
    setQuizData(updatedQuizData);
    try {
      await AsyncStorage.setItem('TulipQuiz', JSON.stringify(updatedQuizData));
    } catch (error) {
      console.error('Error saving updated quiz data:', error);
    }
  };

  const getTotalScore = () => {
    if (!quizData) return 0;
    return quizData.reduce((total, quiz) => {
      const score = Number(quiz.levelScore) || 0;
      return total + score;
    }, 0);
  };

  const getMaxPossibleScore = () => {
    if (!quizData) return 0;
    return quizData.reduce((total, quiz) => total + (quiz.questions.length * 10), 0);
  };

  const updatePlantedTulips = async (newPlantedTulips) => {
    setPlantedTulips(newPlantedTulips);
    try {
      await AsyncStorage.setItem('PlantedTulips', JSON.stringify(newPlantedTulips));
    } catch (error) {
      console.error('Error saving planted tulips data:', error);
    }
  };

  const growTulips = () => {
    const newPlantedTulips = plantedTulips.map(tulip => {
      if (tulip) {
        const elapsedTime = (Date.now() - tulip.plantedAt) / (1000 * 60); // time in minutes
        const growthStages = Math.min(Math.floor(elapsedTime / 2), 4); // 0.1 growth every 2 minutes, max 4 stages
        const newScale = Math.min(0.6 + (growthStages * 0.1), 1.0);
        return { ...tulip, scale: newScale };
      }
      return tulip;
    });
    updatePlantedTulips(newPlantedTulips);
  };

  const value = {
    quizData,
    updateQuizScore,
    getTotalScore,
    getMaxPossibleScore,
    updateTotalScore,
    plantedTulips,
    updatePlantedTulips,
    growTulips,
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
