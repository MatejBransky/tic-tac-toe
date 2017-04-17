events.publish('init')

events.on('init',                   types.logic.giveTypes)
events.on('typesGived',             types.dom.loadType)
events.on('typeLoaded',             types.dom.listenType)
events.on('typeClicked',            types.logic.setType)

events.on('typeDone',               marks.dom.loadMarks)
events.on('marksLoaded',            marks.dom.listenMarks)
events.on('marksLoaded',            marks.dom.listenSwitcher)
events.on('marksSwitched',          marks.dom.switchMarks)
events.on('marksClicked',           marks.logic.setMarks)

events.on('marksDone',              game.logic.setGame) // + 28, 34
events.on('gameCreated',            game.dom.loadGame)
events.on('gameLoaded',             game.dom.listenGame)
events.on('gameClicked',            game.logic.handleClick)
events.on('moveDone',               game.logic.saveMove)
events.on('moveSaved',              game.dom.markField)
events.on('fieldMarked',            game.logic.controlMoves) // 3 options (A) win (1), B) draw (-1), C) nothing (0))
// C) nothing (0)
events.on('playerMoved',            game.logic.setCurrentPlayer)
events.on('currentPlayerChanged',   game.dom.setCurrentPlayer)
// A) win  (1)
events.on('gameEnded',              game.logic.setStatus)
events.on('statusChanged',          game.dom.setStatus)
events.on('statusLoaded',           game.logic.setScore)
events.on('scoreChanged',           game.logic.setGame)
events.on('gameCreated',            game.dom.loadGame) // new game
// B) draw (-1)         
events.on('gameEnded',              game.logic.setStatus)
events.on('statusChanged',          game.dom.setStatus)
events.on('statusLoaded',           game.logic.setScore) // keep score
events.on('scoreChanged',           game.logic.setGame) // keep score
events.on('gameCreated',            game.dom.loadGame) // new game