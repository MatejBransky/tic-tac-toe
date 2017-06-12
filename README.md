# Tic Tac Toe

([FreeCodeCamp](http://www.freecodecamp.com) project)

## How to play

1. Click on this [link](http://tictactoe-hyperapp.surge.sh/) (Surge.sh) or this [link](https://codepen.io/MatejMazur/full/Ngqaaj/) (CodePen). It loads game.
2. Select type of game and proceed next.
3. Select marks for players by switch button and then start game.
4. When is your turn click on any (select best option) field and it'll be marked with your selected mark.
5. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game.
6. When game is over it starts new match with score tracked from the beginning.
7. Button "Restart" starts new match.


## How to use it

### Install all packages:
```
npm install
```
It will install all needed packages.

### Project structure
```
tic-tac-toe
├── .vscode                 // Settings for editor VS Code
├── test                    // Folder with test files
│   ├── utils.test.js
│   ├── helpers.test.js
│   ├── actions.test.js
│   └── testUtils.js          // Wrappers around test function
├── src                     // Folder with unbundled source JavaScript files
│   ├── app.js                // Main JS file with connecting other parts of app
│   ├── state.js              // State of app
│   ├── view.js               // View of app
│   ├── actions.js            // Actions of app
│   ├── events.js             // Events of app
│   ├── utils.js              // Functions for better dev
│   ├── helpers.js            // Functions for actions
│   └── style.scss
├── public                  // Output folder with index.html, style.css and
│   ├── index.html
│   ├── style.css
│   └── bundle.js
├── eval.xlsx               // AI algorithm in Excel (see also algorithm.gif)
├── algorithm.gif           // Problem with evaluation of best AI move (solution => minimax)
├── .gitignore
├── package-lock.json
├── package.json
├── .editorconfig
├── .babelrc
├── .eslintrc.js
├── webpack.config.js
└── README.md
```

### For testing use:
```
npm test
```
It uses [tape](https://github.com/substack/tape) for unit tests. Tests are in `test` folder.

### For dev mode use:
```
npm start
```
It will bundle js files from `src` folder to `bundle` folder and watch any changes in both directories.


## TODO list:
- change AI algorithm to minimax
- update dev environment (watcher for Sass and JS)
- update old CSS with Sass variables and mixins
- create separated npm scripts for publishing and for development
- add undo/redo (history)
- add time travelling

## License

ISC
