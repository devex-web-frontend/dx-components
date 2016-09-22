import React from 'react';
import {PURE} from 'dx-util/src/react/pure';
import {themr} from 'react-css-themr';
import Input from '../Input/Input';
import Menu from '../Menu/Menu';
import MenuItem from '../Menu/MenuItem';
import Popover from '../Popover/Popover';
import Pure from '../Pure/Pure';

export const AUTOCOMPLETE = Symbol('Autocomplete');

const TAB_KEY = 9;

const AUTOCOMPLETE_VALUE = React.PropTypes.oneOfType([
	React.PropTypes.string
]);

@PURE
export default class Autocomplete extends React.Component {
	static propTypes = {
		...Input.propTypes,
		Input: React.PropTypes.func,
		Menu: React.PropTypes.func,
		MenuItem: React.PropTypes.func,
		Popover: React.PropTypes.func,
		defaultValue(props) {
			if (typeof props.defaultValue !== 'undefined') {
				throw new Error('Autocomplete is controlled component and does not support defaultValue');
			}
		},
		value: AUTOCOMPLETE_VALUE,
		data: React.PropTypes.arrayOf(AUTOCOMPLETE_VALUE)
	};

	static defaultProps = {
		Input,
		Menu,
		MenuItem,
		Popover,
		data: []
	};

	state = {
		isOpened: false
	};

	_input;
	_isFocused = false;

	render() {
		const {
			theme,
			Input,
			MenuItem,
			Menu,
			Popover,
			data,
			value,
			...inputProps
		} = this.props;

		return (
			<span className={theme.container}>
				<Input {...inputProps}
				       value={value}
				       ref={el => this._input = el}
				       onKeyDown={this.onInputKeyDown}
				       onChange={this.onInputChange}/>
				<Popover isOpened={this.state.isOpened}
				         anchor={this._input}
				         onRequestClose={this.onPopoverRequestClose}
				         closeOnClickAway={true}>
					<Pure data={data} value={value} Menu={Menu}>
						{() => {
							const filtered = data.filter(item => item.indexOf(value) !== -1);

							return (
								filtered.length > 0 && (
									<Menu onItemSelect={this.onMenuItemSelect}>
										{filtered.map((item, i) => (
											<MenuItem key={i} value={item}>{item}</MenuItem>
										))}
									</Menu>
								)
							);
						}}
					</Pure>
				</Popover>
			</span>
		);
	}

	onInputKeyDown = e => {
		//keyDown may be fired from menu, don't call props handler
		if ((e.keyCode || e.which) === TAB_KEY) {
			//loose focus on tab press
			this._isFocused = false;
			this.setState({
				isOpened: false
			});
		}
	}

	onPopoverRequestClose = () => {
		this.setState({
			isOpened: false
		});
	}

	onMenuItemSelect = (...args) => {
		this.handleMenuItemSelect(...args);
	}

	onInputChange = (...args) => {
		this.handleInputChange(...args);
	}

	handleInputChange(e) {
		const {target: {value}} = e;
		if (value && value.length !== 0) {
			this.setState({
				isOpened: true
			});
		} else {
			this.setState({
				isOpened: false
			});
		}
		this.props.onChange && this.props.onChange(value);
	}

	handleMenuItemSelect(value, text) {
		this.props.onChange && this.props.onChange(value);
	}
}

export default themr(AUTOCOMPLETE)(Autocomplete);