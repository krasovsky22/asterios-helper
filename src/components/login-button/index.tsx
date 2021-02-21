import React from "react";
import { WithChildrenType } from "@components/common-types";
import { Container, Inner, Icon } from "./styles/login-button";
import { DiscordIcon } from "@components/assets";

const AUTH_URL = process.env.REACT_APP_DISCORD_AUTH_URL ?? "";

const LoginButton = ({ children, ...rest }: WithChildrenType) => {
  return (
    <a href={AUTH_URL} {...rest}>
      <Container>
        <Inner>
          <Icon>
            <DiscordIcon />
          </Icon>
          {children}
        </Inner>
      </Container>
    </a>
  );
};

export default LoginButton;
