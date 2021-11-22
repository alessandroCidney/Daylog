<template>
  <v-card
    class="editor"
    flat
    width="100%"
    height="100%"
  >
    <EditorContent :editor="editor" />
  </v-card>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';

import { Editor, EditorContent } from '@tiptap/vue-2';
import StarterKit from '@tiptap/starter-kit';

export default Vue.extend({
  components: {
    EditorContent
  },

  data: () => ({
    editor: null as Editor | null,
  }),

  computed: {
    editorHTML () {
      return this.editor?.getHTML();
    }
  },

  watch: {
    editorHTML (v) {
      console.log(v);
    }
  },

  mounted () {
    this.editor = new Editor({
      extensions: [
        StarterKit
      ],
      content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet sit nam nisi dolore voluptatum architecto sint dolor corrupti, odio asperiores delectus molestias totam blanditiis rerum maxime doloremque reiciendis iure illo.
Autem dolore possimus reprehenderit unde in error nemo voluptatum cumque? Nostrum sapiente, eveniet nobis cumque, quod, sequi consectetur qui earum id nesciunt dolor. Minus odit expedita molestiae reprehenderit consectetur asperiores?
Suscipit consequatur ullam itaque impedit ut est minus iste dolor ea iure? Earum quibusdam asperiores fuga quam debitis necessitatibus sint, obcaecati eius. Corrupti qui dolorum fugit consequatur, eos similique deserunt!
Necessitatibus consectetur, voluptates magnam neque dolorum non est quidem velit pariatur sed saepe quo reiciendis, iusto voluptate sit ex a maxime esse eos. Expedita culpa laudantium consequuntur unde natus aspernatur?
Id nisi nam laboriosam facere eos placeat ipsam natus repellat repudiandae illo ipsum nulla nostrum quo eius molestiae fuga deleniti veniam exercitationem, voluptatum eum expedita quam. Excepturi minus consequuntur explicabo?
Nesciunt, quibusdam eveniet. Cumque odit ipsum est facere ipsa eum architecto dolore ut. Unde tenetur suscipit earum, mollitia obcaecati expedita sit sunt cum est voluptas amet enim voluptatibus molestiae autem.
Minima possimus sunt explicabo eos quia voluptas cum quis nostrum eaque, ullam provident dolore, nam ut quas. At unde eos natus consequatur velit, eum adipisci eveniet quos, perspiciatis aut maiores?
Unde sapiente cupiditate dolore quasi illum voluptatem quas dolor odit ullam saepe maxime distinctio fuga modi, porro eligendi quo ipsa minus doloribus ipsam totam nam quam aliquam! Itaque, officiis aliquam!
Voluptate vel tempore adipisci aliquid maiores. Soluta illo dicta voluptates veritatis amet qui placeat at aliquid blanditiis est sint voluptas aliquam, quam, obcaecati nisi dolores maxime officiis iusto laborum doloremque.
Molestiae aspernatur voluptatem dolore magni. Voluptatibus veniam repellat libero accusamus fuga enim eum quam non consequatur id earum sint eos placeat ipsum modi omnis rerum iste, cum maxime corrupti nulla.
Illum repellat a enim dolores. Asperiores ipsam pariatur fuga voluptatibus temporibus vitae similique quia cupiditate soluta voluptas minus, sint magnam voluptatum rerum hic possimus velit! Iure ipsa ex iste reprehenderit.
Debitis reprehenderit corrupti fuga et aut, quod eos nesciunt animi cupiditate voluptate aspernatur nemo necessitatibus harum suscipit illum laboriosam neque, inventore impedit veniam. Culpa sapiente veritatis aliquid possimus rerum dolores!
Nemo at quaerat magnam quis! Iure id delectus molestias accusamus eos, accusantium dolor dignissimos, reiciendis, odit aliquid dolorum. Fugiat excepturi odit dolores minus modi eos, dolore magnam. Quibusdam, veniam eligendi.
Odio sed itaque, esse voluptate, libero odit eum autem ea, maxime omnis sunt voluptatem! Debitis eaque iure ullam quos. Ex, similique omnis blanditiis sequi sit numquam sunt eum voluptate unde!
Aperiam eligendi aliquam, ab reprehenderit quod eum molestiae, impedit atque officia ut sed? Dolor adipisci optio perspiciatis ullam excepturi quo totam quae nulla nisi nam doloribus atque cupiditate, voluptate commodi?
Ipsa, et commodi numquam at, iure vitae iste illum quis quaerat atque consequatur veniam exercitationem labore deleniti fugiat! Eius accusamus inventore ipsum similique! Nam eum labore, fugiat earum magni repudiandae.
Vel, nihil quae. Numquam natus culpa voluptates illum ea, odit perferendis praesentium ex, beatae tenetur consectetur pariatur ratione? Reiciendis ipsum officiis repudiandae odit, rerum fugiat molestiae. Voluptas vel itaque ullam.
Impedit vel beatae, laudantium culpa cum explicabo dolorem in voluptates ut illo quis earum nihil omnis ab animi porro minus? Dolorem ipsum veritatis eius. Fugiat numquam impedit maiores cum soluta.
Illum accusantium suscipit non nisi neque, nulla deleniti, eos soluta illo eum officia. Laudantium, corrupti aperiam. Molestias, eligendi, eius saepe ipsa corrupti possimus consectetur, vitae veritatis neque aut ipsam tempora!
Nihil at vero doloremque voluptate expedita rerum voluptatem impedit accusamus, porro dicta sit aut iste tempore saepe minus maxime quos culpa modi et? Doloremque iusto velit ex. Eveniet, similique ea?`
    });
  },

  beforeDestroy () {
    this.editor?.destroy();
  },
});
</script>

<style lang="scss">
.editor {

  > div {
    width: 100% !important;
    height: 100% !important;

    > div {
      width: 100% !important;
      height: 100% !important;

      padding: 20px;
    }

    .ProseMirror {
      border: 0 !important;
    }

    .ProseMirror:focus-visible {
      outline: 0 !important;
    }
  }
}
</style>
