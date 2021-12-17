<template>
  <v-row align="center" justify="center" >
    <v-col cols="12">
      <v-card flat class="light pa-3 rounded-xl">
        <v-row>
          <v-avatar width="50px" height="50px" class="mt-3 ml-3">
            <v-img
              src="https://firebasestorage.googleapis.com/v0/b/ponto-blog.appspot.com/o/users%2F-MqMUvjKWgiphY9ihXod%2Fuser_profile_photo.jpeg?alt=media&token=3aa35ba5-4d91-48c4-ae19-da0d5b67af97"
            />
          </v-avatar>
          <v-col cols="10" class="pl-0 pt-0">
            <v-textarea
              label="What's new?"
              color="space"
              solo
              flat
              auto-grow
              rows="2"
              hide-details
            />
          </v-col>
        </v-row>
        
        <div class="d-flex">
          <v-spacer />
          <v-btn
            color="space"
            class="white--text rounded-xl"
            to="/create"
            depressed
          >
            <v-icon left>
              mdi-plus
            </v-icon>
            Create a new post
          </v-btn>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>
