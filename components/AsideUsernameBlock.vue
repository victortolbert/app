<template>
  <aside>
    <template v-if="$fetchState.pending">
      <div class="username-heading loading">
        <content-placeholders>
          <content-placeholders-heading :img="true" />
        </content-placeholders>
      </div>
      <div class="info">
        <content-placeholders>
          <content-placeholders-text :lines="3" />
        </content-placeholders>
      </div>
    </template>

    <template v-else-if="$fetchState.error">
      <InlineErrorBlock :error="$fetchState.error" />
    </template>

    <template v-else>
      <NuxtLink
        class="username-heading"
        :to="{
          name: 'username___en',
          params: {username: _user.username},
        }"
        tag="div"
      >
        <NuxtLink
          :to="{
            name: 'username___en',
            params: {username: _user.username},
          }"
        >
          <img :src="_user.profile_image" :alt="_user.name" />
        </NuxtLink>
        <div class="text">
          <NuxtLink
            :to="{
              name: 'username___en',
              params: {username: _user.username},
            }"
          >
            <span>{{ _user.name }}</span>
          </NuxtLink>
          <NuxtLink
            :to="{
              name: 'username___en',
              params: {username: _user.username},
            }"
          >
            <span>@{{ _user.username }}</span>
          </NuxtLink>
        </div>
      </NuxtLink>
      <NuxtLink
        :to="{
          name: 'username___en',
          params: {username: _user.username},
        }"
        class="f-button"
      >
        See profile
      </NuxtLink>
      <div class="info">
        <div v-if="_user.summary">
          <div class="title">about</div>
          <div class="content">{{ _user.summary }}</div>
        </div>
        <div v-if="_user.location">
          <div class="title">location</div>
          <div class="content">{{ _user.location }}</div>
        </div>
        <div v-if="_user.joined_at">
          <div class="title">joined</div>
          <div class="content">{{ _user.joined_at }}</div>
        </div>
      </div>
    </template>
  </aside>
</template>

<script>
import User from '~/models/User'

export default {
  props: [],
  async fetch() {
    const user = await User.custom('users/by_username')
      .params({
        url: this.$route.params.username,
      })
      .first()

    if (!user.id && user.username === this.$route.params.username) {
      throw new Error(`User ${this.$route.params.username} not found`)
    }
    this.user = user
  },
  data() {
    return {
      user: {},
    }
  },
  computed: {
    _user() {
      return new User(this.user)
    },
  },
  fetchOnServer: false,
}
</script>
