<script setup>
import { z } from 'zod'
import PasswordInput from '@/components/register/PasswordInput.vue'
import UsernameInput from '~/components/register/UsernameInput.vue'

definePageMeta({
  layout: false
})

const toast = useToast()

const schema = z.object({
  name: z.string().min(2, 'Username must be at least 4 characters').max(16, 'Username must be at most 16 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/\d/, 'Password must contain at least one number')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
})

const formState = reactive({
  name: '',
  email: '',
  password: ''
})

async function registerUser(event) {
  try {
    const response = await $fetch('http://localhost:8080/users', {
      method: 'POST',
      body: event.data
    })

    toast.add({
      title: 'Registration Successful',
      description: 'Your account has been created successfully. You can now log in.',
      color: 'success'
    })

    await navigateTo('/login')
  } catch (error) {
    const errorMessage = error.data?.message || 'An error occurred while registering. Please try again.'

    toast.add({
      title: 'Registration Failed',
      description: errorMessage,
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
        @submit="registerUser"
      >
        <div class="w-full max-w-md mx-auto">
          <h1 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white flex justify-center">
            Create Account
          </h1>

          <div class="flex flex-col gap-4">
            <UsernameInput v-model="formState.name" />

            <UFormField
              name="email"
              label="Email"
              description="We'll never share your email with anyone else."
            >
              <UInput
                v-model="formState.email"
                placeholder="Enter your email"
                class="w-full"
                required
              />
            </UFormField>

            <PasswordInput v-model="formState.password" />

            <UButton
              type="submit"
              color="primary"
              class="flex flex-col"
            >
              Sign Up
            </UButton>

            <NuxtLink
              to="/login"
              class="flex flex-col justify-center text-sm text-center text-gray-600 dark:text-gray-400 hover:underline"
            >
              Already have an account? Log in
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
