import * as React from 'react';
import { PURE } from 'dx-util/lib/react/pure';
import {
	Component, ComponentClass, ComponentType, MouseEventHandler, ReactNode,
} from 'react';
import { Popover, TPopoverProps } from '../Popover/Popover';
import { ReactRef, WithInnerRef } from '../../util/react/typings';
import { withTheme } from '../../util/react/withTheme';
import { ObjectClean } from 'typelevel-ts';
import { PartialKeys } from 'dx-util/lib/object/object';
import { TControlProps } from '../Control/Control';

export const DROPDOWN = Symbol('Dropdown');

type TAnchorProps = WithInnerRef<{
	onClick: MouseEventHandler<Element>,
	children: ReactNode,
	isOpened?: boolean,
}>;

export type TFullDropdownProps = TControlProps<boolean, 'isOpened', 'onToggle'> & {
	Anchor: ComponentType<TAnchorProps>
	Popover: ComponentType<TPopoverProps>,
	theme: {
		Popover?: TPopoverProps['theme']
	},
	hasArrow?: boolean
};

@PURE
class RawDropdown extends Component<TFullDropdownProps> {
	static defaultProps = {
		Popover
	};

	private anchorRef: ReactRef;

	render() {
		const { Anchor, Popover, children, theme, hasArrow, isOpened } = this.props;

		return (
			<Anchor onClick={this.onAnchorClick}
					isOpened={isOpened}
			        innerRef={this.innerRef}>
				<Popover isOpened={isOpened}
				         hasArrow={hasArrow}
				         theme={theme.Popover}
				         onRequestClose={this.onPopoverRequestClose}
				         anchor={this.anchorRef}
				         closeOnClickAway={true}>
					{children}
				</Popover>
			</Anchor>
		);
	}

	private innerRef = (ref: ReactRef) => {
		this.anchorRef = ref;
	}

	private onAnchorClick = () => {
		this.props.onToggle(!this.props.isOpened);
	}

	private onPopoverRequestClose = () => {
		this.props.onToggle(false);
	}
}

export type TDropdownProps = ObjectClean<PartialKeys<TFullDropdownProps, 'theme' | 'Popover'>>;
export const Dropdown: ComponentClass<TDropdownProps> = withTheme(DROPDOWN)(RawDropdown);