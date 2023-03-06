// Utilities
import { defineStore } from 'pinia'

import { useAppStore } from '@/store/app'
import { useProfileStore } from '../profile/profile'

import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/plugins/firebase'

const snackbar = useAppStore()
const profile = useProfileStore()

export const useAddBookingStore = defineStore('addBooking', {
    state: () => ({
        loading: false,
        dialog: false,
        title: 'Title',
        description: 'A short description',
        date: '',
        time: '',
        location: 'Location',
        budget: 12000,
        category: 'Actor',
        jobAddress: 'jobAddress',
        photo: null
    }),

    actions: {
        async addBooking() {
            if (this.title == '' || this.description == '' || this.date == '' || this.time == '' || this.location == '' || this.budget == '' || this.category == '' || this.jobAddress == '') {
                snackbar.snackbar = true
                snackbar.snackbarText = 'All fields are required'
                snackbar.snackbarColor = 'error'
            } else {
                this.loading = true

                await addDoc(collection(db, 'booking'), {
                    title: this.title,
                    description: this.description,
                    date: this.date,
                    time: this.time,
                    location: this.location,
                    budget: this.budget,
                    category: this.category,
                    jobAddress: this.jobAddress,
                    photo: this.photo,
                    customer: profile.user.uid,
                    status: 'pending',
                    createdAt: serverTimestamp()
                })

                snackbar.snackbar = true
                snackbar.snackbarText = 'Booking added successfull'
                snackbar.snackbarColor = 'green'

                this.loading = false
                this.dialog = false
            }
        }
    }
})
