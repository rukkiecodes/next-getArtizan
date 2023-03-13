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
          Sign up now to find an artizan
        </p>
        <span class="text-body-1 font-weight-regular text-grey-darken-4">
          If you already have an account You can
          <router-link to="/signin" class="text-decoration-none text-indigo-accent-4 font-weight-bold">Sign In
            here</router-link></span>
      </v-card>
      <v-card elevation="0" width="400" max-width="100%" class="rounded-xl glass mt-10 mt-md-0">
        <v-card-text>
          <v-form>
            <v-text-field v-model="signup.name" label="Name" variant="plain" density="comfortable"
              prepend-inner-icon="mdi-account-outline" required />
            <v-text-field v-model="signup.email" label="Email" type="email" variant="plain" density="comfortable"
              prepend-inner-icon="mdi-at" required />
            <v-text-field v-model="signup.phone" label="Phone" variant="plain" density="comfortable"
              prepend-inner-icon="mdi-phone" required />
            <v-text-field v-model="signup.password" label="Password" type="password" variant="plain" density="comfortable"
              prepend-inner-icon="mdi-lock-outline" required />

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
import { useUserSignupStore } from "@/store/user/auth/signup";

const signup = ref(useUserSignupStore());
</script>

<style scoped>
@import "./assets/style.css";
</style>