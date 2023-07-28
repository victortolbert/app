<script lang="ts" setup>
import { useAuthStore } from '~/stores/useAuthStore'

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const auth = useAuthStore()

async function handleRegister() {
  const { error } = await auth.register(form.value)
  if (!error.value)
    navigateTo('/')
}
</script>

<template>
  <UArticle>
    <UContainer :ui="{ constrained: 'max-w-md' }">
      <USection>
        <UBox class="min-w-[320px]">
          <form class="grid gap-4" @submit.prevent="handleRegister">
            <UFormGroup label="Name">
              <UInput v-model="form.name" type="text" />
            </UFormGroup>

            <UFormGroup label="Email">
              <UInput v-model="form.email" type="email" />
            </UFormGroup>

            <UFormGroup label="Password">
              <UInput v-model="form.password" type="password" />
            </UFormGroup>

            <UFormGroup label="Password confirmation">
              <UInput v-model="form.password_confirmation" type="password" />
            </UFormGroup>

            <UButton type="submit" label="Register" block />
          </form>
        </UBox>
      </USection>
    </UContainer>
  </UArticle>
</template>
