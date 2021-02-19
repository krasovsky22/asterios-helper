import React from "react";
import { Header } from "@/components";
import LogoImage from "@assets/images/lineage2-logo.png";

console.log(LogoImage);
const HeaderContainer: React.FC = () => {
  return (
    <Header>
      <Header.Logo src={LogoImage} alt="Lineage 2" />
      <Header.LoginSection>Login</Header.LoginSection>
    </Header>
  );
};
export default HeaderContainer;
