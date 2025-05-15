/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RIOT_API_KEY: string
  readonly VITE_RIOT_ASIA_API_URL: string
  readonly VITE_RIOT_KR_API_URL: string
  readonly VITE_RIOT_ICON_URL: string
  readonly VITE_DDRAGON_CHAMPION_URL: string
  readonly VITE_DDRAGON_ITEM_URL: string
  readonly VITE_PUBLIC_SUPABASE_URL: string
  readonly VITE_PUBLIC_SUPABASE_ANON_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
