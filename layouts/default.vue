<template>
  <v-app>
    <v-app-bar app elevation="1" color="#FFF" max-height="72px" class="pr-5">
      <v-img
        max-width="147px"
        :src="require('@/assets/svg/logo_dark.svg')"
      />

      <v-spacer />

      <v-text-field
        class="app-bar-search"
        outlined
        dense
        color="#000"
        hide-details
      >
        <template slot="prepend-inner">
          <v-btn
            icon
            small
          >
            <v-icon>
              mdi-magnify
            </v-icon>
          </v-btn>
        </template>
      </v-text-field>

      <v-spacer />

      <v-avatar>
        <v-img
          src="https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_960_720.jpg"
          alt="Profile photo"
          width="46px"
        />
      </v-avatar>
    </v-app-bar>

    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<style lang="scss">
.app-bar-search {
  max-width: 417px;

  .v-input__prepend-inner {
    margin-top: 0 !important;

    height: 40px !important;

    align-items: center !important;
}
}
</style>
