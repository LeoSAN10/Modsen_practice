import styled from "styled-components";
import * as consts from "@styles/themes";

const ErrorTitle = styled.h1`
  margin-top: ${consts.RANGE.L}px;
  padding: ${consts.RANGE.S}px;
  ${({ theme }) => theme.colors.text};
  text-align: center;
`;

export { ErrorTitle };
