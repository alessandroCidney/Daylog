<template>
  <v-container fluid class="pa-0">
    <v-img
      src="https://cdn.pixabay.com/photo/2018/02/01/14/09/yellow-3123271_960_720.jpg"
      alt="Profile background photo"
      width="100%"
      height="243px"
    />

    <v-row cols="12">
      <v-col cols="4" class="d-flex flex-column align-center justify-center">
        <v-avatar width="165px" height="165px" class="profile-avatar-photo">
          <v-img
            src="https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_960_720.jpg"
            alt="Avatar photo"
          />
        </v-avatar>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.profile-avatar-photo {
  transform: translateY(-82.5px);
  border: 2px solid #FFF;
}
</style>
