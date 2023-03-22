// Utilities
import { db } from '@/plugins/firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    snackbar: false,
    snackbarText: 'jknlkn;lkj;l',
    snackbarColor: 'indigo',
    categories: [],
    location: []
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

    getLocation() {
      const unsub = onSnapshot(collection(db, 'location'), (querySnapshot) => {
        this.location = []
        querySnapshot.forEach((doc) => {
          this.location.push(...doc.data().categories)
        })
      })

      return unsub
    }
  }
})
