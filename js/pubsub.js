const events = (() => {
  const topics = {}

  const on = (topic, action, afterTopic = null) => {
    if (!topics.hasOwnProperty(topic)) topics[topic] = []
    const index = topics[topic].push({ action, afterTopic })
    const remove = () => topics[topic][index] = null
    return { remove }
  }

  const publish = (topic, data = null) => {
    if (!topics.hasOwnProperty(topic)) return
    topics[topic].forEach(subscriber => {
      if (!subscriber) return
      const output = subscriber.action(data)
      if (!subscriber.afterTopic) return
      events.publish(subscriber.afterTopic, output)
    })
    return true
  }

  return {
    topics, // dev only
    on,
    publish
  }
})()