<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        :color="color"
        icon
        v-bind="attrs"
        v-on="on"
        @click="action"
      >
        <v-icon :size="size">
          {{ icon }}
        </v-icon>
      </v-btn>
    </template>
    <span>{{ text }}</span>
  </v-tooltip>
</template>

<script lang="ts">
import Vue from 'vue';

interface Data {};
interface Methods {};
interface Computed {};

interface Props {
  color: string;
  action: () => void;
  icon: string;
  text: string;
  size: string | number;
};

export default Vue.extend<Data, Methods, Computed, Props>({
  props: {
    color: { type: String, required: false, default: 'space' },
    action: { type: Function, required: false, default: () => {} },
    icon: { type: String, required: true },
    text: { type: String, required: true },
    size: { type: [Number, String], required: false, default: 24 }
  }
});
</script>
