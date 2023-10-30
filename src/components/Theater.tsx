import React, { useEffect, useState } from "react";
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
  const [price, setPrice] = useState(0);
  const seatsLength = seatBuff.cnt.adult + seatBuff.cnt.youth;

  const resetHandler = () => {
    setSeatBuff(seatBuffInitialState);
    setMoviegoers(moviegoersInitialState);
    setIsHandicap(false);
    setSeatsActivation(seatsActivationInitialState);
    setPrice(0);
  };

  const seatsActivationHandler = (
    seatTypeOrBoolean: keyof SeatsActivation | boolean
  ) => {
    const [disabledSeat_1, disabledSeat_2] = Object.keys(
      seatsActivation
    ).filter((seat) => seat !== seatTypeOrBoolean);
    if (
      seatTypeOrBoolean === "general" ||
      seatTypeOrBoolean === "sale" ||
      seatTypeOrBoolean === "handicap"
    ) {
      setSeatsActivation({
        ...seatsActivation,
        [seatTypeOrBoolean]: true,
        [disabledSeat_1]: false,
        [disabledSeat_2]: false,
      });
    } else {
      setSeatsActivation({
        general: seatTypeOrBoolean,
        sale: seatTypeOrBoolean,
        handicap: seatTypeOrBoolean,
      });
    }
  };

  const priceChangeHandler = (
    seatType: SeatType,
    moviegoersType: keyof Moviegoers,
    operator: "+" | "-"
  ) => {
    const caculator = {
      "+": (num: number, discount: number) => price + num * discount,
      "-": (num: number, discount: number) => price - num * discount,
    };
    const targetNumber =
      seatType === "handicap"
        ? 5000
        : moviegoersType === "adult"
        ? 10000
        : 7000;

    if (seatType === "sale") {
      setPrice(caculator[operator](targetNumber * 2, 0.8));
    } else {
      setPrice(caculator[operator](targetNumber, 1));
    }
  };

  const theaterClickHandler = (name: keyof typeof moviegoers, num: number) => {
    const otherName = name === "adult" ? "youth" : "adult";
    const expectedMoviegoers = moviegoers[otherName] + num;
    if (moviegoers[name] === num) return;
    if (expectedMoviegoers === 0) {
      setSeatsActivation(seatsActivationInitialState);
      setSeatBuff(seatBuffInitialState);
      setIsHandicap(false);
      setPrice(0);
    } else {
      const { adult, youth } = seatBuff.cnt;
      const totalSeatCnt = adult + youth;
      if (totalSeatCnt > expectedMoviegoers) {
        if (
          !confirm(
            "선택된 좌석보다 변경한 관람객의 수가 적습니다. 관람객 수를 변경하시겠습니까?"
          )
        )
          return;
        else {
          setSeatBuff(seatBuffInitialState);
          setPrice(0);
        }
      }
      if (isHandicap) {
        if (expectedMoviegoers > 3) {
          window.alert(
            "장애인 좌석은 최대 3석입니다. 3인 이하로 선택해 주세요."
          );
          return;
        }
        seatsActivationHandler("handicap");
      } else {
        if (expectedMoviegoers < 2 || expectedMoviegoers % 2 !== 0) {
          setSeatsActivation({
            general: true,
            sale: false,
            handicap: false,
          });
        } else if (expectedMoviegoers % 2 === 0) {
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
      seatsActivationHandler("handicap");
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
    const { adult, youth } = seatBuff.cnt;
    const currentTotalCnt = adult + youth;

    const seatBuffUpdator = (operator: "+" | "-") => {
      /**sale 좌석이면 선택 좌석 수를 2씩 늘리고 아니면 1씩 늘린다. */
      const numOfSeatsSelected = seatType === "sale" ? 2 : 1;

      /** 자리를 선택할때 성인이 선택한 좌석수 보다 성인 관람객 수가 크면 해당 좌석을 성인이 선택한다 아니면 청소년이 선택한다.
       자리를 취소하는 경우 선택한 좌석 수 가 청소년 관람객 수보다 크면 성인이 취소한다. 아니면 청소년이 취소한다. */
      const moviegoersType =
        operator === "+"
          ? adult < moviegoers.adult
            ? "adult"
            : "youth"
          : currentTotalCnt > moviegoers.youth
          ? "adult"
          : "youth";

      // sale 좌석 계산 다시해야함
      const expectedCount =
        operator === "+"
          ? moviegoersType === "adult"
            ? adult + numOfSeatsSelected
            : youth + numOfSeatsSelected
          : moviegoersType === "adult"
          ? adult - numOfSeatsSelected
          : youth - numOfSeatsSelected;

      const otherMoviegoersType =
        moviegoersType === "adult" ? "youth" : "adult";
      const nextSeatCnount =
        operator === "+"
          ? seatType === "sale" && expectedCount > moviegoers[moviegoersType]
            ? {
                ...seatBuff.cnt,
                [moviegoersType]: moviegoers[moviegoersType],
                [otherMoviegoersType]: seatBuff.cnt[otherMoviegoersType] + 1,
              }
            : { ...seatBuff.cnt, [moviegoersType]: expectedCount }
          : seatType === "sale" && expectedCount < 0
          ? {
              ...seatBuff.cnt,
              [moviegoersType]: 0,
              [otherMoviegoersType]: seatBuff.cnt[otherMoviegoersType] - 1,
            }
          : { ...seatBuff.cnt, [moviegoersType]: expectedCount };

      const expectedTotalCount =
        moviegoersType === "adult"
          ? youth + expectedCount
          : adult + expectedCount;

      /**선택한 sale 좌석의 번호가 홀수면 오른쪽 좌석도 선택에 포함 시키고 아니면 왼쪽 좌석도 선택에 포함시킨다. */
      const newSeat =
        numOfSeatsSelected === 2
          ? seatNum % 2 === 0
            ? [seatNum - 1, seatNum]
            : [seatNum, seatNum + 1]
          : [seatNum];

      const nextSeats =
        operator === "+"
          ? [...seatBuff[line], ...newSeat]
          : [
              ...seatBuff[line].filter(
                (seat) => seat !== newSeat[0] && seat !== newSeat[1]
              ),
            ];

      if (operator === "+") {
        if (expectedTotalCount < totalMoviegors)
          seatsActivationHandler(seatType);
        else if (expectedTotalCount === totalMoviegors)
          setSeatsActivation(seatsActivationInitialState);
        else if (expectedTotalCount > totalMoviegors) {
          alert("관람객 수보다 많은 좌석을 선택했습니다.");
          return;
        }
      } else {
        if (
          expectedTotalCount < totalMoviegors &&
          totalMoviegors === currentTotalCnt
        )
          seatsActivationHandler(seatType);
      }

      const nextBuff = {
        ...seatBuff,
        [line]: nextSeats,
        cnt: nextSeatCnount,
      };

      setSeatBuff(nextBuff);
      priceChangeHandler(seatType, moviegoersType, operator);
    };

    if (!seatBuff[line].includes(seatNum)) seatBuffUpdator("+");
    else seatBuffUpdator("-");
  };

  useEffect(() => {
    console.log("adult", seatBuff.cnt.adult);
    console.log("youth", seatBuff.cnt.youth);
  }, [moviegoers]);

  return (
    <TheaterContainer>
      <TheaterTitle>인원/좌석</TheaterTitle>
      <TheatergoersAndPriceInfo
        moviegoers={moviegoers}
        isHandicap={isHandicap}
        theaterClickHandler={theaterClickHandler}
        handicapCheckboxHandler={handicapCheckboxHandler}
        seatsLength={seatsLength}
        price={price}
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
