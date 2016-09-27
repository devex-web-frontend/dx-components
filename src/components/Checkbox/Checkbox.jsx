import React, {Component, PropTypes} from 'react';
import {PURE} from 'dx-util/src/react/pure';
import {themr} from 'react-css-themr';
import classnames from 'classnames';
import {randomId} from 'dx-util/src/string/string';

import Icon from '../Icon/Icon.jsx';
import defaultCheckboxIcon from './img/icon-checkbox-tick.svg';

export const CHECKBOX = Symbol('Checkbox');

@PURE
@themr(CHECKBOX)
export default class Checkbox extends Component {
	static propTypes = {
		id: PropTypes.string,
		checkboxIconName: PropTypes.string,
		isDisabled: PropTypes.bool,
		isChecked: PropTypes.bool,
		onChange: PropTypes.func,
		theme: PropTypes.shape({
			container: PropTypes.string,
			container__disabled: PropTypes.string,
			container__input: PropTypes.string,
			container__label: PropTypes.string,
			container__view: PropTypes.string,
			container__view_disabled: PropTypes.string,
			container__checkboxIcon: PropTypes.string,
			container__checkboxIcon_checked: PropTypes.string,
			container__checkboxIcon_disabled: PropTypes.string
		})
	};

	static defaultProps = {
		checkboxIconName: defaultCheckboxIcon,
		id: randomId('control-checkbox')
	};

	constructor(...args) {
		super(...args);

		this.state = {
			isChecked: false
		};

		if (typeof this.props.isChecked !== 'undefined') {
			this.state = {
				...this.state,
				isChecked: this.props.isChecked,
			};
		}
	}

	componentWillReceiveProps(newProps) {
		if (typeof newProps.isChecked !== 'undefined') {
			this.setState({
				isChecked: newProps.isChecked
			});
		}
	}

	render() {
		const {
				id,
				checkboxIconName,
				isDisabled,
				isChecked,
				onChange,
				theme,
				...cleanProps
		} = this.props;

		const iconClassName = classnames(theme.container__checkboxIcon, {
			[theme.container__checkboxIcon_checked]: this.state.isChecked,
			[theme.container__checkboxIcon_disabled]: isDisabled
		});
		const viewClassName = classnames(theme.container__view, {
			[theme.container__view_disabled]: isDisabled
		});

		return (
			<span className={theme.container}>
				<input {...cleanProps}
						type="checkbox"
						id={id}
						checked={isChecked || this.state.isChecked}
						disabled={isDisabled}
						onChange={this.onChangeHandler}
						className={theme.container__input}/>
				<span className={viewClassName}>
					<span className={iconClassName}>
						<Icon name={checkboxIconName}/>
					</span>
				</span>
			</span>
		);
	}

	onChangeHandler = (e) => {
		this.setState({
			isChecked: e.target.checked
		});
		this.props.onChange && this.props.onChange(e);
	}

}