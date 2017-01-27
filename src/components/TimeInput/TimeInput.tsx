import * as React from 'react';
import SteppableInput, {
	TSteppableInputInjectedProps,
	STEPPABLE_INPUT_THEME
} from '../SteppableInput/SteppableInput';
import {PURE} from 'dx-util/src/react/pure';
import {TControlProps, createControlProps} from '../Control/Control';
import * as classnames from 'classnames';
import {themr} from 'react-css-themr';
import ButtonIcon from '../ButtonIcon/ButtonIcon';

enum KeyCode {
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

const KEY_CODE_NUM_MAP: {[code: number]: number} = {
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
	clearIcon: string,
	isDisabled?: boolean
};
type TTimeInputInjectedProps = TSteppableInputInjectedProps & {
	theme: {
		hours?: string,
		hours_isActive?: string,
		minutes?: string,
		minutes_isActive?: string,
		separator?: string,
		SteppableInput?: {}
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
	private secondInput: boolean = false;

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
		if (this.props.value !== newProps.value && defined(newProps.value)) {
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
			isDisabled,
			clearIcon,
			value
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
			                theme={theme.SteppableInput}
			                onBlur={this.onBlur}
			                onFocus={this.onFocus}
			                decreaseIcon={decreaseIcon}
			                increaseIcon={increaseIcon}
			                clearIcon={clearIcon}
			                isClearable={defined(value) || defined(hours) || defined(minutes)}
			                onKeyDown={this.onKeyDown}
			                onClear={this.onClear}
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
		if (defined(value)) {
			return `${value >= 0 && value < 10 ? 0 : ''}${value}`;
		} else {
			return '--';
		}
	}

	private onHoursMouseDown = (e: React.MouseEvent<HTMLElement>) => {
		this.setState({
			activeSection: ActiveSection.Hours
		});
		this.correntMinutes();
	}

	private onMinutesMouseDown = (e: React.MouseEvent<HTMLElement>) => {
		this.setState({
			activeSection: ActiveSection.Minutes
		});
	}

	private onIncrement = () => {
		this.secondInput = false;
		this.step(1);
	}

	private onDecrement = () => {
		this.secondInput = false;
		this.step(-1);
	}

	private onClear = () => {
		this.secondInput = false;
		this.updateStateTime();
	}

	private onFocus = (e: React.FocusEvent<HTMLElement>) => {
		this.secondInput = false;
		if (!defined(this.state.activeSection)) {
			this.setState({
				activeSection: ActiveSection.Hours
			});
		}
	}

	private onBlur = (e: React.FocusEvent<HTMLElement>) => {
		this.secondInput = false;
		this.correntMinutes();
		this.setState({
			activeSection: undefined
		});
	}

	private onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
		const {activeSection, hours, minutes} = this.state;
		switch (e.keyCode) {
			case KeyCode.Left: {
				if (activeSection === ActiveSection.Minutes) {
					this.secondInput = false;
					this.correntMinutes();
					this.setState({
						activeSection: ActiveSection.Hours
					});
				}
				break;
			}
			case KeyCode.Right: {
				if (activeSection === ActiveSection.Hours) {
					this.secondInput = false;
					this.correntMinutes();
					this.setState({
						activeSection: ActiveSection.Minutes
					});
				}
				break;
			}
			case KeyCode.Delete: //fallthrough
			case KeyCode.Backspace: {
				this.secondInput = false;
				switch (activeSection) {
					case ActiveSection.Minutes: {
						this.updateStateTime(hours, undefined);
						break;
					}
					case ActiveSection.Hours: {
						this.updateStateTime(undefined, minutes);
						break;
					}
				}
				break;
			}
			default: {
				const number = KEY_CODE_NUM_MAP[e.keyCode];
				if (defined(number)) {
					this.handleNumKeyDown(number);
				}
			}
		}
	}

	private handleNumKeyDown(number: number) {
		const {hours, minutes} = this.state;
		switch (this.state.activeSection) {
			case ActiveSection.Hours: {
				if (this.secondInput) {
					let newHours;
					if (hours < 2) {
						newHours = Number(`${hours}${number}`);
					} else if (hours === 2) {
						newHours = Math.min(Number(`${hours}${number}`), 23);
					} else {
						newHours = number;
					}
					this.updateStateTime(newHours, minutes);
					this.setState({
						activeSection: ActiveSection.Minutes
					});
					this.secondInput = false;
				} else {
					this.updateStateTime(number, minutes);
					if (number > 2) {
						this.setState({
							activeSection: ActiveSection.Minutes
						});
						this.secondInput = false;
					} else {
						this.secondInput = true;
					}
				}
				break;
			}
			case ActiveSection.Minutes: {
				if (this.secondInput) {
					const newMinutes = Number(`${minutes}${number}`);
					this.updateStateTime(hours, newMinutes);
					this.secondInput = false;
				} else {
					this.updateStateTime(hours, number);
					this.secondInput = true;
				}
			}
		}
	}

	private step(amount: number): void {
		const {hours, minutes, activeSection} = this.state;
		switch (activeSection) {
			case ActiveSection.Hours: {
				this.updateStateTime(addTime(hours, amount, 24), minutes);
				break;
			}
			case ActiveSection.Minutes: {
				this.updateStateTime(
					hours,
					addTime(Math.min(typeof minutes !== 'undefined' ? minutes : Infinity, 59), amount, 60)
				);
				break;
			}
		}
	}

	private updateStateTime(hours?: number, minutes?: number): void {
		const {onChange, value} = this.props;

		const canBuildValue = defined(hours) && defined(minutes) && minutes < 60;
		const newValueDiffers = canBuildValue && (
				typeof value === 'undefined' ||
				value.hours !== hours ||
				value.minutes !== minutes
			);

		if (canBuildValue) {
			if (newValueDiffers) {
				onChange && onChange({
					hours,
					minutes
				} as any);
			}
		} else {
			if (defined(this.props.value)) {
				onChange && onChange(undefined);
			}
			this.setState({
				hours,
				minutes
			});
		}
	}

	private correntMinutes() {
		if (this.state.minutes >= 60) {
			this.updateStateTime(this.state.hours, 59);
		}
	}
}

type TTimeInputProps = TTimeInputOwnProps & Partial<TTimeInputInjectedProps>;
export const TIME_INPUT = Symbol('TimeInput');
export default themr(TIME_INPUT)(TimeInput) as React.ComponentClass<TTimeInputProps>;

function addTime(a: number | undefined, b: number, max: number): number {
	if (!defined(a)) {
		return b < 0 ? (max - 1) : 0;
	}
	let result = (a + b) % max;
	if (result < 0) {
		result += max;
	}
	return result;
}

function defined(value: any): boolean {
	return typeof value !== 'undefined';
}