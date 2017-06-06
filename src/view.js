import { h } from 'hyperapp'

export default {
  '/': (state, actions) =>
    <Box>
      <div>
        <div>
          <h1>Type of game</h1>
        </div>
        <div className="options">
          {state.options.types.map((type, idType) =>
            <button key={idType} onclick={() => actions.types.setGame(type)} className="options__button">
              {type.names.map((name, idName) =>
                <div key={idName} className="options__player">{name} </div>
              )}
            </button>
          )}
        </div>
      </div>
    </Box>,

  '/marks': (state, actions) =>
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
          <button onclick={actions.marks.switchMarks}>switch</button>
          <button onclick={actions.marks.setGame}>submit</button>
        </div>
      </div>
    </Box>,

  '/game': (state, actions) =>
    <Box >
      {state.message && (
        <div
          className="message"
          onclick={actions.game.closeMessage}>
          <h1>{state.message}</h1>
          <p className="small">Click to continue</p>
        </div>
      )}
      <div>
        <div className="status">
          <div className="status__players">
            {state.players.map(player =>
              <div className="status__player">
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
      </div>
    </Box >
}

const Box = (props, children) =>
  <div className="box">
    {children}
  </div>


