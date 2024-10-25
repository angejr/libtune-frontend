<script setup lang="js">
const authStore = useAuthStore()
console.log(authStore.currentState)
</script>

<template>
  <v-app-bar elevation="10" absolute>
    <v-app-bar-title style="margin-left: 20px" size="20">
      <v-btn @click="goToPath('/')" variant="text" size="large" style="font-size: 24px; font-weight: bold; color: inherit">
        Libtune
      </v-btn>
    </v-app-bar-title>
    <template v-slot:append>
      <div
        v-if="!authStore.isAuthenticated"
        style="display: flex; justify-content: space-around; width: 200px"
      >
        <v-btn> Login </v-btn>
        <v-btn @click="goToPath('/signup')" variant="outlined" color="blue"> Sign-up </v-btn>
      </div>
      <v-menu v-else>
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            elevation="2"
            icon="mdi-account"
          ></v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>{{authStore.user.username}}</v-list-item-title>
            <v-list-subheader color="blue">{{authStore.user.email}}</v-list-subheader>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>My account </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>My Purchases </v-list-item-title>
          </v-list-item>
          <v-list-item prepend-icon="mdi-logout-variant" baseColor="red" activeColor="grey"
          @click="goToPath('/');authStore.logout()">
            <v-list-item-title >Logout </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>
