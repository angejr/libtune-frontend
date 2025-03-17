<script setup lang="js">
const authStore = useAuthStore();
const displayStore = useDisplayStore()
const drawer = ref(false)
const drawerUser = ref(false)

function resetDrawers(){
  drawer.value = false
  drawerUser.value = false
}

</script>

<template >
  <v-app-bar
    v-if="!displayStore.isMobile"
    elevation="10"
    class="app-bar"
    color="#1e1e2f"
  >
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
          v-if="authStore?.user?.customerId"
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
      <v-breadcrumbs class="breadcrumbs">
        <v-breadcrumbs-item
          title="Pricing"
          to="/subscribe"
        ></v-breadcrumbs-item>
        <v-breadcrumbs-divider divider=" "></v-breadcrumbs-divider>
        <v-breadcrumbs-item title="About Us" to="/about"></v-breadcrumbs-item>
        <v-breadcrumbs-divider divider=" "></v-breadcrumbs-divider>
        <v-breadcrumbs-item title="Terms" to="/terms"></v-breadcrumbs-item>
      </v-breadcrumbs>

      <!-- Authentication Buttons or Menu -->
      <div v-if="!authStore?.isAuthenticated" class="auth-buttons">
        <v-btn @click="goToPath('/login')">Login</v-btn>
        <v-btn @click="goToPath('/signup')" variant="outlined"> Sign-up </v-btn>
      </div>

      <v-menu v-else>
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            elevation="3"
            icon="mdi-account"
            class="user-menu-btn"
          ></v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title class="user-info">{{
              authStore?.user?.username
            }}</v-list-item-title>
            <v-list-subheader class="user-email">{{
              authStore?.user?.email
            }}</v-list-subheader>
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

  <div v-else>
    <v-app-bar elevation="10" color="#1e1e2f">
      <template v-slot:prepend>
        <v-app-bar-nav-icon
          @click.stop="
            drawerUser = false;
            drawer = !drawer;
          "
        ></v-app-bar-nav-icon>
      </template>

      <template v-if="authStore?.isAuthenticated" v-slot:append>
        <v-btn
            elevation="3"
            icon="mdi-account"
            class="user-menu-btn"
            @click.stop="
            drawer = false;
            drawerUser = !drawerUser;">
        </v-btn>
      </template>

      <!-- Title Section -->
      <v-app-bar-title class="app-bar-title">
        <a
          href="/"
          class="app-title-button"
          style="text-decoration: none; color: white"
        >
          Libtune
          <v-chip
            v-if="authStore?.user?.customerId"
            size="x-small"
            variant="elevated"
            color="purple"
            class="premium-chip"
          >
            PREMIUM
          </v-chip>
        </a>
      </v-app-bar-title>
    </v-app-bar>
    <!-- Navigation drawer -->
    <v-navigation-drawer v-model="drawer" location="left" temporary>
      <v-list>
        <v-list-subheader v-if="!authStore?.isAuthenticated">
          Authentication</v-list-subheader
        >
        <v-list-item
          class="drawer-item"
          v-if="!authStore?.isAuthenticated"
          @click="goToPath('/login'); resetDrawers()"
          title="LOGIN"
        ></v-list-item>
        <v-list-item
          class="drawer-item"
          v-if="!authStore?.isAuthenticated"
          @click="goToPath('/signup'); resetDrawers()"
          title="SIGN-UP"
        ></v-list-item>
        <v-divider v-if="!authStore?.isAuthenticated"></v-divider>
        <v-list-subheader> Information</v-list-subheader>
        <v-list-item
          class="drawer-item"
          @click="goToPath('/subscribe'); resetDrawers()"
          title="PRICING"
        ></v-list-item>
        <v-list-item
          class="drawer-item" @click="goToPath('/about'); resetDrawers()" title="ABOUT US"></v-list-item>
        <v-list-item
          class="drawer-item"
          @click="goToPath('/terms'); resetDrawers()"
          title="TERMS & CONDITIONS"
        ></v-list-item>
        <v-divider></v-divider>
        <v-list-item></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer v-model="drawerUser" location="right" temporary>
      <v-list>
        <v-list-subheader>Account Plan</v-list-subheader>
        <v-list-item>
          <v-btn
            v-if="!authStore?.user?.customerId"
            color="purple"
            variant="elevated"
            large
            @click="goToPath('/subscribe')"
          >
            UPGRADE
          </v-btn>
          <h4 v-else>PREMIUM</h4>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-subheader>Profile</v-list-subheader>
        <v-list-item>{{ authStore?.user?.username }}</v-list-item>
          <v-list-item class="user-email">{{ authStore?.user?.email}}</v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="goToPath('/account'); resetDrawers()">MY ACCOUNT</v-list-item>
          <v-divider></v-divider>
        <v-list-item
          prepend-icon="mdi-logout-variant"
          baseColor="red"
          @click="
            goToPath('/');
            authStore?.logout();
            resetDrawers()
          "
        >Logout</v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
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
  /* margin-left: 16px; */
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

.profile-btn {
  min-width: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #00b8b8; /* Customize color */
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
