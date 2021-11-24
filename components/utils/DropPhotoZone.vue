<template>
  <div ref="photoDiv" class="drop-photo-zone" @click="getFile">

    <input ref="photoInput" type="file" class="dont-show" @change="(e) => showImage(e.target.files[0])" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface Data {};
interface Props {};
interface Computed {};

interface Methods {
  showImage: (file: File) => void;
  getFile: () => void;
};

export default Vue.extend<Data, Methods, Computed, Props>({

  methods: {
    showImage (file: File): void {
      this.$emit('loading', true);
      
      const reader = new FileReader();
      const divRef = this.$refs.photoDiv;

      reader.readAsDataURL(file);

      reader.onload = () => {
        if (divRef) (divRef as HTMLDivElement).style.backgroundImage = `url('${reader.result}')`;
      };

      reader.onloadend = () => {
        this.$emit('loading', false);
      };

      reader.onerror = () => {
        this.$emit('loading', false);
      };
    },

    getFile (): void {
      this.$emit('loading', true);

      const inputRef = this.$refs.photoInput;
      
      if (inputRef) (inputRef as HTMLInputElement).click();

      setTimeout(() => {
        this.$emit('loading', false);
      }, 10000);
    }
  }  
});
</script>

<style lang="scss" scoped>
.drop-photo-zone {
  width: 100%;
  height: 100%;

  border: 1px dashed #DDD;
  border-radius: 4px;
}
</style>
