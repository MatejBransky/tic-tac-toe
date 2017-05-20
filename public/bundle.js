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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__h__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(8);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_0__h__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "app", function() { return __WEBPACK_IMPORTED_MODULE_1__app__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return __WEBPACK_IMPORTED_MODULE_2__router__["a"]; });







/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hyperapp = __webpack_require__(0);

var MarksView = function MarksView() {
  return (0, _hyperapp.h)(
    "div",
    { className: "marks" },
    "marks view"
  );
};

exports.default = MarksView;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hyperapp = __webpack_require__(0);

var types = [['Player', 'Player'], ['Player', 'PC']];

var TypesOptions = function TypesOptions(_ref) {
  var onClick = _ref.onClick,
      types = _ref.types;
  return (0, _hyperapp.h)(
    'div',
    { className: 'types__options' },
    types.map(function (type, idType) {
      return (0, _hyperapp.h)(
        'button',
        { key: idType, onclick: function onclick() {
            return onClick(idType);
          }, className: 'types__item' },
        type.map(function (player, idPlayer) {
          return (0, _hyperapp.h)(
            'div',
            { key: idPlayer, className: 'types__player' },
            player
          );
        })
      );
    })
  );
};

var TypesView = function TypesView(_ref2) {
  var onClick = _ref2.onClick;
  return (0, _hyperapp.h)(
    'div',
    { className: 'types' },
    (0, _hyperapp.h)(
      'h1',
      { className: 'types__title' },
      'Type of game'
    ),
    (0, _hyperapp.h)(TypesOptions, { onClick: onClick, types: types })
  );
};

exports.default = TypesView;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _hyperapp = __webpack_require__(0);

var _typesView = __webpack_require__(4);

var _typesView2 = _interopRequireDefault(_typesView);

var _marksView = __webpack_require__(3);

var _marksView2 = _interopRequireDefault(_marksView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import GameView from './view/gameView'
// import Game from './plugins/game'

(0, _hyperapp.app)({
  state: {
    route: '/',
    type: 0,
    marks: ['X', 'O'],
    score: [0, 0]
  },

  view: {
    '/': function _(state, _ref) {
      var setType = _ref.setType,
          router = _ref.router;
      return (0, _hyperapp.h)(_typesView2.default, { onClick: function onClick(type) {
          setType(type);
          router.go('/marks');
        } });
    },
    '/marks': function marks(state, _ref2) {
      var setMarks = _ref2.setMarks,
          router = _ref2.router;
      return (0, _hyperapp.h)(_marksView2.default, { onclick: function onclick(marks) {
          setMarks(marks);
          router.go('/game');
        } });
    }
  },

  actions: {
    setType: function setType(type) {
      return { type: type };
    },
    setMarks: function setMarks(marks) {
      return { marks: marks };
    },
    setRoute: function setRoute(route) {
      return { route: route };
    }
  },

  plugins: [_hyperapp.Router],

  events: {
    route: function route(_ref3, _ref4) {
      var _route = _ref3.route;
      var setRoute = _ref4.setRoute,
          router = _ref4.router;

      switch (_route) {
        case '/types':
          setRoute('/marks');
          return router.go('/marks');
        case '/marks':
          setRoute('/game');
          return router.go('/game');
        default:
          setRoute('/');
          return router.go('/');
      }
    }
  }
});

/***/ }),
/* 6 */
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
/* 7 */
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
/* 8 */
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