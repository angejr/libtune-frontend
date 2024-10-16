<template>
  <v-container style="background-color: white" width="500px">
    <v-row style="padding-bottom:10px">
      <v-col>
        <h1>Sign-Up</h1>
      </v-col>
    </v-row>
    <v-spacer></v-spacer>

    <v-form v-model="isFormValid" ref="form" lazy-validation>
              <v-text-field
                v-model="name"
                label="Full Name"
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
    
              <v-select
                v-model="gender"
                :items="genders"
                label="Gender"
                :rules="[rules.required]"
                required
              ></v-select>
    
              <v-checkbox
                v-model="agree"
                :rules="[rules.required]"
                label="I agree to the terms and conditions"
              ></v-checkbox>
    
              <v-btn :disabled="!isFormValid" @click="submitForm" color="primary">
                Submit
              </v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      isFormValid: false,
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: null,
      agree: false,
      genders: ['Male', 'Female', 'Other'],
      rules: {
        required: value => !!value || 'Required.',
        email: value => /.+@.+\..+/.test(value) || 'Invalid e-mail.',
        min: length => value => value.length >= length || `Min ${length} characters.`,
      }
    }
  },
  methods: {
    matchPassword(value) {
      return value === this.password || 'Passwords must match.';
    },
    submitForm() {
      if (this.$refs.form.validate()) {
        // Handle form submission here
        alert('Form Submitted Successfully!');
      }
    }
  }
}
</script>
