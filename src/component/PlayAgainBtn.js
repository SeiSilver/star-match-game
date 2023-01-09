import {LOST} from "../constanst/GameStatus";

const PlayAgainBtn = (props) => {
  return (
    <div className="game-done">
      <div
        className="message"
        style={{color: props.gameStatus === LOST ? 'red' : 'green'}}
      >
        {props.gameStatus === LOST ? 'Game Over' : 'Nice'}
      </div>
      <button onClick={props.onClick}>Play Again</button>
    </div>
  )
}

export default PlayAgainBtn;