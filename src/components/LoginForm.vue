<template>
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="logShowAlert"
    :class="logAlertVariant"
  >
    {{ logAlertMsg }}
  </div>
  <VeeForm :validation-schema="loginSchema" @submit="login">
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <VeeField
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
        name="email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <VeeField
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <button
      type="submit"
      :disabled="logInSubmission"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
    >
      Submit
    </button>
  </VeeForm>
</template>

<script>
import { mapActions } from 'pinia'
import useUserStore from '@/stores/user'

export default {
  data() {
    return {
      logInSubmission: false,
      logShowAlert: false,
      logAlertVariant: 'bg-blue-500',
      logAlertMsg: 'Please wait! YWe are logging you in.',
      loginSchema: {
        email: 'required|email',
        password: 'required|min:9|max:100'
      }
    }
  },
  methods: {
    ...mapActions(useUserStore, ['authenticate']),
    async login(values) {
      this.logInSubmission = true
      this.logShowAlert = true
      this.logAlertVariant = 'bg-blue-500'
      this.logAlertMsg = 'Please wait! We are logging you in.'

      try {
        await this.authenticate(values)
      } catch (err) {
        this.logInSubmission = false
        this.logAlertVariant = 'bg-red-500'
        this.logAlertMsg = 'Invalid login details.'
        return
      }

      this.logAlertVariant = 'bg-green-500'
      this.logAlertMsg = 'Success! You are logged in!'

      window.location.reload()
    }
  }
}
</script>
