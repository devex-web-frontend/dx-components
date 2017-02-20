import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classnames from 'classnames';
import {themr} from 'react-css-themr';
import {PURE} from 'dx-util/src/react/pure';
import {TControlProps} from '../Control/Control';
export const INPUT = Symbol('Input');

type TInputInjectedProps = {
	theme: {
		container?: string,
		container_isFocused?: string,
		container_hasError?: string,
		input?: string
	}
};

type TOwnInputProps = TControlProps<string> & {
	isDisabled?: boolean,
	isReadOnly?: boolean,
	tabIndex?: number,
	type?: string,
	name?: string,
	id?: string,
	error?: React.ReactNode, //for possible Input Class extensions

	onFocus?: React.FocusEventHandler<HTMLElement>,
	onBlur?: React.FocusEventHandler<HTMLElement>,
	onClick?: React.MouseEventHandler<HTMLElement>,
	onMouseDown?: React.MouseEventHandler<HTMLElement>,
	onMouseUp?: React.MouseEventHandler<HTMLElement>,
	onKeyPress?: React.KeyboardEventHandler<HTMLElement>,
	onKeyDown?: React.KeyboardEventHandler<HTMLElement>,
	onKeyUp?: React.KeyboardEventHandler<HTMLElement>,

	onWheel?: React.WheelEventHandler<HTMLElement>
};

type TFullInputProps = TOwnInputProps & TInputInjectedProps;

type TInputState = {
	isFocused: boolean
};

@PURE
class Input extends React.Component<TFullInputProps, TInputState> {
	static defaultProps = {
		tabIndex: 0
	};

	state = {
		isFocused: false
	};

	private input: React.ReactInstance;
	private isFocusingOnInput: boolean;

	render() {
		const {
			theme,
			isDisabled,
			isReadOnly,
			tabIndex,
			children,
			value,
			error,
			defaultValue,
			onClick,
			onMouseDown,
			onMouseUp,
			onKeyDown,
			onKeyUp,
			onKeyPress,
			min,
			max,
			type,
			name,
			id
		} = this.props;

		const {isFocused} = this.state;

		const className = classnames(
			theme.container,
			{
				[theme.container_isFocused as string]: !isDisabled && isFocused,
				[theme.container_hasError as string]: Boolean(error)
			}
		);

		return (
			<div disabled={isDisabled}
			     className={className}
			     readOnly={isReadOnly}
			     id={id}
			     onClick={onClick}
			     onMouseDown={onMouseDown}
			     onMouseUp={onMouseUp}
			     onKeyDown={onKeyDown}
			     onKeyUp={onKeyUp}
			     onKeyPress={onKeyPress}
			     onFocus={this.onFocus}
			     onBlur={this.onBlur}
			     tabIndex={(type !== 'hidden' && (isFocused || isDisabled)) ? -1 : tabIndex}>
				<input className={theme.input}
				       ref={(el: React.ReactInstance) => this.input = el}
				       value={value}
				       defaultValue={defaultValue}
				       type={type}
				       min={min}
				       max={max}
				       name={name}
				       onChange={this.onChange}
				       tabIndex={-1}
				       onFocus={undefined}
				       onBlur={undefined}
				       readOnly={isReadOnly}
				       disabled={isDisabled}/>
				{children}
			</div>
		);
	}

	onFocus = (e: React.FocusEvent<HTMLElement>) => {
		if (!this.props.isDisabled && !this.state.isFocused && !this.isFocusingOnInput) {
			const input = ReactDOM.findDOMNode<HTMLInputElement>(this.input);
			if (input) {
				this.isFocusingOnInput = true;
				input.focus();
				this.isFocusingOnInput = false;
			}
			this.setState({
				isFocused: true
			});
			this.props.onFocus && this.props.onFocus(e);
		}
	}

	onBlur = (e: React.FocusEvent<HTMLElement>) => {
		if (!this.props.isDisabled && this.state.isFocused && !this.isFocusingOnInput) {
			this.setState({
				isFocused: false
			});
			this.props.onBlur && this.props.onBlur(e);
		}
	}

	onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.props.onChange && this.props.onChange(e.target.value);
	}
}

export type TInputProps = TOwnInputProps & Partial<TInputInjectedProps>;
export default themr(INPUT)(Input) as React.ComponentClass<TInputProps>;