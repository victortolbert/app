<script setup>
import ProjectService from '~/services/ProjectService'

defineProps({
  id: {
    type: Number,
  },
})

definePageMeta({
  title: 'Project Communication',
  breadcrumb: 'Project Communication',
})

const route = useRoute()
const router = useRouter()
const project = reactive({})

const filters = {
  all(plants) {
    return plants
  },
  toxic(plants) {
    return plants.filter((plant) => {
      return plant.toxicity
    })
  },
  'non-toxic': function (plants) {
    return plants.filter((plant) => {
      return !plant.toxicity
    })
  },
  favorites(plants) {
    return plants.filter((plant) => {
      return plant.isFavorite
    })
  },
}

const communicationType = ''

const dateRange = { start: '', end: '' }

const recipient = ''

function dateSort(a, b) {
  return new Date(b.lastSeenDateTime) - new Date(a.lastSeenDateTime)
}

ProjectService.getProject(route.params.id)
  .then((response) => {
    project.value = response.data
  })
  .catch((error) => {
    if (error.response && error.response.status === 404) {
      router.push({
        name: '404-resource',
        params: { resource: 'project' },
      })
    }
    else {
      router.push({ name: 'network-error' })
    }
  })

const messages = [
  {
    name: 'Project comments sent',
    email: 'leslie.alexander@example.com',
    source: 'Email',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Deliverables sent',
    email: 'leslie.alexander@example.com',
    source: 'Email',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: 'July 7',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Inspection Scheduled',
    email: 'leslie.alexander@example.com',
    source: 'Email',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: 'July 6',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Project created',
    email: 'leslie.alexander@example.com',
    source: 'Email',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: 'July 6',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Project created',
    email: 'leslie.alexander@example.com',
    source: 'Email',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: 'July 6',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Project created',
    email: 'leslie.alexander@example.com',
    source: 'Email',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: 'July 6',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Project created',
    email: 'leslie.alexander@example.com',
    source: 'Email',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: 'July 6',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Project created',
    email: 'leslie.alexander@example.com',
    source: 'Email',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: 'July 6',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Project created',
    email: 'leslie.alexander@example.com',
    source: 'Email',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: 'July 6',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
]

const items = [{
  label: 'Deliverables Sent',
  date: '2023-07-07 12:00 PM',
  icon: 'i-carbon-email',
  defaultOpen: true,
  sender: 'Mike Daniel',
  email: 'mike.daniel@example.com',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.',
},
{
  label: 'Inspection Completed',
  date: '2023-07-07 12:00 PM',
  icon: 'i-carbon-email',
  disabled: false,
  sender: 'Jan Willow',
  email: 'jan.willow@example.com',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.',
},
{
  label: 'Technician Assigned',
  date: '2023-07-07 12:00 PM',
  icon: 'i-carbon-email',
  disabled: false,
  sender: 'John Farrell',
  email: 'john.farrell@example.com',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.',
},
{
  label: 'Homeowner Contacted',
  date: '2023-07-07 12:00 PM',
  icon: 'i-carbon-email',
  disabled: false,
  sender: 'Eric Noble',
  email: 'eric.noble@example.com',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.',
},
{
  label: 'Adjuster contacted',
  date: '2023-07-06 12:00 PM',
  icon: 'i-carbon-email',
  disabled: false,
  sender: 'Susan Newsome',
  email: 'susan.newsome@example.com',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.',
},
{
  label: 'Project Created',
  date: '2023-07-05 12:00 PM',
  icon: 'i-carbon-email',
  disabled: false,
  sender: 'Rick Smith',
  email: 'rick.smith@example.com',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.',
},
]
</script>

<template>
  <div>
    <div class="min-h-full flex flex-col">
      <div class="mx-auto w-full flex items-start gap-x-8">
        <main class="flex-1">
          <section>
            <div class="flex items-end justify-between">
              <div class="flex items-end gap-4" />
            </div>
          </section>
          <TableToolbar />

          <div class="mt-2 h-80 overflow-y-scroll bg-white">
            <UAccordion :items="items" :ui="{ wrapper: 'flex flex-col w-full' }">
              <template #default="{ item, open }">
                <UButton color="gray" variant="ghost" class="border-b border-gray-200 dark:border-gray-700" :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }">
                  <template #leading>
                    <div class="h-6 w-6 flex items-center justify-center -my-1">
                      <IconEnvelope class="h-5 w-5 text-blue-500" />
                    </div>
                  </template>

                  <span class="truncate"> {{ item.label }} - {{ item.date }}</span>

                  <template #trailing>
                    <UIcon
                      name="i-heroicons-chevron-right-20-solid"
                      class="ms-auto h-5 w-5 transform transition-transform duration-200"
                      :class="[
                        open ? '-rotate-90' : 'rotate-90',
                      ]"
                    />
                  </template>
                </UButton>
              </template>
              <template #item="{ item }">
                <div class="bg-gray-100 p-4 italic text-gray-900 dark:text-white">
                  <p class="mt-2">
                    <span class="font-bold">{{ item.sender }}</span>, <span class="underline">{{ item.email }}</span>
                  </p>
                  <p class="mt-4">
                    {{ item.content }}
                  </p>
                </div>
              </template>
            </UAccordion>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
