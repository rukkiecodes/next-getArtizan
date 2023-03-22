<template>
  <v-sheet height="100%" color="transparent" class="d-flex mb-16"
    :class="bookings.bookings.length <= 0 ? 'd-flex align-center' : ''">
    <v-container :class="bookings.bookings.length <= 0 ? 'd-flex justify-center' : ''">
      <v-row v-if="bookings.bookings.length > 0">
        <v-col cols="12">
          <v-btn @click="bookings.getBookings" class="bg-indigo rounded-pill text-capitalize" flat>
            <v-icon class="mr-2">mdi-reload</v-icon>
            Refresh List
          </v-btn>
        </v-col>
        <v-col v-for="booking in bookings.bookings" :key="booking.id" cols="12" sm="4" md="3">
          <v-card rounded="xl">
            <v-card-text class="text-center">
              <v-avatar size="150">
                <v-img
                  :src="booking?.photo != null ? booking?.photo : 'https://res.cloudinary.com/rukkiecodes/image/upload/v1678145143/takeOff_p3xuej.svg'"
                  cover />
              </v-avatar>
            </v-card-text>
            <v-card-title>{{ booking?.title }}</v-card-title>
            <v-card-text class="d-flex justify-space-between">
              <v-chip size="small"
                :color="booking?.status == 'pending' ? 'amber' : booking?.status == 'approved' ? 'indigo' : booking?.status == 'declined' ? 'red' : ''">
                <span class="font-weight-bold"
                  :class="booking?.status == 'pending' ? 'text-amber-darken-2' : booking?.status == 'approved' ? 'text-indigo-darken-2' : booking?.status == 'declined' ? 'text-red-darken-2' : ''">{{
                    booking?.status }}</span>
              </v-chip>
              <v-chip size="small"
                :color="booking?.status == 'pending' ? 'amber' : booking?.status == 'approved' ? 'indigo' : booking?.status == 'declined' ? 'red' : ''">
                <v-icon
                  :color="booking?.status == 'pending' ? 'amber-darken-2' : booking?.status == 'approved' ? 'indigo-darken-2' : booking?.status == 'declined' ? 'red-darken-2' : ''"
                  class="mr-1">mdi-hand-coin</v-icon>
                <span class="font-weight-bold"
                  :class="booking?.status == 'pending' ? 'text-amber-darken-2' : booking?.status == 'approved' ? 'text-indigo-darken-2' : booking?.status == 'declined' ? 'text-red-darken-2' : ''">{{
                    (booking?.budget).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
              </v-chip>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="() => {
                profile.user.tier == 'not verified' ? $router.push('/artisanDashboard/profile') : setCurrnetBooking(booking)
              }" class="bg-indigo-lighten-5 text-body-2 text-indigo-accent-4" block rounded="xl">View details</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>


      <div v-if="bookings.bookings.length <= 0" class="d-flex flex-column align-center">
        <v-icon color="grey-darken-3" size="100">mdi-dropbox</v-icon>
        <p class="text-grey-darken-3 font-weight-bold">
          You dont have any bookings yet
        </p>
      </div>
    </v-container>
  </v-sheet>

  <!-- for active booking description -->
  <v-dialog v-model="currentBooking.dialog" width="1000" scrollable :fullscreen="fullscreen">
    <v-card rounded="xl">
      <v-toolbar density="compact" color="transparent">
        <v-spacer />
        <v-btn @click="currentBooking.dialog = false" icon size="small">
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
                    :src="currentBooking?.photo != null ? currentBooking?.photo : 'https://res.cloudinary.com/rukkiecodes/image/upload/v1678145143/takeOff_p3xuej.svg'"
                    cover />
                  <v-dialog v-model="photoDialog" activator="parent" width="700">
                    <v-card>
                      <v-toolbar floating density="compact" color="transparent">
                        <v-spacer />
                        <v-btn color="grey-darken-3" @click="photoDialog = false" icon size="small">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </v-toolbar>
                      <v-img :src="currentBooking?.photo" cover />
                    </v-card>
                  </v-dialog>
                </v-avatar>
              </v-card-text>
              <v-card-title>{{ currentBooking?.title }}</v-card-title>
              <v-card-text class="d-flex justify-space-between">
                <v-chip size="small"
                  :color="currentBooking?.status == 'pending' ? 'amber' : currentBooking?.status == 'approved' ? 'indigo' : currentBooking?.status == 'declined' ? 'red' : ''">
                  <span class="font-weight-bold"
                    :class="currentBooking?.status == 'pending' ? 'text-amber-darken-2' : currentBooking?.status == 'approved' ? 'text-indigo-darken-2' : currentBooking?.status == 'declined' ? 'text-red-darken-2' : ''">{{
                      currentBooking?.status }}</span>
                </v-chip>
                <v-chip size="small"
                  :color="currentBooking?.status == 'pending' ? 'amber' : currentBooking?.status == 'approved' ? 'indigo' : currentBooking?.status == 'declined' ? 'red' : ''">
                  <v-icon
                    :color="currentBooking?.status == 'pending' ? 'amber-darken-2' : currentBooking?.status == 'approved' ? 'indigo-darken-2' : currentBooking?.status == 'declined' ? 'red-darken-2' : ''"
                    class="mr-1">mdi-hand-coin</v-icon>
                  <span class="font-weight-bold"
                    :class="currentBooking?.status == 'pending' ? 'text-amber-darken-2' : currentBooking?.status == 'approved' ? 'text-indigo-darken-2' : currentBooking?.status == 'declined' ? 'text-red-darken-2' : ''">{{
                      (currentBooking?.budget).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
                </v-chip>
              </v-card-text>
              <v-card-text class="px-1">
                <v-list-item density="compact">
                  <v-list-item-subtitle class="text-caption">Category</v-list-item-subtitle>
                  <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{ currentBooking?.category
                  }}</v-list-item-title>
                </v-list-item>
                <v-list-item density="compact">
                  <v-list-item-subtitle class="text-caption">Location</v-list-item-subtitle>
                  <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{ currentBooking?.location
                  }}</v-list-item-title>
                </v-list-item>
                <v-list-item density="compact">
                  <v-list-item-subtitle class="text-caption">Date</v-list-item-subtitle>
                  <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{ currentBooking?.date
                  }}</v-list-item-title>
                </v-list-item>
                <v-list-item density="compact">
                  <v-list-item-subtitle class="text-caption">Time</v-list-item-subtitle>
                  <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{ currentBooking?.time
                  }}</v-list-item-title>
                </v-list-item>
                <v-list-item density="compact">
                  <v-list-item-subtitle class="text-caption">Created on</v-list-item-subtitle>
                  <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{
                    currentBooking?.createdAt?.toDate().toDateString()
                  }}</v-list-item-title>
                </v-list-item>
              </v-card-text>

              <v-card-subtitle class="text-caption">Description</v-card-subtitle>
              <v-card-text class="text-body-1 text-grey-darken-3">{{ currentBooking?.description }}</v-card-text>
            </v-card>
          </v-col>
          <v-divider vertical />
          <v-col cols="12" md="4">
            <CurrentUserVue :user="currentBooking" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="() => {
          currentBooking.dialog = false
          acceptBooking.declineBooking(currentBooking)
        }" class="mr-3 px-5" rounded="xl">Decline</v-btn>

        <v-btn :disabled="profile.user?.acceptedBookings?.includes(currentBooking.id)" @click="() => {
          currentBooking.dialog = false
          acceptBooking.acceptBooking(currentBooking)
        }" class="bg-indigo px-5" rounded="xl">Accept</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { useArtizanGetBookingStore } from "@/store/artisan/booking/getBookings";
import { useAcceptArtizanBooking } from "@/store/artisan/booking/acceptBooking";
import { useProfileStore } from '@/store/artisan/profile/profile'
import { ref, computed } from "vue";
import { useDisplay } from 'vuetify'

import CurrentUserVue from "./CurrentUser.vue";

const bookings = ref(useArtizanGetBookingStore());
const acceptBooking = ref(useAcceptArtizanBooking());
const profile = ref(useProfileStore());

const { name } = useDisplay()

const photoDialog = ref(false)

const currentBooking = ref({
  dialog: false
})

const setCurrnetBooking = (prop) => {
  currentBooking.value = {
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
