// Utilities
import { defineStore } from 'pinia'

import { useAppStore } from '@/store/app'
import { useProfileStore } from '../profile/profile'

import { addDoc, arrayUnion, collection, doc, getDoc, increment, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/plugins/firebase'

const snackbar = useAppStore()
const profile = useProfileStore()

export const useCompleteArtizanBooking = defineStore('completeArtizanBooking', {
    actions: {
        async completeBooking(booking) {
            const userData = await JSON.parse(localStorage.getItem('getArtizanArtisanData'))

            let artizan = await (await getDoc(doc(db, 'artisan', userData.uid))).data()

            await updateDoc(doc(db, 'booking', booking.id), {
                status: 'completed',
                artizanCount: increment(1)
            })

            await addDoc(collection(db, 'user', booking.customer, 'history'), {
                ...booking,
                artizan: artizan?.id,
                type: 'completeBooking',
                createdAt: serverTimestamp()
            })

            await addDoc(collection(db, 'artisan', artizan.id, 'history'), {
                ...booking,
                customer: booking?.customer,
                type: 'completeBooking',
                createdAt: serverTimestamp()
            })

            snackbar.snackbar = true
            snackbar.snackbarText = 'Task completed'
            snackbar.snackbarColor = 'success'
        }
    }
})
