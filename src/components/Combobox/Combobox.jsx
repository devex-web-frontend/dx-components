import React from 'react';
import {themr} from 'react-css-themr';
import Input from '../Input/Input';
import {ButtonIcon} from '../ButtonIcon/ButtonIcon';
import Selectbox, {SELECTBOX_THEME} from '../Selectbox/Selectbox.jsx';
import {PURE} from 'dx-util/lib/react/pure';
import classnames from 'classnames';
import * as PropTypes from 'prop-types';

export const COMBOBOX = Symbol('Combobox');

class ComboboxAnchor extends React.Component {
	static propTypes = {
		// ...ANCHOR_SHARE_PROP_TYPES
	};

	render() {
		const {
			theme,
			children,
			caretIconName,
			isDisabled,
			onClick,
		} = this.props;

		const buttonIconTheme = {
			container: theme.wrapperCaret,
			icon: theme.caret
		};

		return (
			<div className={theme.container}>
				<div className={theme.content}>
					{caretIconName && (
						<ButtonIcon isDisabled={isDisabled}
						            theme={buttonIconTheme}
						            name={caretIconName}
						            onClick={onClick} />
					)}
				</div>
				{children}
			</div>
		);
	}
}

@PURE
@themr(COMBOBOX)
export default class Combobox extends React.Component {

	static propTypes = {
		...Selectbox.propTypes,
		defaultValue(props) {
			const {defaultValue} = props;
			const type = typeof defaultValue;
			if (type !== 'undefined') {
				if (type !== 'string' && type !== 'number') {
					throw new Error('DefaultValue should be a string or a number');
				}
			} else {
				if (typeof props.placeholder === 'undefined') {
					throw new Error('Either defaultValue or placeholder should be specified');
				}
			}
		},
		value: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]),
		theme: PropTypes.shape({
			...SELECTBOX_THEME,
			container: PropTypes.string,
			container_isDisabled: PropTypes.string,
			input: PropTypes.string,
			selectbox: PropTypes.string,
		}),
		Selectbox: PropTypes.func,
		Input: PropTypes.func,
	}

	static defaultProps = {
		Selectbox,
		Input,
		Anchor: ComboboxAnchor
	};

	state = {
		value: (void 0), //eslint-disable-line no-void,
		selectboxValue: (void 0) //eslint-disable-line no-void,
	}

	constructor(...args) {
		super(...args);
		const {defaultValue, children, value} = this.props;

		let stateValue;

		if (typeof value !== 'undefined') {
			stateValue = value;
		} else if (typeof defaultValue !== 'undefined') {
			stateValue = defaultValue;
		}

		if (stateValue) {
			const valueChild = React.Children.toArray(children).find(child => child.props.value === stateValue);

			this.state = {
				value: stateValue
			};

			if (valueChild) {
				this.state = {
					...this.state,
					value: valueChild.props.children,
					selectboxValue: valueChild.props.value
				};
			}
		}
	}

	componentWillReceiveProps(newProps) {
		const {defaultValue} = newProps;
		const children = React.Children.toArray(newProps.children);

		const newPropsContainNewValue = typeof newProps.value !== 'undefined';

		if (newPropsContainNewValue) {
			const child = children.find(child => child.props.value === newProps.value);
			this.setState({
				value: (child && child.props.children) || newProps.value,
				selectboxValue: child && child.props.value
			});
		} else {
			const previousValueIsReset = typeof this.props.value !== 'undefined' && !newPropsContainNewValue;
			const currentValue = this.state.value;

			if (previousValueIsReset) {
				this.setState({
					value: (void 0), //eslint-disable-line no-void
					selectboxValue: (void 0) //eslint-disable-line no-void
				});
			}

			const hasCurrentValue = typeof currentValue !== 'undefined' && currentValue !== '';
			const newPropsContainNewDefaultValue = typeof newProps.defaultValue !== 'undefined';

			const shouldSetNewDefaultValue =
				(previousValueIsReset || !hasCurrentValue) &&
				newPropsContainNewDefaultValue;

			if (shouldSetNewDefaultValue) {
				const defaultChild = children.find(child => child.props.value === defaultValue);
				this.setState({
					value: (defaultChild && defaultChild.props.children) || defaultValue,
					selectboxValue: defaultChild && defaultChild.props.value
				});
			}
		}
	}

	render() {
		const {
			placeholder,
			theme,
			isDisabled,
			Selectbox,
			Input,

			//selectboxProps
			caretIconName,
			selectedItemIconName,
			children,
			Anchor
		} = this.props;

		const {value, selectboxValue} = this.state;

		const {
			container: themeContainer,
			container_isDisabled: themeContainerIsDisabled,
			input: themeInput,
			selectbox: themeSelectbox,
			...selectboxTheme
		} = theme;

		const className = classnames(themeContainer, {
			[themeContainerIsDisabled]: isDisabled
		});

		const inputTheme = {
			container: themeInput
		};

		return (
			<div className={className}>
				<div className={themeSelectbox}>
					<Selectbox value={selectboxValue}
					           placeholder=""
					           caretIconName={caretIconName}
					           isDisabled={isDisabled}
					           theme={selectboxTheme}
					           AnchorComponent={Anchor}
					           selectedItemIconName={selectedItemIconName}
					           onChange={this.onChangeSelectbox}>
						{children}
					</Selectbox>
				</div>
				<Input type="text"
				       value={value || ''}
				       onChange={this.onChange}
				       onBlur={this.onBlur}
				       disabled={isDisabled}
				       placeholder={placeholder}
				       theme={inputTheme}/>
			</div>
		);
	}

	onChangeSelectbox = (value, text) => {
		const {onChange} = this.props;

		this.setState({
			selectboxValue: value,
			value: text
		});
		onChange && onChange(value);
	}

	onChange = (event) => {
		const {onChange} = this.props;
		const {value} = event.target;
		this.setState({
			value,
			selectboxValue: (void 0) //eslint-disable-line no-void,
		});
		onChange && onChange(value);
	}

	onBlur = (event) => {
		const {value} = event.target;
		const {onChange} = this.props;

		if (this.state.value !== value) {
			this.setState({
				value,
				selectboxValue: (void 0), //eslint-disable-line no-void,
			});
			onChange && onChange(value);
		}
	}

}