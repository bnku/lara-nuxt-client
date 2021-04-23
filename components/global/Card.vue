<template>
  <div class="panel is-primary" :class="{ form: form }">
    <p v-if="title" class="panel-heading">
      {{ title }}
    </p>

    <div class="panel-block">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",

  props: {
    title: { type: String, default: null },
    form: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss" scoped>
.form {
  max-width: 500px;
  margin: 0 auto;
}
</style>
