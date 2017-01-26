import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {PURE} from 'dx-util/src/react/pure';
import Input from '../Input/Input';
import {themr} from 'react-css-themr';
import ButtonIcon, {BUTTON_ICON_THEME} from '../ButtonIcon/ButtonIcon';
import Holdable from '../Holdable/Holdable';
import * as classnames from 'classnames';

export const STEPPABLE_INPUT_THEME = {
	container: React.PropTypes.string,
	ButtonIcon: React.PropTypes.shape(BUTTON_ICON_THEME)
};

const KEYCODE = {
	UP: 38,
	DOWN: 40
};

export type TSteppableInputInjectedProps = {
	theme: {
		container?: string,
		container_isFocused?: string,
		input?: string,
		ButtonIcon?: BUTTON_ICON_THEME
	}
};

export type TSteppableInputOwnProps = {
	tabIndex?: number,
	isDisabled?: boolean,
	onIncrement: Function,
	onDecrement: Function,
	increaseIcon: string,
	decreaseIcon: string,
	onFocus?: React.EventHandler<React.FocusEvent<HTMLElement>>,
	onBlur?: React.EventHandler<React.FocusEvent<HTMLElement>>,
	onKeyDown?: React.EventHandler<React.KeyboardEvent<HTMLElement>>,
	children?: React.ReactNode
};

export type TSteppableInputFullProps = TSteppableInputInjectedProps & TSteppableInputOwnProps;

type TSteppableInputState = {
	isFocused?: boolean
};

@PURE
class SteppableInput extends React.Component<TSteppableInputFullProps, TSteppableInputState> {
	static propTypes = {
		isDisabled: React.PropTypes.bool,
		onIncrement: React.PropTypes.func.isRequired,
		onDecrement: React.PropTypes.func.isRequired,
		onBlur: React.PropTypes.func,
		onFocus: React.PropTypes.func,
		onKeyDown: React.PropTypes.func,
		increaseIcon: React.PropTypes.string.isRequired,
		decreaseIcon: React.PropTypes.string.isRequired,
		children: React.PropTypes.node,
		theme: React.PropTypes.shape(STEPPABLE_INPUT_THEME)
	};

	state: TSteppableInputState = {};

	render() {
		const {
			isDisabled,
			theme,
			children,
			tabIndex,
			decreaseIcon,
			increaseIcon,
			onIncrement,
			onDecrement
		} = this.props;

		const {isFocused} = this.state;

		return (
			<Input tagName="div"
			       theme={theme}
			       onFocus={this.onFocus}
			       onBlur={this.onBlur}
			       onKeyDown={this.onKeyDown}
			       onWheel={this.onWheel}
			       isFocused={isFocused}
			       tabIndex={isFocused ? -1 : (tabIndex || 0)}
			       disabled={isDisabled}>
				<div className={theme.input}>
					{React.Children.only(children)}
				</div>
				<Holdable onHold={onDecrement}>
					<ButtonIcon name={decreaseIcon}
					            theme={theme.ButtonIcon}
					            onClick={this.onDecrementClick}
					            onMouseDown={this.onButtonMouseDown}
					            isDisabled={isDisabled}
					            tabIndex={-1}/>
				</Holdable>
				<Holdable onHold={onIncrement}>
					<ButtonIcon name={increaseIcon}
					            theme={theme.ButtonIcon}
					            onClick={this.onIncrementClick}
					            onMouseDown={this.onButtonMouseDown}
					            isDisabled={isDisabled}
					            tabIndex={-1}/>
				</Holdable>
			</Input>
		);
	}

	private onIncrementClick = (e: React.MouseEvent<HTMLElement>) => {
		this.props.onIncrement();
	}

	private onDecrementClick = (e: React.MouseEvent<HTMLElement>) => {
		this.props.onDecrement();
	}

	private onButtonMouseDown = (e: React.MouseEvent<HTMLElement>) => {
		if (this.state.isFocused) {
			e.preventDefault();
		}
	}

	private onFocus = (e: React.FocusEvent<HTMLElement>) => {
		if (!this.props.isDisabled && !this.state.isFocused) {
			this.setState({
				isFocused: true
			});
			this.props.onFocus && this.props.onFocus(e);
		}
	}

	private onBlur = (e: React.FocusEvent<HTMLElement>) => {
		if (!this.props.isDisabled && this.state.isFocused) {
			this.setState({
				isFocused: false
			});
			this.props.onBlur && this.props.onBlur(e);
		}
	}

	private onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
		if (!this.props.isDisabled) {
			switch (e.keyCode) {
				case KEYCODE.UP: {
					this.props.onIncrement();
					break;
				}
				case KEYCODE.DOWN: {
					this.props.onDecrement();
					break;
				}
			}
			this.props.onKeyDown && this.props.onKeyDown(e);
		}
	}

	private onWheel = (e: React.WheelEvent<HTMLElement>) => {
		const {isDisabled, onIncrement, onDecrement} = this.props;
		const {isFocused} = this.state;

		if (!isDisabled && isFocused) {
			if (e.deltaY < 0) {
				onDecrement();
			} else {
				onIncrement();
			}
		}
	}
}

export const STEPPABLE_INPUT = Symbol('SteppableInput');
export type TSteppableInputProps = TSteppableInputOwnProps & Partial<TSteppableInputInjectedProps>;
export default themr(STEPPABLE_INPUT)(SteppableInput) as React.ComponentClass<TSteppableInputProps>;