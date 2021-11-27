<template>
  <v-container>
    <v-row align="center" justify="center" class="mt-10">
      <v-col md="8" sm="10">
        <ArticleCard
          title="Como criar seu primeiro bot com Node.js"
          description="Aprenda como criar um bot desenvolvido apenas com Node.js, uma tecnologia que permite a utilização de JavaScript sem a necessidade de um navegador."
          imageURL="https://cdn.pixabay.com/photo/2016/03/27/18/54/technology-1283624_960_720.jpg"
        />
      </v-col>

      <v-col  md="8" sm="10">
        <ArticleCard
          title="A arte do trabalho em equipe"
          description="Descubra as vantagens do trabalho em equipe para o desenvolvimento de projetos."
          imageURL="https://cdn.pixabay.com/photo/2014/07/08/10/47/team-386673_960_720.jpg"
        />
      </v-col>
    </v-row>


    <v-btn color="#FFF" fab fixed right bottom to="/create">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    
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
