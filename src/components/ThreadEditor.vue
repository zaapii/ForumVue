<template>
  <VeeForm @submit="save">
    <AppFormField
      label="Title"
      name="title"
      v-model="form.title"
      rules="required"
    />
    <AppFormField
      as="textarea"
      label="Content"
      name="text"
      v-model="form.text"
      rules="required"
      rows="8"
      cols="140"
    />

    <div class="btn-group">
      <button @click.prevent="$emit('cancel')" class="btn btn-ghost">
        Cancel
      </button>
      <button class="btn btn-blue" type="submit" name="Publish">
        {{ existing ? "Update" : "Publish" }}
      </button>
    </div>
  </VeeForm>
</template>

<script>
export default {
  props: {
    title: { type: String, default: "" },
    text: { type: String, default: "" },
  },
  data() {
    return {
      form: {
        title: this.title,
        text: this.text,
      },
    };
  },
  methods: {
    save() {
      this.$emit("save", { ...this.form });
      this.$emit("clean");
    },
  },
  watch: {
    form: {
      handler() {
        if (this.form.title !== this.title || this.form.text !== this.text) {
          this.$emit("dirty");
        } else {
          this.$emit("clean");
        }
      },
      deep: true,
    },
  },
  computed: {
    existing() {
      return !!this.title;
    },
  },
};
</script>
