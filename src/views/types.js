import { h } from 'hyperapp'

const TypesView = ({ data, actions }) => (
  <div className="types">
    <h1 className="types__title">Type of game</h1>
    <div className="types__options">
      {data.map((type, idType) =>
        <button className="types__item" key={idType} onclick={() => actions.setType(type)}>
          {type.players.map((player, idPlayer) =>
            <div className="types__player" key={idPlayer}>
              { player.name }
            </div>
          )}
        </button>
      )}
    </div>
  </div>
)

export default TypesView
