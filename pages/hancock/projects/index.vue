<script setup>
import { columns, projects } from '~/data/projects'

definePageMeta({
  title: 'Projects',
  breadcrumb: 'Projects',
  action: 'Add Project',
  actionPath: '/projects/add',
  status: 'Prototype',
})

const toast = useToast()

const selectedColumns = ref([...columns].filter(column => !column.hidden))
const selectedProjects = ref([projects[1]])

function rowActions(row) {
  return [
    [
      {
        label: 'Edit',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => navigateTo({
          path: '/projects/1154912/edit',
        }),
      },
      {
        label: 'PIF',
        icon: 'i-heroicons-document-duplicate-20-solid',
        click: () => navigateTo({
          path: '/projects/1154912/pif',
        }),
      },
    ],
    [
      {
        label: 'Archive',
        icon: 'i-heroicons-archive-box-20-solid',
        click: () => toast.add({ title: 'Archiving...' }),
      },
      {
        label: 'Move',
        icon: 'i-heroicons-arrow-right-circle-20-solid',
      },
    ],
    [
      {
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid',
        click: () => toast.add({ title: 'Deleting...' }),
      },
    ],
  ]
}
</script>

<template>
  <USection>
    <div class="flex justify-between">
      <div class="max-w-xs">
        <UFormGroup name="display-columns" label="Display Columns">
          <USelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Columns" />
        </UFormGroup>
      </div>
      <div class="max-w-xs">
        <UFormGroup name="display-columns" label="Sort by">
          <USelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Columns" />
        </UFormGroup>
      </div>
    </div>
    <div class="mt-4 border bg-white dark:border-gray-800 dark:bg-gray-900">
      <div class="overflow-auto">
        <UTable v-model="selectedProjects" :columns="selectedColumns" :rows="projects" class="whitespace-nowrap">
          <template #ProjectNumber-data="{ row }">
            <NuxtLink
              to="/projects/1154912/edit"
              class="font-medium text-blue-500 dark:text-blue-400 hover:underline"
            >
              {{ row.ProjectNumber }}
            </NuxtLink>
          </template>

          <template #actions-data="{ row }">
            <UDropdown :items="rowActions(row)">
              <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
            </UDropdown>
          </template>
        </UTable>
      </div>
    </div>
  </USection>
</template>
