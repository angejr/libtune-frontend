<script setup>
const authStore = useAuthStore();
const errorStore = useErrorStore();
const route = useRoute()
const landingDialog = ref(route.query.landing)

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
    <v-main class="app">
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
    <!-- Landing Dialog -->
    <v-dialog v-model="landingDialog" max-width="500px">
      <v-card>
        <v-card-title style="text-align: center; font-weight: bold;" class="headline">Welcome to Libtune !</v-card-title>
        <v-card-subtitle style="text-align: center;">
          Your go-to site for Royalty-Free Music
        </v-card-subtitle>
        <v-card-subtitle style="text-align: center; padding-bottom: 0px;">
          The Best, Simplest, Most-affordable model: 
        </v-card-subtitle>
        <v-card-subtitle style="text-align: center; font-weight: bold;">
          You Pay, You Use.
        </v-card-subtitle>
        <v-card-text style="padding-bottom: 0px;">
          <strong>
            What you will get :
          </strong>
          <v-list>
            <v-list-item>
            <v-icon color="blue">mdi-music</v-icon>
            Access to thousands of high quality songs
          </v-list-item>
          <v-list-item> 
              <v-icon color="blue">mdi-download</v-icon>
              Unlimited downloads </v-list-item>
              <v-list-item>
              <v-icon color="blue">mdi-license</v-icon>
              Licence to use the songs for any project</v-list-item>
            </v-list>
            <strong>
              What you will NOT get:
            </strong>
            <v-list>
              <v-list-item>
              <v-icon color="red">mdi-copyright</v-icon>
              Copyright Strikes</v-list-item>
              <v-list-item>
              <v-icon color="red">mdi-currency-usd-off</v-icon>
              Demonitization</v-list-item>
              <v-list-item>
              <v-icon color="red">mdi-chess-queen</v-icon>
              Royalties to pay Us</v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions style="display:flex; justify-content: center;">
          <v-btn
            color="purple"
            variant="elevated"
            @click="
              landingDialog = false;
              if (!authStore?.userToken){
                goToPath('/login');
              }
              else {
                goToPath('/subscribe')
              }
            "
          >
            Subscribe Now!
          </v-btn>
        </v-card-actions>
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