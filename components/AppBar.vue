<script lang="js">
   export default {
    methods: {
      async goToSignUp(){
        return navigateTo({ path: '/signup'})
      },
      async goToHome(){
        return navigateTo({ path: '/'})
      }
    }
  }
</script>

<template>
  <v-app-bar elevation="10">
    <template v-slot:prepend>
      <v-app-bar-title style="margin-left: 20px" size="20">
        <v-btn @click="goToHome" variant="text" size="large">
          Libtune
        </v-btn>
      </v-app-bar-title>
    </template>
    <template v-slot:append>
      <div style="display: flex; justify-content: space-around; width:200px">
        <v-btn> Login </v-btn>
        <v-btn @click="goToSignUp" variant="outlined">
          Sign-up
        </v-btn>
      </div>
    </template>
  </v-app-bar>
</template>
