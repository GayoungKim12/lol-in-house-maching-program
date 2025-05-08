/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RIOT_API_KEY: string;
  readonly VITE_RIOT_ASIA_API_URL: string;
  readonly VITE_RIOT_KR_API_URL: string;
  readonly VITE_RIOT_PROFILE_ICON_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
