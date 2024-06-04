export enum GameRowPosition {
  LEFT = -1,
  CENTER = 0,
  RIGHT = 1,
}

export type GameRow = {
  position: GameRowPosition;
  tiles: GameTile[];
};

export type GameTile = {
  letter: string;
  found: boolean;
};

export type GameState = {
  gameStart: Date;
  moves: number;
  rows: GameRow[];
  found: string[];
  completed?: boolean;
  uploaded?: boolean;
};

export enum GameActionType {
  LOAD_GAME = "LOAD_GAME",
  RESET = "RESET",
  MOVEROW = "MOVEROW",
  FOUND = "FOUND",
  UPLOADED = "UPLOADED",
}

export type GameAction =
  | {
      type: GameActionType.LOAD_GAME;
      payload: GameState;
    }
  | {
      type: GameActionType.RESET;
      payload: GameState;
    }
  | {
      type: GameActionType.UPLOADED;
    }
  | {
      type: GameActionType.FOUND;
    }
  | {
      type: GameActionType.MOVEROW;
      payload: MoveRow;
    };

export type MoveRow = {
  rowNumber: number;
  position: GameRowPosition;
};
