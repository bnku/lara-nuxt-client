<template>
  <card title="Verify Email" class="my-6" form>
    <template v-if="success">
      <div class="container my-4 mx-1">
        <b-notification type="is-success" aria-close-label="Close notification">
            {{status}}
        </b-notification>
      
        <router-link :to="{ name: 'login' }" class="button is-primary">
          Log In
        </router-link>
      </div>
    </template>
    <template v-else>
      <div class="container my-4 mx-1">
        <b-notification type="is-danger" aria-close-label="Close notification">
            {{ status || "Failed to verify email." }}
        </b-notification>

        <router-link :to="{ name: 'verification.resend' }" class="button is-small">
          Resend Verification Link ?
        </router-link>
      </div>
    </template>
  </card>
</template>

<script>
import axios from 'axios'

const qs = params => Object.keys(params).map(key => `${key}=${params[key]}`).join('&')

export default {
  middleware: 'guest',

  metaInfo () {
    return { title: "Verify Email" }
  },

  async asyncData ({ params, query }) {
    try {
      const { data } = await axios.post(`/email/verify/${params.id}?${qs(query)}`)

      return { success: true, status: data.status }
    } catch (e) {
      return { success: false, status: e.response.data.status }
    }
  }
}
</script>
