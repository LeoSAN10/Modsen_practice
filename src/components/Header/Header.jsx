import React from "react";

import { CustomLink, HeaderContainer, Links, Title } from "./styles";

export const Header = () => (
  <HeaderContainer>
    <Links>
      <CustomLink to="/">Class</CustomLink>
      <CustomLink to="/HomePageFunc">Func</CustomLink>
      <CustomLink to="/settings">Settings</CustomLink>
    </Links>
  </HeaderContainer>
);

export default Header
