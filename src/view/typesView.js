import { h } from 'hyperapp'

const types = [
  {
    playersNames: ['Player', 'Player'],
    ai: false
  },
  {
    playersNames: ['Player', 'PC'],
    ai: true
  }
]

const TypesView = ({ onClick }) => (
  <div className="types">
    <h1 className="types__title">Type of game</h1>
    <div className="types__options">
      {types.map((type, idType) =>
        <button key={idType} onclick={() => onClick(type)} className="types__item">
          {type.playersNames.map((player, idPlayer) =>
            <div key={idPlayer} className="types__player">{ player }</div>
          )}
        </button>
      )}
    </div>
  </div>
)

export default TypesView
