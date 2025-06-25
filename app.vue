<script setup>
const authStore = useAuthStore();
const errorStore = useErrorStore();
const route = useRoute();


useSeoMeta({
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
    <v-main :class="route.path.includes('landing') ? 'landing' : 'classic'">
      <!-- Error dialog -->
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
.landing {
  background-color: #f1f0eb;
}

.classic {
  background-color: lightgrey;
}
.font-inter {
  font-family: Inter;
}
</style>