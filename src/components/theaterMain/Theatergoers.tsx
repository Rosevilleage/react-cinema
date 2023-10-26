import { styled } from "styled-components";

// interface TheatergoersProps {
// 	numOfTheatergoers: {adult: number, youth: number};
// 	theatergoersBtnhandler: (type:string, num: number) => void;
// 	handicapChecked: boolean;
// 	handicapCheckboxHandler: () => void;
// }

export default function Theatergoers() {
  const theaterName = ["어른", "어린이/청소년"] as const;
  const buttonNums = Array.from({ length: 9 }, (_, i) => i);
  const numOfTheatergoers = {
    // state로 만들어서 props로 받아오기
    adult: 0,
    youth: 0,
  };
  type TheaterType = "어른" | "어린이/청소년";
  const classNameCreator = (name: TheaterType, num: number) => {
    const key = name === "어른" ? "adult" : "youth";
    return numOfTheatergoers[key] === num ? "toggle" : "";
  };
  return (
    <TheatergoersArea>
      <CheckboxRow>
        <p>* 최대 8명 선택 가능</p>
        <span>
          <input id="checkHandicap" type="checkbox" />
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
