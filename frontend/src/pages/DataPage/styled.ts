import styled from "styled-components";
import { colorPallete } from "../../utils/colorsStyled";

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colorPallete.light.background.primary};
  height: 100vh;
  width: 100%;
  margin: 0;
  
`;

export const FakeHeaderContainer = styled.div`
  height: 9vh;
  display: block;
  width: 100%;
`;

export const OverlayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #3f3f3f;
  height: 100vh;
  width: 100%;
  margin: 0;
  position: absolute;
  z-index: 10;
  opacity: 0.5;
`;