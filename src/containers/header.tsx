import React from "react";
import { Header, LoginButton } from "@/components";
import LogoImage from "@assets/images/lineage2-logo.png";
import { useAuthContext } from "@context/auth";

const HeaderContainer: React.FC = () => {
  const { user } = useAuthContext();

  return (
    <Header>
      <Header.Logo src={LogoImage} alt="Lineage 2" />
      <Header.Clock />
      <Header.LoginSection>
        {user ? (
          <>
            Logged in as:<Header.LoggedInUser>{user.username}</Header.LoggedInUser>
          </>
        ) : (
          <LoginButton>Login</LoginButton>
        )}
      </Header.LoginSection>
    </Header>
  );
};
export default HeaderContainer;
