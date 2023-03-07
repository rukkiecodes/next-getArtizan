// Utilities
import { defineStore } from 'pinia'

import { useAppStore } from '@/store/app'
import { useProfileStore } from '../profile/profile'

import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import { db } from '@/plugins/firebase'

const snackbar = useAppStore()
const profile = useProfileStore()

export const useGetBookingStore = defineStore('getBooking', {
    state: () => ({
        bookings: []
    }),

    actions: {
        async getBookings() {
            const userData = await JSON.parse(localStorage.getItem('getArtizanArtisanData'))

            const q = query(collection(db, "booking"), where("customer", "==", userData?.uid), orderBy("createdAt", "desc"))


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
