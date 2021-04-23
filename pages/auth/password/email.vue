<template>
  <div class="row">
    <div class="col-lg-8 m-auto">
      <card title="Reset Password">
        <form @submit.prevent="send" @keydown="form.onKeydown($event)">
          <alert-success :form="form" :message="status" />

          <!-- Email -->
          <div class="form-group row">
            <label class="col-md-3 col-form-label text-md-right">Email</label>
            <div class="col-md-7">
              <input v-model="form.email" :class="{ 'is-invalid': form.errors.has('email') }" type="email" name="email" class="form-control">
              <has-error :form="form" field="email" />
            </div>
          </div>

          <!-- Submit Button -->
          <div class="form-group row">
            <div class="col-md-9 ml-md-auto">
              <v-button :loading="form.busy">
                Send Password Reset Link
              </v-button>
            </div>
          </div>
        </form>
      </card>
    </div>
  </div>
</template>

<script>
import Form from 'vform'

export default {
  data: () => ({
    status: '',
    form: new Form({
      email: ''
    })
  }),

  head () {
    return { title: "Reset Password" }
  },

  methods: {
    send () {
      this.form.post('/password/email').then(({ data }) => {
        this.status = data.status
        this.form.reset()
      })
    }
  }
}
</script>
