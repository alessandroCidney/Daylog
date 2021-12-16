<template>
  <v-form class="signInForm">
    <h1 class="passero-one mb-6 pageTitle">
      Sign in to PontoBlog
    </h1>

    <v-btn color="error" block class="white--text mb-6">
      <v-icon left>
        mdi-google
      </v-icon>

      Sign in with Google
    </v-btn>

    <div class="d-flex align-center justify-center">
      <v-divider class="mb-6" />

      <span class="px-2 mb-6 d-flex align-center justify-center grey--text">
        <small>Or sign in with Email and Password</small>
      </span>

      <v-divider class="mb-6" />
    </div>

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
      class="mb-5"
    />

    <v-btn color="space" block class="white--text mt-6">
      <v-icon left>
        mdi-email
      </v-icon>

      Sign in with Email
    </v-btn>

    <p class="grey--text mt-2 mb-0">
      <small>Don't have an account? <NuxtLink to="start">Click here</NuxtLink></small>
    </p>
  </v-form>
</template>


<style lang="scss" scoped>
.signInForm {
  width: 30vw !important;
}

.pageTitle {
  font-size: 24px;
}
</style>
