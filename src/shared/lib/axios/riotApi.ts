import axios from 'axios'

// 라이엇 API 인스턴스 생성
const riotApi = axios.create({
  baseURL: `${import.meta.env.VITE_RIOT_API_BASE_URL || 'https://asia.api.riotgames.com'}`,
  headers: {
    'Content-Type': 'application/json',
    'X-Riot-Token': `${import.meta.env.VITE_RIOT_API_KEY}`,
  },
  timeout: 10 * 1000,
})

// 응답 에러 처리를 위한 인터셉터
riotApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API 요청 오류:', error.response?.data || error.message)

    // 에러 메시지를 더 명확하게 처리
    if (error.response?.status === 403) {
      throw new Error('API 키가 유효하지 않거나 만료되었습니다.')
    } else if (error.response?.status === 404) {
      throw new Error('해당 소환사를 찾을 수 없습니다.')
    } else if (error.response?.status === 429) {
      throw new Error('API 사용량 제한을 초과했습니다. 잠시 후 다시 시도해주세요.')
    }

    throw error
  },
)

export default riotApi
