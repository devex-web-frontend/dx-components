import * as React from 'react';
import { Button, TButtonProps } from '../Button/Button';
import { PURE } from 'dx-util/lib/react/pure';
import { Icon, TIconProps } from '../Icon/Icon';
import { Component, ComponentType } from 'react';
import { theme } from '../../util/react/theme';
import { ObjectClean } from 'typelevel-ts';
import { defaults } from '../../util/react/defaults';
import { compose } from 'redux';

export const BUTTON_ICON = Symbol('ButtonIcon');

export type TButtonIconProps = ObjectClean<TButtonProps & {
	Button: ComponentType<TButtonProps>,
	Icon: ComponentType<TIconProps>,
	name: string,
	theme: {
		icon?: string
	}
}>;

@PURE
class RawButtonIcon extends React.Component<TButtonIconProps> {
	render() {
		const { theme, name, Button, Icon, ...props } = this.props;
		const { icon, ...buttonTheme } = theme;
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

const enhance = compose(
	defaults({
		Button,
		Icon
	}),
	theme(BUTTON_ICON)
);

export const ButtonIcon = enhance(RawButtonIcon);
