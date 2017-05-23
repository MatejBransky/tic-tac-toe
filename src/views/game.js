import { h } from 'hyperapp'

const GameView = ({ players, board, actions }) => (
  <div className="box game">
    <div className="box__top game__top">
      <div className="box__top game__desc">
        {players.map(player =>
          <div className="game__player">
            <div className="box__title player__name">{player.name}</div>
            <div className="player__mark">{player.mark}</div>
          </div>
        )}
      </div>
      <div className="game__score">
        {players.map(player =>
          <div className="player__score">{player.score}</div>
        )}
      </div>
    </div>
    <div className="box__middle game__board">
      {board
        .map((row, y) =>
          <div className="board__row">
            {row.map((field, x) =>
              <button
                className="board__field"
                onclick={() => actions.markField({ x, y, obj: { value: 1, mark: 'X' } })}>
                {field.mark}
              </button>
            )}
          </div>
        )}
    </div>
    <div className="box__bottom game__settings">
      <button className="button game__button">Restart</button>
    </div>
  </div>
)

export default GameView
