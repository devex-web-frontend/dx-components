import React from 'react';
import Button from '../Button/Button.jsx';
import {themr} from 'react-css-themr';
import {PURE} from 'dx-util/src/react/pure';
import Icon from '../Icon/Icon.jsx';

export const BUTTON_ICON = Symbol('ButtonIcon');

export const BUTTON_ICON_THEME = {
	container: React.PropTypes.string,
	icon: React.PropTypes.string
};

@PURE
@themr(BUTTON_ICON)
export default class ButtonIcon extends React.Component {
	static propTypes = {
		...Button.propTypes,
		name: React.PropTypes.string,
		theme: React.PropTypes.shape(BUTTON_ICON_THEME)
	}

	render() {
		const {theme, name, ...props} = this.props;
		const iconTheme = {
			container: theme.icon
		};
		const buttonTheme = {
			container: theme.container
		};

		return (
			<Button {...props} theme={buttonTheme}>
				<Icon name={name} theme={iconTheme}/>
			</Button>
		);
	}
}