import React from "react";
import Header from "./components/Header";
import styled from "styled-components";
import Theater from "./components/Theater";

function App() {
  return (
    <AppContainer className="App">
      <Header />
      <Theater />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  min-height: 100vh;
  margin: 0 auto;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
`;

export default App;
