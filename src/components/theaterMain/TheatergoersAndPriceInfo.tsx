import styled from "styled-components";
import Theatergoers from "./Theatergoers";
import PriceInfo from "./PriceInfo";

export default function TheatergoersAndPriceInfo() {
  return (
    <TheatergoersAndPriceInfoContainer>
      <Theatergoers />
      <PriceInfo remainSeats={39} />
    </TheatergoersAndPriceInfoContainer>
  );
}

const TheatergoersAndPriceInfoContainer = styled.div`
  width: 100%;
  display: flex;
  & > div {
    border: 1px solid lightgray;
    padding: 12px;
  }
`;
