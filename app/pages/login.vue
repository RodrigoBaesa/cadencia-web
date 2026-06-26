<script setup>
import { z } from 'zod'

definePageMeta({
  layout: false
})

const schema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
})

const show = ref(false)

const toast = useToast()

const formState = reactive({
  email: '',
  password: ''
})

async function loginUser(event) {
  try {
    const authCookie = useCookie('auth_token', {
      maxAge: 60 * 60 * 2,
      path: '/'
    })

    const response = await $fetch('http://localhost:8080/login', {
      method: 'POST',
      body: event.data
    })

    authCookie.value = response.token

    toast.add({
      title: 'Login Successful',
      description: 'You logged in successfully. Welcome back!',
      color: 'success'
    })

    await navigateTo('/')
  } catch {
    toast.add({
      title: 'Login Failed',
      description: '',
      color: 'error',
      icon: 'i-lucide-circle-x'
    })
  }
}
</script>

<template>
  <div class="min-h-screen grid grid-cols-1 md:grid-cols-2">
    <div class="flex flex-col justify-center px-8 sm:px-16 lg:px-24">
      <UForm
        :schema="schema"
        :state="formState"
        class="w-full"
        @submit="loginUser"
      >
        <div class="w-full max-w-md mx-auto">
          <h1 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white flex justify-center">
            Log in to Your Account
          </h1>

          <div class="flex flex-col gap-4">
            <UFormField
              name="email"
              label="Email"
              description="Enter the email address associated with your account."
            >
              <UInput
                v-model="formState.email"
                placeholder="Enter your email"
                class="w-full"
                required
              />
            </UFormField>

            <UFormField
              class="w-full"
              name="password"
              label="Password"
              description="Enter your account password."
            >
              <UInput
                v-model="formState.password"
                class="w-full"
                placeholder="Password"
                :type="show ? 'text' : 'password'"
                :ui="{ trailing: 'pe-1' }"
              >
                <template #trailing>
                  <UButton
                    color="neutral"
                    variant="link"
                    size="sm"
                    :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                    :aria-label="show ? 'Hide password' : 'Show password'"
                    :aria-pressed="show"
                    aria-controls="password"
                    @click="show = !show"
                  />
                </template>
              </UInput>
            </UFormField>

            <UButton
              type="submit"
              color="primary"
              class="flex flex-col"
            >
              Log in
            </UButton>

            <NuxtLink
              to="/register"
              class="flex flex-col justify-center text-sm text-center text-gray-600 dark:text-gray-400 hover:underline"
            >
              Don't have an account? Sign Up
            </NuxtLink>
          </div>
        </div>
      </UForm>
    </div>

    <div class="hidden md:flex bg-linear-to-l from-purple-500 items-center justify-center p-12">
      <!-- <div class="hidden md:flex bg-gray-50 dark:bg-gray-900 items-center justify-center p-12"> -->
      <div class="text-center text-white">
        <h2 class="text-4xl font-bold mb-4">
          Welcome to Cadencia
        </h2>
        <p class="text-lg">
          Gamify your music theory journey!
        </p>
      </div>
    </div>
  </div>
</template>
