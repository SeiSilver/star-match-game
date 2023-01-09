import {COLORS} from "../constanst/ColorTheme";

const PlayNumber = (props) => {

  return (
    <button
      className="number"
      style={{backgroundColor: COLORS[props.status]}}
      onClick={() => props.onClick(props.number, props.status)}
    >
      {props.number}
    </button>
  )
}

export default PlayNumber;