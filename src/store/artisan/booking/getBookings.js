// Utilities
import { defineStore } from 'pinia'

import { useAppStore } from '@/store/app'
import { useProfileStore } from '../profile/profile'

import { collection, doc, getDoc, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '@/plugins/firebase'

const snackbar = useAppStore()
const profile = useProfileStore()

export const useArtizanGetBookingStore = defineStore('getArtizanBooking', {
    state: () => ({
        bookings: []
    }),

    actions: {
        async getBookings() {
            const userData = await JSON.parse(localStorage.getItem('getArtizanArtisanData'))

            let profile = await (await getDoc(doc(db, 'artisan', userData.uid))).data()

            const q = query(collection(db, "booking"), orderBy("createdAt", "desc"), where('category', '==', profile.specialisation))


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
