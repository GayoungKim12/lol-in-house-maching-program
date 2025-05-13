export enum GameMode {
  ALL = 0,
  SOLO_RANK = 420,
  FREE_RANK = 440,
  NORMAL_BLIND_PICK = 430,
  NORMAL_DRAFT_PICK = 400,
  ARAM = 450,

  SPECIAL_MODE = 700,
  CHERRY = 1700,
  RANDOM_URF = 900,
}

export const gameModes = [
  { value: GameMode.ALL, label: '전체' },
  { value: GameMode.SOLO_RANK, label: '솔로 랭크' },
  { value: GameMode.FREE_RANK, label: '자유 랭크' },
  { value: GameMode.NORMAL_BLIND_PICK, label: '일반(블라인드 픽)' },
  { value: GameMode.NORMAL_DRAFT_PICK, label: '일반(드래프트 픽)' },
  { value: GameMode.ARAM, label: '칼바람 나락' },
  { value: GameMode.CHERRY, label: '아레나' },
  { value: GameMode.RANDOM_URF, label: '무작위 URF' },
  { value: GameMode.SPECIAL_MODE, label: '특별 모드' },
]

export const gameResults = [
  { value: 'ALL', label: '전체' },
  { value: 'WIN', label: '승리' },
  { value: 'LOSE', label: '패배' },
]

export interface GameOption {
  label: string;
  value: 'gameMode' | 'result';
  options: {
    value: string | number
    label: string
  }[];
}

export const gameOptions: GameOption[] = [{
  label: '게임 모드',
  value: 'gameMode',
  options: gameModes,
}, {
  label: '게임 결과',
  value: 'result',
  options: gameResults,
}]