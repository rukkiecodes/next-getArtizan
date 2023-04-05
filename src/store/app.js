// Utilities
import { db } from '@/plugins/firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { defineStore } from 'pinia'

import states from './states'

export const useAppStore = defineStore('app', {
  state: () => ({
    snackbar: false,
    snackbarText: 'jknlkn;lkj;l',
    snackbarColor: 'indigo',
    categories: [],
    location: states
  }),

  actions: {
    getCategories() {
      const unsub = onSnapshot(collection(db, 'categories'), (querySnapshot) => {
        this.categories = []
        querySnapshot.forEach((doc) => {
          this.categories.push(...doc.data().categories)
        })
      })

      return unsub
    },
  }
})
