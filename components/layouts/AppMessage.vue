<template>
  <v-snackbar
    color="space"
    v-model="appMessageActive"
  >
    <v-icon left>
      {{ appMessageIcon }}
    </v-icon>

    {{ appMessageContent }}

    <template v-slot:action="{ attrs }">
      <v-btn icon right v-bind="attrs" @click="appMessageActive = false">
        <v-icon small>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import { TSnackbarMessage } from '@/types/messages';

interface Data {
  message: boolean;
};

interface Methods {
  setAppMessage: (message: TSnackbarMessage) => void;
};

interface Computed {
  appMessage: TSnackbarMessage;
  appMessageActive: boolean;
  appMessageContent: string;
  appMessageStatus: 'none' | 'success' | 'error';
  appMessageIcon: string;
};

interface Props {};

export default Vue.extend<Data, Methods, Computed, Props>({
  computed: {
    ...mapGetters(['appMessage']),

    appMessageActive: {
      get () {
        return this.appMessage.active;
      },

      set (active: boolean) {
        this.setAppMessage({
          ...this.appMessage,
          active
        })
      }
    },

    appMessageContent () {
      return this.appMessage.message;
    },

    appMessageStatus () {
      return this.appMessage.status;
    },

    appMessageIcon () {
      if (this.appMessageStatus === 'success') {
        return 'mdi-check-circle';
      };

      if (this.appMessageStatus === 'error') {
        return 'mdi-alert-circle';
      };

      return '';
    }
  },

  methods: {
    ...mapMutations(['setAppMessage'])
  }
});
</script>
