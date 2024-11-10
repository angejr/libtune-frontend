<script setup>
const authStore = useAuthStore();
const error = ref("")

// Fetch user on load
if (authStore.userToken) {
  try {
    await authStore.fetchUser();
  } catch (e) {
    error.value = e.message
  }
}
</script>


<template>
  <v-app class="app">
    <AppBar> </AppBar>
    <v-main class="app" style="margin-top: 20px">
      <div v-if="error"> {{error}}</div>
      <NuxtPage v-else></NuxtPage>
    </v-main>
  </v-app>
</template>

<style>
.app {
  background-color: lightgrey;
}
</style>