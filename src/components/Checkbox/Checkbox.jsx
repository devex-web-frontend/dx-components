import React, {Component, PropTypes} from 'react';
import {PURE} from 'dx-util/lib/react/pure';
import {themr} from 'react-css-themr';
import classnames from 'classnames';
import {randomId} from 'dx-util/lib/string/string';

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
			view: PropTypes.string,
			view_isDisabled: PropTypes.string,
			icon: PropTypes.string,
			icon_isChecked: PropTypes.string,
			icon_isDisabled: PropTypes.string
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

		const iconClassName = classnames(theme.icon, {
			[theme.icon_isChecked]: isChecked,
			[theme.icon_isDisabled]: isDisabled
		});
		const viewClassName = classnames(theme.view, {
			[theme.view_isDisabled]: isDisabled
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