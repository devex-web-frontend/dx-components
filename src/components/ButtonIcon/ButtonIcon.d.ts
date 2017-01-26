import * as React from 'react';
import ValidationMap = React.ValidationMap;
interface IButtonProps extends React.HTMLProps<HTMLButtonElement> {
	name: string,
	isDisabled?: boolean,
	theme?: {}
}
export declare const BUTTON_ICON: symbol;
export type BUTTON_ICON_THEME = {
	container?: string,
	icon?: string
};
export declare const BUTTON_ICON_THEME: ValidationMap<BUTTON_ICON_THEME>;

declare const ButtonIcon: React.ComponentClass<IButtonProps>;
export default ButtonIcon;