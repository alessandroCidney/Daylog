<template>
  <v-speed-dial
    v-model="speedDial"
    direction="top"
    :top="false"
    :right="true"
    :bottom="true"
    :left="false"
    fixed
  >
    <template v-slot:activator>
      <v-btn fab>
        <v-icon v-if="speedDial" color="space">mdi-close</v-icon>
        <v-icon v-else color="space">mdi-feather</v-icon>
      </v-btn>
    </template>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          to="/create"
          fab
          small
        >
          <v-icon color="space">mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>Create a new post</span>
    </v-tooltip>
  </v-speed-dial>
</template>

<script lang="ts">
import Vue from 'vue';

interface Data {
  speedDial: boolean;
};

interface Methods {};
interface Computed {};
interface Props {};

export default Vue.extend<Data, Methods, Computed, Props>({
  data: () => ({
    speedDial: false,
  })
});
</script>
