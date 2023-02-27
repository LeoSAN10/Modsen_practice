import styled from "styled-components";
import * as consts from "styles/Theme";

const Container = styled.div`
  background-color: ${({ theme }) => theme.header};
  border: 1px solid;
  border-radius: ${consts.RANGE.XS}px;
  display: flex;
  height: 570px;
  margin-top: ${consts.RANGE.M}px;
  max-width: 100%;
  padding: ${consts.RANGE.M}px;
`;
const Left = styled.div`
  height: 100%;
  max-width: 800px;
  padding: ${consts.RANGE.S}px;
  width: 100%;
`;

const Right = styled.div`
  max-width: 200px;
  padding: ${consts.RANGE.S}px;
  width: 100%;
`;
const Button = styled.button`
  background: none;
  border: none;
  margin: ${consts.RANGE.XS}px;
`;
const Image = styled.img`
  height: 30px;
  width: 30px;
`;

export { Button, Container, Left, Right, Image };
