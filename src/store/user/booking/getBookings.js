// Utilities
import { defineStore } from 'pinia'

import { useAppStore } from '@/store/app'
import { useProfileStore } from '../profile/profile'

import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/plugins/firebase'

const snackbar = useAppStore()
const profile = useProfileStore()

export const useGetBookingStore = defineStore('getBooking', {
    state: () => ({
        bookings: []
    }),

    actions: {
        async getBookings() {

        }
    }
})
