import * as React from 'react';
import SteppableInput, {TSteppableInput, TSteppableInputProps} from '../SteppableInput/SteppableInput';
import {PURE} from 'dx-util/src/react/pure';
import {TControlProps} from '../Control/Control';
import {TTime, add, subtract} from './TimeInput.model';
import * as classnames from 'classnames';

type TInputProps = {
	onValueChange: (value?: TTime) => void,
	value?: TTime,
	step: TTime,
	theme: {
		container?: string,
		hours?: string,
		hours_active?: string,
		minutes?: string,
		minutes_active?: string,
		separator?: string,
	}
};

type TInputState = {
	hours?: number,
	minutes?: number
};

enum ActiveSection {
	Hours,
	Minutes
}

const TIME_INPUT_ACTIIVE_SECTION_CONTEXT_KEY = '__TIME_INPUT_ACTIIVE_SECTION_CONTEXT_KEY__';
const CONTEXT_TYPES = {
	[TIME_INPUT_ACTIIVE_SECTION_CONTEXT_KEY]: React.PropTypes.oneOf(Object.values(ActiveSection))
};

@PURE
export class Input extends React.Component<TInputProps, TInputState> {
	state: TInputState = {};

	static defaultProps: any = {
		theme: {}
	};

	static contextTypes = CONTEXT_TYPES;

	componentWillMount() {
		const {value} = this.props;
		if (value) {
			const {hours, minutes} = value;
			this.setState({
				hours,
				minutes
			});
		}
	}

	componentWillReceiveProps(props: TInputProps) {
		if (this.props.value !== props.value) {
			let minutes;
			let hours;
			if (props.value) {
				hours = props.value.hours;
				minutes = props.value.minutes;
			}
			this.setState({
				hours,
				minutes
			});
		}
	}

	render() {
		const {onValueChange, step, theme} = this.props;
		const {hours, minutes} = this.state;
		const hoursClassName = classnames(
			theme.hours,
			{
				// [theme.hours_active as string]: Boolean(step.hours)
			}
		);
		const minutesClassName = classnames(
			theme.minutes,
			{
				// [theme.minutes_active as string]: Boolean(step.minutes)
			}
		);
		return (
			<div className={theme.container} onFocus={this.onFocus}>
				<span className={hoursClassName} onClick={this.onHoursClick}>
					{this.format(hours)}
				</span>
				<span className={theme.separator}>:</span>
				<span className={minutesClassName} onClick={this.onMinutesClick}>
					{this.format(minutes)}
				</span>
			</div>
		);
	}

	private format(value?: number): string {
		if (typeof value !== 'undefined') {
			return `${value >= 0 && value < 10 ? 0 : ''}${value}`;
		} else {
			return '--';
		}
	}

	private onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
		console.log(e);
	}

	private onHoursClick = (e: React.MouseEvent<HTMLElement>) => {
		console.log(e);

	}

	private onMinutesClick = (e: React.MouseEvent<HTMLElement>) => {
		console.log(e);

	}

	private onFocus = (e: React.FocusEvent<HTMLElement>) => {
		console.log('focus', e.target);
	}
}

const TimeSteppableInput: TSteppableInput<TTime, TTime> = SteppableInput;
type TSteppableTimeInputProps = TSteppableInputProps<TTime, TTime>;
type TTimeInputProps = TControlProps<TTime> & {
	increaseIcon: TSteppableTimeInputProps['increaseIcon'],
	decreaseIcon: TSteppableTimeInputProps['decreaseIcon'],
	theme?: TSteppableTimeInputProps['theme']
};

type TTimeInputState = {
	step: TTime,
	activeSection?: ActiveSection
};

@PURE
export default class TimeInput extends React.Component<TTimeInputProps, TTimeInputState> {
	static propTypes = {
		...TimeSteppableInput.propTypes
	};

	static childContextTypes = CONTEXT_TYPES;

	state: TTimeInputState = {
		step: {
			hours: 1,
			minutes: 0
		}
	};

	getChildContext() {
		return {
			[TIME_INPUT_ACTIIVE_SECTION_CONTEXT_KEY]: this.state.activeSection
		};
	}

	render() {
		const {step} = this.state;
		const {children, ...props} = this.props;
		return (
			<TimeSteppableInput InnerInput={Input}
			                    step={step}
			                    decrement={subtract}
			                    increment={this.increment}
			                    onKeyDown={this.onKeyDown}
				>
				<div>hi</div>
			</TimeSteppableInput>
		);
	}

	private increment = (value: TTime, step: TTime): TTime => {
		return add(value, step);
	}

	private onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
		console.log(e);
		this.setState({
			activeSection: this.state.activeSection === ActiveSection.Minutes ? ActiveSection.Hours : ActiveSection.Minutes
		} as any);
	}
}