import { h } from 'hyperapp'

const TypesView = ({ types, actions }) => (
  <div>
    <div>
      <h1>Type of game</h1>
    </div>
    <div className="options"> 
      {types.map((type, idType) =>
        <button key={idType} onclick={() => actions.setGame(type)} className="options__button">
          {type.names.map((name, idName) =>
            <div key={idName} className="options__player">{name} </div>
          )}
        </button>
      )}
    </div>
  </div>
)
export default TypesView
