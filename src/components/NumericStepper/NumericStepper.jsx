import React from 'react';
import {themr} from 'react-css-themr';
import {PURE} from 'dx-util/lib/react/pure';
import Input from '../Input/Input';
import Holdable from '../Holdable/Holdable.jsx';
import ButtonIcon from '../ButtonIcon/ButtonIcon.jsx';
import Button from '../Button/Button.jsx';
import classnames from 'classnames';

export const NUMERIC_STEPPER = Symbol('NumericStepper');

const BUTTON_TYPE = {
	UP: 'up',
	DOWN: 'down'
};

const KEYCODE = {
	UP: 38,
	DOWN: 40
};

@PURE
@themr(NUMERIC_STEPPER)
export default class NumericStepper extends React.Component {
	static propTypes = {
		pattern: React.PropTypes.instanceOf(RegExp),
		isDisabled: React.PropTypes.bool,
		manualEdit: React.PropTypes.bool,
		onChange: React.PropTypes.func,
		onClick: React.PropTypes.func,
		formatter: React.PropTypes.func,
		parser: React.PropTypes.func,
		value(props) {
			const {value, min, max} = props;
			const type = typeof value;

			if (type === 'number' && (value < min || value > max)) {
				throw new Error(
					`Value: ${value} should be greater than min: ${min} and lower than max: ${max}`
				);
			}
		},
		min(props) {
			const {min, max} = props;
			const type = typeof min;
			if (type !== 'undefined') {
				if (type !== 'number') {
					throw new Error('Min should be a number');
				} else {
					if (min >= max) {
						throw new Error('Invalid min value. Min value should be lower than max');
					}
				}
			}
		},
		max(props) {
			const {min, max} = props;
			const type = typeof max;
			if (type !== 'undefined') {
				if (type !== 'number') {
					throw new Error('Max should be a string or a number');
				} else {
					if (max <= min) {
						throw new Error('Invalid Max value. Max value should be greater than min');
					}
				}
			}
		},
		step: React.PropTypes.number,

		HoldableComponent: React.PropTypes.func,
		ButtonComponent: React.PropTypes.func,
		InputComponent: React.PropTypes.func,

		repeatInterval: React.PropTypes.number,
		repeatDelay: React.PropTypes.number,

		upIconName: React.PropTypes.string,
		downIconName: React.PropTypes.string,

		theme: React.PropTypes.shape({
			container: React.PropTypes.string,
			container_isInvalid: React.PropTypes.string,
			input: React.PropTypes.string,
			buttons: React.PropTypes.string,
			button: React.PropTypes.string,
			button__icon: React.PropTypes.string,
			button_up: React.PropTypes.string,
			button_down: React.PropTypes.string
		})
	};

	static defaultProps = {
		step: 1,
		pattern: /^-?$|^-?\d*([.]\d*)?$/,
		manualEdit: true,
		max: Infinity,
		min: -Infinity,
		isDisabled: false,
		HoldableComponent: Holdable,
		InputComponent: Input,
		ButtonComponent: ButtonIcon
	};

	state = {
		isFocused: false,
		displayedValue: this.formatValue(this.props.value)
	};

	componentWillReceiveProps(newProps) {
		this.setState({
			displayedValue: this.formatValue(newProps.value)
		});
	}

	/**
	 * @param {number} value
	 * @returns {string|number}
	 */
	formatValue(value) {
		const {formatter} = this.props;
		return formatter ? formatter(value) : value;
	}

	/**
	 * Trying to parse the entered string to a number.
	 * Done here because `onChange` should return a valid numeric value if possible,
	 * e.g. for proper interop with `stateful`.
	 * @param {string} value
	 * @returns {number}
	 */
	parseValue(value) {
		const {parser} = this.props;

		// If `parser` function is specified, try to parse.
		if (parser) {
			return parser(value);
		} else {
			// Cast to an integer otherwise or return as is if falied.
			const num = Number(value);
			return isNaN(num) ? value : num;
		}
	}

	getPrecision(step) {
		if (Number.isInteger(step)) {
			return 0;
		} else {
			return step.toString(10).split('.')[1].length;
		}
	}

	step(n) {
		const {step, min, max, value, onChange} = this.props;
		const num = value + n * step;
		const precision = this.getPrecision(step);

		const frac = Math.pow(10, precision);
		const newValue = Math.round(num * frac) / frac;

		if (newValue >= min && newValue <= max && newValue !== value) {
			onChange && onChange(newValue);
		}
	}

	increase = () => {
		this.step(1);
	}

	decrease = () => {
		this.step(-1);
	}

	render() {
		const {value} = this.props;
		const {displayedValue} = this.state;

		const {
			theme,
			min,
			max,
			upIconName,
			downIconName,
			isDisabled,
			manualEdit,
			onClick,
			pattern,
			HoldableComponent: Holdable,
			InputComponent: Input,
			ButtonComponent: Button,
		} = this.props;

		const inputTheme = {
			container: theme.input
		};

		const buttonTheme = Object.keys(BUTTON_TYPE).reduce((acc, current) => {
			acc[current] = {
				container: classnames(theme.button, theme[`button_${BUTTON_TYPE[current]}`]),
				icon: classnames(theme.button__icon)
			};
			return acc;
		}, {});

		const className = classnames(theme.container, {
			[theme.container_isInvalid]: isNaN(value) || value < min || value > max
		});

		return (
			<div className={className}>
				<Input value={displayedValue}
				       type="text"
				       disabled={isDisabled}
				       onBlur={this.onBlur}
				       onChange={this.onInputChange}
				       onClick={onClick}
				       onFocus={this.onFocus}
				       pattern={pattern}
				       onKeyDown={this.onKeyDown}
				       onWheel={this.onWheel}
				       theme={inputTheme}
				       readOnly={!manualEdit}/>
				<div className={theme.buttons}>
					<Holdable onHold={this.onButtonDownClick}>
						<Button onClick={this.onButtonDownClick}
						        name={downIconName}
						        theme={buttonTheme.DOWN}
						        isDisabled={isDisabled}/>
					</Holdable>
					<Holdable onHold={this.onButtonUpClick}>
						<Button onClick={this.onButtonUpClick}
						        theme={buttonTheme.UP}
						        name={upIconName}
						        isDisabled={isDisabled}/>
					</Holdable>
				</div>
			</div>
		);
	}

	onKeyDown = event => {
		switch (event.keyCode) {
			case KEYCODE.UP:
				this.increase();
				break;
			case KEYCODE.DOWN:
				this.decrease();
				break;
		}
	}

	onInputChange = (event) => {
		if (!this.props.manualEdit) {
			return;
		}

		const {value} = event.target;
		if (this.state.isFocused) {
			this.setState({
				displayedValue: value
			});
		}
	}

	onFocus = () => {
		this.setState({
			isFocused: true
		});
	}

	onBlur = event => {
		if (!this.props.manualEdit) {
			return;
		}

		const {value} = event.target;
		const newValue = this.parseValue(value);

		this.setState({
			isFocused: false,
			displayedValue: this.formatValue(newValue)
		});

		const {onChange} = this.props;
		onChange && onChange(newValue);
	}

	onWheel = e => {
		const {isDisabled} = this.props;
		const {isFocused} = this.state;

		if (!isDisabled && isFocused) {
			if (e.deltaY < 0) {
				this.increase();
			} else {
				this.decrease();
			}
		}
	}

	onButtonDownClick = () => {
		this.decrease();
	}

	onButtonUpClick = () => {
		this.increase();
	}
}