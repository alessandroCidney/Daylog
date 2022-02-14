<template>
  <v-hover v-slot="{ hover }">
    <v-list-item :to="route.to" active-class="space--text">
      <template #default="{ active }">
        <v-list-item-icon>
          <v-icon :color="hover ? 'space' : undefined">
            {{ (hover || active) ? route.activeIcon : route.icon }}
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content :class="{ 'space--text': hover }">
          <v-list-item-title>
            {{ route.title }}
          </v-list-item-title>
        </v-list-item-content>
      </template>
    </v-list-item>
  </v-hover>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { TRoute } from '@/types/data/objects/routes';

@Component
export default class SideBarItemComponent extends Vue {
  @Prop(Object) route!: TRoute;
};
</script>