import * as React from 'react';
import SteppableInput, {TSteppableInput, TSteppableInputProps} from '../SteppableInput/SteppableInput';
import {PURE} from 'dx-util/src/react/pure';
import {TControlProps} from '../Control/Control';

const increment = (value: number, step: number): number => value + step;
const decrement = (value: number, step: number): number => value - step;
const KEY_CODE_ENTER = 13;

type TInputProps = React.HTMLProps<HTMLInputElement> & {
	onValueChange: (value?: number) => void,
	value?: number
};
type TInputState = {
	value: string
};

@PURE
export class Input extends React.Component<TInputProps, TInputState> {
	state: TInputState;

	componentWillMount() {
		this.setState({
			value: this.format(this.props.value)
		});
	}

	componentWillReceiveProps(props: TInputProps) {
		if (this.props.value !== props.value) {
			this.setState({
				value: this.format(props.value)
			});
		}
	}

	render() {
		const {onValueChange, defaultValue, ...props} = this.props;
		return (
			<input {...props} onBlur={this.onBlur}
			                  onKeyDown={this.onKeyDown}
			                  value={this.state.value}
			                  onChange={this.onChange}/>
		);
	}

	private onChange = (e: React.FormEvent<HTMLInputElement>) => {
		const {currentTarget: {value}} = e;
		const parsed = this.parse(value);
		if (!isNaN(parsed) && this.props.onValueChange) {
			this.props.onValueChange(parsed);
		} else {
			this.setState({
				value
			});
		}
	}

	private onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.keyCode === KEY_CODE_ENTER) {
			this.notifyChanged();
		}
		this.props.onKeyDown && this.props.onKeyDown(e);
	}

	private onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		this.notifyChanged();
	}

	private notifyChanged() {
		const value = this.state.value;
		if (value === '') {
			//empty input
			this.props.onValueChange(undefined);
		} else {
			const numeric = this.parse(this.state.value);
			if (!isNaN(numeric) && numeric !== this.props.value) {
				this.props.onValueChange(numeric);
			}
		}
	}

	private format = (value?: number): string => {
		return typeof value !== 'undefined' ? `${value}` : '';
	}

	private parse = (raw: string): number => {
		return Number(raw);
	}
}

const NumberSteppableInput: TSteppableInput<number, string> = SteppableInput;
type TStepabbleNumberInputProps = TSteppableInputProps<number, string>;
type TNumberInputProps = TControlProps<number> & {
	increaseIcon: TStepabbleNumberInputProps['increaseIcon'],
	decreaseIcon: TStepabbleNumberInputProps['decreaseIcon'],
	step: TStepabbleNumberInputProps['step'],
	theme?: TStepabbleNumberInputProps['theme']
};

let renderMessagePrinted = false;

@PURE
export default class NumberInput extends React.Component<TNumberInputProps, any> {
	static propTypes = {
		...NumberSteppableInput.propTypes
	};

	render() {
		if (!renderMessagePrinted) {
			renderMessagePrinted = true;
			console.warn(
				'NumberInput is incomplete due to the absence of complete design/ux spec.',
				'Consider using NumericStepper instead'
			);
		}

		return (
			<NumberSteppableInput InnerInput={Input}
			                      increment={this.increment}
			                      decrement={this.decrement}
				{...this.props}/>
		);
	}

	private increment = (value: number, step: number): number => {
		const precision = this.getPrecision(step);
		return Number((value + step).toFixed(precision));
	}

	private decrement = (value: number, step: number): number => {
		const precision = this.getPrecision(step);
		return Number((value - step).toFixed(precision));
	}

	private getPrecision(step: number) {
		if (Number.isInteger(step)) {
			return 0;
		} else {
			return step.toString(10).split('.')[1].length;
		}
	}
}