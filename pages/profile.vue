<template>
  <v-container fluid class="pa-0">
    <v-parallax
      :src="backgroundPhoto"
      alt="Profile background photo"
      class="profile-background-photo"
      :height="1000"
    ></v-parallax>

    <v-row justify-md="end" justify-sm="center">
      <v-col md="3" sm="12" class="d-flex flex-column align-center justify-center" align-self="start">
        <v-avatar width="165px" height="165px" class="profile-avatar-photo translated">
          <v-img
            :src="profilePhoto"
            alt="Avatar photo"
          />
        </v-avatar>

        <p class="master-title translated mt-3">
          @{{ firestoreUser ? firestoreUser.username : '' }}
        </p>
      </v-col>

      <v-col md="8" sm="12" class="py-16">
        <v-row align="center" justify="center">
          <v-col cols="11">          
            <ArticleCard
              title="Como criar seu primeiro bot com Node.js"
              description="Aprenda como criar um bot desenvolvido apenas com Node.js, uma tecnologia que permite a utilização de JavaScript sem a necessidade de um navegador."
              imageURL="https://cdn.pixabay.com/photo/2016/03/27/18/54/technology-1283624_960_720.jpg"
            />
          </v-col>
          <v-col cols="11">
            <ArticleCard
              title="A arte do trabalho em equipe"
              description="Descubra as vantagens do trabalho em equipe para o desenvolvimento de projetos."
              imageURL="https://cdn.pixabay.com/photo/2014/07/08/10/47/team-386673_960_720.jpg"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

import { StoreUser, FirestoreUser } from '@/types/users';

import ArticleCard from '@/components/commons/ArticleCard.vue';

interface Data {};
interface Methods {};
interface Props {};

interface Computed {
  user: StoreUser | null;
  firestoreUser: FirestoreUser | undefined;
  profilePhoto: string;
  backgroundPhoto: string;
};

export default Vue.extend<Data, Methods, Computed, Props>({
  components: {
    ArticleCard
  },

  computed: {
    ...mapGetters(['user']),

    profilePhoto () {
      if (this.user && this.user.firestoreUser.profile_photo) {
        return this.user.firestoreUser.profile_photo;
      };

      return '';
    },

    backgroundPhoto () {
      if (this.user && this.user.firestoreUser.profile_background) {
        return this.user.firestoreUser.profile_background;
      };

      return '';
    },

    firestoreUser () {
      return this.user?.firestoreUser;
    },
  },
});
</script>

<style lang="scss" scoped>
.profile-avatar-photo {
  border: 2px solid #FFF;
}

.translated {
  transform: translateY(-82.5px); 
}

.profile-background-photo {
  height: 250px !important;
  
}
</style>
