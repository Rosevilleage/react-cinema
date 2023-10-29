import React, { useState } from "react";
import styled from "styled-components";
import TheatergoersAndPriceInfo from "./theaterMain/TheatergoersAndPriceInfo";
import Seats from "./theaterMain/Seats";

const seatBuffInitialState = {
  A: [0],
  B: [0],
  C: [0],
  cnt: {
    adult: 0,
    youth: 0,
  },
};

export type SeatsLine = "A" | "B" | "C";
export type SeatType = "general" | "sale" | "handicap";
export type SeatBuff = typeof seatBuffInitialState;

const seatsActivationInitialState = {
  general: false,
  sale: false,
  handicap: false,
};

export type SeatsActivation = typeof seatsActivationInitialState;

const moviegoersInitialState = {
  adult: 0,
  youth: 0,
};

export type Moviegoers = typeof moviegoersInitialState;

export default function Theater() {
  const [seatBuff, setSeatBuff] = useState(seatBuffInitialState);
  const [moviegoers, setMoviegoers] = useState(moviegoersInitialState);
  const [isHandicap, setIsHandicap] = useState(false);
  const [seatsActivation, setSeatsActivation] = useState(
    seatsActivationInitialState
  );
  // const [price, setPrice] = useState(0);
  const seatsLength = seatBuff.cnt.adult + seatBuff.cnt.youth;

  const resetHandler = () => {
    setSeatBuff(seatBuffInitialState);
    setMoviegoers(moviegoersInitialState);
    setIsHandicap(false);
    setSeatsActivation(seatsActivationInitialState);
  };
  const theaterClickHandler = (name: keyof typeof moviegoers, num: number) => {
    const otherName = name === "adult" ? "youth" : "adult";
    const expectedMoviegoers = moviegoers[otherName] + num;

    if (expectedMoviegoers === 0) {
      setSeatsActivation(seatsActivationInitialState);
      setSeatBuff(seatBuffInitialState);
      setIsHandicap(false);
    } else {
      if (isHandicap) {
        if (expectedMoviegoers > 3) {
          window.alert(
            "장애인 좌석은 최대 3석입니다. 3인 이하로 선택해 주세요."
          );
          return;
        } else {
          setSeatsActivation({
            general: false,
            sale: false,
            handicap: true,
          });
        }
      } else {
        const { adult, youth } = seatBuff.cnt;
        if (adult + youth > expectedMoviegoers) {
          if (
            !confirm(
              "선택된 좌석보다 변경한 관람객의 수가 적습니다. 관람객 수를 변경하시겠습니까?"
            )
          )
            return;
          else setSeatBuff(seatBuffInitialState);
        } else if (expectedMoviegoers < 2) {
          setSeatsActivation({
            general: true,
            sale: false,
            handicap: false,
          });
        } else {
          setSeatsActivation({
            general: true,
            sale: true,
            handicap: false,
          });
        }
      }
    }
    setMoviegoers({
      ...moviegoers,
      [name]: num,
    });
  };

  const handicapCheckboxHandler = () => {
    const totalMoviegoers = moviegoers.adult + moviegoers.youth;
    if (!isHandicap) {
      if (totalMoviegoers > 3) {
        alert("장애인 좌석은 최대 3석입니다. 3인 이하로 선택해 주세요.");
        return;
      }
      setSeatsActivation({
        general: false,
        sale: false,
        handicap: true,
      });
    } else {
      setSeatsActivation({
        general: true,
        sale: true,
        handicap: false,
      });
    }

    setIsHandicap(!isHandicap);
  };

  const seatClickHandler = (
    line: SeatsLine,
    seatType: SeatType,
    seatNum: number,
    disabled: boolean
  ) => {
    if (disabled) return;
    const totalMoviegors = moviegoers.adult + moviegoers.youth;
    if (totalMoviegors === 0) return;

    const { adult, youth } = seatBuff.cnt;
    const currentTotalCnt = adult + youth;

    if (!seatBuff[line].includes(seatNum)) {
      const moviegoersType = adult < moviegoers.adult ? "adult" : "youth";
      const expectedCount = moviegoersType === "adult" ? adult + 1 : youth + 1;

      const newbuff = {
        ...seatBuff,
        [line]: [...seatBuff[line], seatNum],
        cnt: {
          ...seatBuff.cnt,
          [moviegoersType]: expectedCount,
        },
      };
      setSeatBuff(newbuff);

      const expectedTotalCount =
        moviegoersType === "adult"
          ? youth + expectedCount
          : adult + expectedCount;

      if (expectedTotalCount < totalMoviegors) {
        setSeatsActivation({
          ...seatsActivation,
          [seatType]: true,
        });
      } else if (expectedTotalCount === totalMoviegors) {
        setSeatsActivation(seatsActivationInitialState);
      }
    } else {
      const moviegoersType =
        currentTotalCnt > moviegoers.youth ? "adult" : "youth";
      const expectedCount = moviegoersType === "adult" ? adult - 1 : youth - 1;
      const expectedTotalCount =
        moviegoersType === "adult"
          ? youth + expectedCount
          : adult + expectedCount;

      const newbuff = {
        ...seatBuff,
        [line]: [...seatBuff[line].filter((num) => num !== seatNum)],
        cnt: {
          ...seatBuff.cnt,
          [moviegoersType]: expectedCount < 0 ? 0 : expectedCount,
        },
      };
      setSeatBuff(newbuff);

      if (
        expectedTotalCount < totalMoviegors &&
        totalMoviegors === currentTotalCnt
      ) {
        if (seatType === "handicap") {
          setSeatsActivation({
            ...seatsActivation,
            [seatType]: true,
          });
        } else if (seatType === "general" && totalMoviegors === 1) {
          setSeatsActivation({
            handicap: false,
            general: true,
            sale: false,
          });
        } else {
          setSeatsActivation({
            handicap: false,
            general: true,
            sale: true,
          });
        }
      }
    }
  };

  return (
    <TheaterContainer>
      <TheaterTitle>인원/좌석</TheaterTitle>
      <TheatergoersAndPriceInfo
        moviegoers={moviegoers}
        isHandicap={isHandicap}
        theaterClickHandler={theaterClickHandler}
        handicapCheckboxHandler={handicapCheckboxHandler}
        seatsLength={seatsLength}
      />
      <Seats
        seatsActivation={seatsActivation}
        seatBuff={seatBuff}
        seatClickHandler={seatClickHandler}
      />
      <ResetBox>
        <button onClick={resetHandler}>좌석 선택 초기화</button>
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
