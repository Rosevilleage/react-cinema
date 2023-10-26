import React from "react";
import styled from "styled-components";
import TheatergoersAndPriceInfo from "./theaterMain/TheatergoersAndPriceInfo";

export default function Theater() {
  return (
    <TheaterContainer>
      <TheaterTitle>인원/좌석</TheaterTitle>
      <TheatergoersAndPriceInfo />
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
