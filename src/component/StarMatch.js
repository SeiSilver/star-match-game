import {useEffect, useState} from "react";
import Utils from "../utils/Utils";
import StarList from "./StarList";
import {AVAILABLE, USED} from "../constanst/NumberStatus";
import PlayNumberList from "./PlayNumberList";
import PlayAgainBtn from "./PlayAgainBtn";
import {ACTIVE, LOST, WIN} from "../constanst/GameStatus";


const StarMatch = () => {

  const [stars, setStars] = useState(Utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(Utils.range(1, 9)); // số number bấm đc
  const [candidateNums, setCandidateNums] = useState([]); // số nút đã bấm
  const [secondsLeft, setSecondsLeft] = useState(10); // số nút đã bấm

  useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      const timerId = setInterval(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  });

  let candidatesAreWrong = Utils.sum(candidateNums) > stars;
  let gameStatus = availableNums.length === 0
    ? WIN
    : secondsLeft === 0 ? LOST : ACTIVE

  const resetGame = () => {
    setStars(Utils.random(1, 9));
    setAvailableNums(Utils.range(1, 9));
    setCandidateNums([]);
    setSecondsLeft(10);
  };

  const onNumberClick = (number, currentStatus) => {
    if (gameStatus !== ACTIVE || currentStatus === USED) {
      return;
    }

    const newCandidateNums =
      currentStatus === AVAILABLE ? candidateNums.concat(number) : candidateNums.filter(cn => cn !== number);

    if (Utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      const newAvailableNums = availableNums.filter(
        n => !newCandidateNums.includes(n)
      );
      setStars(Utils.randomSumIn(newAvailableNums, 9));
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
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
                  onClick={resetGame} gameStatus={gameStatus}
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