import React from "react";
import styled from "styled-components";

export default function Header() {
  return (
    <HeaderContainer>
      <Button>로그인</Button>
      <Button>좌석예매</Button>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  width: 100%;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid lightgray;
`;

const Button = styled.button`
  border-radius: 2rem;
  background-color: white;
  border: 1px lightgray solid;
  outline: none;
  padding: 10px 15px;
  cursor: pointer;
  /* font-size: 1rem; */
  &:active {
    background-color: lightgray;
  }
`;
