import styled from "styled-components/macro";

export const Container = styled.div`
  display: flex;
  background-color: #14171c;
  height: 80px;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
`;

export const Inner = styled.div`
  width: 100%;
  flex-grow: 1;
  padding: 20px 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Logo = styled.img`
  width: 200px;
  display: inline-block;
  cursor: pointer;
`;
export const LoginSection = styled.div`
  display: flex;
  align-items: center;
`;
export const SignInButton = styled.div``;
export const SignUpButton = styled.div``;
