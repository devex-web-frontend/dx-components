import * as React from 'react';
import NS, {INumericStepper, INumericStepperProps} from '../NumericStepper/NumericStepper';
import {PURE} from 'dx-util/src/react/pure';
// import {BUTTON_ICON} from '../ButtonIcon/ButtonIcon';
import SteppableInput, {TSteppableInput, TSteppableInputProps} from '../SteppableInput/SteppableInput';

// const SteppableTimeInput: TSteppableInput<TTime> = SteppableInput;

type TTime = {
	hours: number,
	minutes: number
};

const NumericStepper: INumericStepper<TTime> = NS;

type TTimeInputProps = /*TSteppableInputProps<TTime> & */{
	theme: {
		doo: string
	}
};

const increment = (value: TTime, step: TTime): TTime => {
	return value;
};

const decrement = (value: TTime, step: TTime): TTime => {
	return value;
};

const formatter = (value: TTime): string => {
	return `${value.hours}:${value.minutes}`;
};

const parser = (value: string): TTime => {
	const [hours, minutes] = value.split(':');
	return {
		hours: Number(hours),
		minutes: Number(minutes)
	};
};

class Input extends React.Component<any, any> {
	render() {
		return (
			<div>hi</div>
		);
	}
}

@PURE
export default class TimeInput extends React.Component<TTimeInputProps, any> {
	static propTypes = {
		...NumericStepper.propTypes
	};

	render() {
		return (
			<div>
				<NS/>
			</div>
		);
	}

	_render() {
		return (
			<NumericStepper increment={increment}
			                decrement={decrement}
			                formatter={formatter}
			                parser={parser}
			                InputComponent={Input}
				{...this.props}/>
		);
	}
}