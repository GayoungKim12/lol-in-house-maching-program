export const errorMessages = {
  INVALID_API_KEY: {
    title: 'API 키 오류',
    description: 'API 키가 유효하지 않거나 만료되었습니다. 개발자에게 문의해주세요',
  },
  INVALID_FORMAT_RIOT_ACCOUNT: {
    title: '잘못된 형식',
    description: '게임 아이디는 게임명과 태그라인을 #으로 구분하여 입력해주세요.',
  },
  INVALID_FORMAT_RIOT_ACCOUNT_EMPTY: {
    title: '잘못된 형식',
    description: '게임명과 태그라인을 모두 입력해주세요.',
  },
  NOT_FOUND_SUMMONER: {
    title: '소환사 정보 오류',
    description: '소환사 정보를 가져오는 데 실패했습니다. 잠시 후 다시 시도해주세요.',
  },
  NOT_FOUND_MATCH_HISTORY: {
    title: '매치 기록 오류',
    description: '매치 기록을 가져오는 데 실패했습니다. 잠시 후 다시 시도해주세요.',
  },
  NOT_FOUND_ITEM_INFO: {
    title: '아이템 정보 오류',
    description: '아이템 정보를 가져오는 데 실패했습니다. 잠시 후 다시 시도해주세요.',
  },
  NOT_FOUND_MATCH_ID: {
    title: '매치 ID 오류',
    description: '해당 매치 ID를 찾을 수 없습니다. 다시 확인해주세요',
  },
  SUPABASE_INSERT_MATCH_FAILED: {
    title: '매치 저장 오류',
    description:
      '매치 정보를 저장하는 데 실패했습니다. 이미 저장된 경기이거나 일시적인 오류일 수 있습니다. 잠시 후 다시 시도해주세요.',
  },
}

export type ErrorMessageKey = keyof typeof errorMessages