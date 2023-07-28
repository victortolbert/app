<script setup>
import { definePageMeta } from '#imports'

import {
  carriers, companies, projectStatuses, serviceTechnicians,
  serviceTypes, states, territories, userRoles,
} from '~/data'

definePageMeta({
  middleware: ['auth'],
})

const showMap = ref(true)

const selectedServiceTechnician = ref(serviceTechnicians[0])
const selectedState = ref(states[0])
const selectedCompany = ref(companies[0])
const selectedCarrier = ref(null)
const selectedTerritory = ref(territories[0])
const selectedUserRoles = ref([])
const selectedProjectStatuses = ref([])
const selectedServiceTypes = ref([])
const loading = ref(false)

function onClick() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)
}
</script>

<template>
  <UArticle>
    <UContainer>
      <USection class="flex gap-8">
        <aside class="hidden md:block md:basis-2/12 dark:border-gray-800 dark:bg-gray-900">
          <UBox class="grid gap-4">
            <UFormGroup name="Company" label="Company">
              <USelectMenu
                v-model="selectedCarrier"
                placeholder="Select company..." searchable searchable-placeholder="Search for company..." :options="carriers" option-attribute="text"
              />
            </UFormGroup>

            <UFormGroup name="service-types" label="Service Type(s)">
              <USelectMenu
                v-model="selectedServiceTypes"
                :options="serviceTypes"
                multiple
                placeholder="Select service types..."
              />
            </UFormGroup>

            <UFormGroup name="project-statuses" label="Project Status">
              <USelectMenu
                v-model="selectedProjectStatuses"
                :options="projectStatuses"
                multiple
                placeholder="Select project status..."
              />
            </UFormGroup>

            <UFormGroup name="users-roles" label="User Role(s)">
              <USelectMenu
                v-model="selectedUserRoles"
                :options="userRoles"
                multiple
                placeholder="Select user roles..."
              />
            </UFormGroup>

            <UFormGroup name="companies" label="Company">
              <USelectMenu
                v-model="selectedCompany"
                :options="companies"
                searchable
                searchable-placeholder="Search for company..."
              >
                <template #label>
                  <UIcon v-if="selectedCompany.icon" :name="selectedCompany.icon" class="h-4 w-4" />
                  <UAvatar v-else-if="selectedCompany.avatar" v-bind="selectedCompany.avatar" size="3xs" />
                  {{ selectedCompany.label }}
                </template>
              </USelectMenu>
            </UFormGroup>

            <UFormGroup name="service-techs" label="Service Technician">
              <USelectMenu v-model="selectedServiceTechnician" :options="serviceTechnicians" searchable searchable-placeholder="Search a person...">
                <template #label>
                  <UIcon v-if="selectedServiceTechnician.icon" :name="selectedServiceTechnician.icon" class="h-4 w-4" />
                  <UAvatar v-else-if="selectedServiceTechnician.avatar" v-bind="selectedServiceTechnician.avatar" size="3xs" />
                  {{ selectedServiceTechnician.label }}
                </template>
              </USelectMenu>
            </UFormGroup>

            <UFormGroup name="states" label="States">
              <USelectMenu v-model="selectedState" :options="states" searchable searchable-placeholder="Search a person...">
                <template #label>
                  <UIcon v-if="selectedState.icon" :name="selectedState.icon" class="h-4 w-4" />
                  <UAvatar v-else-if="selectedState.avatar" v-bind="selectedState.avatar" size="3xs" />
                  {{ selectedState.label }}
                </template>
              </USelectMenu>
            </UFormGroup>

            <UFormGroup name="territories" label="Territory">
              <USelectMenu v-model="selectedTerritory" :options="territories" searchable searchable-placeholder="Search a person...">
                <template #label>
                  <UIcon v-if="selectedTerritory.icon" :name="selectedTerritory.icon" class="h-4 w-4" />
                  <UAvatar v-else-if="selectedTerritory.avatar" v-bind="selectedTerritory.avatar" size="3xs" />
                  {{ selectedTerritory.label }}
                </template>
              </USelectMenu>
            </UFormGroup>
          </UBox>
        </aside>

        <div class="w-full md:basis-10/12">
          <section>
            <ExampleGoogleMap v-if="showMap" />
          </section>
        </div>
      </USection>
    </UContainer>
  </UArticle>
</template>
