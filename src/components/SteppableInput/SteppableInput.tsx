import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {PURE} from 'dx-util/src/react/pure';
import * as classnames from 'classnames';
import {themr} from 'react-css-themr';
import Input from '../Input/Input';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import Holdable from '../Holdable/Holdable';
import {createControlProps, TControlProps} from '../Control/Control';

export const STEPPABLE_INPUT_THEME = {
	container: React.PropTypes.string,
	container_isFocused: React.PropTypes.string,
	container_isReadonly: React.PropTypes.string,
	input: React.PropTypes.string,
	button: React.PropTypes.string,
	button__icon: React.PropTypes.string
};

const KEYCODE = {
	UP: 38,
	DOWN: 40
};

type TInputInjectedProps = {
	theme: {
		container?: string,
		container_isFocused?: string,
		container_isReadonly?: string,
		input?: string,
		button?: string
		button__icon?: string,
		InnerInput?: {}
	}
};

type TOwnSteppableInputProps<TValue, TDisplayValue> = TControlProps<TValue> & {
	placeholder?: string,
	tabIndex?: number,
	isDisabled?: boolean
	isReadonly?: boolean,
	increaseIcon: string,
	decreaseIcon: string,
	step: TValue,
	increment: (value: TValue, step: TValue) => TValue,
	decrement: (value: TValue, step: TValue) => TValue,
	// parse: (raw: TDisplayValue) => TValue | null,
	// format: (value?: TValue) => TDisplayValue,
	onFocus?: React.EventHandler<React.FocusEvent<HTMLElement>>,
	onBlur?: React.EventHandler<React.FocusEvent<HTMLElement>>,
	onClick?: React.EventHandler<React.MouseEvent<HTMLElement>>,
	onKeyDown?: React.EventHandler<React.KeyboardEvent<HTMLElement>>,

	children?: React.ComponentClass<React.HTMLProps<HTMLInputElement> & {
		onValueChange: (value?: TValue) => void,
		value?: TValue,
		theme?: {}
	}>
};

type TFullSteppableInputProps<TValue, TDisplayValue> =
	TOwnSteppableInputProps<TValue, TDisplayValue> & TInputInjectedProps;

type TSteppableInputState<TDisplayValue> = {
	displayedValue?: TDisplayValue
};

