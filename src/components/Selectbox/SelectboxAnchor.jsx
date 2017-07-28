import React from 'react';
import {PURE} from 'dx-util/lib/react/pure';
import {Button} from '../Button/Button';
import {Icon} from '../Icon/Icon.tsx';
import * as PropTypes from 'prop-types';

export const ANCHOR_THEME = {
	container: PropTypes.string,
	text: PropTypes.string,
	content: PropTypes.string,
	wrapperCaret: PropTypes.string,
	caret: PropTypes.string
};

export const ANCHOR_SHARE_PROP_TYPES = {
	theme: PropTypes.shape(ANCHOR_THEME),
	isOpened: PropTypes.bool,
	caretIconName: PropTypes.string,
	children: PropTypes.node,
	IconComponent: PropTypes.func,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	valueText: PropTypes.string
};

@PURE
export default class SelectboxAnchor extends React.Component {
	static propTypes = {
		...Button.propTypes,
		...ANCHOR_SHARE_PROP_TYPES
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
			isLoading,
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
			<Button onClick={onClick}
			        isDisabled={isDisabled}
			        isLoading={isLoading}
			        isPrimary={isPrimary}
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