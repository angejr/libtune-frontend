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
          <v-text-field
            v-model="email"
            label="Email"
            variant="outlined"
            :rules="[validationRules.required, validationRules.email]"
            required
            dense
            class="mt-4"
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            variant="outlined"
            :rules="[validationRules.required, validationRules.min(8)]"
            required
            dense
            class="mt-4"
          ></v-text-field>

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
      <v-card-actions class="text-center justify-center">
        <v-btn text color="secondary" @click="goToForgotPassword">
          Forgot Password?
        </v-btn>
      </v-card-actions>
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
</style>

    
  <script setup>
  const authStore = useAuthStore();
  
  // Reactive form state
  const isFormValid = ref(false);
  const email = ref("");
  const password = ref("");
  
  // Form reference
  const formRef = ref(null);
  
  // Form submission logic
  const submitForm = async () => {
    // Ensure formRef is defined before calling validate
    if (formRef.value && formRef.value.validate()) {
      try {
        await authStore.login(email.value, password.value);
        alert(`You're Logged in!`);
        goToPath("/");
      } catch (e) {
        alert(e.message);
      }
    }
  };
  </script>
    