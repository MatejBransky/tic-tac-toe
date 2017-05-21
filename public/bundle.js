/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__h__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_0__h__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "app", function() { return __WEBPACK_IMPORTED_MODULE_1__app__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return __WEBPACK_IMPORTED_MODULE_2__router__["a"]; });







/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarksView = undefined;

var _hyperapp = __webpack_require__(0);

var MarksView = function MarksView(_ref) {
  var data = _ref.data,
      switchMarks = _ref.switchMarks,
      setMarks = _ref.setMarks;
  return (0, _hyperapp.h)(
    "div",
    { className: "marks" },
    data.map(function (player, index) {
      return (0, _hyperapp.h)(
        "div",
        { id: index, className: "marks__player" },
        (0, _hyperapp.h)(
          "div",
          { className: "marks__name" },
          player.name
        ),
        (0, _hyperapp.h)(
          "div",
          { className: "marks__mark" },
          player.mark
        )
      );
    }),
    (0, _hyperapp.h)(
      "button",
      { onclick: function onclick() {
          return switchMarks(data);
        }, className: "marks__switch" },
      "switch"
    ),
    (0, _hyperapp.h)(
      "button",
      { onclick: function onclick() {
          return setMarks(data);
        }, className: "marks__submit" },
      "submit"
    )
  );
};

exports.MarksView = MarksView;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypesView = undefined;

var _hyperapp = __webpack_require__(0);

var TypesView = function TypesView(_ref) {
  var data = _ref.data,
      setType = _ref.setType;
  return (0, _hyperapp.h)(
    "div",
    { className: "types" },
    (0, _hyperapp.h)(
      "h1",
      { className: "types__title" },
      "Type of game"
    ),
    (0, _hyperapp.h)(
      "div",
      { className: "types__options" },
      data.map(function (type, idType) {
        return (0, _hyperapp.h)(
          "button",
          { key: idType, onclick: function onclick() {
              return setType(type);
            }, className: "types__item" },
          type.playersNames.map(function (player, idPlayer) {
            return (0, _hyperapp.h)(
              "div",
              { key: idPlayer, className: "types__player" },
              player
            );
          })
        );
      })
    )
  );
};

exports.TypesView = TypesView;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _hyperapp = __webpack_require__(0);

var _types = __webpack_require__(2);

var _marks = __webpack_require__(1);

// import { GameView, Game } from './game'

