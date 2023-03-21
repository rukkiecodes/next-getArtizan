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
import { onMounted } from "vue";

const profile = useProfileStore();
const booking = useArtizanGetBookingStore();
const job = useArtizanGetJobsStore();
const history = useHistoryStore();
const status = useStatusStore();

onMounted(() => {
  profile.getProfile();
  booking.getBookings()
  job.getJobs()
  history.getHistory()
  status.getApproved()
  status.getCompleted()
  status.getDeclined()
});
</script>
