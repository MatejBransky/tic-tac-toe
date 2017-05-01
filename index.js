'use strict';

var solution = "bude lepší nastavit stav pokaždé přímo ve funkci pro větší přehlednost souvislostí";
var state = {
	solution: solution
};

const events = (() => {
  const topics = {};
  const on = (topic, action) => {
    if (!topics.hasOwnProperty(topic)) topics[topic] = [];
    const index = topics[topic].push(action) - 1;
    const remove = () =>
      topics[topic][index] = null;
    return { remove }
  };
  const publish = (topic, data) => {
    if (!topics.hasOwnProperty(topic)) return false
    return topics[topic].reduce((result, action) => {
      if (action) result.push(action(data));
      return result
    }, [])
  };
  return {
    on,
    publish
  }
})();

const on = events.on;
const publish = events.publish;

const stream = (...fns) => (state = {}) => {
  let i = 0;
  let output = state;
  do {
    let input = output;
    output = fns[i](input);
    i = i + 1;
  } while (typeof output !== 'string' && i < fns.length)

  if (typeof output === 'string') {
    const event = output;
    /**
     * if listen is not last, then prepare call of 
     * another stream with remaining functions when event publishes
     */
    if (i < fns.length) {
      return on(event, stream(...fns.slice(i)))
    /**
     * else return string which is important for parent stream (listen this stream)
     */
    } else {
      return event
    }
  }
  return output
};

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const setDom = input => document.getElementById('js-main').innerHTML = input;

const read = id => document.getElementById(id).innerHTML;

const compile = Handlebars.compile;

const load = id => {
  const insert = pipe(
    read,
    compile
  )(id);
  return {
    with: data => {
      setDom(insert(data));
      return data
    }
  }
};

const loadTypes = state => {
  load(state.loadTypes.id).with(state.loadTypes.data);
  return state
};

const listen = ({ container = null, part = null, target = null }) => {
  const then = action => {
    if (target && !container && !part) {
      const element = document.getElementById(target);
      element.addEventListener('click', ({ target }) => action(target));

    } else if (container && part && !target) {
      const outer = document.getElementById(container);
      outer.addEventListener('click', ({ target }) => {
        const array = [target, target.parentNode]
          .filter(el => el.classList.contains(part));
        if (array.length) return action(array[0])
      });
    } else {
      return false
    }

    return true
  };

  return { then }
};

const listenTypes = state => {
  const types = state.loadTypes.data.types;
  const names = state.listenTypes.names;

  listen({ container: 'js-types', part: 'js-option' })
    .then(clicked => {
      const { index } = clicked.dataset;
      const newState = Object.assign({}, state);
      const players = newState.loadMarks.data.players;
      players[0].name = names[index][0];
      players[1].name = names[index][1];
      publish('typeDone', newState);
    });

  return 'typeDone'
};

const types = stream(
  loadTypes,
  listenTypes
);

stream(
  types,
  x => console.log('výstup: ', x)
  // marks,
  // game
)(state);
//# sourceMappingURL=index.js.map
