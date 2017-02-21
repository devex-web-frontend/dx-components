import * as React from 'react';
import {PropTypes, Requireable} from 'react';

export type TControlProps<TValue> = {
	value?: TValue,
	onValueChange?: (value?: TValue) => void
};

export type TStatefulProps<TValue> = TControlProps<TValue> & {
	defaultValue?: TValue,
	value?: never
};

export function createControlProps<TValue>(valueType: Requireable<TValue>) {
	return {
		value: valueType,
		onChange: PropTypes.func
	};
}

export enum KeyCode {
	Escape = 27,
	Left = 37,
	Right = 39,
	Delete = 46,
	Backspace = 8,
	N0 = 48,
	N1 = 49,
	N2 = 50,
	N3 = 51,
	N4 = 52,
	N5 = 53,
	N6 = 54,
	N7 = 55,
	N8 = 56,
	N9 = 57,
	NUM0 = 96,
	NUM1 = 97,
	NUM2 = 98,
	NUM3 = 99,
	NUM4 = 100,
	NUM5 = 101,
	NUM6 = 102,
	NUM7 = 103,
	NUM8 = 104,
	NUM9 = 105
}

export const KEY_CODE_NUM_MAP: {[code: number]: number} = {
	[KeyCode.N0]: 0,
	[KeyCode.N1]: 1,
	[KeyCode.N2]: 2,
	[KeyCode.N3]: 3,
	[KeyCode.N4]: 4,
	[KeyCode.N5]: 5,
	[KeyCode.N6]: 6,
	[KeyCode.N7]: 7,
	[KeyCode.N8]: 8,
	[KeyCode.N9]: 9,
	[KeyCode.NUM0]: 0,
	[KeyCode.NUM1]: 1,
	[KeyCode.NUM2]: 2,
	[KeyCode.NUM3]: 3,
	[KeyCode.NUM4]: 4,
	[KeyCode.NUM5]: 5,
	[KeyCode.NUM6]: 6,
	[KeyCode.NUM7]: 7,
	[KeyCode.NUM8]: 8,
	[KeyCode.NUM9]: 9
};

type TStatefulState<TValue> = {
	value?: TValue
};

type TRCC<TProps> = React.ComponentClass<TProps>;
type TRSFC<TProps> = React.SFC<TProps>;

export function stateful() {
	return function decorate<V, P extends TControlProps<V>>(Target: TRCC<P> | TRSFC<P>): TRCC<P & TStatefulProps<V>> {

		class Stateful extends React.Component<P & TStatefulProps<V>, TStatefulState<V>> {
			static displayName = `Stateful(${Target.displayName || Target.name || 'Component'})`;

			componentWillMount() {
				this.setState({
					value: this.props.defaultValue
				} as any);
			}

			render() {
				return React.createElement(Target as any, {
					value: this.state.value,
					onValueChange: this.onValueChange
				});
			}

			protected onValueChange = (value?: V): void => {
				this.setState({
					value
				});
				const onValueChange = this.props.onValueChange as any;
				onValueChange && onValueChange(value);
			}
		}

		return Stateful;
	};
}