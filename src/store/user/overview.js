// Utilities
import { db } from '@/plugins/firebase'
import { collection, getCountFromServer, query, where } from 'firebase/firestore'
import { defineStore } from 'pinia'

export const useuserOverviewStore = defineStore('userOverview', {
    state: () => ({
        drawer: false,
        pendingCount: 0,
        approvedCount: 0,
        completedCount: 0,
    }),

    actions: {
        async countPendingStates() {
            const userData = await JSON.parse(localStorage.getItem('getArtizanArtisanData'))

            const q = query(collection(db, "booking"), where("customer", "==", userData.uid), where("status", "==", "pending"))

            const snapshot = await getCountFromServer(q)

            this.pendingCount = snapshot.data().count
        },

        async countApprovedStates() {
            const userData = await JSON.parse(localStorage.getItem('getArtizanArtisanData'))

            const q = query(collection(db, "booking"), where("customer", "==", userData.uid), where("status", "==", "approved"))

            const snapshot = await getCountFromServer(q)

            this.approvedCount = snapshot.data().count
        },

        async countCompletedStates() {
            const userData = await JSON.parse(localStorage.getItem('getArtizanArtisanData'))

            const q = query(collection(db, "booking"), where("customer", "==", userData.uid), where("status", "==", "completed"))

            const snapshot = await getCountFromServer(q)

            this.completedCount = snapshot.data().count
        },
    }
})
