import styled from "styled-components/macro";
import { ImageType } from "@components/common-types";

export const Inner = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: row;
  background-color: transparent;
  width: 100%;
`;

export type ContainerType = {
  isActive: boolean;
};
export const Container = styled.div<ContainerType>`
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

  ${Inner} {
    ${({ isActive }) =>
      isActive &&
      `
        animation: blinking 1s linear infinite;
        outline: 5px solid white;
    `}

    /* animation: ${({ isActive }) =>
      isActive ? "blinking" : "none"} blinking 1s linear infinite; */
    @keyframes blinking {
      50% {
        outline-color: green;
      }
    }
  }
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

export type ContentType = {
  backgroundColor: string;
  opacity?: number;
  color?: string;
};
export const Content = styled.div<ContentType>`
  display: flex;
  align-items: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  opacity: ${({ opacity = 0.5 }) => opacity};
  color: ${({ color = "white" }) => color};
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

export const ActionToggle = styled.p`
  color: #fff;
  font-family: Monoton;
  -webkit-animation: neon1 1.5s ease-in-out infinite alternate;
  animation: neon1 1.5s ease-in-out infinite alternate;
  transition: all 0.5s;
`;

type ActionButtonsSectionType = {
  color: string;
};
export const ActionButtonsSection = styled.div<ActionButtonsSectionType>`
  align-self: flex-start;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  align-items: center;

  border: 5px solid ${({ color }) => color};
  border-radius: 50px;

  ${ActionToggle} {
    ${({ color }) => `@keyframes neon1 {
    from {
      text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px ${color}, 0 0 70px ${color},
        0 0 80px ${color}, 0 0 100px ${color}, 0 0 150px ${color};
    }
    to {
      text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px ${color}, 0 0 35px ${color},
        0 0 40px ${color}, 0 0 50px ${color}, 0 0 75px ${color};
    }
  }`}
  }
`;
export const ActionButtonSectionInner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 30px;
`;
