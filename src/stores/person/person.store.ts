import { create, type StateCreator } from 'zustand'
import {
  createJSONStorage,
  persist,
  type StateStorage,
} from 'zustand/middleware'

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

const sessionStorage: StateStorage = {
  getItem: function (name: string): string | Promise<string | null> | null {
    console.log('getItem', name)

    return null
  },
  setItem: function (name: string, value: string): void {
    console.log('setItem', { name, value })
  },
  removeItem: function (name: string): void {
    console.log('removeItem', name)
  },
}

export const usePersonStore = create<PersonState & Actions>()(
  persist(storeApi, {
    name: 'person-store',
    storage: createJSONStorage(() => sessionStorage),
  }),
)
