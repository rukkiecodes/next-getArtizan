// Utilities
import { db } from '@/plugins/firebase'
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore'
import { defineStore } from 'pinia'

export const useStatusStore = defineStore('artizanStatus', {
    state: () => ({
        pending: 0,
        approved: 0,
        completed: 0,
        declined: 0,
    }),

    actions: {
        async getPending() { },

        async getApproved() {
            const userData = await JSON.parse(localStorage.getItem('getArtizanArtisanData'))

            const exsistingJobs = (await getDoc(doc(db, 'artisan', userData.uid))).data()

            this.approved = exsistingJobs.acceptedBookings.length
        },

        async getCompleted() {
            const userData = await JSON.parse(localStorage.getItem('getArtizanArtisanData'))

            const exsistingJobs = (await getDoc(doc(db, 'artisan', userData.uid))).data()

            this.completed = exsistingJobs.completedBookings.length
        },

        async getDeclined() {
            const userData = await JSON.parse(localStorage.getItem('getArtizanArtisanData'))

            const exsistingJobs = (await getDoc(doc(db, 'artisan', userData.uid))).data()

            this.declined = exsistingJobs.declinedBookings.length
        },
    }
})
