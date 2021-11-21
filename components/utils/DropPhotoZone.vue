<template>
  <div ref="photoDiv" class="drop-photo-zone" @click="getFile">

    <input ref="photoInput" type="file" class="dont-show" @change="(e) => showImage(e.target.files[0])" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({

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
  width: 150px;
  min-width: 150px;
  height: 150px;
  min-height: 150px;

  border-radius: 50%;

  border: 1px solid #DDD;

  cursor: pointer;

  background-size: cover;
  background-position: center;
}
</style>