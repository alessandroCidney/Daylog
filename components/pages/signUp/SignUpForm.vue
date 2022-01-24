<template>
  <v-form class="signUpForm">
    <h1 class="master-font mb-6 pageTitle">
      Sign up to Daylog
    </h1>

    <v-btn color="error" block class="white--text mb-6">
      <v-icon left>
        mdi-google
      </v-icon>

      Sign up with Google
    </v-btn>

    <div class="d-flex align-center justify-center">
      <v-divider class="mb-6" />

      <span class="px-2 mb-6 d-flex align-center justify-center grey--text">
        <small>Or sign up with Email and Password</small>
      </span>

      <v-divider class="mb-6" />
    </div>

    <v-text-field
      label="Username"
      placeholder="Type a username"
      outlined
      color="space"
      hide-details
      class="mb-5"
    />

    <v-text-field
      label="Email"
      placeholder="user@example.com"
      outlined
      color="space"
      hide-details
      class="mb-5"
    />

    <v-text-field
      label="Password"
      placeholder="At least 8 characters"
      outlined
      color="space"
      hide-details
    />

    <v-checkbox
      label="I agree with the use terms, privacy policy and cookies use policy"
    />

    <v-btn color="space" block class="white--text mt-2">
      <v-icon left>
        mdi-email
      </v-icon>

      Sign up with Email
    </v-btn>

    <p class="grey--text mt-2 mb-0">
      <small>Have an account? <NuxtLink to="login">Click here</NuxtLink></small>
    </p>
  </v-form>
</template>

<style lang="scss" scoped>
.signUpForm {
  width: 30vw !important;
}

.pageTitle {
  font-size: 24px;
}
</style>
