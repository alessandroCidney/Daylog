<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        icon
        :color="color"
        :disabled="disabled"
        @click="action"
      >
        <v-icon :size="size">
          {{ icon }}
        </v-icon>
      </v-btn>
    </template>
    <span>{{ text }}</span>
  </v-tooltip>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class IconButtonTooltipComponent extends Vue {
  @Prop({ type: String, default: 'space' }) color!: string;
  @Prop(Function) action!: () => void;
  @Prop(String) icon!: string;
  @Prop(String) text!: string;
  @Prop({ type: [Number, String], default: 24 }) size!: string | number;
  @Prop({ type: Boolean, default: false }) disabled!: boolean;
};
</script>
