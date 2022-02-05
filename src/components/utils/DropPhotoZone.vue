<template>
  <v-tooltip top>
    <template #activator="{ on, attrs, value }">
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
          'withFile': !!file
        }"
        @click="getFile"
      >

        <v-icon
          v-if="!file"
          color="space"
          size="40"
        >
          {{ value ? 'mdi-image-plus' : 'mdi-image' }}
        </v-icon>

        <input
          ref="photoInput"
          type="file"
          class="dont-show"
          @change="(e) => updatedFiles(e.target.files)"
        />
      </div>
    </template>
    <span>{{ !!file ? 'Change image' : 'Add an image' }}</span>
  </v-tooltip>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component
export default class DropPhotoZoneComponent extends Vue {
  file: File | null = null;

  @Watch('file')
  onFileChanged (f: File | null) {
    if (!!f) {
      this.updateImage(f);
    };
  };

  updateImage (file: File): void {
    const reader = new FileReader();
    const divRef = this.$refs.photoDiv;

    reader.readAsDataURL(file);

    reader.onload = () => {
      if (divRef) (divRef as HTMLDivElement).style.backgroundImage = `url('${reader.result}')`;
    };
  };

  getFile (): void {
    const inputRef = this.$refs.photoInput;
    
    if (inputRef) (inputRef as HTMLInputElement).click();
  };

  updatedFiles (files: FileList) {
    this.file = files[0];
    this.$emit('input', this.file);
  };
}; 
</script>

<style lang="scss" scoped>
.drop-photo-zone {
  width: 100%;
  height: 100%;
  min-height: 50px;

  background-position: center;
  background-size: cover;

  transition: all .3s ease;

  &.bordered {
    border: 1px solid #f0f0f0;
  }

  &.withFile {
    height: 400px;
  }
}
</style>
