// Utilities
import { auth, db } from '@/plugins/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { defineStore } from 'pinia'

import { useAppStore } from '../app'

import router from '@/router'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

const snackbar = useAppStore()

export const useSignupStore = defineStore('signup', {
  state: () => ({
    name: '',
    email: '',
    password: '',
    loading: false
  }),

  actions: {
    signupUser() {
      if (this.name === '' || this.email === '' || this.password === '') {
        snackbar.snackbar = true
        snackbar.snackbarText = 'Please fill in all fields'
        snackbar.snackbarColor = 'error'
      } else {
        this.loading = true
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then(async user => {
            localStorage.getArtizanUserData = JSON.stringify(user.user)

            await setDoc(doc(db, 'users', user.user.uid), {
              name: this.name,
              email: this.email,
              uid: user.user.uid,
              createdAt: serverTimestamp()
            })
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
