export default {
  // loaded: (state) => console.log('Loaded: ', state),
  // update: (state, actions, data) => {
  //   console.log('State ', state)
  //   console.log('Data: ', data)
  // },
  action: (state, actions, data) => console.log('Action: ', data),
  update: (state, actions, data) => {
    console.log('State: ', state)
    console.log('Data: ', data)
  }
}
