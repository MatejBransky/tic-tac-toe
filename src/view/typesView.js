import { h } from 'hyperapp'

const types = [
  ['Player', 'Player'],
  ['Player', 'PC']
]

const TypesOptions = ({ onClick, types }) => (
  <div className="types__options">
    { types.map((type, idType) => 
      <button key={ idType } onclick={ () => onClick(idType) } className="types__item">
        { type.map((player, idPlayer) => 
          <div key={ idPlayer } className="types__player">{ player }</div>
        )}
      </button>
    ) }
  </div>
)

const TypesView = ({ onClick }) => (
  <div className="types">
    <h1 className="types__title">Type of game</h1>
    <TypesOptions onClick={ onClick } types={ types } />
  </div>
)

export default TypesView
