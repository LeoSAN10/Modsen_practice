import React from "react";
import Header from "components/Header/Header";

import close from "assets/back-arrow.png";
import open from "assets/forward-arrow.png";

import { FunctionalCalculator } from "components/CalcFunc/CalcFunc";
import { History } from "components/History/History";

import { Button, Container, Left, Right, Image } from "styles/CalcStyle";

export const HomePageFunc = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleHistory = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Container>
      <Header></Header>
      <Left>
        <FunctionalCalculator />
      </Left>
      <Button onClick={toggleHistory}>
        <Image src={isOpen ? close : open} alt="arrow" />
      </Button>
      {isOpen && (
        <Right>
          <History />
        </Right>
      )}
    </Container>
  );
};

export default HomePageFunc;
