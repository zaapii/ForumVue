<template>
  <VeeForm @submit="save" :key="formKey">
    <AppFormField
      as="textarea"
      name="text"
      v-model="postCopy.text"
      rows="10"
      cols="30"
      rules="required"
    />

    <div class="btn-group">
      <button class="btn btn-blue" type="submit" name="Publish">
        {{ post.id ? "Actualizar Post" : "Publicar" }}
      </button>
    </div>
  </VeeForm>
</template>

<script>
export default {
  data () {
    return {
      postCopy: { ...this.post },
      formKey: Math.random()
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
      this.formKey = Math.random()
    },
    cancel () {
      this.$router.push({ name: 'ForumPage', params: { id: this.forumId } })
    }
  }
}
</script>
