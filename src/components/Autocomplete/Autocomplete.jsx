import React from 'react';
import * as PropTypes from 'prop-types';
import { PURE } from 'dx-util/lib/react/pure';
import { themr } from 'react-css-themr';
import Input, { INPUT_THEME_SHAPE } from '../Input/Input';
import { Menu, MENU_THEME_SHAPE_OBJECT } from '../Menu/Menu.tsx';
import { Popover } from '../Popover/Popover.tsx';
import { Pure } from '../Pure/Pure';
import AutocompleteMenuItem, { AUTOCOMPLETE_MENU_ITEM_THEME_SHAPE } from './AutocompleteMenuItem';

export const AUTOCOMPLETE = Symbol('Autocomplete');

const TAB_KEY = 9;
const ENTER_KEY = 13;

@PURE
@themr(AUTOCOMPLETE)
export default class Autocomplete extends React.Component {
	static propTypes = {
		...Input.propTypes,
		theme: PropTypes.shape({
			container: PropTypes.string,
			Input: PropTypes.shape(INPUT_THEME_SHAPE),
			// Popover: PropTypes.shape(POPOVER_THEME_SHAPE_OBJECT),
			Menu: PropTypes.shape(MENU_THEME_SHAPE_OBJECT),
			MenuItem: PropTypes.shape(AUTOCOMPLETE_MENU_ITEM_THEME_SHAPE)
		}),
		Input: PropTypes.func,
		Menu: PropTypes.func,
		MenuItem: PropTypes.func,
		Popover: PropTypes.func,
		defaultValue(props) {
			if (typeof props.defaultValue !== 'undefined') {
				throw new Error('Autocomplete is controlled component and does not support defaultValue');
			}
		},
		value: PropTypes.any,
		data: PropTypes.arrayOf(PropTypes.any),
		filter: PropTypes.func
	};

	static defaultProps = {
		Input,
		Menu,
		MenuItem: AutocompleteMenuItem,
		Popover,
		data: [],
		filter: value => (item, index) => item.indexOf(value) !== -1
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
			filter,
			...inputProps
		} = this.props;

		return (
			<span className={theme.container}>
				<Input {...inputProps}
				       theme={theme.Input}
				       value={value}
				       ref={el => this._input = el}
				       onKeyDown={this.onInputKeyDown}
				       onKeyPress={this.onInputKeyPress}
				       onChange={this.onInputChange}/>
				<Popover isOpened={this.state.isOpened}
				         theme={theme.Popover}
				         anchor={this._input}
				         onRequestClose={this.onPopoverRequestClose}
				         closeOnClickAway={true}>
					<Pure data={data} value={value} Menu={Menu} filter={filter}>
						{() => {
							const filtered = data.filter(filter(value));
							return (
								filtered.length > 0 && (
									<Menu onItemSelect={this.onMenuItemSelect}
									      theme={theme.Menu}>
										{filtered.map((item, i) => (
											<MenuItem key={i}
											          theme={theme.MenuItem}
											          search={value}
											          value={item}>
												{item}
											</MenuItem>
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

	onInputKeyPress = e => {
		if ((e.keyCode || e.which) === ENTER_KEY) {
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

	onInputChange = e => {
		const { target: { value } } = e;
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

	onMenuItemSelect = (value, text) => {
		this.setState({
			isOpened: false
		});
		this.props.onChange && this.props.onChange(value);
	}
}