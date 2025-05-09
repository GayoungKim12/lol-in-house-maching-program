import { create } from 'zustand'

interface SearchUserStore {
  searchValue: string
  
  setSearchValue: (searchValue: string) => void
}

const useSearchUserStore = create<SearchUserStore>((set) => ({
  searchValue: '',

  setSearchValue: (searchValue) => set({ searchValue }),
}))

export default useSearchUserStore