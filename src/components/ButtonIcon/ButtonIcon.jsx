import React from 'react';
import Button from '../Button/Button.jsx';
import {themr} from 'react-css-themr';
import {PURE} from 'dx-util/lib/react/pure';
import Icon from '../Icon/Icon.jsx';
import * as PropTypes from 'prop-types';

export const BUTTON_ICON = Symbol('ButtonIcon');

export const BUTTON_ICON_THEME = {
	container: PropTypes.string,
	icon: PropTypes.string
};

@PURE
@themr(BUTTON_ICON)
export default class ButtonIcon extends React.Component {
	static propTypes = {
		...Button.propTypes,
		Button: PropTypes.func,
		Icon: PropTypes.func,
		name: PropTypes.string,
		theme: PropTypes.shape(BUTTON_ICON_THEME)
	}

	static defaultProps = {
		Button,
		Icon
	}

	render() {
		const {theme, name, Button, Icon, ...props} = this.props;
		const {icon, ...buttonTheme} = theme;
		const iconTheme = {
			container: icon
		};

		return (
			<Button {...props} theme={buttonTheme}>
				<Icon name={name} theme={iconTheme}/>
			</Button>
		);
	}
}