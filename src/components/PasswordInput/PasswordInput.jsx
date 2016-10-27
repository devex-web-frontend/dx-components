import React from 'react';
import {PURE} from 'dx-util/src/react/pure';
import {themr} from 'react-css-themr';
import ButtonIcon, {BUTTON_ICON_THEME} from '../ButtonIcon/ButtonIcon';
import Input, {INPUT_THEME_SHAPE} from '../Input/Input';

export const PASSWORD_INPUT = Symbol('PasswordInput');

const passwordInputTheme = {
	container: React.PropTypes.string,
	Input: React.PropTypes.shape(INPUT_THEME_SHAPE),
	RevealButton: React.PropTypes.shape(BUTTON_ICON_THEME)
};

@PURE
@themr(PASSWORD_INPUT)
export default class PasswordInput extends React.Component {
	static propTypes = {
		theme: React.PropTypes.shape(passwordInputTheme),
		Button: React.PropTypes.func,
		Input: React.PropTypes.func,
		isDisabled: React.PropTypes.bool,
		iconShow: React.PropTypes.string,
		iconHide: React.PropTypes.string,
		isRevealed: React.PropTypes.bool,
		onReveal: React.PropTypes.func
	}

	static defaultProps = {
		Button: ButtonIcon,
		isRevealed: false,
		Input
	}

	render() {
		const {
			theme,
			Button,
			Input,
			iconShow,
			iconHide,
			isDisabled,
			isRevealed,
			onReveal,
			...props
		} = this.props;

		const icon = isRevealed ? iconShow : iconHide;
		return (
			<div className={theme.container}>
				<Input {...props} theme={theme.Input} disabled={isDisabled} type={isRevealed ? 'text' : 'password'}/>
				<Button name={icon} theme={theme.RevealButton} isDisabled={isDisabled}
				        onClick={this.onClickRevealButton}/>
			</div>
		);
	}

	onClickRevealButton = () => {
		const {onReveal} = this.props;
		onReveal && onReveal(!this.props.isRevealed);
	}
}
