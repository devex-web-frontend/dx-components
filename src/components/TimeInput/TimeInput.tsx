import * as React from 'react';
import SteppableInput, {
	TSteppableInputInjectedProps,
	STEPPABLE_INPUT_THEME
} from '../SteppableInput/SteppableInput';
import {PURE} from 'dx-util/src/react/pure';
import {TControlProps, createControlProps} from '../Control/Control';
import * as classnames from 'classnames';
import {themr} from 'react-css-themr';

const KEY_CODE = {
	LEFT: 37,
	RIGHT: 39,
	DELETE: 46,
	BACKSPACE: 8
};

export type TTime = {
	hours: number,
	minutes: number
};

enum ActiveSection {
	Hours,
	Minutes
}

type TTimeInputOwnProps = TControlProps<TTime> & {
	increaseIcon: string,
	decreaseIcon: string,
	isDisabled?: boolean
};
type TTimeInputInjectedProps = TSteppableInputInjectedProps & {
	theme: {
		hours?: string,
		hours_isActive?: string,
		minutes?: string,
		minutes_isActive?: string,
		separator?: string,
	}
};
type TTimeInputFullProps = TTimeInputOwnProps & TTimeInputInjectedProps;
type TTimeInputState = {
	activeSection?: ActiveSection,
	hours?: number,
	minutes?: number
};

const TIME_INPUT_THEME = {
	...STEPPABLE_INPUT_THEME,
	hours: React.PropTypes.string,
	hours_isActive: React.PropTypes.string,
	minutes: React.PropTypes.string,
	minutes_isActive: React.PropTypes.string,
	separator: React.PropTypes.string,
};

@PURE
class TimeInput extends React.Component<TTimeInputFullProps, TTimeInputState> {
	static propTypes = {
		increaseIcon: React.PropTypes.string.isRequired,
		decreaseIcon: React.PropTypes.string.isRequired,
		theme: React.PropTypes.shape(TIME_INPUT_THEME),
		...createControlProps(React.PropTypes.shape({
			hours: React.PropTypes.number.isRequired,
			minutes: React.PropTypes.number.isRequired,
		}))
	};

	state: TTimeInputState = {};
	private minutesElement: HTMLElement;

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

	componentWillReceiveProps(newProps: TTimeInputFullProps) {
		if (this.props.value !== newProps.value) {
			let hours;
			let minutes;
			if (newProps.value) {
				hours = newProps.value.hours;
				minutes = newProps.value.minutes;
			}
			this.setState({
				hours,
				minutes
			});
		}
	}

	render() {
		const {
			theme,
			increaseIcon,
			decreaseIcon,
			isDisabled
		} = this.props;
		const {hours, minutes, activeSection} = this.state;

		const hoursClassName = classnames(
			theme.hours,
			{
				[theme.hours_isActive as string]: activeSection === ActiveSection.Hours
			}
		);

		const minutesClassName = classnames(
			theme.minutes,
			{
				[theme.minutes_isActive as string]: activeSection === ActiveSection.Minutes
			}
		);

		return (
			<SteppableInput isDisabled={isDisabled}
			                onBlur={this.onBlur}
			                onFocus={this.onFocus}
			                decreaseIcon={decreaseIcon}
			                increaseIcon={increaseIcon}
			                onKeyDown={this.onKeyDown}
			                onDecrement={this.onDecrement}
			                onIncrement={this.onIncrement}>
				<div className={theme.container}>
					<span className={hoursClassName} onMouseDown={this.onHoursMouseDown}>
						{this.format(hours)}
					</span>
					<span className={theme.separator}>:</span>
					<span className={minutesClassName}
					      ref={(el: any) => this.minutesElement = el}
					      onMouseDown={this.onMinutesMouseDown}>
						{this.format(minutes)}
					</span>
				</div>
			</SteppableInput>
		);
	}

	private format(value?: number): string {
		if (typeof value !== 'undefined') {
			return `${value >= 0 && value < 10 ? 0 : ''}${value}`;
		} else {
			return '--';
		}
	}

	private onHoursMouseDown = (e: React.MouseEvent<HTMLElement>) => {
		this.setState({
			activeSection: ActiveSection.Hours
		});
	}

	private onMinutesMouseDown = (e: React.MouseEvent<HTMLElement>) => {
		this.setState({
			activeSection: ActiveSection.Minutes
		});
	}

	private step(amount: number): void {
		const {onChange, value} = this.props;
		const {hours, minutes, activeSection} = this.state;
		switch (activeSection) {
			case ActiveSection.Hours: {
				if (typeof hours !== 'undefined') {
					if (value) {
						onChange && onChange({
							hours: addTime(hours, amount, 24),
							minutes: value.minutes
						});
					} else {
						this.setState({
							hours: addTime(hours, amount, 24)
						});
					}
				} else {
					if (typeof minutes !== 'undefined') {
						onChange && onChange({
							hours: 0,
							minutes
						});
					} else {
						this.setState({
							hours: 0
						});
					}
				}
				break;
			}
			case ActiveSection.Minutes: {
				if (typeof minutes !== 'undefined') {
					if (value) {
						onChange && onChange({
							hours: value.hours,
							minutes: addTime(minutes, amount, 60)
						});
					} else {
						this.setState({
							minutes: addTime(minutes, amount, 60)
						});
					}
				} else {
					if (typeof hours !== 'undefined') {
						onChange && onChange({
							hours,
							minutes: 0
						});
					} else {
						this.setState({
							minutes: 0
						});
					}
				}
				break;
			}
		}
	}

	private onIncrement = () => {
		this.step(1);
	}

	private onDecrement = () => {
		this.step(-1);
	}

	private onFocus = (e: React.FocusEvent<HTMLElement>) => {
		if (typeof this.state.activeSection === 'undefined') {
			this.setState({
				activeSection: ActiveSection.Hours
			});
		}
	}

	private onBlur = (e: React.FocusEvent<HTMLElement>) => {
		this.setState({
			activeSection: undefined
		});
	}

	private onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
		const {activeSection} = this.state;
		switch (e.keyCode) {
			case KEY_CODE.LEFT: {
				if (activeSection === ActiveSection.Minutes) {
					this.setState({
						activeSection: ActiveSection.Hours
					});
				}
				break;
			}
			case KEY_CODE.RIGHT: {
				if (activeSection === ActiveSection.Hours) {
					this.setState({
						activeSection: ActiveSection.Minutes
					});
				}
				break;
			}
			case KEY_CODE.DELETE: //fallthrough
			case KEY_CODE.BACKSPACE: {
				switch (activeSection) {
					case ActiveSection.Minutes: {
						this.setState({
							minutes: undefined
						});
						break;
					}
					case ActiveSection.Hours: {
						this.setState({
							hours: undefined
						});
						break;
					}
				}
			}
		}
	}
}

type TTimeInputProps = TTimeInputOwnProps & Partial<TTimeInputInjectedProps>;
export const TIME_INPUT = Symbol('TimeInput');
export default themr(TIME_INPUT)(TimeInput) as React.ComponentClass<TTimeInputProps>;

function addTime(a: number, b: number, max: number): number {
	let result = (a + b) % max;
	if (result < 0) {
		result += max;
	}
	return result;
}