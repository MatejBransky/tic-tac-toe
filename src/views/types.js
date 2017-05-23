import { h } from 'hyperapp'

const TypesView = ({ types, actions }) => (
  <div className="box box--fixed">
    <div className="box__top">
      <h1 className="box__title">Type of game</h1>
    </div>
    <div className="box__bottom"> 
      {types.map((type, idType) =>
        <button 
          className="button"
          key={idType}
          onclick={() => actions.setGame(type)}>
          {type.names.map((name, idName) =>
            <div 
              className="button__cell"
              key={idName}>
              {name}
            </div>
          )}
        </button>
      )}
    </div>
  </div>
)
export default TypesView
