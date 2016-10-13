import React from 'react';
import {PURE} from 'dx-util/src/react/pure';
import {themr} from 'react-css-themr';
import ButtonIcon, {BUTTON_ICON_THEME_SHAPE_OBJECT} from '../ButtonIcon/ButtonIcon';
import Input, {INPUT_THEME_SHAPE_OBJECT} from '../Input/Input';

import css from './PasswordInput.styl';

export const PASSWORD_INPUT = Symbol('PasswordInput');

@PURE
@themr(PASSWORD_INPUT, css)
export default class PasswordInput extends React.Component {
	static propTypes = {
		theme: React.PropTypes.shape({
			container: React.PropTypes.string,
			Input: React.PropTypes.shape(INPUT_THEME_SHAPE_OBJECT),
			RevealButton: React.PropTypes.shape(BUTTON_ICON_THEME_SHAPE_OBJECT)
		}),
		Button: React.PropTypes.func,
		Input: React.PropTypes.func,
		isDisabled: React.PropTypes.bool,
		iconShow: React.PropTypes.string,
		iconHide: React.PropTypes.string,
		isRevealed: React.PropTypes.bool,
	}

	static defaultProps = {
		Button: ButtonIcon,
		isRevealed: false,
		Input
	}

	componentWillReceiveProps(newProps) {
		const {revealed} = this.state;
		if (revealed !== newProps.isRevealed) {
			this.setState({
				isRevealed: newProps.isRevealed
			});
		}
	}

	constructor(...args) {
		super(...args);
		this.state = {
			isRevealed: this.props.isRevealed
		};
	}

	render() {
		const {
			theme,
			Button,
			Input,
			iconShow,
			iconHide,
			isDisabled,
			...props
		} = this.props;

		const {isRevealed} = this.state;
		const inputProps = {
			...props,
			theme: theme.Input,
			disabled: isDisabled,
			type: isRevealed ? 'text' : 'password'
		};

		const icon = isRevealed ? iconShow : iconHide;
		return (
			<div className={theme.container}>
				<Input {...inputProps} />
				<Button name={icon} theme={theme.RevealButton} isDisabled={isDisabled}
				        onClick={this.onClickRevealButton}/>
			</div>
		);
	}

	onClickRevealButton = e => {
		this.setState({
			isRevealed: !this.state.isRevealed
		});
	}
}
