import React from "react";
import PropTypes from "prop-types";

import { LayoutWrapper } from "./styles";

export const CalcLayout = ({ children }) => (
  <LayoutWrapper>{children}</LayoutWrapper>
);

CalcLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
