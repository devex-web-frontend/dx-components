import React from 'react';
import {themr} from 'react-css-themr';
import {PURE} from 'dx-util/src/react/pure';
import Button from '../Button/Button.jsx';
import classnames from 'classnames';

export const SELECTBOX_ANCHOR = Symbol('SelectboxAnchor');

export const ANCHOR_THEME = {
	container: React.PropTypes.string,
	text: React.PropTypes.string,
	content: React.PropTypes.string,
	content_hasCaret: React.PropTypes.string,
	caret: React.PropTypes.string,
	caret_isReversed: React.PropTypes.string
};

@PURE
@themr(SELECTBOX_ANCHOR)
export default class SelectboxAnchor extends React.Component {
	static propTypes = {
		...Button.PropTypes,
		theme: React.PropTypes.shape(ANCHOR_THEME),
		isDisabled: React.PropTypes.bool,
		isPrimary: React.PropTypes.bool,
		isOpened: React.PropTypes.bool,
		caretIconName: React.PropTypes.string,
		children: React.PropTypes.node,
		IconComponent: React.PropTypes.func,
		value: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.number
		]),
		valueText: React.PropTypes.string
	}

	render() {
		const {
			theme,
			children,
			isOpened,
			valueText,
			isDisabled,
			isPrimary,
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
						{valueText}
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