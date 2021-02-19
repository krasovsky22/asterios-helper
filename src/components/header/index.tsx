import React, { useState } from "react";
import { useInterval } from "beautiful-react-hooks";
import { WithChildrenType, ImageType } from "@components/common-types";
import {
  Container,
  Inner,
  Logo,
  LoginSection,
  SignInButton,
  SignUpButton,
  Clock,
} from "./styles/header";

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

Header.Clock = ({ ...rest }) => {
  const [time, setTime] = useState<Date>(new Date());
  useInterval(() => {
    setTime(new Date());
  }, 1000);
  return <Clock {...rest}>{time.toLocaleString()}</Clock>;
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
