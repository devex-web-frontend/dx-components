import React from 'react';
import {themr} from 'react-css-themr';
import Input from '../Input/Input';
import Icon from '../Icon/Icon.jsx';
import Selectbox, {SELECTBOX_THEME} from '../Selectbox/Selectbox.jsx';
import {ANCHOR_SHARE_PROP_TYPES} from '../Selectbox/SelectboxAnchor';
import {PURE} from 'dx-util/src/react/pure';
import classnames from 'classnames';

export const COMBOBOX = Symbol('Combobox');

class ComboboxAnchor extends React.Component {
	static propTypes = {
		...ANCHOR_SHARE_PROP_TYPES
	};

	static defaultProps = {
		IconComponent: Icon
	}

	render() {
		const {
			theme,
			children,
			IconComponent: Icon,
			caretIconName,
			onClick,
		} = this.props;

		return (
			<div className={theme.container}>
				<div className={theme.content}>
					{caretIconName && (
						<Icon name={caretIconName} onClick={onClick} theme={{
							container: theme.caret
						}}/>
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
		children: React.PropTypes.node,
		isDisabled: React.PropTypes.bool,
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
		value: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.number
		]),
		onChange: React.PropTypes.func,
		placeholder: React.PropTypes.string,
		theme: React.PropTypes.shape({
			...SELECTBOX_THEME,
			container: React.PropTypes.string,
			container_isDisabled: React.PropTypes.string,
			input: React.PropTypes.string,
			selectbox: React.PropTypes.string,
		}),
		caretIconName: React.PropTypes.string,
		selectedItemIconName: React.PropTypes.string,
		SelectboxComponent: React.PropTypes.func,
		InputComponent: React.PropTypes.func,
	}

	static defaultProps = {
		SelectboxComponent: Selectbox,
		InputComponent: Input
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
			theme,
			placeholder,
			isDisabled,
			caretIconName,
			selectedItemIconName,
			InputComponent: Input,
			children,
			SelectboxComponent: Selectbox
		} = this.props;

		const {value, selectboxValue} = this.state;

		const className = classnames(theme.container, {
			[theme.container_isDisabled]: isDisabled
		});

		return (
			<div className={className}>
				<div className={theme.selectbox}>
					<Selectbox value={selectboxValue}
					           placeholder={placeholder || ''}
					           caretIconName={caretIconName}
					           selectedItemIconName={selectedItemIconName}
					           children={children} isDisabled={isDisabled}
					           theme={theme}
					           AnchorComponent={ComboboxAnchor}
					           onChange={this.onChangeSelectbox} />
				</div>
				<Input type="text"
				       value={value || ''}
				       onChange={this.onChange}
				       onBlur={this.onBlur}
				       disabled={isDisabled}
				       placeholder={placeholder}
				       theme={{
					       container: theme.input
				       }} />
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