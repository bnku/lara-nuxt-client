<template>
  <card title="Verify Email" class="my-6" form>
    <form @submit.prevent="send" @keydown="form.onKeydown($event)" class="container my-4 mx-1">
      <b-notification v-if="status" type="is-success" aria-close-label="Close notification">
        {{ status }}
      </b-notification>

      <!-- Email -->
      <b-field
        :type="{ 'is-danger': form.errors.has('email') }"
        :message="form.errors.has('email') ? form.errors.errors.email[0] : ''"
      >
        <b-input placeholder="Email" required v-model="form.email" type="email" icon="envelope" size="is-medium" />
      </b-field>

      <!-- Submit Button -->
      <b-button @click="send" :loading="form.busy" expanded class="is-primary mt-5">
        Send Verification Link
      </b-button>
    </form>
  </card>
</template>

<script>
import Form from "vform";

export default {
  middleware: "guest",

  metaInfo() {
    return { title: "Verify Email" };
  },

  data: () => ({
    status: "",
    form: new Form({
      email: "",
    }),
  }),

  created() {
    if (this.$route.query.email) {
      this.form.email = this.$route.query.email;
    }
  },

  methods: {
    send() {
      this.form.post("/email/resend").then(({ data }) => {
        this.status = data.status;
        this.form.reset();
      });
    },
  },
};
</script>
