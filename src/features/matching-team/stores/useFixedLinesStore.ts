import { create } from 'zustand/index'
import { RoleEnum } from '@/shared/types/teamRole'

interface FixedLinesStore {
  fixedLines: RoleEnum[]

  setFixedLines: (fixedLines: RoleEnum[]) => void
}

const useFixedLinesStore = create<FixedLinesStore>((set) => ({
  fixedLines: [],

  setFixedLines: (fixedLines) => set({ fixedLines }),
}))

export default useFixedLinesStore