<template>
    <v-chip size="small" :color="profile.user?.tier == 'not verified' ? 'red' : 'green'" class="text-capitalize">{{
        profile.user?.tier }}</v-chip>
</template>

<script setup>
import { useProfileStore } from '@/store/artisan/profile/profile';
import { ref } from 'vue';

const profile = ref(useProfileStore());
</script>
