import {PropTypes, Requireable} from 'react';

export interface TControlProps<TValue> {
	value?: TValue,
	defaultValue?: TValue,
	onChange?: (value?: TValue) => void
}

export function createControlProps<TValue>(valueType: Requireable<TValue>) {
	return {
		value: valueType,
		onChange: PropTypes.func
	};
}