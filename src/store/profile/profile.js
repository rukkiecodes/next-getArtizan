// Utilities
import { db } from '@/plugins/firebase'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage"

export const useProfileStore = defineStore('profile', {
    state: () => ({
        user: null,
        file: null
    }),

    actions: {
        async getProfile() {
            const userData = await JSON.parse(localStorage.getItem('getArtizanUserData'))

            // Get profile from real time from firestore
            const unsub = onSnapshot(doc(db, 'users', userData.uid), (doc) => {
                this.user = doc.data()
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
                                updateDoc(doc(db, 'users', this.user.uid), {
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
        }
    }
})
