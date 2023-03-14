// Utilities
import { db } from '@/plugins/firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { defineStore } from 'pinia'

export const useHistoryStore = defineStore('artizanHistory', {
    state: () => ({
        history: [],
    }),

    actions: {
        async getHistory() {
            const userData = await JSON.parse(localStorage.getItem('getArtizanArtisanData'))

            const unsub = onSnapshot(collection(db, 'artisan', userData.uid, 'history'), (querySnapshot) => {
                this.history = []

                querySnapshot.forEach((doc) => {
                    this.history.push({
                        id: doc.id,
                        ...doc.data(),
                    })
                })
            })

            return unsub
        }
    }
})
