// Utilities
import { auth, db } from '@/plugins/firebase'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage"

import { useAppStore } from '../app'
import { signOut } from 'firebase/auth'

import router from '@/router'

const snackbar = useAppStore()

export const useProfileStore = defineStore('profile', {
    state: () => ({
        user: null,
        file: null,
        gender: 'Male',
        stateOfResidence: '',
        LGA: '',
        specialisation: '',
        guarantorName: '',
        guarantorPhone: '',
        loading: false
    }),

    actions: {
        async getProfile() {
            const userData = await JSON.parse(localStorage.getArtizanArtisanData)

            // Get profile from real time from firestore
            const unsub = onSnapshot(doc(db, 'artizans', userData.uid), (doc) => {
                this.user = doc.data()

                this.gender = doc.get('gender')
                this.stateOfResidence = doc.get('stateOfResidence')
                this.LGA = doc.get('LGA')
                this.specialisation = doc.get('specialisation')
                this.guarantorName = doc.get('guarantorName')
                this.guarantorPhone = doc.get('guarantorPhone')
            })
            return unsub
        },

        updateAvatar() {
            if (!this.file) return

            let file = this.file.target.files[0]

            const storage = getStorage()

            let link = `avatars/${this.user.uid}/${file.name}`

            const storageRef = ref(storage, link)

            const uploadTask = uploadBytesResumable(storageRef, file)

            const upload = () => {
                uploadTask.on('state_changed', snapshot => { },
                    error => { },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then(downloadURL => {
                                updateDoc(doc(db, 'artizans', this.user.uid), {
                                    avatar: downloadURL,
                                    avatarLink: uploadTask.snapshot.ref.fullPath
                                })
                            })
                    })
            }


            if (this.user.avatar == undefined || this.user.avatar == null) {
                upload()
            } else {
                const desertRef = ref(storage, this.user.avatarLink)

                // Delete the file
                deleteObject(desertRef)
                    .then(() => {
                        upload()
                    }).catch((error) => {
                        console.log(error)
                        // Uh-oh, an error occurred!
                    });
            }
        },

        async updateProfile() {
            this.loading = true

            const user = await JSON.parse(localStorage.getArtizanArtisanData)

            await updateDoc(doc(db, 'artizans', user.uid),
                {
                    gender: this.gender != undefined ? this.gender : '',
                    stateOfResidence: this.stateOfResidence != undefined ? this.stateOfResidence : '',
                    LGA: this.LGA != undefined ? this.LGA : '',
                    specialisation: this.specialisation != undefined ? this.specialisation : '',
                    guarantorName: this.guarantorName != undefined ? this.guarantorName : '',
                    guarantorPhone: this.guarantorPhone != undefined ? this.guarantorPhone : '',
                })

            this.loading = false

            snackbar.snackbar = true
            snackbar.snackbarText = 'Profile update succesful'
            snackbar.snackbarColor = 'green'
        },

        signoutUser() {
            signOut(auth)
            localStorage.removeItem('getArtizanArtisanData')
            router.push('/')
        }
    }
})
