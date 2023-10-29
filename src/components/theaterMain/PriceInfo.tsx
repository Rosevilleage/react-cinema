import styled from "styled-components";

interface PriceOnfoProps {
  seatsLength: number;
  price?: number;
  showTime?: {
    date: string;
    time: string;
  };
}
const TOTAL_SEATS_LENGTH = 39;
export default function PriceInfo({ seatsLength }: PriceOnfoProps) {
  const remainingSeats = TOTAL_SEATS_LENGTH - seatsLength;
  return (
    <PriceInfoArea>
      <p>
        리엑트 씨네마 | 타입관 | 잔여석{" "}
        <span className="remain">{remainingSeats}</span>/{TOTAL_SEATS_LENGTH}
      </p>
      <p>2023.10.26(목) 14:50 ~ 17:00</p>
      <p>
        총 금액 <span className="price">0</span>원
      </p>
    </PriceInfoArea>
  );
}

const PriceInfoArea = styled.div`
  flex: 1 1;
  & > p {
    line-height: 1.6rem;
    text-align: start;
    font-size: 1rem;
    > .remain {
      color: #ff8c00;
      font-weight: 600;
    }
    > .price {
      color: #ffe100;
      font-weight: 600;
      text-shadow: 0 0 1px #000000;
    }
  }
`;
