import { h } from 'hyperapp'

const GameView = ({ players, board, actions }) => (
  <div className="game">
    <div className="game__stats">
      {players.map(player =>
        <div className="game__player">
          <div className="game__name">{player.name}</div>
          <div className="game__mark">{player.mark}</div>
          <div className="game__score">{player.score}</div>
        </div>
      )}
    </div>
    <div className="game__board">
      {board
        .map((row, y) =>
          <div className="game__row">
            {row.map((field, x) =>
              <div
                className="game__field"
                onclick={() => actions.markField({ x, y, obj: { value: 1, mark: 'X' } })}>
                field.mark
              </div>
            )}
          </div>
        )}
    </div>
  </div>
)

export default GameView
