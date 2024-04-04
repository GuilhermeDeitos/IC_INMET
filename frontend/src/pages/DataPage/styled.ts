import styled from "styled-components";
import { colorPallete, tema } from "../../utils/colorsStyled";

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${tema === 'light' ? colorPallete.light.background.primary : colorPallete.dark.background.primary};
  height: 100vh;
  width: 100%;
  overflow: hidden;
  margin: 0;
  
`;

export const FakeHeaderContainer = styled.div`
  height: 9vh;
  display: block;
  width: 100%;
`;