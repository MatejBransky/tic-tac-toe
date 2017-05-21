import { h } from 'hyperapp'

const TypesView = ({ data, setType }) => (
  <div className="types">
    <h1 className="types__title">Type of game</h1>
    <div className="types__options">
      {data.map((type, idType) =>
        <button key={idType} onclick={() => setType(type)} className="types__item">
          {type.playersNames.map((player, idPlayer) =>
            <div key={idPlayer} className="types__player">{ player }</div>
          )}
        </button>
      )}
    </div>
  </div>
)

export {
  TypesView
}
