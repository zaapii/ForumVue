<template>
    <form @submit.prevent="save">
<!--       <div class="form-group">
        <label for="thread_title">Título:</label>
        <input type="text" id="thread_title" class="form-input" name="title" />
      </div> -->

      <div class="form-group">
        <label for="thread_content">Contenido:</label>
        <textarea
          v-model="text"
          id="thread_content"
          class="form-input"
          name="content"
          rows="8"
          cols="140"
        ></textarea>
      </div>

      <div class="btn-group">
        <button type="button" @click="cancel" class="btn btn-ghost">Cancelar</button>
        <button class="btn btn-blue" type="submit" name="Publish">
          Publicar
        </button>
      </div>
    </form>
</template>

<script>
export default {
  props: {
    forumId: {
      type: String
    }
  },
  methods: {
    save () {
      const post = {
        text: this.text
      }

      this.$emit('save', { post })
      this.text = ''
    },
    cancel () {
      this.$router.push({ name: 'ForumPage', params: { id: this.forumId } })
    }
  }
}
</script>
