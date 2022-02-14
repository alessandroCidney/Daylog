<template>
  <v-navigation-drawer app clipped floating width="29vw">
    <v-list rounded class="mt-16" width="70%">
      <SideBarItem
        v-for="(route, index) in routes"
        :key="'SideBarItem' + index"
        :route="route"
        class="ml-6"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import routes from '@/data/objects/routes.json';

import SideBarItem from './components/SideBarItem.vue';

import { TRoute } from '@/types/data/objects/routes';

@Component({
  components: { SideBarItem }
})
export default class SideBarComponent extends Vue {
  routes: TRoute[] = routes;
};
</script>