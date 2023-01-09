import Utils from "../utils/Utils";
import StarList from "./StarList";
import {AVAILABLE, USED} from "../constanst/NumberStatus";
import PlayNumberList from "./PlayNumberList";
import PlayAgainBtn from "./PlayAgainBtn";
import {ACTIVE, LOST, WIN} from "../constanst/GameStatus";
import {useGameState} from "../hook/UseGameState";

const StarMatch = () => {

  const {
    stars,
    availableNums,
    candidateNums,
    secondsLeft,
    setGameState,
    setNewGame
  } = useGameState();

  const candidatesAreWrong = Utils.sum(candidateNums) > stars;
  const gameStatus = availableNums.length === 0
    ? WIN
    : secondsLeft === 0 ? LOST : ACTIVE

  const onNumberClick = (number, currentStatus) => {
    if (gameStatus !== ACTIVE || currentStatus === USED) {
      return;
    }

    const newCandidateNums = currentStatus === AVAILABLE ? candidateNums.concat(number) : candidateNums.filter(cn => cn !== number);

    setGameState(newCandidateNums);
  };

  return (
    <div className="container">
      <div className="game">
        <div className="help">
          Pick 1 or more numbers that sum to the number of stars
        </div>
        <div className="body">
          <div className="left">
            {
              gameStatus !== ACTIVE ?
                <PlayAgainBtn
                  onClick={setNewGame} gameStatus={gameStatus}
                />
                :
                <StarList stars={stars}/>
            }
          </div>
          <div className="right">
            <PlayNumberList
              availableNums={availableNums}
              candidateNums={candidateNums}
              candidatesAreWrong={candidatesAreWrong}
              onClick={onNumberClick}
            />
          </div>
        </div>
        <div className="timer">Time Remaining: {secondsLeft}</div>
      </div>

    </div>
  );
};

export default StarMatch;