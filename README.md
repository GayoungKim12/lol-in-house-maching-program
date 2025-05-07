# LOL In-House Matching Program

## 라이엇 API 설정 방법

1. [라이엇 개발자 포털](https://developer.riotgames.com/)에서 계정을 생성하고 API 키를 발급받습니다.
2. 프로젝트 루트에 `.env.local` 파일을 생성하고 다음과 같이 입력합니다:

```
VITE_RIOT_API_KEY=RGAPI-your-api-key-here
VITE_RIOT_API_BASE_URL=https://kr.api.riotgames.com
```

3. API 키는 24시간마다 만료됩니다. 개발용 키를 프로덕션 환경에서 사용하지 마세요.

## 소환사 검색 기능

- `gameName#tagLine` 형식으로 소환사를 검색할 수 있습니다.
- 소환사의 기본 정보와 랭크 정보를 확인할 수 있습니다.
- 최근 검색 기록이 저장되어 편리하게 재검색할 수 있습니다.

## 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```
