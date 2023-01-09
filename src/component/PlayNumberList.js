import Utils from "../utils/Utils";
import PlayNumber from "./PlayNumber";
import {AVAILABLE, CANDIDATE, USED, WRONG} from "../constanst/NumberStatus";

const PlayNumberList = (props) => {

  const numberStatus = number => {
    if (!(props.availableNums).includes(number)) {
      return USED;
    }
    if ((props.candidateNums).includes(number)) {
      return props.candidatesAreWrong ? WRONG : CANDIDATE;
    }
    return AVAILABLE;
  };

  return (
    <div>
      {Utils.range(1, 9).map(number =>
        <PlayNumber
          key={number}
          status={numberStatus(number)}
          number={number}
          onClick={() => props.onClick(number, numberStatus(number))}
        />
      )}
    </div>
  );

}

export default PlayNumberList;