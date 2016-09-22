import React from 'react';
import {themr} from 'react-css-themr';
import Input from '../Input/Input';
import Selectbox from '../Selectbox/Selectbox.jsx';
import SelectboxAnchor from '../Selectbox/SelectboxAnchor';
import {PURE} from 'dx-util/src/react/pure';

export const COMBOBOX = Symbol('Combobox');

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
			container: React.PropTypes.string,
			input: React.PropTypes.string,
			selectbox: React.PropTypes.string,
			anchor: React.PropTypes.string,
			anchor__content_hasCaret: React.PropTypes.string,
			anchor__caret: React.PropTypes.string
		}),
		SelectboxComponent: React.PropTypes.func,
		AnchorComponent: React.PropTypes.func,
		InputComponent: React.PropTypes.func,
	}

	static defaultProps = {
		SelectboxComponent: Selectbox,
		InputComponent: Input,
		AnchorComponent: SelectboxAnchor,
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
			if (previousValueIsReset) {
				//reset current selected
				this.setState({
					value: (void 0), //eslint-disable-line no-void
					selectboxValue: (void 0) //eslint-disable-line no-void
				});

				const hasCurrentValue = typeof this.state.value !== 'undefined';

				const newChildrenMissCurrentValue =
					hasCurrentValue && !children.find(c => c.props.value === this.state.value);

				const newPropsContainNewDefaultValue = typeof newProps.defaultValue !== 'undefined';

				const shouldSetNewDefaultValue =
					(previousValueIsReset || !hasCurrentValue || newChildrenMissCurrentValue) &&
					newPropsContainNewDefaultValue;

				if (shouldSetNewDefaultValue) {
					console.log('test');
					/*//try to set default (again existance is checked in prop types)
					const defaultChild = children.find(child => child.props.value === defaultValue);
					this.setState({
						selectedValue: defaultValue,
						selectedValueText: defaultChild.props.text || defaultChild.props.children
					});*/
				}

			}
		}
	}

	render() {
		const {
			theme,
			defaultValue,
			placeholder,
			InputComponent: Input,
			SelectboxComponent: Selectbox,
			...props
		} = this.props;

		const {value, selectboxValue} = this.state;

		const inputProps = {
			type: 'text',
			value: value || '',
			onChange: this.onChange,
			onBlur: this.onBlur,
			theme: {
				container: theme.input
			}
		};

		if (!value && placeholder) {
			inputProps.placeholder = placeholder;
		}

		const selectboxProps = {
			...props,
			value: selectboxValue || defaultValue,
			placeholder,
			onChange: this.onChangeSelectbox,
			theme: {
				anchor: theme.anchor,
				anchor__content_hasCaret: theme.anchor__content_hasCaret,
				anchor__caret: theme.anchor__caret
			}
		};

		return (
			<div className={theme.container}>
				<div className={theme.selectbox}>
					<Selectbox {...selectboxProps} />
				</div>
				<Input {...inputProps}/>
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