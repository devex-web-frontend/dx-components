import * as React from 'react';
import { PURE } from 'dx-util/lib/react/pure';
import { Button, TButtonProps, TFullButtonProps } from '../Button/Button';
import { Icon, TIconProps } from '../Icon/Icon';
import { ComponentClass, ComponentType } from 'react';
import { ObjectClean, ObjectOmit } from 'typelevel-ts';
import { PartialKeys } from 'dx-util/lib/object/object';

export type TFullSelectboxAnchorProps = ObjectOmit<TButtonProps, 'theme'> & {
	theme: TFullButtonProps['theme'] & {
		text?: string,
		content?: string,
		wrapperCaret?: string,
		caret?: string
	},
	isOpened?: boolean,
	caretIconName?: string,
	Icon: ComponentType<TIconProps>,
	value?: string | number,
	valueText?: string
};

@PURE
class RawSelectboxAnchor extends React.Component<TFullSelectboxAnchorProps> {
	static defaultProps = {
		Icon
	};

	render() {
		const {
			theme,
			children,
			valueText,
			isDisabled,
			isPrimary,
			isLoading,
			Icon,
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

export type TSelectboxAnchorProps = ObjectClean<PartialKeys<TFullSelectboxAnchorProps, 'theme' | 'Icon'>>;
export const SelectboxAnchor: ComponentClass<TSelectboxAnchorProps> = RawSelectboxAnchor;