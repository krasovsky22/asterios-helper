import styled from "styled-components/macro";

export const Container = styled.div`
  background-color: #7289da;
  width: 75px;
  height: 30px;
  display: flex;
  align-items: center;
  border-radius: 10px;

  font-size: 16px;
  text-decoration: none;
  color: black;

  &:hover {
    background-color: #5b6cab;
    border-color: #5b6cab;
  }
  cursor: pointer;
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
`;

export const Icon = styled.div`
  color: white;
`;
