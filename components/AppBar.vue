<script setup lang="js">
const authStore = useAuthStore();
const displayStore = useDisplayStore()
const drawer = ref(false)
const drawerUser = ref(false)
const { t, locales, setLocale } = useI18n();
const localePath = useLocalePath();

function resetDrawers(){
  drawer.value = false
  drawerUser.value = false
}

// Count Down 
const now = ref(Date.now());
const timeLeft = ref(0);

const offerEndTime = new Date(offerExpiryDate).getTime();

const formatTime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);

  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [
    String(days).padStart(2, '0'),
    String(hours).padStart(2, '0'),
    String(minutes).padStart(2, '0'),
    String(seconds).padStart(2, '0')
  ].join(':');
};

onMounted(() => {
  const interval = setInterval(() => {
    now.value = Date.now();
    timeLeft.value = Math.max(offerEndTime - now.value, 0);
    if (timeLeft.value <= 0) clearInterval(interval);
  }, 1000);
});

</script>

<template >
  <div v-if="!displayStore.isMobile">
    <v-app-bar color="red" density="compact" scroll-behavior="fully-hide" :readonly="true">
      <v-app-bar-title>
        <div class="text-container" style="text-align: center;">
          <v-icon icon="mdi-fire" />
          {{$t('AppBar.sale')}}:     {{ formatTime(timeLeft) }}  
        </div>
      </v-app-bar-title>
    </v-app-bar>
    <v-app-bar
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
            :title="$t('AppBar.browse')"
            :to="localePath('/browse')"
          ></v-breadcrumbs-item>
          <v-breadcrumbs-divider divider=" "></v-breadcrumbs-divider>
          <v-breadcrumbs-item
            :title="$t('AppBar.pricing')"
            :to="localePath('/subscribe')"
          ></v-breadcrumbs-item>
          <v-breadcrumbs-divider divider=" "></v-breadcrumbs-divider>
          <v-breadcrumbs-item :title="$t('AppBar.about')" :to="localePath('/about')"></v-breadcrumbs-item>
          <v-breadcrumbs-divider divider=" "></v-breadcrumbs-divider>
          <v-breadcrumbs-item :title="$t('AppBar.terms')" :to="localePath('/terms')"></v-breadcrumbs-item>
        </v-breadcrumbs>
  
        <!-- Authentication Buttons or Menu -->
        <div v-if="!authStore?.isAuthenticated" class="auth-buttons">
          <v-btn @click="goToPath('/login')">{{$t('AppBar.login')}}</v-btn>
          <v-btn @click="goToPath('/signup')" variant="outlined"> {{$t('AppBar.signup')}} </v-btn>
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
            <v-list-item @click="goToPath('/account')" class="text-capitalize font-inter text-h6 font-weight-regular">
              {{$t('AppBar.account')}}
            </v-list-item>
            <v-list-item
              prepend-icon="mdi-logout-variant"
              baseColor="red"
              @click="
                goToPath('/');
                authStore.logout();
              "
            >
              <v-list-item-title>{{$t('AppBar.logout')}}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>
  </div>

  <div v-else>
    <v-app-bar color="red" density="compact" scroll-behavior="fully-hide" :readonly="true">
      <template v-slot:prepend>
        <v-app-bar-nav-icon :slim="true" density="compact">
          <v-icon icon="mdi-fire" />
        </v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>
        <div class="text-container">
          {{$t('AppBar.sale')}}: {{ formatTime(timeLeft) }}  
        </div>
      </v-app-bar-title>
    </v-app-bar>

    <v-app-bar elevation="10" color="#1e1e2f" density="compact">
      <template v-slot:prepend>
        <v-app-bar-nav-icon density="compact"
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
          @click="goToPath('/')"          
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
          {{$t('AppBar.authentication')}}</v-list-subheader
        >
        <v-list-item
          class="text-capitalize font-inter text-h6 font-weight-regular"
          v-if="!authStore?.isAuthenticated"
          @click="goToPath('/login'); resetDrawers()"
        >{{$t('AppBar.login')}}</v-list-item>
        <v-list-item
          class="text-capitalize font-inter text-h6 font-weight-regular"
          v-if="!authStore?.isAuthenticated"
          @click="goToPath('/signup'); resetDrawers()"
        >{{$t('AppBar.signup')}}</v-list-item>
        <v-divider v-if="!authStore?.isAuthenticated"></v-divider>
        <v-list-subheader> {{$t('AppBar.information')}}</v-list-subheader>
        <v-list-item
          class="text-capitalize font-inter text-h6 font-weight-regular"
          @click="goToPath('/browse'); resetDrawers()"
        >{{$t('AppBar.browse')}}</v-list-item>
        <v-list-item
          class="text-capitalize font-inter text-h6 font-weight-regular"
          @click="goToPath('/subscribe'); resetDrawers()"
        >{{$t('AppBar.pricing')}}</v-list-item>
        <v-list-item
          class="text-capitalize font-inter text-h6 font-weight-regular" @click="goToPath('/about'); resetDrawers()">
          {{$t('AppBar.about')}}</v-list-item>
        <v-list-item
          class="text-capitalize font-inter text-h6 font-weight-regular"
          @click="goToPath('/terms'); resetDrawers()"
        >{{$t('AppBar.termsAndConditions')}}</v-list-item>
        <v-divider></v-divider>
        <v-list-item></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer v-model="drawerUser" location="right" temporary>
      <v-list>
        <v-list-subheader>{{$t('AppBar.plan')}}</v-list-subheader>
        <v-list-item>
          <v-btn
            v-if="!authStore?.user?.customerId"
            color="purple"
            variant="elevated"
            large
            @click="goToPath('/subscribe')"
            class="text-capitalize font-inter"
          >
          {{$t('AppBar.upgrade')}}
          </v-btn>
          <h4 v-else class="text-capitalize font-inter text-h6 font-weight-regular">Premium</h4>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-subheader>{{$t('AppBar.profile')}}</v-list-subheader>
        <v-list-item>{{ authStore?.user?.username }}</v-list-item>
          <v-list-item class="user-email">{{ authStore?.user?.email}}</v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="goToPath('/account'); resetDrawers()" class="text-capitalize font-inter text-h6 font-weight-regular">{{$t('AppBar.account')}}</v-list-item>
          <v-divider></v-divider>
        <v-list-item
          prepend-icon="mdi-logout-variant"
          baseColor="red"
          @click="
            goToPath('/');
            authStore?.logout();
            resetDrawers()
          "
        >{{$t('AppBar.logout')}}</v-list-item>
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

.text-container {
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  font-size: clamp(12px, 4.5vw, 20px);
}

.font-inter {
  font-family: Inter;
}
</style>
