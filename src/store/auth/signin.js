// Utilities
import { auth, db } from '@/plugins/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { defineStore } from 'pinia'

import { useAppStore } from '../app'

import router from '@/router'
import axios from 'axios'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'

const snackbar = useAppStore()

export const useSigninStore = defineStore('signin', {
  state: () => ({
    email: '',
    password: '',
    loading: false
  }),

  actions: {
    async signinUser() {
      if (this.email === '' || this.password === '') {
        snackbar.snackbar = true
        snackbar.snackbarText = 'Please fill in all fields'
        snackbar.snackbarColor = 'error'
      } else {
        this.loading = true

        const signin = () => {
          signInWithEmailAndPassword(auth, this.email, this.password)
            .then(async user => {
              localStorage.getArtizanArtisanData = JSON.stringify(user.user)

              this.loading = false
              router.push('/dashboard/overview')
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

        // const user = await query(collection(doc(db, 'artizans'), where('email', '==', this.email)))
        const q = query(collection(db, 'artizans'), where('email', '==', this.email))

        const querySnapshot = await getDocs(q)

        querySnapshot.forEach(async doc => {
          let user = doc.data()

          if (user?.tier == 'account verified') {
            signin()
          }
          else {
            await axios.post(process.env.NODE_ENV == 'production' ? 'https://web-production-563e.up.railway.app/auth/signin' : '/api/auth/signin', {
              email: this.email,
              password: this.password
            }).then((res) => {
              localStorage.getArtizanArtisanPsudoData = JSON.stringify(res.data.user)

              // signin user
              signin()
            }).catch(error => {
              snackbar.snackbar = true
              snackbar.snackbarText = 'Error signing in'
              snackbar.snackbarColor = 'red'
            })
          }
        });
      }
    }
  }
})
