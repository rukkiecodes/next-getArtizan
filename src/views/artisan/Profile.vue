<template>
  <v-container>
    <v-card v-if="profile.user?.tier != 'not verified'" flat color="transparent" width="400" max-width="100%"
      class="mx-auto">
      <v-card-text class="text-center">
        <v-avatar color="indigo" size="80">
          <v-img v-if="profile.user?.avatar" :src="profile.user?.avatar" cover />
          <v-icon v-else size="30">mdi-account</v-icon>
        </v-avatar>
      </v-card-text>

      <v-card-text class="d-flex justify-center">
        <Tier />
      </v-card-text>

      <v-card-text class="text-center">
        <v-card-title class="text-h5 text-grey-darken-4">
          {{ profile.user?.name }}
        </v-card-title>
        <v-card-subtitle class="text-body-2 text-grey-darken-4">
          {{ profile.user?.email }}
        </v-card-subtitle>
      </v-card-text>
      <v-card-text class="text-center">
        <v-card-subtitle class="px-0 text-caption">Gender</v-card-subtitle>
        {{ profile.user?.gender }}
      </v-card-text>
      <v-card-text class="text-center">
        <v-card-subtitle class="px-0 text-caption">State Of Residence</v-card-subtitle>
        {{ profile.user?.stateOfResidence }}
      </v-card-text>
      <v-card-text class="text-center">
        <v-card-subtitle class="px-0 text-caption">Local Government Area</v-card-subtitle>
        {{ profile.user?.LGA }}
      </v-card-text>
      <v-card-text class="text-center">
        <v-card-subtitle class="px-0 text-caption">Area of specialisation</v-card-subtitle>
        {{ profile.user?.specialisation }}
      </v-card-text>
      <v-card-text class="text-center">
        <v-card-subtitle class="px-0 text-caption">Guarantor Name</v-card-subtitle>
        {{ profile.user?.guarantorName }}
      </v-card-text>
      <v-card-text class="text-center">
        <v-card-subtitle class="px-0 text-caption">Guarantor Phone</v-card-subtitle>
        {{ profile.user?.guarantorPhone }}
      </v-card-text>

      <v-card-actions>
        <v-btn block @click="drawer = true" class="ma-4 text-caption rounded-lg bg-indigo mx-auto hidden-lg-and-up">
          Edit Profile
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card v-if="profile.user?.tier == 'not verified'" flat color="white" width="400" max-width="100%"
      class="mx-auto mt-16">
      <v-card-text class="pb-0">
        <v-text-field v-model="otp.otp" label="Enter OTP" variant="outlined" />
      </v-card-text>
      <v-card-text class="d-flex justify-end pt-0">
        <v-btn @click="otp.resendOTP" flat size="x-small" class="font-weight-bold">Did't get an email? Resend Now</v-btn>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="otp.verifyOTP" :loading="otp.loading" block class="bg-indigo" size="large">verify account</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>

  <v-navigation-drawer v-model="drawer" v-if="profile.user?.tier != 'not verified'" location="right" width="350"
    border="0" color="indigo-lighten-5">
    <v-card class="ma-4 rounded-lg" :elevation="flat" :color="color">
      <v-card-title class="text-grey-darken-4 text-body-1">Edit your profile</v-card-title>
      <v-card-text class="text-center my-4">
        <v-avatar @click="clickOnInput" color="indigo" size="80" style="cursor: pointer;">
          <v-img v-if="profile.user?.avatar" :src="profile.user?.avatar" cover />
          <v-icon v-else size="30">mdi-account</v-icon>
        </v-avatar>
      </v-card-text>

      <v-card-text class="d-flex justify-center">
        <Tier />
      </v-card-text>

      <input type="file" id="avatarInput" style="display: none" @change="setAvatar" />

      <v-card-text>
        <v-select label="Gender" v-model="profile.gender" :items="['Male', 'Female']" density="compact"
          variant="underlined" color="indigo-accent-4" />
        <v-autocomplete v-model="profile.stateOfResidence" :items="app.location" label="State of residence" density="compact" variant="underlined"
          color="indigo-accent-4" />
        <v-text-field v-model="profile.LGA" label="Local government of residence" density="compact" variant="underlined"
          color="indigo-accent-4" />
        <v-autocomplete v-model="profile.specialisation" :items="app.categories" label="Area Of specialisation"
          density="compact" variant="underlined" color="indigo-accent-4" />

        <v-card-subtitle class="mb-2 mt-5 pl-0">Guarantor Details</v-card-subtitle>

        <v-text-field v-model="profile.guarantorName" label="Name" density="compact" variant="underlined"
          color="indigo-accent-4" />
        <v-text-field v-model="profile.guarantorPhone" label="Phone number" density="compact" variant="underlined"
          color="indigo-accent-4" />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="profile.updateProfile" :loading="profile.loading" class="bg-indigo" block>Save</v-btn>
      </v-card-actions>

      <!-- <div v-if="profile.user?.tier == 'account verified'">
        <v-divider class="my-4" />

        <v-card-subtitle class="mb-2 font-weight-bold">Proof of Identity</v-card-subtitle>

        <v-row dense>
          <v-col cols="12">
            <v-card flat>
              <v-card-actions>
                <v-btn block size="x-large" class="text-body-1 bg-amber-darken-2 text-white">Drivers license</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card flat>
              <v-card-actions>
                <v-btn block size="x-large" class="text-body-1 bg-amber-darken-2 text-white">NIN</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card flat>
              <v-card-actions>
                <v-btn block size="x-large" class="text-body-1 bg-amber-darken-2 text-white">Voters Card</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div> -->
    </v-card>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useProfileStore } from "@/store/artisan/profile/profile";
import { useOTPStore } from "@/store/artisan/auth/otp";
import { useIDStore } from "@/store/artisan/auth/id";
import { useAppStore } from "@/store/app";
import { useDisplay } from "vuetify";
import Tier from "@/components/artizan/Tier.vue";

const { name } = useDisplay();

const profile = ref(useProfileStore());
const app = ref(useAppStore());
const drawer = ref(true);
const otp = ref(useOTPStore());
const id = ref(useIDStore());

const clickOnInput = () => {
  document.querySelector("#avatarInput").click();
};

onMounted(() => {
  profile.value.gender = profile.value.user?.gender;
  profile.value.stateOfResidence = profile.value.user?.stateOfResidence;
  profile.value.LGA = profile.value.user?.LGA;
  profile.value.specialisation = profile.value.user?.specialisation;
  profile.value.guarantorName = profile.value.user?.guarantorName;
  profile.value.guarantorPhone = profile.value.user?.guarantorPhone;
});

const setAvatar = (e) => {
  profile.value.file = e;
  profile.value.updateAvatar();
};

const flat = computed(() => {
  // name is reactive and
  // must use .value
  switch (name.value) {
    case "xs":
      return 0;
    case "sm":
      return 0;
    case "md":
      return 0;
    case "lg":
      return 5;
    case "xl":
      return 5;
  }

  return undefined;
});

const color = computed(() => {
  // name is reactive and
  // must use .value
  switch (name.value) {
    case "xs":
      return 'indigo-lighten-5';
    case "sm":
      return 'indigo-lighten-5';
    case "md":
      return 'indigo-lighten-5';
    case "lg":
      return 'white';
    case "xl":
      return 'white';
  }

  return undefined;
});
</script>
