import React from 'react';
import { themr } from 'react-css-themr';
import { SelectboxAnchor } from './SelectboxAnchor';
import Popover from '../Popover/Popover.jsx';
import { Menu } from '../Menu/Menu.tsx';
import { PURE } from 'dx-util/lib/react/pure';
import { Icon } from '../Icon/Icon.tsx';
import classnames from 'classnames';
import * as PropTypes from 'prop-types';

export const SELECTBOX_THEME = {
	container__popover: PropTypes.string,
	container__menu: PropTypes.string,
	container__menu_hasSelectedItem: PropTypes.string,
	container__item: PropTypes.string,
	container__item_isActive: PropTypes.string,
	container__item__text: PropTypes.string,
	container__item__activeIcon: PropTypes.string,
	container__anchor: PropTypes.string,
	container__anchor__content: PropTypes.string,
	container__anchor__text: PropTypes.string,
	container__anchor__content_hasCaret: PropTypes.string,
	container__anchor__wrapperCaret: PropTypes.string,
	container__anchor__caret: PropTypes.string,
	container__anchor__caret_isReversed: PropTypes.string
};

export const SELECTBOX = Symbol('Selectbox');

@PURE
@themr(SELECTBOX)
export default class Selectbox extends React.Component {
	static propTypes = {
		children: PropTypes.node,
		isDisabled: PropTypes.bool,
		isLoading: PropTypes.bool,
		value(props) {
			const type = typeof props.value;
			if (type !== 'undefined') {
				if (type !== 'string' && type !== 'number') {
					throw new Error('Value should be a string or a number');
				} else {
					if (!React.Children.toArray(props.children).find(child => child.props.value === props.value)) {
						throw new Error('Value should be in passed children');
					}
				}
			}
		},
		onChange: PropTypes.func,
		placeholder: PropTypes.string,
		//C'MON LET'S DO IT VIA DI!
		AnchorComponent: PropTypes.func,
		IconComponent: PropTypes.func,
		MenuComponent: PropTypes.func,
		PopoverComponent: PropTypes.func,

		theme: PropTypes.shape(SELECTBOX_THEME),
		caretIconName: PropTypes.string,
		selectedItemIconName: PropTypes.string
	}

	static defaultProps = {
		AnchorComponent: SelectboxAnchor,
		IconComponent: Icon,
		MenuComponent: Menu,
		PopoverComponent: Popover,
		popoverTheme: {},
		menuTheme: {}
	}

	state = {
		isOpened: false
	}

	_anchor;

	render() {
		const {
			AnchorComponent: Anchor,
			PopoverComponent: Popover,
			MenuComponent: Menu,
			placeholder,
			children,
			caretIconName,
			theme,
			value,
			selectedItemIconName,
			isDisabled,
			isLoading
		} = this.props;

		const menuTheme = {
			container: classnames(
				theme.container__menu,
				{
					[theme.container__menu_hasSelectedItem]: (
						selectedItemIconName &&
						typeof this.props.value !== 'undefined'
					)
				}
			)
		};

		const anchorTheme = {
			container: theme.container__anchor,
			text: theme.container__anchor__text,
			content: classnames(
				theme.container__anchor__content,
				{
					[theme.container__anchor__content_hasCaret]: !!caretIconName
				}
			)
		};

		if (caretIconName) {
			anchorTheme.caret = classnames(theme.container__anchor__caret, {
				[theme.container__anchor__caret_isReversed]: this.state.isOpened
			});
			anchorTheme.wrapperCaret = theme.container__anchor__wrapperCaret;
		}

		const popoverTheme = {
			container: classnames(theme.container__popover),
		};

		let valueText = placeholder;
		if (typeof value !== 'undefined') {
			const valueChild = React.Children.toArray(children).find(child => child.props.value === value);
			//existance is checked in prop types
			valueText = valueChild.props.text || valueChild.props.children;
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
						{React.Children.map(children, ::this.wrapItem)}
					</Menu>
				</Popover>
			</Anchor>
		);
	}

	wrapItem(child) {
		const { theme, selectedItemIconName } = this.props;
		const { value } = child.props;
		const isActive = typeof value !== 'undefined' && value === this.props.value;

		const iconTheme = {
			container: theme.container__item__activeIcon
		};
		return React.cloneElement(child, {
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
	}

	onAnchorClick = e => {
		this.setState({
			isOpened: !this.state.isOpened
		});
	}

	onItemSelect = (value, text) => {
		this.setState({
			isOpened: false
		});
		this.props.onChange && this.props.onChange(value, text);
	}

	onPopoverRequestClose = () => {
		this.setState({
			isOpened: false
		});
	}
}