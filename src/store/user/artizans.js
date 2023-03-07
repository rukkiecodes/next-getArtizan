// Utilities
import { db } from '@/plugins/firebase'
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { defineStore } from 'pinia'

export const useArtizansStore = defineStore('userArtizans', {
    state: () => ({
        artizans: [],
        location: '',
        specialisation: '',
        loading: false
    }),

    actions: {
        async getArtizans() {
            const unsub = onSnapshot(collection(db, 'artisan'),
                snapshot => {
                    this.artizans = []
                    snapshot.forEach(doc => {
                        this.artizans.push({ id: doc.id, ...doc.data() })
                    })
                })

            return unsub
        },

        async searchForArtizan() {
            this.loading = true
            await getDocs(query(collection(db, 'artisan'), where('specialisation', '==', this.specialisation), where('location', '==', this.location)),
                snapshot => {
                    this.artizans = []
                    snapshot.forEach(doc => {
                        console.log(doc.data())
                        // this.artizans.push({ id: doc.id, ...doc.data() })
                    })
                })

            this.loading = false
        }
    }
})
