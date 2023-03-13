<template>
  <v-sheet height="100vh" class="d-flex align-center auth">
    <div class="splat"></div>
    <img src="./assets/images/takeOff.svg" class="takeOffCOntainer" />
    <img class="cash" src="./assets/images/cash.svg" alt="" />
    <img class="hand" src="./assets/images/hand.svg" alt="" />
    <img class="check" src="./assets/images/check.svg" alt="" />
    <v-container class="mainSection d-flex justify-space-between">
      <v-card width="400" max-width="100%" flat color="transparent">
        <p class="text-h4 font-weight-bold text-grey-darken-4">
          Sign up and become an artizan
        </p>
        <span class="text-body-1 font-weight-regular text-grey-darken-4">
          If you already have an account You can
          <router-link to="/artisan/signin" class="text-decoration-none text-indigo-accent-4 font-weight-bold">Sign In
            here</router-link></span>
      </v-card>
      <v-card elevation="0" width="400" max-width="100%" class="rounded-xl glass mt-10 mt-md-0">
        <v-card-text>
          <v-form>
            <v-text-field v-model="signup.name" label="Name" variant="plain" density="comfortable"
              prepend-inner-icon="mdi-account-outline" />
            <v-text-field v-model="signup.email" label="Email" type="email" variant="plain" density="comfortable"
              prepend-inner-icon="mdi-at" />
            <v-text-field v-model="signup.phone" label="Phone" variant="plain" density="comfortable"
              prepend-inner-icon="mdi-phone" />
            <v-select v-model="signup.gender" :items="['Male', 'Female']" label="Gender" variant="plain"
              density="comfortable" prepend-inner-icon="mdi-gender-male-female" />
            <v-text-field v-model="signup.stateOfResidence" label="State Of Residence" variant="plain"
              density="comfortable" prepend-inner-icon="mdi-map-marker-outline" />
            <v-text-field v-model="signup.LGA" label="Local Government Area" variant="plain" density="comfortable"
              prepend-inner-icon="mdi-map-marker-outline" />
            <v-select v-model="signup.specialisation" :items="app.categories" label="Area of specialisation"
              variant="plain" density="comfortable" prepend-inner-icon="mdi-account-hard-hat-outline" />
            <v-text-field v-model="signup.password" label="Password" type="password" variant="plain" density="comfortable"
              prepend-inner-icon="mdi-lock-outline" />

            <v-btn :loading="signup.loading" @click="signup.signupUser" color="indigo-accent-4" class="rounded-lg" block>
              Sign Up
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-sheet>
</template>

<script setup>
import { ref } from "vue";
import { useSignupStore } from "@/store/artisan/auth/signup";
import { useAppStore } from "@/store/app";

const signup = ref(useSignupStore());
const app = ref(useAppStore())
</script>

<style scoped>
@import "./assets/style.css";
</style>