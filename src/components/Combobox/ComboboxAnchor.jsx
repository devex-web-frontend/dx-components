import React from 'react';
import Input from '../Input/Input.jsx';
import Icon from '../Icon/Icon.jsx';
import {ANCHOR_PROP_TYPES, ANCHOR_THEME} from '../Selectbox/SelectboxAnchor';
import {themr} from 'react-css-themr';
import classnames from 'classnames';
import {PURE} from 'dx-util/src/react/pure';
import iconSmallDropdownArrow from '../Selectbox/img/icon-small-dropdown-arrow.svg';

export const COMBOBOX_ANCHOR = Symbol('ComboboxAnchor');

@PURE
@themr(COMBOBOX_ANCHOR)
export default class ComboboxAnchor extends React.Component {

	static propTypes = {
		...ANCHOR_PROP_TYPES,
		onChange: React.PropTypes.func,
		theme: React.PropTypes.shape({
			...ANCHOR_THEME,
			input: React.PropTypes.string
		})
	};

	static defaultProps = {
		InputComponent: Input,
		IconComponent: Icon,
		caretIconName: iconSmallDropdownArrow
	};

	state = {
		value: (void 0), //eslint-disable-line no-void,
	}

	render() {
		const {
			value,
			placeholder,
			theme,
			children,
			isOpened,
			isDisabled,
			InputComponent: Input,
			IconComponent: Icon,
			caretIconName,
			onClick,
		} = this.props;

		const contentClassName = classnames(theme.content, {
			[theme.content_hasCaret]: !!caretIconName
		});

		let anchorCaretTheme;
		if (caretIconName) {
			anchorCaretTheme = {
				container: classnames(theme.caret,
					{
						[theme.caret_isReversed]: isOpened
					}
				)
			};
		}

		const {onChange, onBlur} = this;

		const inputProps = {
			type: 'text',
			value: this.state.value || value || '',
			disabled: isDisabled,
			theme: {
				container: theme.input
			},
			onBlur,
			onChange
		};

		if (!value && placeholder) {
			inputProps.placeholder = placeholder;
		}

		return (
			<div className={theme.container}>
				<div className={contentClassName}>
					<Input {...inputProps} />
					{caretIconName && (
						<Icon name={caretIconName} theme={anchorCaretTheme} onClick={onClick}/>
					)}
				</div>
				{children}
			</div>

		);
	}

	onChange = (event) => {
		const {value: newValue} = event.target;
		this.setState({
			value: newValue
		});
	}

	onBlur = (event) => {
		const {value} = event.target;
		const {onChange} = this.props;
		this.setState({
			value: (void 0), //eslint-disable-line no-void,
		});

		if (this.props.value !== value) {
			onChange && onChange(value);
		}
	}
}
