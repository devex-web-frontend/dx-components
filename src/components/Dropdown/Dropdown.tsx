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

export const DROPDOWN = Symbol('Dropdown');

type TAnchorProps = WithInnerRef<{
	onClick: MouseEventHandler<Element>,
	children: ReactNode
}>;

export type TFullDropdownProps = {
	Anchor: ComponentType<TAnchorProps>
	Popover: ComponentType<TPopoverProps>,
	theme: {
		Popover?: TPopoverProps['theme']
	}
};

type TDropdownState = {
	isOpened: boolean
};

@PURE
class RawDropdown extends Component<TFullDropdownProps, TDropdownState> {
	static defaultProps = {
		Popover
	};

	state = {
		isOpened: false
	};

	private anchorRef: ReactRef;

	render() {
		const { Anchor, Popover, children, theme } = this.props;
		const { isOpened } = this.state;

		return (
			<Anchor onClick={this.onAnchorClick}
			        innerRef={this.innerRef}>
				<Popover isOpened={isOpened}
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
		this.setState({
			isOpened: !this.state.isOpened
		});
	}

	private onPopoverRequestClose = () => {
		this.setState({
			isOpened: false
		});
	}
}

export type TDropdownProps = ObjectClean<PartialKeys<TFullDropdownProps, 'theme' | 'Popover'>>;
export const Dropdown: ComponentClass<TDropdownProps> = withTheme(DROPDOWN)(RawDropdown);