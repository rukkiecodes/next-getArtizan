<template>
  <v-app>
    <AppBar />
    <Drawer />

    <v-main class="bg-indigo-lighten-5">
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
