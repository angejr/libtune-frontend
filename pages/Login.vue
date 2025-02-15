<template>
  <v-container
    class="login-container"
  >
    <v-card elevation="10" class="login-card">
      <v-card-title class="text-center text-h5 font-weight-bold">
        Login
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form
        v-model="isFormValid"
        ref="formRef"
        lazy-validation
        >
        <p v-if="loginError" style="color:red; margin-top: 10px"> Wrong E-mail or password</p>
          <v-text-field
            v-model="email"
            label="Email"
            variant="outlined"
            :rules="[validationRules.required, validationRules.email, validationRules.safe, validationRules.max(60)]"
            required
            dense
            class="mt-4"
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            variant="outlined"
            :rules="[validationRules.required, validationRules.min(8), validationRules.safe, validationRules.max(30)]"
            required
            dense
            class="mt-4"
          ></v-text-field>

          <p class="text-center mt-4 mb-4">
            Don't have an account yet ? 
            <NuxtLink to="/signup" class="terms-link">
              Register
            </NuxtLink>
          </p>

          <v-btn
            :disabled="!isFormValid"
            @click="submitForm"
            color="primary"
            block
            large
            class="mt-6"
          >
            Log In
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
</style>

    
  <script setup>
  const authStore = useAuthStore();
  const errorStore = useErrorStore();
  const loginError = ref(false)
  
  // Reactive form state
  const isFormValid = ref(false);
  const email = ref("");
  const password = ref("");
  
  // Form reference
  const formRef = ref(null);

  useSeoMeta({
  title: "Login",
  ogTitle: "Login",
  robots: {
    noindex: true,
    nofollow: true
  }
  })

  
  // Form submission logic
  const submitForm = async () => {
    // Ensure formRef is defined before calling validate
    if (formRef.value && formRef.value.validate()) {
      try {
        await authStore.login(email.value, password.value);
        goToPath("/");
      } catch (e) {
        if (e.statusCode == 401){
          loginError.value = true
        }
        else{
          errorStore.setError({title: "Login Error", text: e.message})
        }
      }
    }
  };
  </script>
    