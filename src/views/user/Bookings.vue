<template>
  <v-sheet height="100%" color="transparent" class="d-flex mb-16"
    :class="bookings.bookings.length <= 0 ? 'd-flex align-center' : ''">
    <v-container :class="bookings.bookings.length <= 0 ? 'd-flex justify-center' : ''">
      <v-row v-if="bookings.bookings.length > 0">
        <v-col v-for="booking in bookings.bookings" :key="booking.id" cols="12" sm="4" md="3">
          <v-card>
            <v-card-text class="text-center">
              <v-avatar size="150">
                <v-img
                  :src="booking.photo != null ? booking.photo : 'https://res.cloudinary.com/rukkiecodes/image/upload/v1678145143/takeOff_p3xuej.svg'"
                  cover />
              </v-avatar>
            </v-card-text>
            <v-card-title>{{ booking?.title }}</v-card-title>
            <v-card-text class="d-flex justify-space-between">
              <v-chip
                :color="booking?.status == 'pending' ? 'amber' : booking?.status == 'approved' ? 'indigo' : 'green'">
                <span class="font-weight-bold"
                  :class="booking?.status == 'pending' ? 'text-amber-darken-2' : booking?.status == 'approved' ? 'text-indigo-darken-2' : 'text-green-darken-2'">{{
                    booking?.status }}</span>
              </v-chip>
              <v-chip
                :color="booking?.status == 'pending' ? 'amber' : booking?.status == 'approved' ? 'indigo' : 'green'">
                <v-icon color="amber-darken-2" class="mr-1">mdi-hand-coin</v-icon>
                <span class="font-weight-bold"
                  :class="booking?.status == 'pending' ? 'text-amber-darken-2' : booking?.status == 'approved' ? 'text-indigo-darken-2' : 'text-green-darken-2'">{{
                    booking?.budget }}</span>
              </v-chip>
            </v-card-text>
            <v-card-text class="px-1">
              <v-list-item density="compact">
                <v-list-item-subtitle class="text-caption">Category</v-list-item-subtitle>
                <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{ booking?.category
                }}</v-list-item-title>
              </v-list-item>
              <v-list-item density="compact">
                <v-list-item-subtitle class="text-caption">Location</v-list-item-subtitle>
                <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{ booking?.location
                }}</v-list-item-title>
              </v-list-item>
              <v-list-item density="compact">
                <v-list-item-subtitle class="text-caption">Date</v-list-item-subtitle>
                <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{ booking?.date
                }}</v-list-item-title>
              </v-list-item>
              <v-list-item density="compact">
                <v-list-item-subtitle class="text-caption">Time</v-list-item-subtitle>
                <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{ booking?.time
                }}</v-list-item-title>
              </v-list-item>
              <v-list-item density="compact">
                <v-list-item-subtitle class="text-caption">Time</v-list-item-subtitle>
                <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{ booking?.time
                }}</v-list-item-title>
              </v-list-item>
              <v-list-item density="compact">
                <v-list-item-subtitle class="text-caption">Created on</v-list-item-subtitle>
                <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{
                  booking?.createdAt?.toDate().toDateString()
                }}</v-list-item-title>
              </v-list-item>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="setCurrnetBooking(booking)" class="bg-indigo-lighten-4 text-body-2 text-indigo-accent-4"
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
      <v-card-text>
        {{ currentBooking.body }}
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-btn position="fixed" location="bottom right" class="ma-5 bg-indigo rounded-xl" size="large">
    <v-icon class="mr-3">mdi-plus</v-icon>
    <span class="text-capitalize">Add Booking</span>

    <v-dialog v-model="bookingsStore.dialog" activator="parent" width="420" persistent>
      <v-card>
        <v-toolbar color="transparent" density="compact">
          <v-toolbar-title>Add a new booking</v-toolbar-title>
          <v-spacer />
          <v-btn @click="bookingsStore.dialog = false" icon size="small">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-file-input @change="setPicture" label="Add a Picture (Optional)" density="comfortable" variant="underlined"
            color="indigo" />
          <v-text-field v-model="bookingsStore.title" label="Title" density="comfortable" variant="underlined"
            color="indigo" />
          <v-text-field v-model="bookingsStore.date" label="Date" density="comfortable" variant="underlined"
            color="indigo" type="date" />
          <v-text-field v-model="bookingsStore.time" label="Time" density="comfortable" variant="underlined"
            color="indigo" type="time" />
          <v-text-field v-model="bookingsStore.location" label="Location" density="comfortable" variant="underlined"
            color="indigo" />
          <v-text-field v-model="bookingsStore.budget" label="Budget" density="comfortable" variant="underlined"
            color="indigo" />
          <v-select v-model="bookingsStore.category" :items="app.categories" label="Category" density="comfortable"
            variant="underlined" color="indigo" />
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
import { useAppStore } from "@/store/app";
import { ref } from "vue";

const bookings = ref(useGetBookingStore());
const bookingsStore = ref(useAddBookingStore());
const app = ref(useAppStore());

const currentBooking = ref({
  dialog: false,
  body: ``
})

const setCurrnetBooking = (prop) => {
  currentBooking.value.dialog = true;
  currentBooking.value.body = prop.description;
}

const setPicture = (e) => {
  bookingsStore.value.photo = e;
};
</script>