(0, _hyperapp.app)({
  state: {
    typesData: [{
      playersNames: ['Player', 'Player'],
      ai: false
    }, {
      playersNames: ['Player', 'PC'],
      ai: true
    }],
    marksData: [{ name: '', mark: 'X' }, { name: '', mark: 'O' }],
    gameData: {
      players: [{ name: '', mark: '', score: 0 }, { name: '', mark: '', score: 0 }],
      ai: false
    }
  },

  view: {
    '*': function _(state, actions) {
      return (0, _hyperapp.h)(_types.TypesView, {
        data: state.typesData,
        setType: function setType(type) {
          actions.setAi(type.ai);
          actions.setPlayers(type.playersNames);
          actions.router.go('/marks');
        } });
    },
    '/marks': function marks(state, actions) {
      return (0, _hyperapp.h)(_marks.MarksView, {
        data: state.marksData,
        switchMarks: actions.switchMarks,
        setMarks: function setMarks(players) {
          actions.setMarks(players);
          console.log(state.gameData);
        } });
    }
  },

  actions: {
    setAi: function setAi(state, actions, ai) {
      return { ai: ai };
    },
    setPlayers: function setPlayers(state, actions, playersNames) {
      return {
        marksData: [{ name: playersNames[0], mark: 'X' }, { name: playersNames[1], mark: 'O' }]
      };
    },
    switchMarks: function switchMarks(state, actions, players) {
      return {
        marksData: [{ name: players[0].name, mark: players[1].mark }, { name: players[1].name, mark: players[0].mark }]
      };
    },
    setMarks: function setMarks(state, actions, players) {
      return {
        gameData: {
          players: [{ name: players[0].name, mark: players[0].mark, score: state.gameData.players[0].score }, { name: players[1].name, mark: players[1].mark, score: state.gameData.players[1].score }]
        }
      };
    }
  },

  plugins: [_hyperapp.Router]
});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(app) {
  var state = {}
  var view = app.view
  var actions = {}
  var events = {}
  var node
  var element

  for (var i = -1, plugins = app.plugins || []; i < plugins.length; i++) {
    var plugin = plugins[i] ? plugins[i](app) : app

    if (plugin.state != null) {
      state = merge(state, plugin.state)
    }

    init(actions, plugin.actions)

    Object.keys(plugin.events || []).map(function(key) {
      events[key] = (events[key] || []).concat(plugin.events[key])
    })
  }

  if (document.readyState[0] !== "l") {
    load()
  } else {
    addEventListener("DOMContentLoaded", load)
  }

  function init(namespace, children, lastName) {
    Object.keys(children || []).map(function(key) {
      var action = children[key]
      var name = lastName ? lastName + "." + key : key

      if (typeof action === "function") {
        namespace[key] = function(data) {
          var result = action(
            state,
            actions,
            emit("action", {
              name: name,
              data: data
            }).data,
            emit
          )

          if (result == null || typeof result.then === "function") {
            return result
          }

          render((state = merge(state, emit("update", result))), view)
        }
      } else {
        init(namespace[key] || (namespace[key] = {}), action, name)
      }
    })
  }

  function load() {
    render(state, view)
    emit("loaded")
  }

  function emit(name, data) {
    ;(events[name] || []).map(function(cb) {
      var result = cb(state, actions, data, emit)
      if (result != null) {
        data = result
      }
    })

    return data
  }

  function render(state, view) {
    element = patch(
      app.root || (app.root = document.body),
      element,
      node,
      (node = emit("render", view)(state, actions))
    )
  }

  function merge(a, b) {
    var obj = {}

    if (typeof b !== "object" || Array.isArray(b)) {
      return b
    }

    for (var i in a) {
      obj[i] = a[i]
    }
    for (var i in b) {
      obj[i] = b[i]
    }

    return obj
  }

  function createElementFrom(node, isSVG) {
    if (typeof node === "string") {
      var element = document.createTextNode(node)
    } else {
      var element = (isSVG = isSVG || node.tag === "svg")
        ? document.createElementNS("http://www.w3.org/2000/svg", node.tag)
        : document.createElement(node.tag)

      for (var i = 0; i < node.children.length; ) {
        element.appendChild(createElementFrom(node.children[i++], isSVG))
      }

      for (var i in node.data) {
        if (i === "oncreate") {
          node.data[i](element)
        } else {
          setElementData(element, i, node.data[i])
        }
      }
    }

    return element
  }

  function setElementData(element, name, value, oldValue) {
    if (name === "key") {
    } else if (name === "style") {
      for (var i in merge(oldValue, (value = value || {}))) {
        element.style[i] = value[i] || ""
      }
    } else {
      try {
        element[name] = value
      } catch (_) {}

      if (typeof value !== "function") {
        if (value) {
          element.setAttribute(name, value)
        } else {
          element.removeAttribute(name)
        }
      }
    }
  }

  function updateElementData(element, oldData, data) {
    for (var name in merge(oldData, data)) {
      var value = data[name]
      var oldValue = oldData[name]

      if (name === "onupdate") {
        value(element)
      } else if (value !== oldValue || value !== element[name]) {
        setElementData(element, name, value, oldValue)
      }
    }
  }

  function getKeyFrom(node) {
    if (node && (node = node.data)) {
      return node.key
    }
  }

  function removeElement(parent, element, node) {
    if (node.data && node.data.onremove) {
      node.data.onremove(element)
    }
    parent.removeChild(element)
  }

  function patch(parent, element, oldNode, node) {
    if (oldNode == null) {
      element = parent.insertBefore(createElementFrom(node), element)
    } else if (node.tag && node.tag === oldNode.tag) {
      updateElementData(element, oldNode.data, node.data)

      var len = node.children.length
      var oldLen = oldNode.children.length
      var reusableChildren = {}
      var oldElements = []
      var newKeys = {}

      for (var i = 0; i < oldLen; i++) {
        var oldElement = element.childNodes[i]
        oldElements[i] = oldElement

        var oldChild = oldNode.children[i]
        var oldKey = getKeyFrom(oldChild)

        if (null != oldKey) {
          reusableChildren[oldKey] = [oldElement, oldChild]
        }
      }

      var i = 0
      var j = 0

      while (j < len) {
        var oldElement = oldElements[i]
        var oldChild = oldNode.children[i]
        var newChild = node.children[j]

        var oldKey = getKeyFrom(oldChild)
        if (newKeys[oldKey]) {
          i++
          continue
        }

        var newKey = getKeyFrom(newChild)

        var reusableChild = reusableChildren[newKey]
        var reusableElement = 0
        var reusableNode = 0

        if (reusableChild) {
          reusableElement = reusableChild[0]
          reusableNode = reusableChild[1]
        }

        if (null == newKey) {
          if (null == oldKey) {
            patch(element, oldElement, oldChild, newChild)
            j++
          }
          i++
        } else {
          if (oldKey === newKey) {
            patch(element, reusableElement, reusableNode, newChild)
            i++
          } else if (reusableElement) {
            element.insertBefore(reusableElement, oldElement)
            patch(element, reusableElement, reusableNode, newChild)
          } else {
            patch(element, oldElement, null, newChild)
          }

          j++
          newKeys[newKey] = newChild
        }
      }

      while (i < oldLen) {
        var oldChild = oldNode.children[i]
        var oldKey = getKeyFrom(oldChild)
        if (null == oldKey) {
          removeElement(element, oldElements[i], oldChild)
        }
        i++
      }

      for (var i in reusableChildren) {
        var reusableChild = reusableChildren[i]
        var reusableNode = reusableChild[1]
        if (!newKeys[reusableNode.data.key]) {
          removeElement(element, reusableChild[0], reusableNode)
        }
      }
    } else if (node !== oldNode) {
      var i = element
      parent.replaceChild((element = createElementFrom(node)), i)
    }

    return element
  }
});


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(tag, data) {
  var node
  var stack = []
  var children = []

  for (var i = arguments.length; i-- > 2; ) {
    stack[stack.length] = arguments[i]
  }

  while (stack.length) {
    if (Array.isArray((node = stack.pop()))) {
      for (var i = node.length; i--; ) {
        stack[stack.length] = node[i]
      }
    } else if (node != null && node !== true && node !== false) {
      if (typeof node === "number") {
        node = node + ""
      }
      children[children.length] = node
    }
  }

  return typeof tag === "string"
    ? {
        tag: tag,
        data: data || {},
        children: children
      }
    : tag(data, children)
});


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(app) {
  return {
    state: {
      router: match(location.pathname)
    },
    actions: {
      router: {
        match: function(state, actions, data, emit) {
          return {
            router: emit("route", match(data))
          }
        },
        go: function(state, actions, data) {
          history.pushState({}, "", data)
          actions.router.match(data)
        }
      }
    },
    events: {
      loaded: function(state, actions) {
        match()
        addEventListener("popstate", match)
        function match() {
          actions.router.match(location.pathname)
        }
      },
      render: function(state, actions, view) {
        return view[state.router.match]
      }
    }
  }

  function match(data) {
    var match
    var params = {}

    for (var route in app.view) {
      var keys = []

      if (!match && route !== "*") {
        data.replace(
          RegExp(
            "^" +
              route
                .replace(/\//g, "\\/")
                .replace(/:([\w]+)/g, function(_, key) {
                  keys.push(key)
                  return "([-\\w]+)"
                }) +
              "/?$",
            "g"
          ),
          function() {
            for (var i = 1; i < arguments.length - 2; ) {
              params[keys.shift()] = arguments[i++]
            }
            match = route
          }
        )
      }
    }

    return {
      match: match || "*",
      params: params
    }
  }
});


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map