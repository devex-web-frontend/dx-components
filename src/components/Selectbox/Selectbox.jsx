import React from 'react';
import {themr} from 'react-css-themr';
import SelectboxAnchor from './SelectboxAnchor.jsx';
import Popover from '../Popover/Popover.jsx';
import Menu from '../Menu/Menu.jsx';
import {PURE} from 'dx-util/src/react/pure';
import Icon from '../Icon/Icon.jsx';
import classnames from 'classnames';

export const SELECTBOX_THEME = {
	container__popover: React.PropTypes.string,
	container__menu: React.PropTypes.string,
	container__menu_hasSelectedItem: React.PropTypes.string,
	container__item: React.PropTypes.string,
	container__item_isActive: React.PropTypes.string,
	container__item__text: React.PropTypes.string,
	container__item__activeIcon: React.PropTypes.string,
	container__anchor: React.PropTypes.string,
	container__anchor__content: React.PropTypes.string,
	container__anchor__text: React.PropTypes.string,
	container__anchor__content_hasCaret: React.PropTypes.string,
	container__anchor__wrapperCaret: React.PropTypes.string,
	container__anchor__caret: React.PropTypes.string,
	container__anchor__caret_isReversed: React.PropTypes.string
};

export const SELECTBOX = Symbol('Selectbox');

@PURE
@themr(SELECTBOX)
export default class Selectbox extends React.Component {
	static propTypes = {
		children: React.PropTypes.node,
		isDisabled: React.PropTypes.bool,
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
		onChange: React.PropTypes.func,
		placeholder: React.PropTypes.string,
		//C'MON LET'S DO IT VIA DI!
		AnchorComponent: React.PropTypes.func,
		IconComponent: React.PropTypes.func,
		MenuComponent: React.PropTypes.func,
		PopoverComponent: React.PropTypes.func,

		theme: React.PropTypes.shape(SELECTBOX_THEME),
		caretIconName: React.PropTypes.string,
		selectedItemIconName: React.PropTypes.string
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
			isDisabled
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
			        theme={anchorTheme}
			        caretIconName={caretIconName}
			        isOpened={this.state.isOpened}
			        valueText={valueText}
			        onClick={this.onAnchorClick} >
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
		const {theme, selectedItemIconName} = this.props;
		const {value} = child.props;
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