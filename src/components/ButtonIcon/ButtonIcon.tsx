import * as React from 'react';
import { Button, TButtonProps } from '../Button/Button';
import { PURE } from 'dx-util/lib/react/pure';
import { Icon, TIconProps } from '../Icon/Icon';
import { ComponentClass, ComponentType } from 'react';
import { withTheme } from '../../util/react/withTheme';
import { ObjectClean } from 'typelevel-ts';
import { PartialKeys } from 'dx-util/lib/object/object';

export const BUTTON_ICON = Symbol('ButtonIcon');

export type TFullButtonIconProps = ObjectClean<TButtonProps & {
	Button: ComponentType<TButtonProps>,
	Icon: ComponentType<TIconProps>,
	name: string,
	theme: {
		icon?: string
	}
}>;

@PURE
class RawButtonIcon extends React.Component<TFullButtonIconProps> {
	static defaultProps = {
		Button,
		Icon
	};

	render() {
		const { theme, name, Button, Icon, children, ...props } = this.props;
		const { icon, ...buttonTheme } = theme;
		const iconTheme = {
			container: icon
		};

		return (
			<Button {...props} theme={buttonTheme}>
				<Icon name={name} theme={iconTheme}/>
				{children}
			</Button>
		);
	}
}

export type TButtonIconProps = ObjectClean<PartialKeys<TFullButtonIconProps, 'Button' | 'Icon' | 'theme'>>;
export const ButtonIcon: ComponentClass<TButtonIconProps> = withTheme(BUTTON_ICON)(RawButtonIcon);