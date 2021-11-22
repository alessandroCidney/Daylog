<template>
  <v-container fluid>
    <v-row align="center" justify="start" class="mt-10">
      <v-col cols="6" class="post-thumbnail pa-0 mr-2">
        <v-img
          min-width="100%"
          min-height="400px"
          src="https://cdn.pixabay.com/photo/2017/07/31/11/51/laptop-2557615_960_720.jpg"
        />
      </v-col>

      <v-col cols="5" class="text-left">
        <h1 class="post-title">Node.js - Execute JavaScript sem um browser</h1>
      </v-col>
    </v-row>

    <v-row align="center" justify="center" class="mt-10">
      <v-col cols="8" class="pa-0 mr-2">
        <v-card flat>
          <v-card-text class="black--text post-content">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta officia reiciendis omnis rerum alias vero suscipit harum dolor incidunt nobis minima ipsum inventore tenetur repellat commodi pariatur, reprehenderit vitae accusamus!
            </p>

            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto maiores numquam voluptatum minus a consectetur debitis dicta laborum aliquid molestias mollitia deserunt, aspernatur sint dolor in. Eveniet facilis magnam nostrum?
              Maiores dolores quo ipsam ullam totam magnam est provident, alias autem dolore consequuntur doloremque enim maxime eveniet tenetur sunt asperiores eligendi aliquid quas odit labore voluptas reiciendis assumenda corporis. Odit?
              Magni accusamus, quod odit deserunt vero deleniti aut corporis soluta ad molestiae fuga dolore nam id recusandae at excepturi modi dolores eaque magnam, impedit iure! Velit illo vero illum sint.
              Ipsa suscipit eius nesciunt facilis voluptas consequatur praesentium reiciendis numquam, magnam temporibus sint, sunt quod velit assumenda perspiciatis earum eum cupiditate aperiam? Facilis dignissimos mollitia necessitatibus fuga officia eum placeat?
              Unde suscipit, ex est ab corporis quae? Exercitationem, blanditiis maxime obcaecati earum beatae harum ullam aliquid explicabo consectetur repellendus nulla aperiam inventore? Ea doloribus quasi illum a omnis quibusdam rerum?
            </p>

            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta officia reiciendis omnis rerum alias vero suscipit harum dolor incidunt nobis minima ipsum inventore tenetur repellat commodi pariatur, reprehenderit vitae accusamus!
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  async asyncData({ params }) {
    const id = params.id
    return { id }
  }
})
</script>

<style lang="scss">
.post-thumbnail {
  overflow: hidden;
  border-radius: 0 8px 8px 0 !important;
}

.post-title {
  font-size: 3.5em;
  font-weight: 900 !important;
}

.post-content {
  font-size: 19px !important;
  line-height: 38px;
}
</style>
