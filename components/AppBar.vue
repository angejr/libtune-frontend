<script setup lang="js">
const authStore = useAuthStore();
</script>

<template>
  <v-app-bar elevation="10" absolute class="app-bar" color="#1e1e2f">
    <!-- Title Section -->
    <v-app-bar-title class="app-bar-title">
      <v-btn
        @click="goToPath('/')"
        variant="text"
        size="large"
        class="app-title-button"
      >
        Libtune
        <v-chip
          v-if="authStore.user?.customerId"
          size="x-small"
          variant="elevated"
          color="purple"
          class="premium-chip"
        >
          PREMIUM
        </v-chip>
      </v-btn>
    </v-app-bar-title>

    <!-- Breadcrumbs and Actions -->
    <template v-slot:append>
      <!-- Breadcrumbs -->
      <v-breadcrumbs  class="breadcrumbs">
        <v-breadcrumbs-item title="Pricing" to="/subscribe"></v-breadcrumbs-item>
        <v-breadcrumbs-divider divider=" "></v-breadcrumbs-divider>
        <v-breadcrumbs-item title="About Us" to="/about"></v-breadcrumbs-item>
        <v-breadcrumbs-divider divider=" "></v-breadcrumbs-divider>
        <v-breadcrumbs-item title="Terms" to="/terms"></v-breadcrumbs-item>
      </v-breadcrumbs>

      <!-- Authentication Buttons or Menu -->
      <div
        v-if="!authStore.isAuthenticated"
        class="auth-buttons"
      >
        <v-btn @click="goToPath('/login')">Login</v-btn>
        <v-btn
          @click="goToPath('/signup')"
          variant="outlined"
        >
          Sign-up
        </v-btn>
      </div>

      <v-menu v-else>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" elevation="3" icon="mdi-account" class="user-menu-btn"></v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title class="user-info">{{ authStore.user.username }}</v-list-item-title>
            <v-list-subheader class="user-email">{{ authStore.user.email }}</v-list-subheader>
          </v-list-item>
          <v-list-item @click="goToPath('/account')">
            <v-list-item-title>My Account</v-list-item-title>
          </v-list-item>
          <v-list-item
            prepend-icon="mdi-logout-variant"
            baseColor="red"
            @click="
              goToPath('/');
              authStore.logout();
            "
          >
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<style scoped>
/* App Bar */
.app-bar {
  padding: 0 20px;
}

/* Title Section */
.app-bar-title {
  display: flex;
  align-items: center;
  margin-left: 16px;
}

.app-title-button {
  font-size: 24px;
  font-weight: bold;
  text-transform: none;
}

.premium-chip {
  margin-left: 8px;
  font-size: 12px;
  background-color: #6a1b9a;
}

/* Breadcrumbs */
.breadcrumbs {
  font-size: 14px;
  margin-right: 20px;
}

/* Auth Buttons */
.auth-buttons {
  display: flex;
  gap: 12px;
}

.user-info {
  font-size: 18px;
  font-weight: bold;
}

.user-email {
  color: #90caf9;
}
</style>
