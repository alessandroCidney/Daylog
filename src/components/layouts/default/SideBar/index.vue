<template>
  <v-navigation-drawer v-model="sidebar" app clipped floating width="29vw">
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
import { namespace } from 'vuex-class';

import routes from '@/data/objects/routes.json';

import SideBarItem from './components/SideBarItem.vue';

import { TRoute } from '@/types/data/objects/routes';

const sidebarModule = namespace('sidebar');

@Component({
  components: { SideBarItem }
})
export default class SideBarComponent extends Vue {
  routes: TRoute[] = routes;

  @sidebarModule.State open!: boolean;
  @sidebarModule.Mutation setOpen!: (bool: boolean) => void;

  get sidebar () {
    return this.open;
  };

  set sidebar (bool: boolean) {
    this.setOpen(bool);
  };
};
</script>