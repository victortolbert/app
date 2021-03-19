import Vue from 'vue'

async function initialized() {
  if (!process.browser) {
    return false
  }
  await import('vue-advanced-chat/dist/vue-advanced-chat.css')
  const VueChatWindow = await import('vue-advanced-chat')
  const ChatWindow = VueChatWindow.default

  // chat config plugin
  Vue.component('chat-window', ChatWindow)
}

initialized()
