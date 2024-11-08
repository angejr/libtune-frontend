<script setup>
const authStore = useAuthStore();

// Fetch user on load
if (authStore.userToken) {
  try {
    await authStore.fetchUser();
  } catch (e) {
    alert(e.message);
  }
}
</script>


<template>
  <v-app class="app">
    <AppBar> </AppBar>
    <v-main class="app" style="margin-top: 20px">
      <NuxtPage></NuxtPage>
    </v-main>
  </v-app>
</template>

<style>
.app {
  background-color: lightgrey;
}
</style>