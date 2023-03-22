<template>
    <v-sheet height="100%" color="transparent" class="d-flex mb-16"
        :class="jobs.jobs.length <= 0 ? 'd-flex align-center' : ''">
        <v-container :class="jobs.jobs.length <= 0 ? 'd-flex justify-center' : ''">
            <v-row v-if="jobs.jobs.length > 0">
                <v-col v-for="jobs in jobs.jobs" :key="jobs.id" cols="12" sm="4" md="3">
                    <v-card>
                        <v-card-text class="text-center">
                            <v-avatar size="150">
                                <v-img
                                    :src="jobs?.photo != null ? jobs?.photo : 'https://res.cloudinary.com/rukkiecodes/image/upload/v1678145143/takeOff_p3xuej.svg'"
                                    cover />
                            </v-avatar>
                        </v-card-text>
                        <v-card-title>{{ jobs?.title }}</v-card-title>
                        <v-card-text class="d-flex justify-space-between">
                            <v-chip size="small"
                                :color="jobs?.status == 'pending' ? 'amber' : jobs?.status == 'approved' ? 'indigo' : 'green'">
                                <span class="font-weight-bold"
                                    :class="jobs?.status == 'pending' ? 'text-amber-darken-2' : jobs?.status == 'approved' ? 'text-indigo-darken-2' : 'text-green-darken-2'">{{
                                        jobs?.status }}</span>
                            </v-chip>
                            <v-chip size="small"
                                :color="jobs?.status == 'pending' ? 'amber' : jobs?.status == 'approved' ? 'indigo' : 'green'">
                                <v-icon
                                    :color="jobs?.status == 'pending' ? 'amber-darken-2' : jobs?.status == 'approved' ? 'indigo-darken-2' : 'green-darken-2'"
                                    class="mr-1">mdi-hand-coin</v-icon>
                                <span class="font-weight-bold"
                                    :class="jobs?.status == 'pending' ? 'text-amber-darken-2' : jobs?.status == 'approved' ? 'text-indigo-darken-2' : 'text-green-darken-2'">{{
                                        (jobs?.budget).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
                            </v-chip>
                        </v-card-text>
                        <v-card-text class="px-1">
                            <v-list-item density="compact">
                                <v-list-item-subtitle class="text-caption">Category</v-list-item-subtitle>
                                <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{
                                    jobs?.category
                                }}</v-list-item-title>
                            </v-list-item>
                            <v-list-item density="compact">
                                <v-list-item-subtitle class="text-caption">Location</v-list-item-subtitle>
                                <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{
                                    jobs?.location
                                }}</v-list-item-title>
                            </v-list-item>
                            <v-list-item density="compact">
                                <v-list-item-subtitle class="text-caption">Date</v-list-item-subtitle>
                                <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{ jobs?.date
                                }}</v-list-item-title>
                            </v-list-item>
                            <v-list-item density="compact">
                                <v-list-item-subtitle class="text-caption">Time</v-list-item-subtitle>
                                <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{ jobs?.time
                                }}</v-list-item-title>
                            </v-list-item>
                            <v-list-item density="compact">
                                <v-list-item-subtitle class="text-caption">Created on</v-list-item-subtitle>
                                <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{
                                    jobs?.createdAt?.toDate().toDateString()
                                }}</v-list-item-title>
                            </v-list-item>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn @click="() => {
                                profile.user.tier == 'not verified' ? $router.push('/artisanDashboard/profile') : setCurrnetJob(jobs)
                            }" class="bg-indigo-lighten-5 text-body-2 text-indigo-accent-4" block>View
                                Description</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>


            <div v-if="jobs.jobs.length <= 0" class="d-flex flex-column align-center">
                <v-icon color="grey-darken-3" size="100">mdi-dropbox</v-icon>
                <p class="text-grey-darken-3 font-weight-bold">
                    You dont have any jobs yet
                </p>
            </div>
        </v-container>
    </v-sheet>

    <v-dialog v-model="currentJob.dialog" width="1000" scrollable :fullscreen="fullscreen">
        <v-card>
            <v-toolbar density="compact" color="transparent">
                <v-spacer />
                <v-btn @click="currentJob.dialog = false" icon size="small">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text style="max-height: 800px;">
                <v-row>
                    <v-col cols="12" md="8" order="1" order-md="0">
                        <v-card flat>
                            <v-card-text class="text-center">
                                <v-avatar size="150">
                                    <v-img
                                        :src="currentJob?.photo != null ? currentJob?.photo : 'https://res.cloudinary.com/rukkiecodes/image/upload/v1678145143/takeOff_p3xuej.svg'"
                                        cover />
                                    <v-dialog v-model="photoDialog" activator="parent" width="700">
                                        <v-card>
                                            <v-toolbar floating density="compact" color="transparent">
                                                <v-spacer />
                                                <v-btn color="grey-darken-3" @click="photoDialog = false" icon size="small">
                                                    <v-icon>mdi-close</v-icon>
                                                </v-btn>
                                            </v-toolbar>
                                            <v-img :src="currentJob?.photo" cover />
                                        </v-card>
                                    </v-dialog>
                                </v-avatar>
                            </v-card-text>
                            <v-card-title>{{ currentJob?.title }}</v-card-title>
                            <v-card-text class="d-flex justify-space-between">
                                <v-chip
                                    :color="currentJob?.status == 'pending' ? 'amber' : currentJob?.status == 'approved' ? 'indigo' : 'green'">
                                    <span class="font-weight-bold"
                                        :class="currentJob?.status == 'pending' ? 'text-amber-darken-2' : currentJob?.status == 'approved' ? 'text-indigo-darken-2' : 'text-green-darken-2'">{{
                                            currentJob?.status }}</span>
                                </v-chip>
                                <v-chip
                                    :color="currentJob?.status == 'pending' ? 'amber' : currentJob?.status == 'approved' ? 'indigo' : 'green'">
                                    <v-icon
                                        :color="currentJob?.status == 'pending' ? 'amber-darken-2' : currentJob?.status == 'approved' ? 'indigo-darken-2' : 'green-darken-2'"
                                        class="mr-1">mdi-hand-coin</v-icon>
                                    <span class="font-weight-bold"
                                        :class="currentJob?.status == 'pending' ? 'text-amber-darken-2' : currentJob?.status == 'approved' ? 'text-indigo-darken-2' : 'text-green-darken-2'">{{
                                            (currentJob?.budget).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
                                </v-chip>
                            </v-card-text>
                            <v-card-text class="px-1">
                                <v-list-item density="compact">
                                    <v-list-item-subtitle class="text-caption">Category</v-list-item-subtitle>
                                    <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{
                                        currentJob?.category
                                    }}</v-list-item-title>
                                </v-list-item>
                                <v-list-item density="compact">
                                    <v-list-item-subtitle class="text-caption">Location</v-list-item-subtitle>
                                    <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{
                                        currentJob?.location
                                    }}</v-list-item-title>
                                </v-list-item>
                                <v-list-item density="compact">
                                    <v-list-item-subtitle class="text-caption">Date</v-list-item-subtitle>
                                    <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{
                                        currentJob?.date
                                    }}</v-list-item-title>
                                </v-list-item>
                                <v-list-item density="compact">
                                    <v-list-item-subtitle class="text-caption">Time</v-list-item-subtitle>
                                    <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{
                                        currentJob?.time
                                    }}</v-list-item-title>
                                </v-list-item>
                                <v-list-item density="compact">
                                    <v-list-item-subtitle class="text-caption">Created on</v-list-item-subtitle>
                                    <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{
                                        currentJob?.createdAt?.toDate().toDateString()
                                    }}</v-list-item-title>
                                </v-list-item>
                            </v-card-text>

                            <v-card-subtitle class="text-caption">Description</v-card-subtitle>
                            <v-card-text class="text-body-1 text-grey-darken-3">{{ currentJob?.description
                            }}</v-card-text>
                        </v-card>
                    </v-col>
                    <v-divider vertical />
                    <v-col cols="12" md="4">
                        <CurrentUserVue :user="currentJob" />
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn @click="currentJob.dialog = false" class="mr-3">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { useArtizanGetJobsStore } from "@/store/artisan/booking/getJobs";
import CurrentUserVue from "./CurrentUser.vue";
import { useDisplay } from 'vuetify'
import { ref, computed } from 'vue'
import { useProfileStore } from "@/store/artisan/profile/profile";

const jobs = ref(useArtizanGetJobsStore());

const { name } = useDisplay()

const photoDialog = ref(false)

const currentJob = ref({
    dialog: false
})

const profile = ref(useProfileStore());

const setCurrnetJob = (prop) => {
    currentJob.value = {
        dialog: true,
        ...prop
    };
}

const fullscreen = computed(() => {
    switch (name.value) {
        case 'xs': return true
        case 'sm': return false
    }

    return undefined
})
</script>
