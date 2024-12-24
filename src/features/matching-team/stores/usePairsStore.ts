import { create } from 'zustand'
import { Pair } from '@/shared/types/teamRole'

interface PairsStore {
  pairs: Pair[]

  setPairs: (pairs: Pair[]) => void
}

const usePairsStore = create<PairsStore>((set) => ({
  pairs: Array(5).fill(0).map(() => ({ player1: '', player2: '' })),

  setPairs: (pairs: Pair[]) => set({ pairs }),
}))

export default usePairsStore