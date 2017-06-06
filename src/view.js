import { h } from 'hyperapp'

export default (state, actions) => {
  const views = { Types, Marks, Game }
  return views[state.page](state, actions)
}

const Box = (props, children) => (
  <div className="box">
    {children}
  </div>
)

const Types = (state, actions) => (
  <Box>
    <div>
      <div>
        <h1>Type of game</h1>
      </div>
      <div className="options">
        {state.options.types.map((type, idType) =>
          <button
            className="options__button"
            key={idType}
            onclick={() => {
              actions.types.setGame(type)
              actions.go('Marks')
            }}>
            {type.names.map((name, idName) =>
              <div key={idName} className="options__player">{name} </div>
            )}
          </button>
        )}
      </div>
    </div>
  </Box>
)

const Marks = (state, actions) => (
  <Box>
    <div>
      <div className="status">
        <div className="status__players">
          {state.players.map((player, index) =>
            <div key={index} className="status__player">
              <h1>{player.name}</h1>
              <p><strong>{state.options.marks[index]}</strong></p>
            </div>
          )}
        </div>
      </div>
      <div className="options">
        <button onclick={actions.marks.switchMarks}>Switch</button>
        <button onclick={() => {
          actions.marks.setGame
          actions.go('Game')
        }}>
          Submit
        </button>
      </div>
    </div>
  </Box>
)


const Game = (state, actions) => (
  <Box>
    {state.message && (
      <div
        className="message"
        onclick={actions.game.closeMessage}>
        <h1>{state.message}</h1>
        <p className="small">Click to continue</p>
      </div>
    )
    }
    < div >
      <div className="status">
        <div className="status__players">
          {state.players.map((player, id) =>
            <div key={id} className={'status__player '
              + ((id === state.current && state.message === '')
                ? 'status__player--current'
                : '')}>
              <h1>{player.name}</h1>
              <p><strong>{player.mark}</strong></p>
            </div>
          )}
        </div>
        <div className="status__scores">
          {state.players.map(player =>
            <p className="status__score">{player.score}</p>
          )}
        </div>
      </div>
      <div className="board">
        {state.board.map((row, y) =>
          <div key={y} className="board__row">
            {row.map((field, x) =>
              <button
                key={x}
                className={`board__field ${field.win ? 'board__field--win' : ''}`}
                disabled={state.waiting}
                onclick={() => actions.game.clickField({ x, y })}>
                {field.mark}
              </button>
            )}
          </div>
        )}
      </div>
      <div className="bottom">
        <button
          className="restart"
          onclick={actions.game.restart}
          disabled={state.message !== ''}>
          Restart
          </button>
      </div>
    </div >
  </Box>
)
