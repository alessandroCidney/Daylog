<template>
  <div>
    <h2 class="mb-10">Data</h2>

    <h3 class="mb-5">Download data</h3>

    <p>You can download your data by using the following options:</p>

    <v-btn
      block
      depressed
      class="mb-2 space--text"
      :loading="loadingDownload"
      @click="handleDownloadAccountData"
    >
      Download my account data
    </v-btn>

    <h3 class="mb-5">Remove data</h3>

    <p>You can remove your data by using the following options:</p>

    <v-btn
      block
      depressed
      class="mb-2 error--text"
    >
      Delete all my data
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import { OnSetUserData } from '@/mixins';

@Component
export default class DataTabComponent extends Mixins(OnSetUserData) {
  loadingDownload = false;

  async handleDownloadAccountData () {
    function downloadByURL (url: string) {
      const a = document.createElement('a');
      a.download = 'Account_Data.zip';
      a.href = url;

      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
    };
    
    this.loadingDownload = true;

    const results = await this.usersService?.getAccountData();  

    if (results) {
      downloadByURL(results);
    };

    this.loadingDownload = false;
  };
};
</script>