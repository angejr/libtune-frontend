<script setup>
const authStore = useAuthStore();
const errorStore = useErrorStore();

useSeoMeta({
  title: "Home",
  ogTitle: "Libtune",
  description: "Access a massive library of royalty-free and copyright-free music for podcasts, YouTube, and more. Find ambient, holiday, and orchestral tracks to elevate your projects. Perfect for content creators. Subscribe now!",
  ogDescription: "Royalty-free music for every project. Perfect for YouTube, podcasts, and more. Subscribe now!",
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