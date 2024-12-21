<script setup>
const authStore = useAuthStore();
const errorStore = useErrorStore();

useSeoMeta({
  title: "Libtune",
  ogTitle: "Libtune",
  description: "100% Royalty-Free Music",
  ogDescription: "100% Royalty-Free Music",
  ogSiteName: "Libtune"
});

// Fetch user on load
if (authStore.userToken) {
  try {
    await authStore.fetchUser();
  } catch (e) {
    errorStore.setError({
      title: "Could not fetch user",
      text: e.message,
    });
  }
}
</script>


<template>
  <v-app>
    <AppBar> </AppBar>
    <v-main class="app" style="margin-top: 20px">
      <v-dialog v-model="errorStore.error" max-width="500">
        <v-card>
          <v-alert
            :title="errorStore.error.title"
            :text="errorStore.error.text"
            type="error"
          >
          </v-alert>
        </v-card>
      </v-dialog>
      <NuxtPage></NuxtPage>
    </v-main>
  </v-app>
</template>

<style>
.app {
  background-color: lightgrey;
}
</style>