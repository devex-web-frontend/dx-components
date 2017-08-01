import * as React from 'react';
import { PURE } from 'dx-util/lib/react/pure';
import { Button, TButtonProps, TFullButtonProps } from '../Button/Button';
import { Icon, TIconProps } from '../Icon/Icon';
import { ComponentType } from 'react';
import { ObjectOmit } from 'typelevel-ts';

export type TFullSelectboxAnchorProps = ObjectOmit<TButtonProps, 'theme'> & {
	theme: TFullButtonProps['theme'] & {
		text?: string,
		content?: string,
		wrapperCaret?: string,
		caret?: string
	},
	isOpened?: boolean,
	caretIconName?: string,
	IconComponent: ComponentType<TIconProps>,
	value?: string | number,
	valueText?: string
};

@PURE
export class SelectboxAnchor extends React.Component<TFullSelectboxAnchorProps> {
	static defaultProps = {
		IconComponent: Icon
	};

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