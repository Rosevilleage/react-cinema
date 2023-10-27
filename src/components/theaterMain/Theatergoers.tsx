import { styled } from "styled-components";
import { Moviegoers } from "./TheatergoersAndPriceInfo";

interface TheatergoersProps {
  moviegoers: Moviegoers;
  isHandicap: boolean;
  theaterClickHandler: (name: keyof Moviegoers, num: number) => void;
  handicapCheckboxHandler: () => void;
}

type TheaterType = "어른" | "어린이/청소년";

export default function Theatergoers({
  moviegoers,
  isHandicap,
  handicapCheckboxHandler,
  theaterClickHandler,
}: TheatergoersProps) {
  const theaterName = ["어른", "어린이/청소년"] as const;
  const buttonNums = Array.from({ length: 9 }, (_, i) => i);
  const classNameCreator = (name: TheaterType, num: number) => {
    const key = name === "어른" ? "adult" : "youth";
    return moviegoers[key] === num ? "toggle" : "";
  };

  const theaterTpye = (name: TheaterType) =>
    name === "어른" ? "adult" : "youth";
  const totalmoviegeors = moviegoers.adult + moviegoers.youth;
  const handicapDisabled =
    (!isHandicap && totalmoviegeors > 3) || totalmoviegeors === 0
      ? true
      : false;

  return (
    <TheatergoersArea>
      <CheckboxRow>
        <p>* 최대 8명 선택 가능</p>
        <span>
          <input
            id="checkHandicap"
            type="checkbox"
            checked={isHandicap}
            onChange={handicapCheckboxHandler}
            disabled={handicapDisabled}
          />
          <label htmlFor="checkHandicap">장애인</label>
        </span>
      </CheckboxRow>
      {theaterName.map((name) => (
        <ButtonRow key={name}>
          <span>{name}</span>
          <ul>
            {buttonNums.map((num) => (
              <TheaterBtn
                key={`${name}${num}`}
                className={classNameCreator(name, num)}
                onClick={() => theaterClickHandler(theaterTpye(name), num)}
              >
                {num}
              </TheaterBtn>
            ))}
          </ul>
        </ButtonRow>
      ))}
    </TheatergoersArea>
  );
}

const TheatergoersArea = styled.div`
  flex: 1 1;
  & > div {
    margin-bottom: 10px;
  }
`;

const CheckboxRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > p {
    color: red;
  }
  > span {
    label {
      margin-left: 5px;
      cursor: pointer;
    }
    input {
      cursor: pointer;
    }
  }
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;

  & > span {
    min-width: 6rem;
    width: 20%;
  }
  & > ul {
    display: flex;
    list-style: none;
    justify-content: space-around;
    align-items: center;
    width: 60%;
    margin-left: 10px;
  }
`;

const TheaterBtn = styled.button`
  font-weight: bold;
  outline: none;
  border: 1px solid lightgray;
  border-radius: 0.3rem;
  padding: 2px 6px;
  background-color: white;
  cursor: pointer;
  &.toggle {
    background-color: black;
    color: white;
  }
`;
