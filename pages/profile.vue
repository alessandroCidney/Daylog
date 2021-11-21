<template>
  <v-container fluid class="pa-0">
    <v-img
      :src="require('@/assets/images/profile-mock/background.jpg')"
      alt="Profile background photo"
      width="100%"
      height="243px"
    />

    <v-row cols="12">
      <v-col cols="4" class="d-flex flex-column align-center justify-center" align-self="start">
        <v-avatar width="165px" height="165px" class="profile-avatar-photo translated">
          <v-img
            :src="require('@/assets/images/profile-mock/man.jpg')"
            alt="Avatar photo"
          />
        </v-avatar>

        <p class="master-title translated mt-3">@fernandosilva</p>
      </v-col>

      <v-col cols="6" class="d-flex flex-column align-center justify-center py-16">
        <v-row cols="12" align="center" justify="center">
          <v-col cols="10">          
            <ArticleCard
              title="Como criar seu primeiro bot com Node.js"
              description="Aprenda como criar um bot desenvolvido apenas com Node.js, uma tecnologia que permite a utilização de JavaScript sem a necessidade de um navegador."
              imageURL="https://cdn.pixabay.com/photo/2016/03/27/18/54/technology-1283624_960_720.jpg"
            />
          </v-col>
          <v-col cols="10">
            <ArticleCard
              title="Como criar seu primeiro bot com Node.js"
              description="Aprenda como criar um bot desenvolvido apenas com Node.js, uma tecnologia que permite a utilização de JavaScript sem a necessidade de um navegador."
              imageURL="https://cdn.pixabay.com/photo/2016/03/27/18/54/technology-1283624_960_720.jpg"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

import ArticleCard from '@/components/commons/ArticleCard.vue';

export default Vue.extend({
  components: {
    ArticleCard
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
</style>
