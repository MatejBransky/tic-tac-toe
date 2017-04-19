const game = (() => {
  const model = (() => {
    function setGame(arguments) {

    }

    function saveMove(arguments) {

    }

    function controlMoves(arguments) {

    }

    function setCurrentPlayer(arguments) {

    }

    function setStatus(arguments) {

    }

    function setScore(arguments) {

    }

    return {
      setGame,
      saveMove,
      controlMoves,
      setCurrentPlayer,
      setStatus,
      setScore
    }
  })()

  const view = (() => {
    function loadGame(arguments) {

    }

    function listenGame(arguments) {

    }

    function handleClick(arguments) {

    }

    function markField(arguments) {

    }

    function setCurrentPlayer(arguments) {

    }

    function setStatus(arguments) {

    }

    return {
      loadGame,
      listenGame,
      handleClick,
      markField,
      setCurrentPlayer,
      setStatus
    }
  })()

  return {
    model,
    view
  }
})()