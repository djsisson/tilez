"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import * as GameTypes from "@/lib/GameTypes";
import { NewGame } from "@/lib/newgame";
import { words_six } from "@/data/6letter";

const _gameState: GameTypes.GameState = { ...NewGame() };

export const useGameState = () => {
  return useContext(GameStateContext);
};

export const useGameStateDispatch = () => {
  return useContext(GameStateDispatchContext);
};

const gameStateReducer = (
  gameState: GameTypes.GameState,
  action: GameTypes.GameAction
) => {
  switch (action.type) {
    case GameTypes.GameActionType.LOAD_GAME: {
      return { ...action.payload };
    }
    case GameTypes.GameActionType.RESET: {
      return { ...NewGame() };
    }
    case GameTypes.GameActionType.MOVEROW: {
      const newstate = {
        ...gameState,
        moves: gameState.moves + 1,
        rows: [
          ...gameState.rows.slice(0, action.payload.rowNumber),
          {
            ...gameState.rows[action.payload.rowNumber],
            position: action.payload.position,
          },
          ...gameState.rows.slice(action.payload.rowNumber + 1),
        ],
      };
      const currentWord = newstate.rows.map(
        (x) => x.tiles[x.position + 1].letter
      );
      if (words_six.includes(currentWord.join(""))) {
        console.log("Found", currentWord);
        return {
          ...newstate,
          rows: newstate.rows.map((x) => ({
            ...x,
            tiles: x.tiles.map((y, i) => ({
              ...y,
              found: i === x.position + 1 ? true : y.found,
            })),
          })),
        };
      }
      return newstate;
    }
    default: {
      return { ...gameState };
    }
  }
};

const GameStateContext = createContext(_gameState);
const GameStateDispatchContext = createContext<
  React.Dispatch<GameTypes.GameAction>
>(null!);
export const GameStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [gameState, dispatch] = useReducer(gameStateReducer, _gameState);

  useEffect(() => {
    const localState = localStorage.getItem("Tilez");
    dispatch({
      type: GameTypes.GameActionType.LOAD_GAME,
      payload: localState ? JSON.parse(localState) : _gameState,
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("Tilez", JSON.stringify(gameState));
  }, [gameState]);

  return (
    <GameStateContext.Provider value={gameState}>
      <GameStateDispatchContext.Provider value={dispatch}>
        {children}
      </GameStateDispatchContext.Provider>
    </GameStateContext.Provider>
  );
};
