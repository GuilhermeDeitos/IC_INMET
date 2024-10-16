import styled, { css } from 'styled-components';
import { colorPallete } from "../../utils/colorsStyled";

export const TableHeaderCell = styled.th<{sortable?:boolean}>`
	text-align: ${(props) => props.align || 'left'};
	padding: .4rem .4rem .4rem .2rem;
	width: "100%";
	cursor: pointer;
	font-size: .8rem;
	vertical-align: middle;
	transition: all .3s ease-in-out;
    text-align: center;
	background-color: ${colorPallete.light.background.primary};
    border: 1px solid #cdcdcd;

	color: #003f75;
	${(props) =>
		props.sortable &&
		css`
			&:hover {
				background-color: ${colorPallete.light.background.secondary};
			}
		`};
`;

export const TableRow = styled.tr`
    padding: 0;
    border-bottom: 1px solid #cdcdcd;
    width: 100%;
    &:hover {
        background-color: ${colorPallete.light.background.secondary};
    }
`;

export const TableCell = styled.td`
	padding: 1.2rem .3rem;
	font-size: .8rem;
	text-align: middle;
	vertical-align: middle;
    border: 1px solid #cdcdcd;
`;

export const TableFooter = styled.div`
	width: 99%;
	padding: 0 .4rem;
    margin-top: 1rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const TableCellActions = styled.td`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;
`;

export const HeaderTextContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: 1rem 0;
`;