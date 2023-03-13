// Utilities
import { auth, db } from '@/plugins/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { defineStore } from 'pinia'

import { useAppStore } from '../../app'

import router from '@/router'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

const snackbar = useAppStore()

export const useUserSignupStore = defineStore('userSignup', {
  state: () => ({
    name: '',
    email: '',
    phone: '',
    password: '',
    loading: false
  }),

  actions: {
    signupUser() {
      if (this.name === '' || this.email === '' || this.phone == '' || this.password === '') {
        snackbar.snackbar = true
        snackbar.snackbarText = 'Please fill in all fields'
        snackbar.snackbarColor = 'error'
      } else {
        this.loading = true
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then(async user => {
            localStorage.getArtizanArtisanData = JSON.stringify(user.user)

            await setDoc(doc(db, 'user', user.user.uid), {
              name: this.name,
              email: this.email,
              phone: this.phone,
              uid: user.user.uid,
              createdAt: serverTimestamp()
            })
            this.loading = false
            router.push('dashboard/overview')
          })
          .catch((error) => {
            this.loading = false

            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode == 'auth/email-already-in-use') {
              snackbar.snackbar = true
              snackbar.snackbarText = 'Email already in use'
              snackbar.snackbarColor = 'red'
            } else if (errorCode == 'auth/invalid-email') {
              snackbar.snackbar = true
              snackbar.snackbarText = 'Invalid email'
              snackbar.snackbarColor = 'red'
            } else if (errorCode == 'auth/weak-password') {
              snackbar.snackbar = true
              snackbar.snackbarText = 'Weak password'
              snackbar.snackbarColor = 'red'
            } else if (errorCode == 'auth/operation-not-allowed') {
              snackbar.snackbar = true
              snackbar.snackbarText = 'Operation not allowed'
              snackbar.snackbarColor = 'red'
            } else if (errorCode == 'auth/user-disabled') {
              snackbar.snackbar = true
              snackbar.snackbarText = 'User disabled'
              snackbar.snackbarColor = 'red'
            } else if (errorCode == 'auth/user-not-found') {
              snackbar.snackbar = true
              snackbar.snackbarText = 'User not found'
              snackbar.snackbarColor = 'red'
            } else if (errorCode == 'auth/wrong-password') {
              snackbar.snackbar = true
              snackbar.snackbarText = 'Wrong password'
              snackbar.snackbarColor = 'red'
            } else if (errorCode == 'auth/invalid-verification-code') {
              snackbar.snackbar = true
              snackbar.snackbarText = 'Invalid verification code'
              snackbar.snackbarColor = 'red'
            } else if (errorCode == 'auth/invalid-verification-id') {
              snackbar.snackbar = true
              snackbar.snackbarText = 'Invalid verification id'
              snackbar.snackbarColor = 'red'
            }
          });
      }
    }
  }
})
