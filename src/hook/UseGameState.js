import {useEffect, useState} from "react";
import Utils from "../utils/Utils";

export const useGameState = () => {

  const [stars, setStars] = useState(Utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(Utils.range(1, 9)); // số number bấm đc
  const [candidateNums, setCandidateNums] = useState([]); // số nút đã bấm
  const [secondsLeft, setSecondsLeft] = useState(10); // số nút đã bấm

  useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  });

  const setGameStatus = (newCandidateNums) => {
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
  }

  const setNewGame = () => {
    setStars(Utils.random(1, 9));
    setAvailableNums(Utils.range(1, 9));
    setCandidateNums([]);
    setSecondsLeft(10);
  };

  return {stars, availableNums, candidateNums, secondsLeft, setGameState: setGameStatus, setNewGame}

}
