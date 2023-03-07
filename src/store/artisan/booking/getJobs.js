// Utilities
import { defineStore } from 'pinia'

import { useAppStore } from '@/store/app'
import { useProfileStore } from '../profile/profile'

import { collection, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '@/plugins/firebase'

const snackbar = useAppStore()
const profile = useProfileStore()

export const useArtizanGetJobsStore = defineStore('getArtizanJobs', {
    state: () => ({
        jobs: []
    }),

    actions: {
        async getJobs() {
            const userData = await JSON.parse(localStorage.getItem('getArtizanArtisanData'))

            const exsistingJobs = (await getDoc(doc(db, 'artisan', userData.uid))).data().acceptedBookings

            exsistingJobs.forEach(data => {
                getDoc(doc(db, 'booking', data)).then((doc) => {
                    this.jobs.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
            })
        }
    }
})
