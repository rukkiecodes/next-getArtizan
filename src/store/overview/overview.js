import { defineStore } from 'pinia'

export const useArtizanOverviewStore = defineStore('artizanOverview', {
    state: () => ({
        drawer: false,
    }),
})
