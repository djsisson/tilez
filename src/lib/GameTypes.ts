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
};

export enum GameActionType {
  LOAD_GAME = "LOAD_GAME",
  RESET = "RESET",
  MOVEROW = "MOVEROW",
  FOUND = "FOUND",
}

export type GameAction = {
  type: GameActionType;
  payload?: any;
};

export type MoveRow = {
  rowNumber: number;
  position: GameRowPosition;
};
