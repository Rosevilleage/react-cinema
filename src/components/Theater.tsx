import React, { useState } from "react";
import styled from "styled-components";
import TheatergoersAndPriceInfo from "./theaterMain/TheatergoersAndPriceInfo";
import Seats from "./theaterMain/Seats";
// const seatBuffInitialState = {
//   A: [0],
//   B: [0],
//   C: [0]
// }
const moviegoersInitialState = {
  adult: 0,
  youth: 0,
};
export default function Theater() {
  // const [seatBuff, setSeatBuff] = useState(seatBuffInitialState);
  const [moviegoers, setMoviegoers] = useState(moviegoersInitialState);
  const [isHandicap, setIsHandicap] = useState(false);

  const theaterClickHandler = (name: keyof typeof moviegoers, num: number) => {
    const otherName = name === "adult" ? "youth" : "adult";
    const expectedMoviegoers = moviegoers[otherName] + num;
    if (isHandicap) {
      if (expectedMoviegoers > 3) {
        window.alert("장애인 좌석은 최대 3석입니다. 3인 이하로 선택해 주세요.");
        return;
      }
    }
    setMoviegoers({
      ...moviegoers,
      [name]: num,
    });
    if (moviegoers.adult + moviegoers.youth === 0) setIsHandicap(false);
  };

  const handicapCheckboxHandler = () => {
    setIsHandicap(!isHandicap);
  };

  return (
    <TheaterContainer>
      <TheaterTitle>인원/좌석</TheaterTitle>
      <TheatergoersAndPriceInfo
        moviegoers={moviegoers}
        isHandicap={isHandicap}
        theaterClickHandler={theaterClickHandler}
        handicapCheckboxHandler={handicapCheckboxHandler}
      />
      <Seats />
      <ResetBox>
        <button>좌석 선택 초기화</button>
      </ResetBox>
    </TheaterContainer>
  );
}

const TheaterContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;
`;

const TheaterTitle = styled.p`
  width: 100%;
  background-color: #4484c3;
  border-radius: 0.7rem 0.7rem 0 0;
  color: white;
  padding: 15px 5px;
`;

const ResetBox = styled.div`
  width: 100%;
  padding: 15px 0;
  background-color: #4484c3;
  border-radius: 0 0 0.7rem 0.7rem;
  > button {
    background-color: #f4c402;
    color: white;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    font-weight: bold;
    padding: 10px;
    &:active {
      background-color: #c7a005;
    }
  }
`;
