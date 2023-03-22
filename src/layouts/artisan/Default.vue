<template>
  <v-app>
    <AppBar />
    <Drawer />

    <v-main class="bg-indigo-lighten-5">
      <v-container v-if="profile.user?.tier == 'not verified'">
        <v-alert title="Email verification" text="Please verify your email to continue using our services." type="warning"
          variant="tonal">
          <v-btn variant="plain" class="ml-0 ml-sm-2" to="/artisanDashboard/profile">verify Email</v-btn>
        </v-alert>
      </v-container>

      <v-dialog v-model="dialog" width="300" persistent>
        <v-card rounded="xl">
          <v-toolbar density="compact" color="transparent">
            <v-spacer />
            <v-btn @click="resetSpeciality" icon size="small">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-alert type="info" variant="tonal" density="compact" class="mb-4">
              <span class="text-caption">Seems your speciality is not set. Please set your speciality to continue using
                our services.</span>
            </v-alert>
            <v-text-field v-model="speciality" hide-details label="Enter speciality" variant="underlined"
              color="indigo" />
          </v-card-text>

          <v-card-actions>
            <v-btn @click="updateSpeciality" block class="bg-indigo" rounded="xl">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import AppBar from "./AppBar.vue";
import Drawer from "./Drawer.vue";
import { useProfileStore } from "@/store/artisan/profile/profile";
import { useArtizanGetBookingStore } from "@/store/artisan/booking/getBookings";
import { useArtizanGetJobsStore } from "@/store/artisan/booking/getJobs";
import { useHistoryStore } from '@/store/artisan/overview/history'
import { useStatusStore } from '@/store/artisan/overview/status'
import { computed, onMounted, ref } from "vue";
import { arrayUnion, doc, updateDoc } from "@firebase/firestore";
import { useAppStore } from "@/store/app";
import { db } from "@/plugins/firebase";

const profile = useProfileStore();
const booking = useArtizanGetBookingStore();
const job = useArtizanGetJobsStore();
const history = useHistoryStore();
const status = useStatusStore();
const speciality = ref('')
const app = useAppStore();

onMounted(() => {
  profile.getProfile();
  booking.getBookings()
  job.getJobs()
  history.getHistory()
  status.getApproved()
  status.getCompleted()
  status.getDeclined()
  app.getCategories()
  app.getLocation()
});

const updateSpeciality = async () => {
  await updateDoc(doc(db, 'categories', 'fogx4iFkZtIVKXakTmwr'), {
    categories: arrayUnion(speciality.value)
  })
  await updateDoc(doc(db, 'artisan', profile.user?.uid), {
    specialisation: speciality.value
  })
}

const resetSpeciality = async () => {
  await updateDoc(doc(db, 'artisan', profile.user?.uid), {
    specialisation: 'Actor'
  })
}

const dialog = computed(() => {
  switch (profile.user?.specialisation) {
    case 'Not Listed': return true
  }

  return undefined
})
</script>
