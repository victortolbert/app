<script lang="ts" setup>
import { useAuthStore } from '~/stores/useAuthStore'

const form = ref({
  email: 'test@example.com',
  password: 'password',
})

const auth = useAuthStore()

async function handleLogin() {
  const { error } = await auth.login(form.value)
}
</script>

<template>
  <UArticle>
    <UContainer :ui="{ constrained: 'max-w-md' }">
      <USection>
        <UBox class="min-w-[320px]">
          <form class="grid gap-4" @submit.prevent="handleLogin">
            <UFormGroup label="Email">
              <UInput v-model="form.email" type="email" />
            </UFormGroup>
            <UFormGroup label="Password">
              <UInput v-model="form.password" type="password" />
            </UFormGroup>
            <UButton type="submit" label="Login" block />
          </form>
        </UBox>
      </USection>
    </UContainer>
  </UArticle>
</template>
