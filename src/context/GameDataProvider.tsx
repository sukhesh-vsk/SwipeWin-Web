"use client"

import React, { createContext, useContext, useState, ReactNode, FC } from 'react';

interface GameDataContextProps {
  gameData: any;
  setGameData: (data: any) => void;
}

const GameDataContext = createContext<GameDataContextProps | undefined>(undefined);

export const useGameData = () => {
  const context = useContext(GameDataContext);
  if (!context) {
    throw new Error('useGameData must be used within a GameDataProvider');
  }
  return context;
};

interface GameDataProviderProps {
  children: ReactNode;
}

export const GameDataProvider: FC<GameDataProviderProps> = ({ children }) => {
  const [gameData, setGameData] = useState<any>(null);

  return (
    <GameDataContext.Provider value={{ gameData, setGameData }}>
      {children}
    </GameDataContext.Provider>
  );
};
