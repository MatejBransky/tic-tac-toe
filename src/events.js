export default {
  loaded: (state, actions) => state.router.match !== '/' && actions.router.go('/'),
  update: (state, actions, data) => console.log(JSON.stringify(data))
}
