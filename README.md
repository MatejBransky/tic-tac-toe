# Tic Tac Toe

**Tic-tac-toe** (also known as **noughts and crosses** or **Xs and Os**) is a paper-and-pencil game for two players, X and O, who take turns marking the spaces in a 3×3 grid. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game.

(*@TODO* - include picture of game)

Players soon discover that best play from both parties leads to a draw. Hence, tic-tac-toe is most often played by young children.

Because of the simplicity of tic-tac-toe, it is often used as a pedagogical tool for teaching the concepts of good sportsmanship and the branch of artificial intelligence that deals with the searching of game trees. It is straightforward to write a computer program to play tic-tac-toe perfectly, to enumerate the 765 essentially different positions (the state space complexity), or the 26,830 possible games up to rotations and reflections (the game tree complexity) on this space.[1]

The game can be generalized to an m,n,k-game in which two players alternate placing stones of their own color on an m×n board, with the goal of getting k of their own color in a row. Tic-tac-toe is the (3,3,3)-game.[2] Harary's generalized tic-tac-toe is an even broader generalization of tic tac toe. It can also be generalized as a nd game. Tic-tac-toe is the game where n equals 3 and d equals 2.[3] If played properly, the game will end in a draw making tic-tac-toe a futile game.

-- <cite>Wikipedia</cite>


## How to play

1. Click on this link *(@TODO)*. It loads game.
2. Select type of game and proceed next.
3. Select marks for players by switch button and then start game.
4. When is your turn click on any (select best option) field and it'll be marked with your selected mark.
5. When game is over it starts new match with score tracked from the beginning.


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
│   └── actions.test.js
├── src                     // Folder with unbundled source JavaScript files
│   ├── app.js              // Main JS file with connecting other parts of app
│   ├── state.js            // State of app
│   ├── view.js             // View of app
│   ├── actions.js          // Actions of app
│   ├── events.js           // Events of app
│   ├── plugins.js          // Plugins of app
│   ├── utils.js            // Functions for better dev
│   └── helpers.js          // Functions for helping to complete actions
├── public                  // Output folder with index.html, style.css and bundle.js
│   ├── index.html
│   ├── style.css
│   └── bundle.js
├── .gitignore
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


## License

ISC
