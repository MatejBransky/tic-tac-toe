import { h } from 'hyperapp'

const MarksView = ({ names, marks, actions }) => (
  <div className="box box--fixed">
    <div className="box__top marks">
      {names.map((name, index) =>
        <div id={index} className="marks__player">
          <h1 className="box__title">{name}</h1>
          <div>{marks[index]}</div>
        </div>
      )}
    </div>
    <div className="box__bottom">
      <button onclick={actions.switchMarks} className="button">switch</button>
      <button onclick={actions.setGame} className="button">submit</button>
    </div>
  </div>
)

export default MarksView
