import styled from "styled-components/macro";
import { ImageType } from "@components/common-types";

export const Container = styled.div`
  color: #fff;
  width: 500px;
  width: 40%;
  height: 400px;
  display: flex;
  flex: 0 40%;

  cursor: pointer;
  transition: transform 0.5s ease;
  &:hover {
    transform: scale(1.1);
  }
`;
export const Inner = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: row;
  background-color: transparent;
  width: 100%;
`;

export const Image = styled.div<ImageType>`
  background-image: url(${({ src }) => src});
  width: 20rem;
  max-width: 25%;
  background-blend-mode: lighten;
  background-repeat: no-repeat;
  background-origin: content-box;
  background-position: center;
  background-size: cover;
  background-clip: padding-box;
  opacity: 0.8;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  align-content: center;
`;

export const BossFloor = styled.div`
  height: 2rem;
  background-color: #4e4a4aa3;
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  background-color: black;
  opacity: 0.5;
  flex-grow: 1;
`;

export const ContentInner = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 0 5%;
`;
export const Title = styled.h1`
  text-decoration: underline;
  margin-bottom: 0.2rem;
`;

export const DeathSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-right: auto;
  justify-content: space-evenly;
  width: 100%;
  font-size: 1.3rem;
`;
export const RespawnSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  padding-bottom: 10px;
  font-size: 17px;
  font-size: 0.9vw;
`;

export const DeathInfo = styled.div`
  flex-grow: 1;
  font-size: 1.1rem;
`;
