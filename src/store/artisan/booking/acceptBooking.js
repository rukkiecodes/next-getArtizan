// Utilities
import { defineStore } from 'pinia'

import { useAppStore } from '@/store/app'
import { useProfileStore } from '../profile/profile'

import { addDoc, arrayUnion, collection, doc, getDoc, increment, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/plugins/firebase'
import axios from 'axios'

const snackbar = useAppStore()
const profile = useProfileStore()

export const useAcceptArtizanBooking = defineStore('acceptArtizanBooking', {
    state: () => ({
        bookings: []
    }),

    actions: {
        async acceptBooking(booking) {
            const userData = await JSON.parse(localStorage.getItem('getArtizanArtisanData'))

            const customerInfo = await (await getDoc(doc(db, 'user', booking.customer))).data()

            await axios.post(process.env.NODE_ENV == 'production' ? 'https://feed.edu-portal.live/mail/acceptJob' : '/api/mail/acceptJob', {
                email: customerInfo?.email,
                name: profile.user?.name,
                phone: profile.user?.phone,
                specialty: profile.user?.specialisation,
                location: `${profile.user?.LGA}, ${profile.user?.stateOfResidence}`,
            }).then(async () => {
                let artizan = await (await getDoc(doc(db, 'artisan', userData.uid))).data()

                await addDoc(collection(db, 'booking', booking.id, 'artizan'), {
                    ...artizan,
                    acceptedOn: serverTimestamp()
                })

                await updateDoc(doc(db, 'artisan', userData.uid), {
                    acceptedBookings: arrayUnion(booking.id)
                })

                await updateDoc(doc(db, 'booking', booking.id), {
                    status: 'approved',
                    artizanCount: increment(1)
                })

                await addDoc(collection(db, 'user', booking.customer, 'history'), {
                    ...booking,
                    artizan: artizan?.uid,
                    type: 'acceptBooking',
                    createdAt: serverTimestamp()
                })

                await addDoc(collection(db, 'artisan', artizan.uid, 'history'), {
                    ...booking,
                    customer: booking?.customer,
                    type: 'acceptBooking',
                    createdAt: serverTimestamp()
                })

                snackbar.snackbar = true
                snackbar.snackbarText = 'Booking accepted'
                snackbar.snackbarColor = 'success'
            })

        }
    }
})
