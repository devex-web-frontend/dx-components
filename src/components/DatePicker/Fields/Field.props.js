import React from 'react';

/**
 * Custom field components should handle these properties to interact with DatePicker.
 */
export const DATE_PICKER_FIELD_PROPS = {
	value: React.PropTypes.string, // formatted date string
	dateFormat: React.PropTypes.string,
	onDateChange: React.PropTypes.func, // pass a new raw date value back to DatePicker
	min: React.PropTypes.string, // ISO
	max: React.PropTypes.string, // ISO
	onOpenDatePicker: React.PropTypes.func,
	isDisabled: React.PropTypes.bool,
	isInvalid: React.PropTypes.bool,
};