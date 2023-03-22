<template>
  <v-btn @click="search.searchForArtizan">Click</v-btn>
  <v-sheet height="100%" color="transparent" class="d-flex mb-16"
    :class="bookings.bookings.length <= 0 ? 'd-flex align-center' : ''">
    <v-container :class="bookings.bookings.length <= 0 ? 'd-flex justify-center' : ''">
      <v-row v-if="bookings.bookings.length > 0">
        <v-col v-for="booking in bookings.bookings" :key="booking.id" cols="12" sm="4" md="3">
          <v-card>
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
                :color="booking?.status == 'pending' ? 'amber' : booking?.status == 'approved' ? 'indigo' : 'green'">
                <span class="font-weight-bold"
                  :class="booking?.status == 'pending' ? 'text-amber-darken-2' : booking?.status == 'approved' ? 'text-indigo-darken-2' : 'text-green-darken-2'">{{
                    booking?.status }}</span>
              </v-chip>
              <v-chip size="small"
                :color="booking?.status == 'pending' ? 'amber' : booking?.status == 'approved' ? 'indigo' : 'green'">
                <v-icon
                  :color="booking?.status == 'pending' ? 'amber-darken-2' : booking?.status == 'approved' ? 'indigo-darken-2' : 'green-darken-2'"
                  class="mr-1">mdi-hand-coin</v-icon>
                <span class="font-weight-bold"
                  :class="booking?.status == 'pending' ? 'text-amber-darken-2' : booking?.status == 'approved' ? 'text-indigo-darken-2' : 'text-green-darken-2'">{{
                    (booking?.budget).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
              </v-chip>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="setCurrnetBooking(booking)" class="bg-indigo-lighten-5 text-body-2 text-indigo-accent-4"
                block>View Description</v-btn>
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
  <v-dialog v-model="currentBooking.dialog" width="400">
    <v-card>
      <v-toolbar density="compact" color="transparent">
        <v-spacer />
        <v-btn @click="currentBooking.dialog = false" icon size="small">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card>
        <v-card-text class="text-center">
          <v-avatar size="150">
            <v-img
              :src="currentBooking?.photo != null ? currentBooking?.photo : 'https://res.cloudinary.com/rukkiecodes/image/upload/v1678145143/takeOff_p3xuej.svg'"
              cover />
          </v-avatar>
        </v-card-text>
        <v-card-title>{{ currentBooking?.title }}</v-card-title>
        <v-card-text class="d-flex justify-space-between">
          <v-chip
            :color="currentBooking?.status == 'pending' ? 'amber' : currentBooking?.status == 'approved' ? 'indigo' : 'green'">
            <span class="font-weight-bold"
              :class="currentBooking?.status == 'pending' ? 'text-amber-darken-2' : currentBooking?.status == 'approved' ? 'text-indigo-darken-2' : 'text-green-darken-2'">{{
                currentBooking?.status }}</span>
          </v-chip>
          <v-chip
            :color="currentBooking?.status == 'pending' ? 'amber' : currentBooking?.status == 'approved' ? 'indigo' : 'green'">
            <v-icon
              :color="currentBooking?.status == 'pending' ? 'amber-darken-2' : currentBooking?.status == 'approved' ? 'indigo-darken-2' : 'green-darken-2'"
              class="mr-1">mdi-hand-coin</v-icon>
            <span class="font-weight-bold"
              :class="currentBooking?.status == 'pending' ? 'text-amber-darken-2' : currentBooking?.status == 'approved' ? 'text-indigo-darken-2' : 'text-green-darken-2'">{{
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
        <v-card-text class="text-body-1">
          {{ currentBooking.description }}
        </v-card-text>
      </v-card>
    </v-card>
  </v-dialog>

  <v-btn position="fixed" location="bottom right" class="ma-5 bg-indigo rounded-xl" size="large">
    <v-icon class="mr-3">mdi-plus</v-icon>
    <span class="text-capitalize">Add Booking</span>

    <v-dialog v-model="bookingsStore.dialog" activator="parent" width="500" persistent scrollable>
      <v-card>
        <v-toolbar color="transparent" density="compact">
          <v-toolbar-title>Add a new booking</v-toolbar-title>
          <v-spacer />
          <v-btn @click="bookingsStore.dialog = false" icon size="small">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text style="max-height: 800px;">
          <v-file-input @change="setPicture" label="Add a Picture (Optional)" density="comfortable" variant="underlined"
            color="indigo" />

          <v-text-field v-model="bookingsStore.title" label="Title" density="comfortable" variant="underlined"
            color="indigo" />

          <v-text-field v-model="bookingsStore.date" label="Date" density="comfortable" variant="underlined"
            color="indigo" type="date" />

          <v-text-field v-model="bookingsStore.time" label="Time" density="comfortable" variant="underlined"
            color="indigo" type="time" />

          <v-select v-model="bookingsStore.location" :items="app.location" label="Location" density="comfortable"
            variant="underlined" color="indigo" />
          <v-select v-model="search.specialisation" :items="app.categories" label="Category" density="comfortable"
            variant="underlined" color="indigo" />

          <v-text-field v-model="bookingsStore.budget" label="Budget" density="comfortable" variant="underlined"
            color="indigo" />

          <v-text-field v-model="bookingsStore.jobAddress" label="Job Address" density="comfortable" variant="underlined"
            color="indigo" />

          <v-textarea v-model="bookingsStore.description" label="Description" density="comfortable" variant="underlined"
            color="indigo" rows="1" auto-grow />
        </v-card-text>
        <v-card-actions>
          <v-btn @click="bookingsStore.addBooking" :loading="bookingsStore.loading" class="bg-indigo" block>Add
            booking</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script setup>
import { useGetBookingStore } from "@/store/user/booking/getBookings";
import { useAddBookingStore } from "@/store/user/booking/addBooking";
import { useArtizansStore } from "@/store/user/artizans";
import { useAppStore } from "@/store/app";
import { ref } from "vue";

const bookings = ref(useGetBookingStore());
const bookingsStore = ref(useAddBookingStore());
const app = ref(useAppStore());
const search = ref(useArtizansStore());

const currentBooking = ref({
  dialog: false,
})

const setCurrnetBooking = (prop) => {
  currentBooking.value = {
    dialog: true,
    ...prop
  }
  // currentBooking.value.dialog = true;
  // currentBooking.value.body = prop.description;
}

const setPicture = (e) => {
  bookingsStore.value.photo = e;
};
</script>
