import React from "react";
import { WithChildrenType, ImageType } from "@components/common-types";
import { Container, Inner, Logo, LoginSection, SignInButton, SignUpButton } from "./styles/header";

const Header = ({ children, ...rest }: WithChildrenType) => {
  return (
    <Container {...rest}>
      <Inner>{children}</Inner>
    </Container>
  );
};

Header.Logo = ({ src, alt, ...rest }: ImageType) => {
  return (
    <a href="/" title={alt} {...rest}>
      <Logo src={src} alt={alt}></Logo>{" "}
    </a>
  );
};

Header.LoginSection = ({ children, ...rest }: WithChildrenType) => {
  return <LoginSection {...rest}>{children}</LoginSection>;
};

Header.SignInButton = ({ children, ...rest }: WithChildrenType) => {
  return <SignInButton {...rest}>{children}</SignInButton>;
};

Header.SignUpButton = ({ children, ...rest }: WithChildrenType) => {
  return <SignUpButton {...rest}>{children}</SignUpButton>;
};

export default Header;
