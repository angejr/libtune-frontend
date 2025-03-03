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
    <!-- Landing Dialog -->
    <v-dialog v-model="landingDialog" max-width="500px">
      <v-card image="/images/bg.jpg">
        <v-card-title style="text-align: center; font-weight: bold; color: white;" class="headline">Welcome to Libtune !</v-card-title>
        <v-card-subtitle style="text-align: center; color: white;">
          Your go-to site for Royalty-Free Music
        </v-card-subtitle>
        <v-card-subtitle style="text-align: center; padding-bottom: 0px; color: white;">
          The Best, Simplest, Most-affordable model: 
        </v-card-subtitle>
        <v-card-subtitle style="text-align: center; font-weight: bold; color: white;">
          You Pay, You Use.
        </v-card-subtitle>
        <v-card-text style="padding-bottom: 0px; color: white;">
          <strong>
            What you will get :
          </strong>
          <v-list  style="background-color: transparent">
            <v-list-item style="color: white;">
            <v-icon color="white">mdi-music</v-icon>
            Access to thousands of high quality songs
          </v-list-item>
          <v-list-item style="color: white;"> 
              <v-icon color="white">mdi-download</v-icon>
              Unlimited downloads </v-list-item>
              <v-list-item style="color: white;">
              <v-icon color="white">mdi-license</v-icon>
              Licence to use the songs for any project</v-list-item>
            </v-list>
            <strong>
              What you will NOT get:
            </strong>
            <v-list  style="background-color: transparent">
              <v-list-item style="color: white;">
              <v-icon color="red">mdi-copyright</v-icon>
              Copyright Strikes</v-list-item>
              <v-list-item style="color: white;">
              <v-icon color="red">mdi-currency-usd-off</v-icon>
              Demonitization</v-list-item>
              <v-list-item style="color: white;">
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
                goToPath('/signup');
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
.landing {
  background-color: #f1f0eb;
}

.classic {
  background-color: lightgrey;
}
</style>