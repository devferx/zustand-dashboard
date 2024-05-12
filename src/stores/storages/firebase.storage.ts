import { createJSONStorage, type StateStorage } from 'zustand/middleware'

const FIREBASE_URL = 'https://hero-img-default-rtdb.firebaseio.com/zustand'

const storageApi: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    const data = await fetch(`${FIREBASE_URL}/${name}.json`).then((res) =>
      res.json(),
    )
    // console.log(data)
    return JSON.stringify(data)
  },

  setItem: async function (name: string, value: string): Promise<void> {
    // const data =
    await fetch(`${FIREBASE_URL}/${name}.json`, {
      method: 'PUT',
      body: value,
    }).then((res) => res.json())

    // console.log(data)
  },
  removeItem: function (name: string): void {
    console.log('removeItem', name)
  },
}

export const firebaseStorage = createJSONStorage(() => storageApi)
