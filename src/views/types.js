import { h } from 'hyperapp'

const TypesView = ({ types, actions }) => (
  <div className="types">
    <h1 className="types__title">Type of game</h1>
    <div className="types__options">
      {types.map((type, idType) =>
        <button className="types__item" key={idType} onclick={() => actions.setType(type)}>
          {type.names.map((name, idName) =>
            <div className="types__player" key={idName}>
              { name }
            </div>
          )}
        </button>
      )}
    </div>
  </div>
)

export default TypesView
