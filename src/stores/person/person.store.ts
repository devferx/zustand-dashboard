import { create, type StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { useWeddingBoundStore } from '../wedding'
// import { customSessionStorage } from '../storages/session-storage.storage'
// import { firebaseStorage } from '../storages/firebase.storage'
// import { logger } from '../middlewares/logger.middleware'

interface PersonState {
  firstName: string
  lastName: string
}

interface Actions {
  setFirstName: (value: string) => void
  setLastName: (value: string) => void
}

const storeApi: StateCreator<
  PersonState & Actions,
  [['zustand/devtools', never]]
> = (set) => ({
  firstName: '',
  lastName: '',

  setFirstName: (value) => set({ firstName: value }, false, 'setFirstName'),
  setLastName: (value) => set({ lastName: value }, false, 'setLastName'),
})

export const usePersonStore = create<PersonState & Actions>()(
  devtools(
    persist(storeApi, {
      name: 'person-store',
      // storage: firebaseStorage,
      // storage: customSessionStorage,
    }),
  ),
)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
usePersonStore.subscribe((nextState, _prevState) => {
  const { firstName, lastName } = nextState

  useWeddingBoundStore.getState().setFirstName(firstName)
  useWeddingBoundStore.getState().setLastName(lastName)
})
