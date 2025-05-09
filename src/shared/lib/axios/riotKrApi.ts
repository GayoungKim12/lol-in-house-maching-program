import axios from 'axios'
import handleAPIError from '@/shared/lib/utils/handleAPIError'

// 라이엇 API 인스턴스 생성
const riotKrApi = axios.create({
  baseURL: `${import.meta.env.VITE_RIOT_KR_API_URL || 'https://asia.api.riotgames.com'}`,
  headers: {
    'Content-Type': 'application/json',
    'X-Riot-Token': `${import.meta.env.VITE_RIOT_API_KEY}`,
  },
  timeout: 10 * 1000,
})

// 응답 에러 처리를 위한 인터셉터
riotKrApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      handleAPIError('INVALID_API_KEY')
    }

    throw error
  },
)

export default riotKrApi
