<template>
  <div class="flex flex-col flex-1 h-0 bg-gray-100 border-r border-gray-200">
    <div class="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
      <div class="flex items-center flex-shrink-0 px-4">
        <AppLogo
          :name="$store.state.affiliate.name.toLowerCase()"
          class="w-auto h-8 text-primary-500"
        />
      </div>

      <nav class="flex-1 mt-5 space-y-1" aria-label="Sidebar">
        <div class="px-2 space-y-1">
          <!-- Current: "bg-gray-200 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->

          <!-- Current: "bg-gray-200 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
          <NuxtLink
            to="/"
            class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-md group"
            aria-current="page"
          >
            <!-- Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500" -->
            <BaseIconOutlined
              name="home"
              class="flex-shrink-0 mr-3 -ml-1 text-gray-500"
            />
            <span class="truncate"> {{ $t('dashboard') }} </span>

            <!-- Current: "bg-white", Default: "bg-gray-100 group-hover:bg-gray-200" -->
            <span
              class="bg-white ml-auto inline-block py-0.5 px-3 text-xs rounded-full"
            >
              5
            </span>
          </NuxtLink>

          <NuxtLink
            v-if="false"
            to="/team/"
            class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
          >
            <BaseIconOutlined
              name="users"
              class="flex-shrink-0 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
            />
            <span class="truncate"> {{ $t('team') }} </span>
          </NuxtLink>

          <NuxtLink
            v-if="false"
            to="/projects/"
            class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
          >
            <BaseIconOutlined
              name="folder"
              class="flex-shrink-0 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
            />
            <span class="truncate"> {{ $t('projects') }} </span>

            <span
              class="bg-gray-100 group-hover:bg-gray-200 ml-auto inline-block py-0.5 px-3 text-xs rounded-full"
            >
              19
            </span>
          </NuxtLink>

          <NuxtLink
            to="/calendar/"
            class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
          >
            <BaseIconOutlined
              name="calendar"
              class="flex-shrink-0 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
            />

            <span class="truncate"> {{ $t('calendar') }} </span>

            <span
              class="bg-gray-100 group-hover:bg-gray-200 ml-auto inline-block py-0.5 px-3 text-xs rounded-full"
            >
              20+
            </span>
          </NuxtLink>

          <NuxtLink
            to="/resources/"
            class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
          >
            <BaseIconOutlined
              name="inbox"
              class="flex-shrink-0 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
            />

            <span class="truncate"> {{ $t('documents') }} </span>
          </NuxtLink>

          <NuxtLink
            v-if="false"
            to="/reports/"
            class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
          >
            <BaseIconOutlined
              name="chart-bar"
              class="flex-shrink-0 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
            />

            <span class="truncate"> {{ $t('reports') }} </span>
          </NuxtLink>

          <NuxtLink
            v-if="false"
            to="/teams/"
            class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
          >
            <BaseIconOutlined
              name="user-group"
              class="mr-3 text-gray-400 group-hover:text-gray-500"
            />
            {{ $t('teams') }}
          </NuxtLink>

          <NuxtLink
            to="/people/directory/"
            class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
          >
            <BaseIconOutlined
              name="search-circle"
              class="mr-3 text-gray-400 group-hover:text-gray-500"
            />
            {{ $t('directory') }}
          </NuxtLink>

          <NuxtLink
            v-if="false"
            to="/announcements/"
            class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
          >
            <BaseIconOutlined
              name="speaker-phone"
              class="mr-3 text-gray-400 group-hover:text-gray-500"
            />
            {{ $t('announcements') }}
          </NuxtLink>

          <NuxtLink
            v-if="false"
            to="/"
            class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
          >
            <BaseIconOutlined
              name="map"
              class="mr-3 text-gray-400 group-hover:text-gray-500"
            />
            {{ $t('office_map') }}
          </NuxtLink>

          <NuxtLink
            v-if="false"
            to="/communities/"
            class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 group"
            aria-current="false"
          >
            <BaseIconOutlined
              name="user-group"
              class="flex-shrink-0 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
            />
            <span class="truncate"> {{ $t('communities') }} </span>
          </NuxtLink>
          <NuxtLink
            v-if="false"
            to="/projects/"
            class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 group"
            aria-current="false"
          >
            <BaseIconOutlined
              name="collection"
              class="flex-shrink-0 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
            />
            <span class="truncate"> {{ $t('projects') }} </span>
          </NuxtLink>
          <NuxtLink
            v-if="false"
            to="/"
            class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 group"
            aria-current="false"
          >
            <BaseIconOutlined
              name="fire"
              class="flex-shrink-0 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
            />
            <span class="truncate"> {{ $t('popular') }} </span>
          </NuxtLink>

          <NuxtLink
            v-if="false"
            to="/trending/"
            class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 group"
            aria-current="false"
          >
            <BaseIconOutlined
              name="trending-up"
              class="flex-shrink-0 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
            />
            <span class="truncate"> {{ $t('trending') }} </span>
          </NuxtLink>

          <NuxtLink
            v-if="false"
            to="/tasks/"
            class="flex items-center px-2 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
          >
            <BaseIconOutlined
              name="view-list"
              class="flex-shrink-0 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
            />
            {{ $t('my_tasks') }}
          </NuxtLink>

          <NuxtLink
            v-if="false"
            to="/recent/"
            class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
          >
            <BaseIconOutlined
              name="clock"
              class="mr-3 text-gray-400 group-hover:text-gray-500"
            />
            {{ $t('recent') }}
          </NuxtLink>
          <NuxtLink
            v-if="false"
            to="/privacy/"
            class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
          >
            <BaseIconOutlined
              name="shield-check"
              class="mr-3 text-gray-400 group-hover:text-gray-500"
            />
            {{ $t('privacy') }}
          </NuxtLink>
          <NuxtLink
            v-if="false"
            to="/history/"
            class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
          >
            <BaseIconOutlined
              name="clock"
              class="mr-3 text-gray-400 group-hover:text-gray-500"
            />
            {{ $t('history') }}
          </NuxtLink>
          <NuxtLink
            v-if="false"
            to="/help/"
            class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
          >
            <BaseIconOutlined
              name="question-mark-circle"
              class="mr-3 text-gray-400 group-hover:text-gray-500"
            />
            {{ $t('help') }}
          </NuxtLink>
          <NuxtLink
            to="/profile/"
            class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
          >
            <BaseIconOutlined
              name="user-circle"
              class="mr-3 text-gray-400 group-hover:text-gray-500"
            />
            {{ $t('profile') }}
          </NuxtLink>
          <NuxtLink
            v-if="false"
            to="/notifications/"
            class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
          >
            <BaseIconOutlined
              name="bell"
              class="mr-3 text-gray-400 group-hover:text-gray-500"
            />
            {{ $t('notifications') }}
          </NuxtLink>
          <NuxtLink
            v-if="false"
            to="/billing/"
            class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
          >
            <BaseIconOutlined
              name="credit-card"
              class="mr-3 text-gray-400 group-hover:text-gray-500"
            />
            {{ $t('plan_and_billing') }}
          </NuxtLink>
          <NuxtLink
            v-if="false"
            to="/briefcase/"
            class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
          >
            <BaseIconOutlined
              name="briefcase"
              class="mr-3 text-gray-400 group-hover:text-gray-500"
            />
            {{ $t('briefcase') }}
          </NuxtLink>
          <NuxtLink
            v-if="false"
            to="/password/"
            class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
          >
            <BaseIconOutlined
              name="key"
              class="mr-3 text-gray-400 group-hover:text-gray-500"
            />
            {{ $t('password') }}
          </NuxtLink>

          <NuxtLink
            v-if="false"
            to="/support/"
            class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
          >
            <BaseIconOutlined
              name="support"
              class="mr-3 text-gray-400 group-hover:text-gray-500"
            />
            {{ $t('support') }}
          </NuxtLink>

          <NuxtLink
            v-if="false"
            to="/messages/"
            class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
          >
            <BaseIconOutlined
              name="document-search"
              class="mr-3 text-gray-400 group-hover:text-gray-500"
            />
            {{ $t('resources') }}
          </NuxtLink>

          <NuxtLink
            v-if="false"
            to="/messages/"
            class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
          >
            <BaseIconOutlined
              name="chat"
              class="mr-3 text-gray-400 group-hover:text-gray-500"
            />
            {{ $t('messages') }}
          </NuxtLink>
        </div>

        <hr class="my-5 border-t border-gray-200" aria-hidden="true" />

        <div class="flex-1 px-2 space-y-1">
          <a
            href="#"
            class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
          >
            <BaseIconOutlined
              name="view-grid-add"
              class="mr-3 text-gray-400 group-hover:text-gray-500"
            />
            {{ $t('apps') }}
          </a>

          <NuxtLink
            to="/settings/"
            class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
          >
            <BaseIconOutlined
              name="cog"
              class="mr-3 text-gray-400 group-hover:text-gray-500"
            />
            {{ $t('settings') }}
          </NuxtLink>
        </div>
      </nav>
    </div>
    <div class="flex flex-shrink-0 p-4 border-t border-gray-200">
      <a href="#" class="flex-shrink-0 block w-full group">
        <div class="flex items-center">
          <div>
            <img
              class="inline-block rounded-full h-9 w-9"
              :src="$store.state.oldauth.user.avatarUrl"
              alt=""
            />
          </div>
          <div class="ml-3">
            <p
              class="text-sm font-medium text-gray-700 group-hover:text-gray-900"
            >
              {{ $store.state.oldauth.user.firstName }}
              {{ $store.state.oldauth.user.lastName }}
            </p>
            <p
              class="text-xs font-medium text-gray-500 group-hover:text-gray-700"
            >
              {{ $t('view_profile') }}
            </p>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
