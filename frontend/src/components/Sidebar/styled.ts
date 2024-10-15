import styled from 'styled-components';
import { colorPallete, tema } from "../../utils/colorsStyled";
import { FormControl } from '@mui/material';
import {Select} from '@mui/material';

export const DrawerText = styled.h5`
    font-size: 1rem;
    color: ${colorPallete.light.text.primary};
    margin: 0;
    padding: 0 0 0 .7rem;
    font-weight: 700;
`;


export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;

     input {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: .2rem 0;
    }
`;

export const GroupContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: .5rem 0 0 0;
`;

export const TabGroup = styled.div`
	margin: 0;
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	gap: .3rem;
	padding: .5rem;
	color: #fff;
`;

export const Tab = styled.span<{isactive: string}>`
	background-color: ${props => props.isactive === "check" ? 'transparent' : '#003775'};
  color: ${props => props.isactive === "check" ? '#003775' : '#fff'};
  border: 1px solid #003775;
  border-radius: .3rem;
  padding: .3rem 1rem;
  cursor: pointer;
  transition: .2s all ease-in-out;

  &:hover {
    background-color: transparent;
    border: 1px solid #003775;
    color: #003775;
  }

`;

export const FormControlStyled = styled(FormControl)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

export const SelectStyled = styled(Select)`
    width: 92%;
    margin: .5rem;
    height: 3rem; 
`;
