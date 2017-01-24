import * as React from 'react';
interface IButtonProps extends React.HTMLProps<HTMLButtonElement> {
	name: string,
	isDisabled?: boolean,
	theme?: {}
}
declare const BUTTON_ICON: symbol;

declare const ButtonIcon: React.ComponentClass<IButtonProps>;
export default ButtonIcon;