declare const Button: React.ComponentClass<IButtonProps>;
export default Button;

export interface IButtonProps {
	isDisabled?: boolean,
	theme?: {
		container?: string,
		loadingIndicator?: string,
		LoadingIndicator?: {}
	},
	isFlat?: boolean,
	style?: {},
	type?: string,
	isLoading?: boolean,
	isPrimary?: boolean
	onMouseLeave?: Function,
	onMouseDown?: Function,
	onMouseUp?: Function,
	onClick?: Function,
	tabIndex?: number
}
export type TButtonProps = IButtonProps;

export declare const BUTTON: symbol;