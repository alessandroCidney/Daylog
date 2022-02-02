<template>
  <v-tooltip top>
    <template v-slot:activator="{ on, attrs }">
      <div
        v-bind="attrs"
        v-on="on"
        ref="photoDiv"
        :class="{
          'drop-photo-zone': true,
          'd-flex': true,
          'align-center': true,
          'justify-center': true,
          'cursor-pointer': true,
          'bordered': !file
        }"
        @click="getFile"
      >

        <v-icon
          v-if="!file"
          color="space"
          size="40"
        >
          mdi-image-plus
        </v-icon>

        <input
          ref="photoInput"
          type="file"
          class="dont-show"
          @change="(e) => updatedFiles(e.target.files)"
        />
      </div>
    </template>
    <span>Add an image</span>
  </v-tooltip>
</template>

<script lang="ts">
import Vue from 'vue';

interface Data {
  file: File | undefined;
};

interface Props {};
interface Computed {};

interface Methods {
  updateImage: (file: File) => void;
  getFile: () => void;
  updatedFiles: (files: FileList) => void;
};

export default Vue.extend<Data, Methods, Computed, Props>({

  data: () => ({
    file: undefined,
  }),

  watch: {
    file (f: File | undefined) {
      if (!!f) {
        this.updateImage(f);
      }
    }
  },

  methods: {
    updatedFiles (files: FileList) {
      this.file = files[0];
      this.$emit('input', this.file);
    },

    updateImage (file: File): void {
      const reader = new FileReader();
      const divRef = this.$refs.photoDiv;

      reader.readAsDataURL(file);

      reader.onload = () => {
        if (divRef) (divRef as HTMLDivElement).style.backgroundImage = `url('${reader.result}')`;
      };
    },

    getFile (): void {
      const inputRef = this.$refs.photoInput;
      
      if (inputRef) (inputRef as HTMLInputElement).click();
    }
  }  
});
</script>

<style lang="scss" scoped>
.drop-photo-zone {
  width: 100%;
  height: 100%;
  min-height: 100px;

  background-position: center;
  background-size: cover;

  &.bordered {
    border: 1px solid #f0f0f0;
  }
}
</style>
