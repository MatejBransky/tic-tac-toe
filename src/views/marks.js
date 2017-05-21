import { h } from 'hyperapp'

const MarksView = ({ data, actions }) => (
  <div className="marks">
    {data.players.map((player, index) => 
      <div id={index} className="marks__player">
        <div className="marks__name">{ player.name }</div>
        <div className="marks__mark">{ player.mark }</div>
      </div>
    )}
    <button onclick={() => actions.switchMarks(data)} className="marks__switch">switch</button>
    <button onclick={() => actions.setMarks(data.players)} className="marks__submit">submit</button>
  </div>
)

export default MarksView
