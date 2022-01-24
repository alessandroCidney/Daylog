<template>
  <v-btn
    color="error"
    block
    class="white--text mb-6"
    :loading="loading"
    @click="handleAuth"
  >
    <v-icon left>
      mdi-google
    </v-icon>

    {{ text }}
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue';
import Authentication from '@/services/authentication/index';

interface Data {
  loading: boolean;
};

interface Methods {};
interface Computed {};

interface Props {
  text: string;
};

export default Vue.extend<Data, Methods, Computed, Props>({
  props: {
    text: { type: String, required: true },
  },

  data () {
    return {
      loading: false,
    };
  },

  methods: {
    handleAuth () {
      const service = new Authentication();

      this.loading = true;

      setTimeout(() => {
        service.signInWithGoogle();
      }, 1000)
    }
  }
});
</script>