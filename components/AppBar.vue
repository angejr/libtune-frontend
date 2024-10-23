<script setup lang="js">
const authStore = useAuthStore()
console.log(authStore.currentState)
</script>

<template>
  <v-app-bar elevation="10" absolute>
    <template v-slot:prepend>
      <v-app-bar-title style="margin-left: 20px" size="20">
        <v-btn @click="goToPath('/')" variant="text" size="large">
          Libtune
        </v-btn>
      </v-app-bar-title>
    </template>
    <template v-slot:append>
      <div
        v-if="!authStore.isAuthenticated"
        style="display: flex; justify-content: space-around; width: 200px"
      >
        <v-btn> Login </v-btn>
        <v-btn @click="goToPath('/signup')" variant="outlined"> Sign-up </v-btn>
      </div>
      <div v-else>
        <v-menu>
          <template v-slot:activator="{props, attrs}">
            <v-btn icon>
              <v-icon> mdi-account</v-icon>
              {{ authStore.user.username }}
            </v-btn>

          </template>  
        </v-menu>
      </div>
    </template>
  </v-app-bar>
</template>
