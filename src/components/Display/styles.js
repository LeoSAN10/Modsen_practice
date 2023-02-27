import styled from "styled-components";
import * as consts from "styles/Theme";

const DisplayBlock = styled.div`
  border-bottom: 5px solid;
  padding: ${consts.RANGE.XS}px;
  text-align: right;
  width: 100%;
`;
const Expression = styled.div`
  font-size: ${consts.FONT_SIZE.M}px;
  font-weight: ${consts.FONT_WEIGHT.M};
  text-align: right;
`;
const Result = styled.div`
  font-size: ${consts.FONT_SIZE.S}px;
  font-weight: ${consts.FONT_WEIGHT.S};
  text-align: right;
`;

export { DisplayBlock, Expression, Result };
