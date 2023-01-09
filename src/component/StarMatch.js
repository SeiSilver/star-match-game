import {useEffect, useState} from "react";
import Utils from "../utils/Utils";
import StarList from "./StarList";
import {AVAILABLE, USED} from "../constanst/NumberStatus";
import PlayNumberList from "./PlayNumberList";
import PlayAgainBtn from "./PlayAgainBtn";


const StarMatch = () => {

  const [stars, setStars] = useState(Utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(Utils.range(1, 9)); // số number bấm đc
  const [candidateNums, setCandidateNums] = useState([]); // số nút đã bấm
  const [timeLeft, setTimeLeft] = useState(10); // số nút đã bấm

  useEffect(() => {
    if (timeLeft > 0) {
      setTimeout(() => {

      }, 1000);
    }
  });


  const candidatesAreWrong = Utils.sum(candidateNums) > stars;
  const isEndGame = availableNums.length === 0;

  const resetGame = () => {
    setStars(Utils.random(1, 9));
    setAvailableNums(Utils.range(1, 9));
    setCandidateNums([]);
  };

  const onNumberClick = (number, currentStatus) => {
    if (currentStatus === USED) {
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
              isEndGame ?
                <PlayAgainBtn
                  onClick={resetGame}
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
        <div className="timer">Time Remaining: 10</div>
      </div>

    </div>
  );
};

export default StarMatch;