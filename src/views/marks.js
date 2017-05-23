import { h } from 'hyperapp'

const MarksView = ({ names, marks, actions }) => (
  <div className="marks">
    {names.map((name, index) => 
      <div id={index} className="marks__player">
        <div className="marks__name">{ name }</div>
        <div className="marks__mark">{ marks[index] }</div>
      </div>
    )}
    <button onclick={actions.switchMarks} className="marks__switch">switch</button>
    <button onclick={actions.setMarks} className="marks__submit">submit</button>
  </div>
)

export default MarksView
