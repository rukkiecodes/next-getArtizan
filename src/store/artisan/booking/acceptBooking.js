// Utilities
import { defineStore } from 'pinia'

import { useAppStore } from '@/store/app'
import { useProfileStore } from '../profile/profile'

import { addDoc, arrayUnion, collection, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/plugins/firebase'

const snackbar = useAppStore()
const profile = useProfileStore()

export const useAcceptArtizanBooking = defineStore('acceptArtizanBooking', {
    state: () => ({
        bookings: []
    }),

    actions: {
        async acceptBooking(booking) {
            const userData = await JSON.parse(localStorage.getItem('getArtizanArtisanData'))

            let artizan = await (await getDoc(doc(db, 'artisan', userData.uid))).data()

            await addDoc(collection(db, 'booking', booking.id, 'artizan'), {
                ...artizan,
                acceptedOn: serverTimestamp()
            })

            updateDoc(doc(db, 'artisan', userData.uid), {
                acceptedBookings: arrayUnion(booking.id)
            })

            await updateDoc(doc(db, 'booking', booking.id), {
                status: 'approved',
            })

            snackbar.snackbar = true
            snackbar.snackbarText = 'Booking accepted'
            snackbar.snackbarColor = 'success'
        }
    }
})
