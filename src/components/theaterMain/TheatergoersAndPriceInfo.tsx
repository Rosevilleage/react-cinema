import styled from "styled-components";
import Theatergoers from "./Theatergoers";
import PriceInfo from "./PriceInfo";
import { Moviegoers } from "../Theater";

interface TheatergoersAndPriceInfoProps {
  moviegoers: Moviegoers;
  isHandicap: boolean;
  theaterClickHandler: (name: keyof Moviegoers, num: number) => void;
  handicapCheckboxHandler: () => void;
}

export default function TheatergoersAndPriceInfo({
  moviegoers,
  isHandicap,
  handicapCheckboxHandler,
  theaterClickHandler,
}: TheatergoersAndPriceInfoProps) {
  return (
    <TheatergoersAndPriceInfoContainer>
      <Theatergoers
        moviegoers={moviegoers}
        theaterClickHandler={theaterClickHandler}
        isHandicap={isHandicap}
        handicapCheckboxHandler={handicapCheckboxHandler}
      />
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
