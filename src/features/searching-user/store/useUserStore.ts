import { create } from 'zustand'
import { RiotAccount } from '@/features/searching-user/utils/apiGetRiotAccount'

interface UserStore extends RiotAccount {
  setUser: (user: RiotAccount) => void
}

const useUserStore = create<UserStore>((set) => ({
  puuid: '',
  gameName: '',
  tagLine: '',

  setUser: (user) => set({ ...user }),
}))

export default useUserStore