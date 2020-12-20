<template>
  <div
    v-scroll-reveal
    class="flex flex-col flex-wrap items-center py-16 bg-gray-300"
  >
    <div class="flex justify-around w-5/6 mx-auto md:w-1/2">
      <h2 class="text-2xl font-bold text-center">My Skillset</h2>
    </div>
    <div
      v-for="(_, i) in 3"
      :key="i"
      :class="{'md:my-2 md:h-32': i === 1, 'md:my-4': i !== 1}"
      class="flex flex-col items-center justify-around w-3/4 md:flex-row md:mt-8"
    >
      <Skill
        :title="skills[i * 2].title"
        :rating="skills[i * 2].rating"
        :items="skills[i * 2].items"
      />
      <div v-if="i === 1" class="flex justify-center w-1/3 h-auto">
        <div class="invisible hidden xl:visible xl:flex">
          <TechnologyImages />
        </div>
      </div>
      <div
        v-else
        class="flex hidden w-1/3 md:visible md:block xl:hidden xl:invisible"
      />
      <Skill
        :title="skills[i * 2 + 1].title"
        :rating="skills[i * 2 + 1].rating"
        :items="skills[i * 2 + 1].items"
        :is-right="true"
      />
    </div>
  </div>
</template>

<script>
import Skill from '~/components/skills/Skill.vue'
import TechnologyImages from '~/components/TechnologyImages.vue'

export default {
  components: {Skill, TechnologyImages},
  setup() {
    return {
      skills: [
        {
          title: 'Vue.js and Nuxt.js',
          rating: 5,
          items: [
            {text: 'Nuxt.js core maintainer ♥️️', strong: true},
            {text: 'Vue.js enthusiast'},
          ],
        },
        {
          title: 'Javascript',
          rating: 4,
          items: [
            {text: 'Express.js', strong: true},
            {text: 'ES6', strong: true},
            {text: 'Writing packages'},
            {text: 'Babel'},
            {text: 'Webpack'},
          ],
        },
        {
          title: 'PHP',
          rating: 4,
          items: [
            {text: 'Laravel', strong: true},
            {text: 'Wordpress'},
            {text: 'Drupal'},
          ],
        },
        {
          title: 'VC & CI',
          rating: 4,
          items: [{text: 'Git', strong: true}, {text: 'Travis CI'}],
        },
        {
          title: 'Methodologies',
          rating: 4,
          items: [
            {text: 'TDD', strong: true},
            {text: 'Clean Code'},
            {text: 'Agile'},
            {text: 'Scrum'},
          ],
        },
        {
          title: 'Python',
          rating: 3,
          items: [
            {text: 'flask', strong: true},
            {text: 'plotly'},
            {text: 'scikit-learn'},
            {text: 'pandas'},
          ],
        },
      ],
    }
  },
}
</script>
