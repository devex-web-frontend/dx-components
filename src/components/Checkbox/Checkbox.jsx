import React, {Component, PropTypes} from 'react';
import {PURE} from 'dx-util/src/react/pure';
import {themr} from 'react-css-themr';
import classnames from 'classnames';
import {randomId} from 'dx-util/src/string/string';

import Icon from '../Icon/Icon.jsx';

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
			container_isDisabled: PropTypes.string,
			input: PropTypes.string,
			label: PropTypes.string,
			view: PropTypes.string,
			view_isDisabled: PropTypes.string,
			checkboxIcon: PropTypes.string,
			checkboxIcon_isChecked: PropTypes.string,
			checkboxIcon_isDisabled: PropTypes.string
		})
	};

	render() {
		const {
				id,
				checkboxIconName,
				isDisabled,
				isChecked,
				onChange,
				theme
		} = this.props;

		const iconClassName = classnames(theme.checkboxIcon, {
			[theme.checkboxIcon_isChecked]: isChecked,
			[theme.checkboxIcon_isDisabled]: isDisabled
		});
		const viewClassName = classnames(theme.view, {
			[theme.container__view_isDisabled]: isDisabled
		});

		return (
			<span className={theme.container}>
				<input type="checkbox"
						id={id}
						checked={isChecked}
						disabled={isDisabled}
						onChange={onChange}
						className={theme.input}/>
				<span className={viewClassName}>
					<span className={iconClassName}>
						<Icon name={checkboxIconName}/>
					</span>
				</span>
			</span>
		);
	}
}