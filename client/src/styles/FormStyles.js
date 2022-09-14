import styled, {css} from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const colors = {
	bold: "#0075FF",
	error: "#bb2929",
	success: "#1ed12d"
}

const Input = styled.input`
	width: 100%;
	background: #fff;
	border-radius: 3px;
	height: 45px;
	line-height: 45px;
	padding: 0 40px 0 10px;
	transition: .3s ease all;
	border: 1px solid ;
	&:focus {
		border: 3px solid ${colors.bold};
		outline: none;
		box-shadow: 3px 0px 30px rgba(163,163,163, 0.4);
	}
	${props => props.flag === 'true' && css`
		border: 1px solid ;
	`}
	${props => props.flag === 'false' && css`
		border: 3px solid ${colors.error} !important;
	`}
`;

const WrongInput = styled.p`
	font-size: 14px;
	margin-bottom: 0;
	color: ${colors.error};
	display: none;
	${props => props.flag === 'true' && css`
		display: none;
	`}
	${props => props.flag === 'false' && css`
		display: block;
	`}
`;

const Label = styled.label`
	display: block;
	font-weight: 700;
	padding: 10px;
	min-height: 40px;
	cursor: pointer;
	${props => props.flag === 'false' && css`
		color: ${colors.error};
	`}
`;

const GroupInput = styled.div`
	position: relative;
	z-index: 90;
`;

const IconValidation = styled(FontAwesomeIcon)`
	position: absolute;
	right: 10px;
	bottom: 14px;
	z-index: 100;
	font-size: 16px;
	opacity: 0;
	${props => props.flag === 'false' && css`
		opacity: 1;
		color: ${colors.error};
	`}
	${props => props.flag === 'true' && css`
		opacity: 1;
		color: ${colors.success};
	`}
`;

const Button = styled.button`
	height: 45px;
	line-height: 45px;
	width: 30%;
	background: #000;
	color: #fff;
	font-weight: bold;
	border: none;
	border-radius: 3px;
	cursor: pointer;
	transition: .1s ease all;
	&:hover {
		box-shadow: 3px 0px 30px rgba(163,163,163, 1);
	}
`;

export {
    WrongInput,
    Input,
    Label,
    IconValidation,
    Button,
    GroupInput
};