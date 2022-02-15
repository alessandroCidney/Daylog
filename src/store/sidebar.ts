import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';

@Module
export default class SidebarModule extends VuexModule {
  open = true;

  @Mutation
  setOpen (bool: boolean) {
    this.open = bool;
  };
};