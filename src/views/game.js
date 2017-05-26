import { h } from 'hyperapp'

const GameView = ({ players, board, actions }) => (
  <div>
    <div className="status">
      <div className="status__players">
        {players.map(player =>
          <div className="status__player">
            <h1>{player.name}</h1>
            <p><strong>{player.mark}</strong></p>
          </div>
        )}
      </div>
      <div className="status__scores">
        {players.map(player =>
          <p className="status__score">{player.score}</p>
        )}
      </div>
    </div>
    <div className="board">
      {board.map((row, y) =>
        <div key={y} className="board__row">
          {row.map((field, x) =>
            <button
              key={x}
              className="board__field"
              onclick={() => actions.process({ x, y })}>
              {field.mark}
            </button>
          )}
        </div>
      )}
    </div>
    <div className="settings">
      <button>Restart</button>
    </div>
  </div>
)

export default GameView
