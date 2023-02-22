import React from "react";
import PropTypes from "prop-types";

import { DisplayBlock, Expression, Result } from "./styles";

export class Display extends React.PureComponent {
  render() {
    const { value, error, result } = this.props;
    return (
      <DisplayBlock>
        <Result>{error || result}</Result>
        <Expression>{value}</Expression>
      </DisplayBlock>
    );
  }
}
Display.propTypes = {
  result: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.bool,
};
Display.defaultProps = {
  result: "",
  value: "",
  error: "",
};
