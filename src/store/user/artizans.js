// Utilities
import { db } from '@/plugins/firebase'
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { defineStore } from 'pinia'

export const useArtizansStore = defineStore('userArtizans', {
    state: () => ({
        artizans: [],
        searchReult: [],
        specialisation: 'Actor',
        LGA: '',
        state: '',
        loading: false
    }),

    actions: {
        async getArtizans() {
            const unsub = onSnapshot(collection(db, 'artisan'),
                snapshot => {
                    this.artizans = []
                    snapshot.forEach(doc => {
                        this.artizans.push({ id: doc.id, ...doc.data() })
                    })
                })

            return unsub
        },

        async searchForArtizan() {
            const querySnapshot = await getDocs(collection(db, "artisan"));
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });


            // getDocs(collection(db, 'artisan'), snapshot => {
            //     console.log(snapshot)
            //     // snapshot.forEach(doc => {
            //     //     console.log(doc.data())
            //     // })
            // })
            // // this.loading = true
            // getDocs(query(collection(db, 'artisan'), where('specialisation', '==', this.specialisation)),
            //     snapshot => {
            //         console.log(snapshot)
            //         // this.searchReult = []
            //         // snapshot.forEach(doc => {
            //         //     console.log(doc.data())
            //         // })
            //     })

            // console.log('searching')

            // // this.loading = false
        }
    }
})
