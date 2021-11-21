<template>
  <v-container fluid class="pa-0">
    <v-img
      :src="require('@/assets/images/profile-mock/background.jpg')"
      alt="Profile background photo"
      width="100%"
      height="243px"
    />

    <v-row cols="12">
      <v-col cols="4" class="d-flex flex-column align-center justify-center">
        <v-avatar width="165px" height="165px" class="profile-avatar-photo translated">
          <v-img
            :src="require('@/assets/images/profile-mock/man.jpg')"
            alt="Avatar photo"
          />
        </v-avatar>

        <p class="master-title translated mt-3">@fernandosilva</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.profile-avatar-photo {
  border: 2px solid #FFF;
}

.translated {
  transform: translateY(-82.5px); 
}
</style>