@PURE
abstract class SteppableInput<TValue, TDisplayValue> extends React.Component<
	TFullSteppableInputProps<TValue, TDisplayValue>, TSteppableInputState<TDisplayValue>> {

	static propTypes = {
		theme: React.PropTypes.shape(STEPPABLE_INPUT_THEME),
		increaseIcon: React.PropTypes.string,
		decreaseIcon: React.PropTypes.string,
		...createControlProps(React.PropTypes.any)
	};

	static defaultProps = {
		tabIndex: 0
	};

	private input: HTMLElement;
	private isFocused: boolean = false;
	private isFocusingOnInput: boolean = false;

	state: TSteppableInputState<TDisplayValue> = {};

	componentWillMount() {
	}

	componentWillReceiveProps(props: TFullSteppableInputProps<TValue, TDisplayValue>) {
	}

	render() {
		const {
			theme,
			isReadonly,
			isDisabled,
			tabIndex,
			increaseIcon,
			decreaseIcon,
			value,
			placeholder,
			onKeyDown,
			step,
			children
		} = this.props;

		const inputTheme = {
			container: classnames(
				theme.container,
				{
					[theme.container_isFocused as string]: this.isFocused,
					[theme.container_isReadonly as string]: isReadonly
				}
			)
		};

		const buttonTheme = {
			container: theme.button,
			icon: theme.button__icon
		};

		return (
			<Input tagName="div"
			       disabled={isDisabled}
			       readOnly={isReadonly}
			       tabIndex={this.isFocused ? -1 : (tabIndex || 0)}
			       onFocus={this.onContainerFocus}
			       onBlur={this.onContainerBlur}
			       onKeyDown={onKeyDown}
			       isFocused={this.isFocused}
			       theme={inputTheme}>
				{React.Children.only(children)}
				{/*<InnerInput tabIndex={-1}*/}
				            {/*placeholder={placeholder}*/}
				            {/*onValueChange={this.onInputValueChange}*/}
				            {/*disabled={isDisabled}*/}
				            {/*readOnly={isReadonly}*/}
				            {/*onKeyDown={this.onInputKeyDown}*/}
				            {/*ref={(el: any) => this.input = el}*/}
				            {/*value={value as any}*/}
				            {/*theme={theme.InnerInput}*/}
				            {/*className={theme.input}/>*/}
				<Holdable onHold={this.onDecreaseClick}>
					<ButtonIcon name={decreaseIcon}
					            theme={buttonTheme}
					            onClick={this.onDecreaseClick}
					            onMouseDown={this.onButtonMouseDown}
					            isDisabled={isDisabled}
					            tabIndex={-1}/>
				</Holdable>
				<Holdable onHold={this.onIncreaseClick}>
					<ButtonIcon name={increaseIcon}
					            theme={buttonTheme}
					            onClick={this.onIncreaseClick}
					            onMouseDown={this.onButtonMouseDown}
					            isDisabled={isDisabled}
					            tabIndex={-1}/>
				</Holdable>

			</Input>
		);
	}

	private onContainerFocus = (event: any) => {
		if (!this.props.isDisabled && !this.isFocused) {
			this.isFocused = true;
			this.focusOnInput();
			this.forceUpdate();
			this.props.onFocus && this.props.onFocus(event);
		}
	}

	private onContainerBlur = (event: any) => {
		if (!this.props.isDisabled && !this.isFocusingOnInput) {
			this.isFocused = false;
			this.forceUpdate();
			this.props.onBlur && this.props.onBlur(event);
		}
	}

	private onIncreaseClick = (e: React.MouseEvent<HTMLElement>) => {
		this.increase();
	}

	private onDecreaseClick = (e: React.MouseEvent<HTMLElement>) => {
		this.decrease();
	}

	private onButtonMouseDown = (e: React.MouseEvent<HTMLElement>) => {
		if (this.isFocused) {
			e.preventDefault();
		}
	}

	private onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		switch (e.keyCode) {
			case KEYCODE.UP: {
				e.preventDefault();
				this.increase();
				break;
			}
			case KEYCODE.DOWN: {
				e.preventDefault();
				this.decrease();
				break;
			}
		}
	}

	private onInputValueChange = (newValue: TValue) => {
		const {onChange, value} = this.props;
		onChange && value !== newValue && onChange(newValue);
	}

	private increase() {
		const {increment, step, value, onChange} = this.props;
		if (onChange && typeof value !== 'undefined') {
			const newValue = increment(value, step);
			if (newValue !== value) {
				onChange(newValue);
			}
		}
	}

	private decrease() {
		const {decrement, step, value, onChange} = this.props;
		if (onChange && typeof value !== 'undefined') {
			const newValue = decrement(value, step);
			if (newValue !== value) {
				onChange(newValue);
			}
		}
	}

	private focusOnInput() {
		this.isFocusingOnInput = true;
		const input = ReactDOM.findDOMNode<HTMLElement>(this.input);
		input.focus();
		if (input.nodeType === Node.ELEMENT_NODE && input.nodeName === 'INPUT') {
			(input as HTMLInputElement).setSelectionRange(0, (input as HTMLInputElement).value.length);
		}
		this.isFocusingOnInput = false;
	}
}
export type TSteppableInputProps<TValue, TDisplayValue> =
	TOwnSteppableInputProps<TValue, TDisplayValue> & Partial<TInputInjectedProps>;

export const STEPPABLE_INPUT = Symbol('SteppableInput');
export default themr(STEPPABLE_INPUT)(SteppableInput);
export type TSteppableInput<TValue, TDisplayValue> = React.ComponentClass<TSteppableInputProps<TValue, TDisplayValue>>;