<template>
    <v-chip size="small"
        :color="(profile.user?.tier == 'not verified' || profile.user?.tier == undefined) ? 'red' : 'green'"
        class="text-capitalize">{{
            profile.user?.tier != undefined ? profile.user?.tier : 'not verified' }}</v-chip>
</template>
<script setup>
import { useProfileStore } from '@/store/profile/profile';
import { ref } from 'vue';
const profile = ref(useProfileStore());
</script>