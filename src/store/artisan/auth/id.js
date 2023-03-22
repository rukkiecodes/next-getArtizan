// Utilities
import { auth, db } from '@/plugins/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { defineStore } from 'pinia'

import { useAppStore } from '../../app'
import { useProfileStore } from '../profile/profile'

import router from '@/router'

import axios from 'axios'
import { doc, updateDoc } from 'firebase/firestore'

const snackbar = useAppStore()
const profile = useProfileStore()

export const useIDStore = defineStore('id', {
    state: () => ({
        otp: '',
        loading: false
    }),

    actions: {
        async verifyOTP() {
            this.loading = true

            await axios.post(process.env.NODE_ENV == 'production' ? 'https://feed.edu-portal.live/auth/verifyOTP' : '/api/auth/verifyOTP', {
                email: profile.user?.email,
                otp: this.otp
            })

            this.loading = false
            snackbar.snackbar = true
            snackbar.snackbarText = 'Account verified successfully'
            snackbar.snackbarColor = 'success'

            await updateDoc(doc(db, 'artisan', profile.user?.uid), {
                tier: 'account verified',
            })
        },

        async resendOTP() {
            this.loading = true

            await axios.post(process.env.NODE_ENV == 'production' ? 'https://feed.edu-portal.live/auth/resendVerification' : '/api/auth/resendVerification', {
                email: profile.user?.email
            })

            this.loading = false
            snackbar.snackbar = true
            snackbar.snackbarText = 'OTP sent successfully'
            snackbar.snackbarColor = 'success'
        }
    }
})
