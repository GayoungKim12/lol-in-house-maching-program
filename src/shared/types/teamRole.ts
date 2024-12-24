export enum RoleEnum {
  '탑',
  '정글',
  '미드',
  '원딜',
  '서폿'
}

export enum TeamEnum {
  BLUE = 'blue',
  RED = 'red'
}

export interface User {
  player: string;
  role: RoleEnum;
}

export type TeamLineUps = {
  [key in TeamEnum]: User[];
};

export interface Pair {
  player1: string;
  player2: string;
}