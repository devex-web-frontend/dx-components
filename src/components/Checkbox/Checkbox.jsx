import React, {PropTypes} from 'react';
import {themr} from 'react-css-themr';
import classnames from 'classnames';
import {randomId} from 'dx-util/src/string/string';

import Icon from '../Icon/Icon.jsx';
import defaultCheckboxIcon from './img/icon-checkbox-tick.svg';

export const CHECKBOX = Symbol('Checkbox');

const Checkbox = ({theme, ...props}) => {
	console.log(theme);
	const id = props.id || randomId('control-checkbox');
	const labelClassName = classnames(theme.container__label, {
		[theme.container__disabled]: props.disabled
	});
	return (
		<span className={theme.container}>
			<input {...cleanProps(props)} id={id} type="checkbox" className={theme.container__input} />
			<label htmlFor={id} className={labelClassName}>
				<span className={theme.container__view}>
					<span className={theme.container__checkboxIcon}>
						<Icon name={props.checkboxIconName} />
					</span>
				</span>
				{props.children}
			</label>
		</span>
	);
};

Checkbox.propTypes = {
	id: PropTypes.string,
	children: PropTypes.node,
	checkboxIconName: PropTypes.string,
	disabled: PropTypes.bool,
	theme: PropTypes.shape({
		container: PropTypes.string,
		container__disabled: PropTypes.string,
		container__input: PropTypes.string,
		container__label: PropTypes.string,
		container__view: PropTypes.string,
		container__checkboxIcon: PropTypes.string
	})
};

Checkbox.defaultProps = {
	checkboxIconName: defaultCheckboxIcon
};

/**
 * @param {{}} props
 * @returns {{}}
 */
function cleanProps(props) {
	const {
			children,
			checkboxIconName,
			...checkboxProps
	} = props;
	return checkboxProps;
}
export default themr(CHECKBOX)(Checkbox);