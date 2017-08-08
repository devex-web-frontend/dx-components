import * as React from 'react';
import { SelectboxAnchor, TFullSelectboxAnchorProps, TSelectboxAnchorProps } from './SelectboxAnchor';
import { Popover, TFullPopoverProps, TPopoverProps } from '../Popover/Popover';
import { Menu, TFullMenuProps, TMenuItemProps, TMenuProps } from '../Menu/Menu';
import { PURE } from 'dx-util/lib/react/pure';
import { Icon, TIconProps } from '../Icon/Icon';
import * as classnames from 'classnames';
import { withTheme } from '../../util/react/withTheme';
import { Component, ComponentClass, ComponentType, ReactElement, ReactText } from 'react';
import { ObjectClean } from 'typelevel-ts';
import { PartialKeys } from 'dx-util/lib/object/object';
import { TControlProps } from '../Control/Control';

export const SELECTBOX = Symbol('Selectbox');

export type TFullSelectboxProps = TControlProps<ReactText> & {
	theme: {
		container__popover?: string,
		container__popover__content?: string,
		container__menu?: string,
		container__menu_hasSelectedItem?: string,
		container__item?: string,
		container__item_isActive?: string,
		container__item__text?: string,
		container__item__activeIcon?: string,
		container__anchor?: string,
		container__anchor__content?: string,
		container__anchor__text?: string,
		container__anchor__content_hasCaret?: string,
		container__anchor__wrapperCaret?: string,
		container__anchor__caret?: string,
		container__anchor__caret_isReversed?: string
	},
	children: ReactElement<TMenuItemProps>[] | ReactElement<TMenuItemProps>,
	isDisabled?: boolean,
	isLoading?: boolean,
	placeholder?: string,

	Anchor: ComponentClass<TSelectboxAnchorProps>,
	Icon: ComponentType<TIconProps>,
	Menu: ComponentType<TMenuProps>,
	Popover: ComponentType<TPopoverProps>,

	caretIconName?: string,
	selectedItemIconName?: string
};

@PURE
class RawSelectbox extends React.Component<TFullSelectboxProps> {
	static propTypes: any = {
		value(props: TFullSelectboxProps) {
			const type = typeof props.value;
			if (type !== 'undefined') {
				if (type !== 'string' && type !== 'number') {
					throw new Error('Value should be a string or a number');
				} else {
					if (!React.Children.toArray(props.children).find(
							(child: ReactElement<TMenuItemProps>) => child.props.value === props.value)
					) {
						throw new Error('Value should be in passed children');
					}
				}
			}
		}
	};

	static defaultProps = {
		Anchor: SelectboxAnchor,
		Icon,
		Menu,
		Popover
	};

	state = {
		isOpened: false
	};

	_anchor: Component<TSelectboxAnchorProps> | null;

	render() {
		const {
			Anchor,
			Popover,
			Menu,
			placeholder,
			children,
			caretIconName,
			theme,
			value,
			selectedItemIconName,
			isDisabled,
			isLoading
		} = this.props;

		const menuTheme: TFullMenuProps['theme'] = {
			container: classnames(
				theme.container__menu,
				{
					[theme.container__menu_hasSelectedItem as string]: (
						typeof selectedItemIconName !== 'undefined' &&
						typeof this.props.value !== 'undefined'
					)
				}
			)
		};

		const anchorTheme: TFullSelectboxAnchorProps['theme'] = {
			container: theme.container__anchor,
			text: theme.container__anchor__text,
			content: classnames(
				theme.container__anchor__content,
				{
					[theme.container__anchor__content_hasCaret as string]: !!caretIconName
				}
			)
		};

		if (caretIconName) {
			anchorTheme.caret = classnames(theme.container__anchor__caret, {
				[theme.container__anchor__caret_isReversed as string]: this.state.isOpened
			});
			anchorTheme.wrapperCaret = theme.container__anchor__wrapperCaret;
		}

		const popoverTheme: TFullPopoverProps['theme'] = {
			container: classnames(theme.container__popover),
			content: theme.container__popover__content
		};

		let valueText = placeholder;
		if (typeof value !== 'undefined') {
			const valueChild = React.Children.toArray(children).find(
				(child: ReactElement<TMenuItemProps>) => child.props.value === value
			) as ReactElement<TMenuItemProps>;
			//existance is checked in prop types
			if (valueChild) {
				valueText = valueChild.props.text || valueChild.props.children as string;
			}
		}

		return (
			<Anchor ref={el => this._anchor = el}
			        isDisabled={isDisabled}
			        isLoading={isLoading}
			        theme={anchorTheme}
			        caretIconName={caretIconName}
			        isOpened={this.state.isOpened}
			        value={value}
			        valueText={valueText}
			        onClick={this.onAnchorClick}>
				<Popover isOpened={this.state.isOpened}
				         theme={popoverTheme}
				         closeOnClickAway={true}
				         onRequestClose={this.onPopoverRequestClose}
				         anchor={this._anchor}>
					<Menu onItemSelect={this.onItemSelect}
					      theme={menuTheme}>
						{React.Children.map(children, this.wrapItem)}
					</Menu>
				</Popover>
			</Anchor>
		);
	}

	wrapItem = (child: ReactElement<TMenuItemProps>) => {
		const { theme, selectedItemIconName } = this.props;
		const { value } = child.props;
		const isActive = typeof value !== 'undefined' && value === this.props.value;

		const iconTheme = {
			container: theme.container__item__activeIcon
		};
		const props: TMenuItemProps = Object.assign({}, child.props, {
			isActive,
			text: child.props.children,
			children: (
				<div className={theme.container__item}>
					<div className={theme.container__item__text}>
						{child.props.children}
					</div>
					{isActive && selectedItemIconName && (
						<Icon name={selectedItemIconName} theme={iconTheme}/>
					)}
				</div>
			)
		});
		return React.cloneElement(child, props);
	};

	onAnchorClick = () => {
		this.setState({
			isOpened: !this.state.isOpened
		});
	}

	onItemSelect = (value: string | number, text: string) => {
		this.setState({
			isOpened: false
		});
		this.props.onValueChange && this.props.onValueChange(value);
	}

	onPopoverRequestClose = () => {
		this.setState({
			isOpened: false
		});
	}
}

export type TSelectboxProps = ObjectClean<PartialKeys<TFullSelectboxProps,
	| 'theme'
	| 'Anchor'
	| 'Icon'
	| 'Menu'
	| 'Popover'>>;
export const Selectbox: ComponentClass<TSelectboxProps> = withTheme(SELECTBOX)(RawSelectbox);