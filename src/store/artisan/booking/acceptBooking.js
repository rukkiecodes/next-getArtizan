// Utilities
import { defineStore } from 'pinia'

import { useAppStore } from '@/store/app'
import { useProfileStore } from '../profile/profile'

import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
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

            await setDoc(doc(db, 'booking', booking.id, 'accepted', userData.uid), {
                ...artizan,
            })

            await updateDoc(doc(db, 'artisan', userData.uid), {
                acceptedBookings: arrayUnion(booking.id)
            })

            await updateDoc(doc(db, 'booking', booking.id), {
                status: 'approved'
            })

            await addDoc(collection(db, 'user', booking.customer, 'history'), {
                ...booking,
                artizan: artizan?.uid,
                type: 'accept booking',
                createdAt: serverTimestamp()
            })

            await addDoc(collection(db, 'artisan', artizan.uid, 'history'), {
                ...booking,
                customer: booking?.customer,
                type: 'accept booking',
                createdAt: serverTimestamp()
            })

            snackbar.snackbar = true
            snackbar.snackbarText = 'Booking accepted'
            snackbar.snackbarColor = 'success'
        },

        async declineBooking(booking) {
            const userData = await JSON.parse(localStorage.getItem('getArtizanArtisanData'))

            let artizan = await (await getDoc(doc(db, 'artisan', userData.uid))).data()

            await deleteDoc(doc(db, 'booking', booking.id, 'accepted', userData.uid))

            await setDoc(doc(db, 'booking', booking.id, 'declined', userData.uid), {
                ...artizan,
            })

            await updateDoc(doc(db, 'artisan', userData.uid), {
                acceptedBookings: arrayRemove(booking.id)
            })

            await updateDoc(doc(db, 'artisan', userData.uid), {
                declinedBookings: arrayUnion(booking.id)
            })

            await updateDoc(doc(db, 'booking', booking.id), {
                status: 'declined'
            })

            await addDoc(collection(db, 'user', booking.customer, 'history'), {
                ...booking,
                artizan: artizan?.uid,
                type: 'decline booking',
                createdAt: serverTimestamp()
            })

            await addDoc(collection(db, 'artisan', artizan.uid, 'history'), {
                ...booking,
                customer: booking?.customer,
                type: 'decline booking',
                createdAt: serverTimestamp()
            })

            snackbar.snackbar = true
            snackbar.snackbarText = 'Booking declined'
            snackbar.snackbarColor = 'success'
        }
    }
})
