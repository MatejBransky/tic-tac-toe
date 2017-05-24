import { h } from 'hyperapp'

const MarksView = ({ names, marks, actions }) => (
  <div>
    <div className="status">
      <div className="status__players">
        {names.map((name, index) =>
          <div key={index} className="status__player">
            <h1>{name}</h1>
            <p><strong>{marks[index]}</strong></p>
          </div>
        )}
      </div>
    </div>
    <div className="options">
      <button onclick={actions.switchMarks}>switch</button>
      <button onclick={actions.setGame}>submit</button>
    </div>
  </div>
)

export default MarksView
