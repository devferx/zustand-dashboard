import { create, StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

interface PersonState {
  firstName: string
  lastName: string
}

interface Actions {
  setFirstName: (value: string) => void
  setLastName: (value: string) => void
}

const storeApi: StateCreator<PersonState & Actions> = (set) => ({
  firstName: '',
  lastName: '',

  setFirstName: (value) => set({ firstName: value }),
  setLastName: (value) => set({ lastName: value }),
})

export const usePersonStore = create<PersonState & Actions>()(
  persist(storeApi, { name: 'person-store' }),
)
