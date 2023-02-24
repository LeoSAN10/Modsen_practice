import React from "react";

import { HistoryContext } from "context/context";

import { Container, Item, List, Title } from "./styles";

export const History = () => (
  <Container>
    <Title>History:</Title>
    <HistoryContext.Consumer>
      {(context) => (
        <List type="list">
          {context.history.length === 0
            ? "history is empty"
            : context.history
                .reverse()
                .map((item) => <Item key={item}>{item}</Item>)}
        </List>
      )}
    </HistoryContext.Consumer>
  </Container>
);
