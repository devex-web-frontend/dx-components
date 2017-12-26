import React from 'react';
import moment from 'moment';
import * as PropTypes from 'prop-types';

/**
 * Custom field components should handle these properties to interact with DatePicker.
 */
export const DATE_PICKER_FIELD_PROPS = {
	value: PropTypes.instanceOf(moment).isRequired, // formatted date string
	dateFormat: PropTypes.string,
	onChange: PropTypes.func, // pass a new `date: Moment` back
	min: PropTypes.instanceOf(moment),
	max: PropTypes.instanceOf(moment), // ISO
	openDatePicker: PropTypes.func.isRequired,
	closeDatePicker: PropTypes.func.isRequired,
	isDisabled: PropTypes.bool,
	isInvalid: PropTypes.bool,
	locale: PropTypes.string,
	placeholder: PropTypes.string,
	isDatePickerOpened: PropTypes.bool,
	theme: PropTypes.shape({
		field: PropTypes.string,
		field_invalid: PropTypes.string
	}),
	Input: PropTypes.func
};