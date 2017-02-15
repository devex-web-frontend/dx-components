import * as React from 'react';
import ValidationMap = React.ValidationMap;
import {IButtonProps} from '../Button/Button';
interface IButtonIconProps extends IButtonProps {
	name: string
}
export declare const BUTTON_ICON: symbol;
export type BUTTON_ICON_THEME = {
	container?: string,
	icon?: string
};
export declare const BUTTON_ICON_THEME: ValidationMap<BUTTON_ICON_THEME>;

declare const ButtonIcon: React.ComponentClass<IButtonIconProps>;
export default ButtonIcon;