<script setup>
import PasswordInput from '@/components/register/PasswordInput.vue'
import UsernameInput from '~/components/register/UsernameInput.vue';

const handleSubmit = async () => {
  await navigateTo('/login')
}

</script>

<template>
  <div class="min-h-screen grid grid-cols-1 md:grid-cols-2">

    <div class="flex flex-col justify-center px-8 sm:px-16 lg:px-24">
      
      <UForm @submit="handleSubmit">
        <div class="w-full max-w-md mx-auto">
          <h1 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white flex justify-center">Create Account</h1>

          <div class="flex flex-col gap-4">
            
              <UsernameInput/>

              <UFormField label="Email" description="We'll never share your email with anyone else.">
                <UInput placeholder="Enter your email" class="w-full" />
              </UFormField>

              <PasswordInput/>

              <UButton type="submit" color="primary" class="flex flex-col" nuxtlink="/login">Sign Up</UButton>

              <NuxtLink to="/login" class="flex flex-col justify-center text-sm text-center text-gray-600 dark:text-gray-400 hover:underline">
                Already have an account? Log in
              </NuxtLink>
          </div>
        </div>
      </UForm>
    </div>

    <div class="hidden md:flex bg-linear-to-l from-purple-500 items-center justify-center p-12">
    <!-- <div class="hidden md:flex bg-gray-50 dark:bg-gray-900 items-center justify-center p-12"> -->
      
    </div>
  </div>
</template>