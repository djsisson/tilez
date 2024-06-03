"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { GameAction, GameState, GameActionType } from "@/lib/GameTypes";
import { NewGame } from "@/lib/newgame";

export const useGameState = () => {
  return useContext(GameStateContext);
};

export const useGameStateDispatch = () => {
  return useContext(GameStateDispatchContext);
};

const _gameState: GameState = {
  gameStart: new Date(),
  moves: 0,
  rows: [],
  completed: false,
  found: [],
};

const gameStateReducer = (gameState: GameState, action: GameAction) => {
  switch (action.type) {
    case GameActionType.LOAD_GAME: {
      return { ...action.payload };
    }
    case GameActionType.RESET: {
      return { ...action.payload };
    }
    case GameActionType.FOUND: {
      const newState = {
        ...gameState,
        found: [
          ...(gameState?.found ? [...gameState.found] : []),
          gameState.rows.map((x) => x.tiles[x.position + 1].letter).join(""),
        ],
        rows: gameState.rows.map((x) => ({
          ...x,
          tiles: x.tiles.map((y, i) => ({
            ...y,
            found: i === x.position + 1 ? true : y.found,
          })),
        })),
      };
      if (
        newState.rows.reduce(
          (a, b) => a && b.tiles.reduce((c, d) => c && d.found, true),
          true,
        )
      ) {
        newState.completed = true;
      }
      return newState;
    }
    case GameActionType.MOVEROW: {
      return {
        ...gameState,
        moves: gameState.completed ? gameState.moves : gameState.moves + 1,
        rows: [
          ...gameState.rows.slice(0, action.payload.rowNumber),
          {
            ...gameState.rows[action.payload.rowNumber],
            position: action.payload.position,
          },
          ...gameState.rows.slice(action.payload.rowNumber + 1),
        ],
      };
    }
    default: {
      return { ...gameState };
    }
  }
};

const GameStateContext = createContext(_gameState);
const GameStateDispatchContext = createContext<React.Dispatch<GameAction>>(
  null!,
);
export const GameStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [gameState, dispatch] = useReducer(gameStateReducer, _gameState);

  useEffect(() => {
    const localState = localStorage.getItem("Tilez");

    if (!localState) {
      const getGameState = async () => {
        dispatch({ type: GameActionType.LOAD_GAME, payload: await NewGame() });
      };
      getGameState();
    } else {
      dispatch({
        type: GameActionType.LOAD_GAME,
        payload: JSON.parse(localState),
      });
    }
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
