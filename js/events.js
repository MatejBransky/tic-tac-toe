events.publish('init')

events.on('init',                   types.model.giveTypes)
events.on('typesGived',             types.view.loadTypes)
events.on('typesLoaded',            types.view.listenTypes)
events.on('typeClicked',            types.model.setType)

events.on('typeDone',               marks.view.loadMarks)
events.on('marksLoaded',            marks.view.listenMarks)
events.on('marksLoaded',            marks.view.listenSwitcher)
events.on('marksSwitched',          marks.view.switchMarks)
events.on('marksClicked',           marks.model.setMarks)

events.on('marksDone',              game.model.setGame) // + 28, 34
events.on('gameCreated',            game.view.loadGame)
events.on('gameLoaded',             game.view.listenGame)
events.on('gameClicked',            game.view.handleClick)
events.on('moveDone',               game.model.saveMove)
events.on('moveSaved',              game.view.markField)
events.on('fieldMarked',            game.model.controlMoves) // 3 options (A) win (1), B) draw (-1), C) nothing (0))
// C) nothing (0)
events.on('playerMoved',            game.model.setCurrentPlayer)
events.on('currentPlayerChanged',   game.view.setCurrentPlayer)
// A) win  (1)
events.on('gameEnded',              game.model.setStatus)
events.on('statusChanged',          game.view.setStatus)
events.on('statusLoaded',           game.model.setScore)
events.on('scoreChanged',           game.model.setGame)
events.on('gameCreated',            game.view.loadGame) // new game
// B) draw (-1)         
events.on('gameEnded',              game.model.setStatus)
events.on('statusChanged',          game.view.setStatus)
events.on('statusLoaded',           game.model.setScore) // keep score
events.on('scoreChanged',           game.model.setGame) // keep score
events.on('gameCreated',            game.view.loadGame) // new game