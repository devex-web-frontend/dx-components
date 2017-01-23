// export const INPUT_THEME_SHAPE = {
// 	container: React.PropTypes.string,
// 	container_isFocused: React.PropTypes.string,
// 	container_isReadonly: React.PropTypes.string,
// 	input: React.PropTypes.string
// };
//
// interface IInputInjectedProps {
// 	theme: {
// 		container?: string,
// 		container_isFocused?: string,
// 		container_isReadonly?: string,
// 		input?: string
// 	}
// }
//
// interface IInputProps extends React.HTMLProps<HTMLInputElement> {
// 	tagName?: string
// }
//
// @PURE
// class _Input extends React.Component<IInputProps & IInputInjectedProps, any> {
// 	static propTypes = {
// 		theme: React.PropTypes.shape(INPUT_THEME_SHAPE),
// 		tagName: React.PropTypes.string
// 	};
//
// 	static defaultProps = {
// 		tagName: 'input'
// 	};
//
// 	private input: HTMLInputElement;
// 	private isFocused: boolean = false;
// 	private isFocusingOnInput: boolean = false;
//
// 	render() {
// 		const {theme, onFocus, onBlur, onFocusCapture, onBlurCapture, tabIndex, tagName, ...props} = this.props;
//
// 		const className = classnames(
// 			theme.container,
// 			{
// 				[theme.container_isFocused as string]: this.isFocused,
// 				[theme.container_isReadonly as string]: props.readOnly
// 			}
// 		);
//
// 		const InputComponent = tagName as any;
//
// 		return (
// 			<div className={className}
// 			     onFocus={this.onContainerFocus}
// 			     onBlur={this.onContainerBlur}
// 			     onFocusCapture={onFocusCapture as any as React.EventHandler<React.FocusEvent<HTMLDivElement>>}
// 			     onBlurCapture={onBlurCapture as any as React.EventHandler<React.FocusEvent<HTMLDivElement>>}
// 			     disabled={props.disabled}
// 			     readOnly={props.readOnly}
// 			     tabIndex={this.isFocused ? -1 : tabIndex || 0}
// 			     onClick={this.onClick}>
// 				<InputComponent className={theme.input}
// 				                tabIndex={-1}
// 				                ref={(el: any) => this.input = el}
// 					{...props}/>
// 			</div>
// 		);
// 	}
//
// 	private onClick = (event: any) => {
// 		this.focusOnInput();
// 	}
//
// 	private onContainerFocus = (event: React.FocusEvent<HTMLDivElement>) => {
// 		if (!this.props.disabled && !this.isFocused) {
// 			this.isFocused = true;
// 			this.focusOnInput();
// 			this.forceUpdate();
// 		}
// 	}
//
// 	private onContainerBlur = (event: React.FocusEvent<HTMLDivElement>) => {
// 		if (!this.props.disabled && !this.isFocusingOnInput) {
// 			this.isFocused = false;
// 			this.forceUpdate();
// 		}
// 	}
//
// 	private focusOnInput() {
// 		this.isFocusingOnInput = true;
// 		const input = ReactDOM.findDOMNode<HTMLInputElement>(this.input);
// 		input.focus();
// 		input.setSelectionRange(0, input.value.length);
// 		this.isFocusingOnInput = false;
// 	}
// }
//
// // export default themr(INPUT)(Input) as React.ComponentClass<IInputProps & Partial<IInputInjectedProps>>;
