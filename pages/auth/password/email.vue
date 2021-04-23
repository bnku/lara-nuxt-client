<template>
  <card title="Reset Password" class="my-6" form>
    <form @submit.prevent="send" @keydown="form.onKeydown($event)" class="container my-4 mx-1">
      <b-notification v-if="status" type="is-success" aria-close-label="Close notification">
        {{ status }}
      </b-notification>

      <b-field
        :type="{ 'is-danger': form.errors.has('email') }"
        :message="form.errors.has('email') ? form.errors.errors.email[0] : ''"
      >
        <b-input placeholder="Email" required v-model="form.email" type="email" icon="envelope" size="is-medium" />
      </b-field>

      <b-button @click="send" :loading="form.busy" expanded class="is-primary mt-5">
        Send Password Reset Link
      </b-button>
    </form>
  </card>
</template>

<script>
import Form from "vform";

export default {
  data: () => ({
    status: "",
    form: new Form({
      email: "",
    }),
  }),

  head() {
    return { title: "Reset Password" };
  },

  methods: {
    send() {
      this.form.post("/password/email").then(({ data }) => {
        this.status = data.status;
        this.form.reset();
      });
    },
  },
};
</script>
