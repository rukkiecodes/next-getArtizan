// Utilities
import { auth, db } from '@/plugins/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { defineStore } from 'pinia'

import { useAppStore } from '../../app'

import router from '@/router'

const snackbar = useAppStore()

export const useSigninStore = defineStore('signin', {
  state: () => ({
    email: '',
    password: '',
    loading: false
  }),

  actions: {
    signinUser() {
      if (this.email === '' || this.password === '') {
        snackbar.snackbar = true
        snackbar.snackbarText = 'Please fill in all fields'
        snackbar.snackbarColor = 'error'
      } else {
        this.loading = true
        signInWithEmailAndPassword(auth, this.email, this.password)
          .then(async user => {
            localStorage.getArtizanArtisanData = JSON.stringify(user.user)

            this.loading = false
            router.push('artisan/overview')
          })
          .catch((error) => {
            console.log(error)
            this.loading = false
          });
      }
    }
  }
})
