import React from 'react';

/**
 * Custom field components should handle these properties to interact with DatePicker.
 */
export const DATE_PICKER_FIELD_PROPS = {
	value: React.PropTypes.string, // ISO - "2016-09-20T15:30:39.298Z",
	dateFormat: React.PropTypes.string,
	onDateChange: React.PropTypes.func, // pass a new value to DatePicker in ISO format
	min: React.PropTypes.string, // ISO
	max: React.PropTypes.string, // ISO
	onClick: React.PropTypes.func
};