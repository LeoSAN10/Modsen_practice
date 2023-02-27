import React from "react";
import Header from "components/Header/Header";

import close from "assets/back-arrow.png";
import open from "assets/forward-arrow.png";

import { ClassCalculator } from "components/CalcClass/CalcClass";
import { History } from "components/History/History";

import { Button, Container, Left, Right, Image } from "styles/CalcStyle";

export class HomePageClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggleHistory = this.toggleHistory.bind(this);
  }

  toggleHistory() {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  }

  render() {
    const { isOpen } = this.state;
    return (
      <Container>
        <Header></Header>
        <Left>
          <ClassCalculator />
        </Left>

        <Button onClick={this.toggleHistory}>
          <Image src={isOpen ? close : open} alt="arrow" />
        </Button>

        {isOpen && (
          <Right>
            <History />
          </Right>
        )}
      </Container>
    );
  }
}
