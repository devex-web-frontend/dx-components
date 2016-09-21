import React from 'react';
import Icon from '../Icon/Icon'
import {themr} from 'react-css-themr';
import {PURE} from 'dx-util/src/react/pure';
import Button from '../Button/Button.jsx';
import classnames from 'classnames';
import iconSmallDropdownArrow from './img/icon-small-dropdown-arrow.svg';

export const SELECTBOX_ANCHOR = Symbol('SelectboxAnchor');

export const ANCHOR_PROP_TYPES = {
	isDisabled: React.PropTypes.bool,
	isOpened: React.PropTypes.bool,
	placeolder: React.PropTypes.string,
	value: React.PropTypes.string,
	IconComponent: React.PropTypes.func,
	caretIconName: React.PropTypes.string,
	children: React.PropTypes.node,
	onClick: React.PropTypes.func
};

@PURE
@themr(SELECTBOX_ANCHOR)
export default class SelectboxAnchor extends React.Component {
	static propTypes = {
		...Button.PropTypes,
		...ANCHOR_PROP_TYPES,
		isPrimary: React.PropTypes.bool,
		theme: React.PropTypes.shape({
			container: React.PropTypes.string,
			text: React.PropTypes.string,
			content: React.PropTypes.string,
			content_hasCaret: React.PropTypes.string,
			caret: React.PropTypes.string,
			caret_isReversed: React.PropTypes.string
		}),
	}

	static defaultProps = {
		IconComponent: Icon,
		caretIconName: iconSmallDropdownArrow
	}

	render() {
		const {
			value,
			theme,
			children,
			isOpened,
			isDisabled,
			isPrimary,
			placeholder,
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

		const buttonProps = {
			onClick,
			isDisabled,
			isPrimary,
			theme: {
				container: theme.container
			}
		};

		return (
			<Button {...buttonProps}>
				<div className={contentClassName}>
					<div className={theme.text}>
						{value || placeholder}
					</div>
					{caretIconName && (
						<Icon name={caretIconName} theme={anchorCaretTheme}/>
					)}
				</div>
				{children}
			</Button>
		);
	}
}