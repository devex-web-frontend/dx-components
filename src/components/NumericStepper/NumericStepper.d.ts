import {Component} from 'react';
import {TControlProps} from '../Control/Control';
import ComponentClass = React.ComponentClass;
import ValidationMap = React.ValidationMap;

export interface INumericStepperProps<TValue> extends TControlProps<TValue> {
	increment?(value: TValue, step: TValue): TValue,
	decrement?(value: TValue, step: TValue): TValue,
	formatter?(value: TValue): string,
	parser?(value: string): TValue,
	InputComponent?: React.ComponentClass<any>
}

export interface INumericStepper<TValue> {
	propTypes?: ValidationMap<INumericStepperProps<TValue>>;
	new (): NumericStepper<TValue>,
}
declare class NumericStepper<TValue> extends Component<INumericStepperProps<TValue>, any> {
}
export default NumericStepper;