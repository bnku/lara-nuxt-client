<template>
  <div>
    <div class="error">
      <div class="panel is-danger">
        <p class="panel-heading">
          {{ message }}
        </p>

        <div class="panel-block is-flex is-flex-direction-column py-6">
          <b-icon icon="exclamation-triangle" size="is-large" type="is-danger" />

          <div class="title">{{ statusCode }}</div>
          <p v-if="statusCode === 404" class="description">
            <a v-if="typeof $route === 'undefined'" class="error-link" href="/"></a>
            <b-button v-else tag="router-link" to="/">Back to the home page</b-button>
          </p>

          <p class="description" v-else>
            An error occurred while rendering the page. Check developer tools console for details.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "~/components/Navbar";

export default {
  layout: "default",

  props: {
    error: {
      type: Object,
      default: null,
    },
  },

  components: {
    Navbar,
  },

  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500;
    },
    message() {
      return this.error.message || "Error";
    },
  },

  head() {
    return {
      title: this.message,
      meta: [
        {
          name: "viewport",
          content: "width=device-width,initial-scale=1.0,minimum-scale=1.0",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.error {
  max-width: 500px;
  margin: 0 auto;
}
</style>
