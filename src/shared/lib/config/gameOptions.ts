export const gameModes = [
  { value: 'ALL', label: '전체' },
  { value: 'CLASSIC', label: '소환사의 협곡' },
  { value: 'ARAM', label: '칼바람 나락' },
  { value: 'URF', label: 'URF' },
  { value: 'OTHER', label: '기타' },
]

export const gameResults = [
  { value: 'ALL', label: '전체' },
  { value: 'WIN', label: '승리' },
  { value: 'LOSE', label: '패배' },
]

export interface GameOption {
  label: string;
  value: 'gameMode' | 'result';
  options: { value: string; label: string }[];
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