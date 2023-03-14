// Utilities
import { defineStore } from 'pinia'

import { useAppStore } from '@/store/app'
import { useProfileStore } from '../profile/profile'

import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '@/plugins/firebase'

const snackbar = useAppStore()
const profile = useProfileStore()

export const useArtizanGetBookingStore = defineStore('getArtizanBooking', {
    state: () => ({
        bookings: []
    }),

    actions: {
        async getBookings() {
            const q = query(collection(db, "booking"), orderBy("createdAt", "desc"))


            const unsub = onSnapshot(q, snapshot => {
                this.bookings = []
                snapshot.forEach(doc => {
                    this.bookings.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
            })

            return unsub
        }
    }
})
