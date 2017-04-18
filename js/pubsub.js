const events = (() => {
  const topics = {}

  const on = (topic, action) => {
    if (!topics.hasOwnProperty(topic)) topics[topic] = []
    const index = topics[topic].push(action)
    const remove = () => topics[topic][index] = null
    return { remove }
  }

  const publish = (topic, data = null) => {
    if (!topics.hasOwnProperty(topic)) return
    topics[topic].forEach(action => {
      if (!action) return
      return action(data)
    })
    return true
  }

  return {
    topics, // dev only
    on,
    publish
  }
})()