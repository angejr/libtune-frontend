<template>
    <v-container style="background-color: white" width="500px">
      <v-row style="padding-bottom: 10px">
        <v-col>
          <h1>Sign-Up</h1>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
  
      <v-form
        v-model="isFormValid"
        ref="formRef"
        lazy-validation
        style="
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        "
      >
        <v-text-field
          v-model="username"
          label="Username"
          :rules="[rules.required]"
          required
        ></v-text-field>
  
        <v-text-field
          v-model="email"
          label="Email"
          :rules="[rules.required, rules.email]"
          required
        ></v-text-field>
  
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          :rules="[rules.required, rules.min(8)]"
          required
        ></v-text-field>
  
        <v-text-field
          v-model="confirmPassword"
          label="Confirm Password"
          type="password"
          :rules="[rules.required, matchPassword]"
          required
        ></v-text-field>
  
        <p style="padding-top: 10px; padding-bottom: 20px">
          By signing up, you agree to the
          <NuxtLink to="/terms"> Terms and Conditions </NuxtLink>
        </p>
  
        <v-btn
          :disabled="!isFormValid"
          @click="submitForm"
          color="primary"
          width="100px"
        >
          Submit
        </v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script setup>
  
  // Reactive form state
  const isFormValid = ref(false)
  const username = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  
  // Form validation rules
  const rules = {
    required: (value) => !!value || 'Required.',
    email: (value) => /.+@.+\..+/.test(value) || 'Invalid e-mail.',
    min: (length) => (value) =>
      value.length >= length || `Min ${length} characters.`,
  }
  
  // Password match validation
  const matchPassword = (value) =>
    value === password.value || 'Passwords must match.'
  
  // Form reference
  const formRef = ref(null)
  
  // Form submission logic
  const submitForm = async () => {
    console.log({formRef})
    // Ensure formRef is defined before calling validate
    if (formRef.value && formRef.value.validate()) {
        console.log({formRef})
      const { data, error } = await useFetch(`${STRAPI_API_URL}/auth/local/register`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${STRAPI_TOKEN_USER}`,
        },
        body: {
          username: username.value,
          email: email.value,
          password: password.value,
        },
      })
  
      if (!error.value) {
        alert(`You're signed in!`)
        localStorage.setItem('loginToken', data?.value?.jwt)
        goToPath('/')
      } else {
        alert(error.value.data.error.message)
      }
    }
  }
  </script>
  