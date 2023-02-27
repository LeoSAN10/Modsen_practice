import styled from "styled-components";
import { Link } from "react-router-dom";
import * as consts from "styles/Theme";

const HeaderContainer = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.theme};
  color: ${({ theme }) => theme.text};
  display: flex;
  height: 80px;
  justify-content: space-between;
  padding: 0 ${consts.RANGE.M}px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: ${consts.FONT_SIZE.XL}px;
  font-style: italic;
`;

const CustomLink = styled(Link)`
  color: ${({ theme }) => theme.text};
  font-size: ${consts.FONT_SIZE.M}px;
  margin: ${consts.RANGE.M}px;
  &:hover {
    transform: scale(1.2);
  }
`;

const Links = styled.div`
  ${consts.CENTER}
  width: 350px;
`;
export { CustomLink, HeaderContainer, Link, Links, Title };
