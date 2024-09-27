import React, {useState, useEffect, useContext, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TulipContext = createContext({});

export const TulipProvider = ({children}) => {
  const value = {};
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
