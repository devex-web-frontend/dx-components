import React from 'react';
import Input from '../Input/Input.jsx';
import Icon from '../Icon/Icon.jsx';
import {themr} from 'react-css-themr';
import classnames from 'classnames';
import {PURE} from 'dx-util/src/react/pure';

export const COMBOBOX_ANCHOR = Symbol('ComboboxAnchor');

@PURE
@themr(COMBOBOX_ANCHOR)
export default class ComboboxAnchor extends React.Component {

	static propTypes = {
		theme: React.PropTypes.shape({
			container: React.PropTypes.string,
			input: React.PropTypes.string,
			content: React.PropTypes.string,
			content_hasCaret: React.PropTypes.string,
			caret: React.PropTypes.string,
			caret_isReversed: React.PropTypes.string
		}),
		caretIconName: React.PropTypes.string,
		children: React.PropTypes.node,
		isDisabled: React.PropTypes.bool,
		isOpened: React.PropTypes.bool,
		onChange: React.PropTypes.func,
		value: React.PropTypes.string,
		InputComponent: React.PropTypes.func,
		IconComponent: React.PropTypes.func,
		onClick: React.PropTypes.func
	};

	static defaultProps = {
		InputComponent: Input,
		IconComponent: Icon
	};

	state = {
		value: (void 0), //eslint-disable-line no-void,
	}

	render() {
		const {
			value,
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
			value: this.state.value || value,
			disabled: isDisabled,
			theme: {
				container: theme.input
			},
			onBlur,
			onChange
		};

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

		onChange && onChange(value);
	}
}
