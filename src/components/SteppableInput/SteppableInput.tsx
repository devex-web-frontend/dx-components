import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PURE } from 'dx-util/lib/react/pure';
import Input from '../Input/Input';
import { themr } from 'react-css-themr';
import ButtonIcon, { BUTTON_ICON_THEME, TButtonIconProps } from '../ButtonIcon/ButtonIcon';
import Holdable from '../Holdable/Holdable';
import { TInputProps } from '../Input/Input';

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
		inner?: string,
		Input?: TInputProps['theme'],
		ButtonIcon?: BUTTON_ICON_THEME,
		ClearButtonIcon?: BUTTON_ICON_THEME
	}
};

export type TPickedInputProps = Pick<TInputProps,
	'error' |
	'onBlur' |
	'onFocus' |
	'onKeyDown' |
	'onClick'>;
export type TSteppableInputOwnProps = TPickedInputProps & {
	isDisabled?: TInputProps['isDisabled'],
	tabIndex?: number,
	onIncrement?: Function,
	onDecrement?: Function,
	onClear?: Function,
	incrementIcon?: string,
	decrementIcon?: string,
	clearIcon?: string,
	children?: React.ReactNode
};

export type TSteppableInputDefaultProps = {
	Input: React.ComponentClass<TInputProps> | React.SFC<TInputProps>,
	ButtonIcon: React.ComponentClass<TButtonIconProps> | React.SFC<TButtonIconProps>
};

export type TSteppableInputFullProps =
	TSteppableInputInjectedProps & TSteppableInputOwnProps & TSteppableInputDefaultProps;

type TSteppableInputState = {
	isFocused?: boolean
};

@PURE
class SteppableInput extends React.Component<TSteppableInputFullProps, TSteppableInputState> {
	static defaultProps = {
		Input,
		ButtonIcon
	} as TSteppableInputFullProps;

	state: TSteppableInputState = {};
	private clearButtonRef: any;
	private incrementButtonRef: any;
	private decrementButtonRef: any;

	componentDidUpdate(prevProps: TSteppableInputFullProps) {
		if (prevProps.onClear && !this.props.onClear) {
			//when removing clear button from dom component wierdly loses focus
			ReactDOM.findDOMNode<HTMLElement>(this).focus();
		}
	}

	render() {
		const {
			isDisabled,
			error,
			theme,
			children,
			tabIndex,
			decrementIcon,
			incrementIcon,
			clearIcon,
			onIncrement,
			onDecrement,
			onClear,
			onClick,
			Input,
			ButtonIcon
		} = this.props;

		const {isFocused} = this.state;

		return (
			<Input theme={theme.Input}
			       type="hidden"
			       onFocus={this.onFocus}
			       onBlur={this.onBlur}
			       onKeyDown={this.onKeyDown}
			       onClick={onClick}
			       onWheel={this.onWheel}
			       isDisabled={isDisabled}
			       error={error}
			       tabIndex={(isFocused || isDisabled ) ? -1 : (tabIndex || 0)}>
				<div className={theme.inner}>
					{children}
					{onClear && clearIcon && (
						<ButtonIcon name={clearIcon}
						            isFlat={true}
						            ref={el => this.clearButtonRef = el}
						            theme={theme.ClearButtonIcon}
						            onClick={this.onClearClick}
						            onMouseDown={this.onButtonMouseDown}
						            isDisabled={isDisabled}
						            tabIndex={-1}/>
					)}
					{onDecrement && decrementIcon && (
						<Holdable onHold={onDecrement}>
							<ButtonIcon name={decrementIcon}
							            theme={theme.ButtonIcon}
							            onClick={this.onDecrementClick}
							            ref={(el: any) => this.decrementButtonRef = el}
							            onMouseDown={this.onButtonMouseDown}
							            isDisabled={isDisabled}
							            tabIndex={-1}/>
						</Holdable>
					)}
					{onIncrement && incrementIcon && (
						<Holdable onHold={onIncrement}>
							<ButtonIcon name={incrementIcon}
							            theme={theme.ButtonIcon}
							            onClick={this.onIncrementClick}
							            onMouseDown={this.onButtonMouseDown}
							            ref={(el: any) => this.incrementButtonRef = el}
							            isDisabled={isDisabled}
							            tabIndex={-1}/>
						</Holdable>
					)}
				</div>
			</Input>
		);
	}

	private onClearClick = (e: React.MouseEvent<HTMLElement>) => {
		const {onClear} = this.props;
		onClear && onClear();
	}

	private onIncrementClick = (e: React.MouseEvent<HTMLElement>) => {
		const {onIncrement} = this.props;
		onIncrement && onIncrement();
	}

	private onDecrementClick = (e: React.MouseEvent<HTMLElement>) => {
		const {onDecrement} = this.props;
		onDecrement && onDecrement();
	}

	private onButtonMouseDown = (e: React.MouseEvent<HTMLElement>) => {
		if (this.state.isFocused) {
			e.preventDefault();
		}
	}

	private onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		if (!this.props.isDisabled && !this.state.isFocused) {
			this.setState({
				isFocused: true
			});
			this.props.onFocus && this.props.onFocus(e);
		}
	}

	private onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		if (!this.props.isDisabled && this.state.isFocused) {
			this.setState({
				isFocused: false
			});
			this.props.onBlur && this.props.onBlur(e);
		}
	}

	private onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!this.props.isDisabled) {
			switch (e.keyCode) {
				case KEYCODE.UP: {
					this.props.onIncrement && this.props.onIncrement();
					break;
				}
				case KEYCODE.DOWN: {
					this.props.onDecrement && this.props.onDecrement();
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
			e.preventDefault(); //block v-scrolling
			if (e.deltaY < 0) {
				onIncrement && onIncrement();
			} else {
				onDecrement && onDecrement();
			}
		}
	}
}

export const STEPPABLE_INPUT = Symbol('SteppableInput');
export type TSteppableInputProps =
	TSteppableInputOwnProps & Partial<TSteppableInputInjectedProps> & Partial<TSteppableInputDefaultProps>;
export default themr(STEPPABLE_INPUT)(SteppableInput) as React.ComponentClass<TSteppableInputProps>;

export function checkParentsUpTo(node?: Element | null, checkNode?: Element, upToNode?: Element): boolean {
	if (!node || !checkNode || !upToNode) {
		return false;
	} else if (node === upToNode) {
		return false;
	} else if (node === checkNode) {
		return true;
	} else {
		return checkParentsUpTo(node.parentElement, checkNode, upToNode);
	}
}