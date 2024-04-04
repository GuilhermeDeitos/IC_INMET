import styled from 'styled-components';
import { colorPallete, tema } from "../utils/colorsStyled";



export const Tab = styled.span<{ isActive: boolean }>`
    background-color: ${props => props.isActive ? 'transparent' : tema === 'light' ? colorPallete.light.button.primary : colorPallete.dark.button.primary};
    color: ${props => props.isActive ? colorPallete.light.button.primary : colorPallete.light.button.secondary};

    border: 1px solid #003775;
    border-radius: .3rem;
    padding: .3rem 1rem;
    cursor: pointer;
    transition: .5s all ease-in-out;
    &:hover {
        background-color: transparent;
        border: 1px solid ${tema === 'light' ? colorPallete.light.button.primary : colorPallete.dark.button.primary};
        color: ${tema === 'light' ? colorPallete.light.button.primary : colorPallete.dark.button.primary};
    }
};
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colorPallete.light.background.primary};
  height: 100vh;
  width: 100%;
  overflow: hidden;
  margin: 0;
`;

export const PrimaryButton = styled.button`
    background-color: ${colorPallete.light.button.primary};
    color: ${colorPallete.light.button.secondary};
    border: 1px solid ${colorPallete.light.button.primary};
    border-radius: .3rem;
    padding: .5rem 1rem;
    cursor: pointer;
    transition: .5s all ease-in-out;
    width: 90%;
    &:hover {
        background-color: transparent;
        border: 1px solid ${colorPallete.light.button.primary};
        color: ${colorPallete.light.button.primary};
    }
`;

export const Input = styled.input`
    background-color: transparent;
    color: ${colorPallete.light.text.primary};
    border: 1px solid ${colorPallete.light.input.primary};
    border-radius: .3rem;
    padding: .5rem 1rem;
    cursor: pointer;
    transition: .5s all ease-in-out;
    width: 80%;
    &:hover {
        background-color: transparent;
        border: 1px solid ${colorPallete.light.text.important};
        color: ${colorPallete.light.text.important};
    }
`;