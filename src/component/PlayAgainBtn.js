const PlayAgainBtn = (props) => {
  return (
    <div className="game-done">
      <button onClick={props.onClick}>Play Again</button>
    </div>
  )
}

export default PlayAgainBtn;