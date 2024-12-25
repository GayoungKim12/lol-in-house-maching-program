import { create } from 'zustand'
import { Pair } from '@/shared/types/teamRole'

interface PairsStore {
  pairs: Pair[]

  setPairs: (pairs: Pair[]) => void
  resetPairs: () => void
}

const usePairsStore = create<PairsStore>((set) => ({
  pairs: Array(5).fill(0).map(() => ({ player1: '', player2: '' })),

  setPairs: (pairs: Pair[]) => set({ pairs }),
  resetPairs: () => set({ pairs: Array(5).fill(0).map(() => ({ player1: '', player2: '' })) }),
}))

export default usePairsStore