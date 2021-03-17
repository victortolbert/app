<script>
import {defineComponent, reactive} from '@nuxtjs/composition-api'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

function getNameLength(name, callback) {
  const len = name.firstName.length + name.lastName.length
  callback(len)
}

export default defineComponent({
  setup() {
    const book = reactive({title: 'Vue 3 Guide'})

    const authUser = reactive({
      firstName: 'Rg',
      lastName: 'Tolbert',
    })
    const people = reactive([])
    const events = reactive([])

    const outputToConsole = function (result) {
      console.log(`Output: ${result}`)
    }
    return {authUser, people, book, events, outputToConsole}
  },
  async fetch() {
    this.people = await this.$personRepository.index()
    // await fetch('https://api.nuxtjs.dev/mountains').then(res =>res.json())
  },
  data() {
    return {
      people: [],
      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      editorConfig: {
        // The configuration of the editor.
      },
      inputText: '',
      loading: false,
      showCreateModal: false,
      showEditModal: false,
      showTaskModal: false,
      editModalTaskId: 1,
      showTaskId: 1,
      tasks: [],
    }
  },
  computed: {
    count() {
      return this.inputText.length
    },
    charCountParams() {
      return {
        inputText: this.inputText,
        label: 'Count',
      }
    },
    slicedPeople() {
      return this.people.slice(0, 20)
    },
  },
  mounted() {
    this.outputToConsole(3)
    getNameLength(this.authUser, this.outputToConsole)
  },
  methods: {
    say(message) {
      alert(message)
    },
    warn(message, event) {
      // now we have access to the native event
      if (event) event.preventDefault()

      alert(message)
    },
    reset() {
      this.inputText = ''
    },
  },
})
</script>

<template>
  <PageWrapper>
    <!-- <BaseHero :title="$t('dashboard')">
      <template #subtitle>
        Subtitle
      </template>
    </BaseHero> -->
    <PageBreadcrumb class="pt-2" />
    <!-- <BaseDivider /> -->
    <!-- <PrintButton /> -->

    <!-- <div v-if="slicedPeople.length">
      <PersonDirectory :people="slicedPeople" />
    </div> -->
    <!-- <DashboardCharts /> -->

    <SectionWrapper>
      <CurrentNews />
    </SectionWrapper>

    <SectionWrapper class="lg:mx-4">
      <StatsDisplay />
      <StatsPanels />

      <p><input v-model="inputText" type="text" /></p>

      <BaseCharCount :params="charCountParams" />

      <p>
        <button @click="reset">Reset</button>
      </p>

      Workshop/Playgound Calendly Schedule /mailcoach

      <!-- <Links v-if="false" /> -->
    </SectionWrapper>

    <!-- Numbers -->
    <SectionWrapper>
      <div class="p-8 space-y-4">
        <span
          class="flex items-center justify-center w-10 h-10 rounded-full bg-primary-600"
        >
          <!-- Heroicon name: check -->
          <svg
            class="w-6 h-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
        <span
          class="flex items-center justify-center w-10 h-10 border-2 rounded-full border-primary-600"
        >
          <span class="text-primary-600">02</span>
        </span>
        <span
          class="flex items-center justify-center w-10 h-10 border-2 border-gray-300 rounded-full"
        >
          <span class="text-gray-500">03</span>
        </span>
        <a
          href="#"
          class="relative flex items-center justify-center w-10 h-10 bg-white border-2 border-gray-300 rounded-full group hover:border-gray-400"
        >
          <span
            class="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300"
            aria-hidden="true"
          />
          <span class="sr-only">Step 5</span>
        </a>
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <!-- <ckeditor v-model="editorData" :editor="editor" :config="editorConfig" /> -->
      <button @contextmenu.prevent="say('hi')">Say hi</button>
    </SectionWrapper>

    <SectionWrapper>
      <div class="flex">
        <button
          class="inline-flex items-center justify-center px-4 py-1 rounded shadow"
        >
          <svg
            class="w-5 h-5 text-gray-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z"
            />
          </svg>
          <span class="text-xs font-bold tracking-wider uppercase">undo</span>
        </button>
        <button
          class="inline-flex items-center justify-center px-4 py-1 rounded shadow"
        >
          <svg
            class="w-5 h-5 text-gray-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M18.4,10.6C16.55,9 14.15,8 11.5,8C6.85,8 2.92,11.03 1.54,15.22L3.9,16C4.95,12.81 7.95,10.5 11.5,10.5C13.45,10.5 15.23,11.22 16.62,12.38L13,16H22V7L18.4,10.6Z"
            />
          </svg>
          <span class="text-xs font-bold tracking-wider uppercase">redo</span>
        </button>
      </div>
      <svg
        class="w-full h-40 text-gray-200 bg-white border-2 border-gray-300 border-dashed rounded"
        preserveAspectRatio="none"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <path
          vector-effect="non-scaling-stroke"
          stroke-width="2"
          d="M0 0l200 200M0 200L200 0"
        />
      </svg>
    </SectionWrapper>
  </PageWrapper>
</template>
