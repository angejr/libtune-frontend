<template>
  <v-container
    class="login-container"
  >
    <v-card elevation="10" class="login-card">
      <v-card-title class="text-center text-h5 font-weight-bold">
        {{$t('AppBar.login')}}
      </v-card-title>
      <v-divider></v-divider>
      <div class="px-4 py-8">
        <v-btn
            :disabled="loginLoading"
            @click="registerGoogle"
            :variant="loginLoading ? 'elevated' : 'outlined'"
            block
            large
            :loading="loginLoading"
            class="text-none"
          >
          <img
        src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
        alt="Google"
        class="me-2"
        width="20"
        height="20"
      />
      {{$t('SignUp.continueGoogle')}}
          </v-btn>
      </div>
      <div class="px-6">
        <v-divider>{{$t('SignUp.or')}}</v-divider>
      </div>
      <v-card-text>
        <v-form
        v-model="isFormValid"
        ref="formRef"
        lazy-validation
        >
        <p v-if="loginError" style="color:red; margin-top: 10px"> {{$t("Login.wrong")}}</p>
          <v-text-field
            v-model="email"
            :label="$t('SignUp.email')"
            variant="outlined"
            :rules="[validationRules.required, validationRules.email, validationRules.safe, validationRules.max(60)]"
            required
            dense
            class="mt-4"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :label="$t('SignUp.password')"
            type="password"
            variant="outlined"
            :rules="[validationRules.required, validationRules.min(8), validationRules.safe, validationRules.max(30)]"
            required
            dense
            class="mt-4"
          ></v-text-field>

          <p class="text-center mt-4 mb-4">
            {{$t('Login.noAccount')}} <NuxtLink :to="localePath('/signup')" class="terms-link">
              {{$t('Login.register')}}
            </NuxtLink>
          </p>

          <v-btn
            :disabled="!isFormValid || loginLoading"
            @click="submitForm"
            :color="!isFormValid || loginLoading ? 'grey' : 'primary'"
            block
            large
            class="mt-6 font-inter text-capitalize"
            :loading="loginLoading"
          >
          {{$t('AppBar.login')}}
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border-radius: 12px;
  background-color: white;
}

.v-btn[block] {
  width: 100%;
}

.v-card-title {
  margin-bottom: 10px;
}

.terms-link {
  color: #4a148c;
  text-decoration: none;
  font-weight: 500;
}

.terms-link:hover {
  text-decoration: underline;
}

.font-inter {
  font-family: Inter
}
</style>

    
  <script setup>
  const authStore = useAuthStore();
  const errorStore = useErrorStore();
  const loginError = ref(false);
  const config = useRuntimeConfig()
  const STRAPI_URL = config.public.strapiUrl
  // Loading status
  const loginLoading = ref(false);
  const { t, locales, setLocale } = useI18n();
  const localePath = useLocalePath();

  definePageMeta({
  middleware: defineNuxtRouteMiddleware(() => {
    const authStore = useAuthStore();
    if (authStore?.userToken) {
      return goToPath('/'); // Redirect if authenticated
    }
  })
});
  
  // Reactive form state
  const isFormValid = ref(false);
  const email = ref("");
  const password = ref("");
  
  // Form reference
  const formRef = ref(null);
  // Loading status

  useSeoMeta({
  title: "Login",
  ogTitle: "Login",
  robots: {
    noindex: true,
    nofollow: true
  }
  })

  const registerGoogle = async () => {
  try{
    loginLoading.value = true
    await navigateTo(`${STRAPI_URL}/api/connect/google`, {external: true})
  }
  catch(e){
    errorStore.setError({title: "Login Error", text: e.message})
    loginLoading.value = false
  }
}

  // Form submission logic
  const submitForm = async () => {
    // Ensure formRef is defined before calling validate
    if (formRef.value && formRef.value.validate()) {
      try {
        loginLoading.value = true
        await authStore.login(email.value, password.value);
        goToPath("/");
      } catch (e) {
        if (e.statusCode == 401){
          loginError.value = true
        }
        else{
          errorStore.setError({title: "Login Error", text: e.message})
        }
        loginLoading.value= false
      }
    }
  };
  </script>
    