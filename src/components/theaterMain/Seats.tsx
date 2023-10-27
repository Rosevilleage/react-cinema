import styled from "styled-components";
// const seatBuff = {
//   A: [0],
//   B: [0],
//   C: [0]
// }
export default function Seats() {
  const seatsRowTitle = ["A", "B", "C"] as const;
  const seatsRowData = Array.from({ length: 13 }, (_, i) => i + 1);

  return (
    <SeatsContainer>
      <Screen>Screen</Screen>
      {seatsRowTitle.map((title) => (
        <SeatsRow key={title}>
          <div>{title}</div>
          {seatsRowData.map((num) => {
            const seatType =
              title === "C" ? (num < 11 ? "sale" : "handicap") : "general";
            // const clicked = seatBuff[title].includes(num)
            return (
              <SeatBtn
                key={`${title}-${num}`}
                $seatType={seatType}
                $disabled={true}
                $clicked={false}
              >
                {num}
              </SeatBtn>
            );
          })}
        </SeatsRow>
      ))}
    </SeatsContainer>
  );
}

const SeatsContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 35px 5px;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
`;

const Screen = styled.div`
  background-color: lightgray;
  margin: 10px auto;
  width: 100%;
  max-width: 780px;
`;

const SeatsRow = styled.div`
  width: 100%;
  max-width: 780px;
  display: flex;
  align-items: center;
  margin: 0 auto 1px;
  flex-wrap: wrap;
  > div {
    width: 51px;
    height: 54px;
    border-bottom: 1px solid gray;
    border-top: 1px solid gray;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

interface SeatBtnProp {
  $disabled: boolean;
  $clicked: boolean;
  $seatType: "general" | "sale" | "handicap";
}

const SeatBtn = styled.button<SeatBtnProp>`
  cursor: ${({ $disabled }) => ($disabled ? "" : "pointer")};
  color: white;
  font-weight: bold;
  width: 55px;
  height: 55px;
  border-radius: 5px;
  border: none;
  margin-right: 1px;
  background-color: ${({ $disabled, $clicked, $seatType, theme }) => {
    if ($disabled) return theme.seatBackgroundColor.disabled;
    else if ($clicked) return theme.seatBackgroundColor.clicked;
    else return theme.seatBackgroundColor[$seatType];
  }};
`;
