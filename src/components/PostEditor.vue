<template>
  <form @submit.prevent="save">
    <!--       <div class="form-group">
        <label for="thread_title">Título:</label>
        <input type="text" id="thread_title" class="form-input" name="title" />
      </div> -->

    <div class="form-group">
      <label for="thread_content">Contenido:</label>
      <textarea
        v-model="postCopy.text"
        id="thread_content"
        class="form-input"
        name="content"
        rows="8"
        cols="140"
      ></textarea>
    </div>

    <div class="btn-group">
      <button class="btn btn-blue" type="submit" name="Publish">
        {{ post.id ? "Actualizar Post" : "Publicar" }}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  data () {
    return {
      postCopy: { ...this.post }
    }
  },
  props: {
    forumId: {
      type: String
    },
    post: {
      type: Object,
      default: () => ({ text: null })
    }
  },
  methods: {
    save () {
      this.$emit('save', { post: this.postCopy })
      this.postCopy.text = ''
    },
    cancel () {
      this.$router.push({ name: 'ForumPage', params: { id: this.forumId } })
    }
  }
}
</script>
