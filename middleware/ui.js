export default function ({store, route}) {
  store.commit('ui/SET_BODY_CLASS', route.name)
}
