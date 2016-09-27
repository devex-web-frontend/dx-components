import React from 'react';
import {PURE} from 'dx-util/src/react/pure';
import Button from '../Button/Button.jsx';
import Icon from '../Icon/Icon.jsx';

export const ANCHOR_THEME = {
	container: React.PropTypes.string,
	text: React.PropTypes.string,
	content: React.PropTypes.string,
	caret: React.PropTypes.string
};

@PURE
export default class SelectboxAnchor extends React.Component {
	static propTypes = {
		...Button.propTypes,
		theme: React.PropTypes.shape(ANCHOR_THEME),
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

	static defaultProps = {
		IconComponent: Icon
	}

	render() {
		const {
			theme,
			children,
			valueText,
			isDisabled,
			isPrimary,
			IconComponent: Icon,
			caretIconName,
			onClick,
		} = this.props;

		const buttonTheme = {
			container: theme.container
		};

		const anchorCaretTheme = {
			container: theme.caret
		};

		return (
			<Button onClick={onClick} isDisabled={isDisabled} isPrimary={isPrimary}
			        theme={buttonTheme}>
				<div className={theme.content}>
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