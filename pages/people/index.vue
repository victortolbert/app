<template>
  <main class="flex-1">
    <BasePageHeading />
    <pre>{{ teams }}</pre>
    <section v-if="false" class="p-8">
      <table>
        <tr class="group" v-for="(person, key) in people.ema" :key="key">
          <td class="p-3 group-hover:bg-primary-100">
            <img
              class="rounded-full shadow w-11 h-11"
              :src="`/assets/img/people/${key}.jpeg`"
            />
          </td>
          <td class="p-3 group-hover:bg-primary-100">
            <pre>{{ person.firstName }}</pre>
          </td>
        </tr>
      </table>
    </section>
  </main>
</template>

<script lang="ts">
export default {
  async asyncData({$content}) {
    const people = await $content('people').fetch()
    const teams = await $content('teams').fetch()
    return {
      people,
      teams,
    }
  },
}
</script>
