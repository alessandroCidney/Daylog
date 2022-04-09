<template>
  <v-row align="center" justify="center" >
    <v-col cols="12">
      <v-card flat class="light pa-3 rounded-lg">
        <v-row>
          <v-avatar width="50px" height="50px" class="mt-3 ml-3">
            <v-img
              :src="profilePhoto"
            />
          </v-avatar>
          <v-col cols="10" class="pl-0 pt-0">
            <v-textarea
              v-model="content"
              label="Create a new post!"
              color="space"
              solo
              flat
              auto-grow
              rows="2"
              hide-details
            />
          </v-col>
        </v-row>
        
        <div class="d-flex">
          <v-spacer />
          <v-btn
            color="space"
            class="white--text rounded-xl"
            depressed
            @click="handleNewPost"
          >
            <v-icon left>
              mdi-plus
            </v-icon>
            Create a new post
          </v-btn>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { WritterService } from '@/services/writter';

@Component
export default class CreatePostButtonComponent extends Vue {
  content = '';
  writterService = new WritterService();

  @Prop(String) readonly profilePhoto!: string;

  handleNewPost () {
    this.writterService.savePost({ content: this.content });
    this.$router.push('/create');
  };
};
</script>