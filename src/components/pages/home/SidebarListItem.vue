<template>
  <v-list-item :to="to" active-class="sidebarItemActive">
    <template v-slot:default="{ active }">
      <v-list-item-icon>
        <v-icon>{{ active ? icon : `${icon}-outline` }}</v-icon>
      </v-list-item-icon>
      <v-list-item-title>{{ title }}</v-list-item-title>
    </template>
  </v-list-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class SidebarListItem extends Vue {
  @Prop(String) readonly icon!: string;
  @Prop(String) readonly title!: string;
  @Prop(String) readonly to!: string;
};
</script>

<style lang="scss">
.sidebarItemActive {
  font-weight: 700;

  &::before {
    background: #FFF;
    border: 2px solid var(--v-space-base);
    border-radius: 8px;
  }
}
</style>