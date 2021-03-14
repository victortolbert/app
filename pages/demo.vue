<script>
import Multiselect from 'vue-multiselect'
import CKEditor from '@ckeditor/ckeditor5-vue2'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import FullCalendar from '@fullcalendar/vue'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'

export default {
  components: {
    // Use the <ckeditor> component in this view.
    ckeditor: CKEditor.component,
    FullCalendar,
    Multiselect,
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      editorConfig: {
        // The configuration of the editor.
      },
      counter: 0,
      selectOptions: [],
      selectedOption: null,
      calendarOptions: {
        plugins: [interactionPlugin, timeGridPlugin],
        initialView: 'timeGridWeek',
        nowIndicator: true,
        editable: true,
        initialEvents: [{title: 'nice event', start: new Date()}],
      },
    }
  },
  methods: {
    increment() {
      this.counter++
    },
    decrement() {
      this.counter--
    },
  },
}
</script>

<template>
  <div>
    <Multiselect v-model="selectedOption" :options="selectOptions" />

    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" />

    <button @click="increment">Increment</button>
    <p>Counter : {{ counter }}</p>
    <button @click="decrement">Decrement</button>

    <flex class="flex-col space-y-1">
      <input type="color" />
      <input type="date" />
      <input type="datetime-local" />
      <input type="file" />
      <input type="hidden" />
      <input type="image" />
      <input type="month" />
      <input type="number" />
      <input type="range" />
      <input type="reset" />
      <input type="search" />
      <input type="tel" />
      <input type="text" />
      <input type="time" />
      <input type="url" />
      <input type="week" />
    </flex>

    <FullCalendar :options="calendarOptions" />
  </div>
</template>
