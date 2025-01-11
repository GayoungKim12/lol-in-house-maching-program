import { create } from 'zustand'
import { Pair } from '@/shared/types/teamRole'

interface PairsStore {
  pairs: Pair[] | null

  setPairs: (pairs: Pair[]) => void
  resetPairs: () => void
}

const usePairsStore = create<PairsStore>((set) => ({
  pairs: null,

  setPairs: (pairs: Pair[]) => set({ pairs }),
  resetPairs: () => set({ pairs: Array(5).fill(0).map(() => ({ player1: '', player2: '' })) }),
}))

export default usePairsStore