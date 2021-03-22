import {h, reactive} from '@nuxtjs/composition-api'

export default {
  setup(props, {slots, attrs, emit}) {
    const state = reactive({
      count: 0,
    })

    function increment() {
      state.count++
    }

    // return the render function
    return () =>
      h(
        'div',
        {
          onClick: increment,
        },
        state.count,
      )
  },
}

// VNode Props Format
// // 2.x
// {
//   staticClass: 'button',
//   class: {'is-outlined': isOutlined },
//   staticStyle: { color: '#34495E' },
//   style: { backgroundColor: buttonColor },
//   attrs: { id: 'submit' },
//   domProps: { innerHTML: '' },
//   on: { click: submitForm },
//   key: 'submit-button'
// }

// // 3.x Syntax
// {
//   class: ['button', { 'is-outlined': isOutlined }],
//   style: [{ color: '#34495E' }, { backgroundColor: buttonColor }],
//   id: 'submit',
//   innerHTML: '',
//   onClick: submitForm,
//   key: 'submit-button'
// }
