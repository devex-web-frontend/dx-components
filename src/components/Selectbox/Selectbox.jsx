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
		defaultValue(props) {
			const {defaultValue, children} = props;
			const type = typeof defaultValue;
			if (type !== 'undefined') {
				if (type !== 'string' && type !== 'number') {
					throw new Error('DefaultValue should be a string or a number');
				} else {
					//default value is set - check children
					const selectedChild = React.Children.toArray(children)
						.find(child => child.props.value === defaultValue);
					if (!selectedChild) {
						throw new Error('DefaultValue should be in passed children');
					}
				}
			} else {
				if (typeof props.placeholder === 'undefined') {
					throw new Error('Either defaultValue or placeholder should be specified');
				}
			}
		},
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

	_anchor;

	constructor(...args) {
		super(...args);
		const {defaultValue, children, value} = this.props;

		this.state = {
			isOpened: false
		};
		if (typeof value !== 'undefined') {
			//set passed value (existance is checked in prop types)
			const valueChild = React.Children.toArray(children).find(child => child.props.value === value);
			this.state = {
				...this.state,
				selectedValue: value,
				selectedValueText: valueChild.props.text || valueChild.props.children
			};
		} else if (typeof defaultValue !== 'undefined') {
			//set default value if present (existance is checked in prop types)
			const defaultChild = React.Children.toArray(children).find(child => child.props.value === defaultValue);
			this.state = {
				...this.state,
				selectedValue: defaultValue,
				selectedValueText: defaultChild.props.text || defaultChild.props.children
			};
		}
	}

	componentWillReceiveProps(newProps) {
		const {defaultValue} = newProps;
		const children = React.Children.toArray(newProps.children);

		//new props contain new value that should be set (existance is checked in prop types)
		const newPropsContainNewValue = typeof newProps.value !== 'undefined';
		if (newPropsContainNewValue) {
			//selectbox is controlled so we should set the value
			const child = children.find(child => child.props.value === newProps.value);
			this.setState({
				selectedValue: newProps.value,
				selectedValueText: child.props.text || child.props.children
			});

			//new value in props differs from the previous one - needed to hide opened selectbox
			const newValueDiffersFromPrevious = newProps.value !== this.props.value;
			if (newValueDiffersFromPrevious) {
				this.setState({
					isOpened: false
				});
			}
		} else {
			//there's no new value but previous persists - should reset state if hasSelected
			const previousValueIsReset = typeof this.props.value !== 'undefined' && !newPropsContainNewValue;
			if (previousValueIsReset) {
				//reset current selected
				this.setState({
					selectedValue: (void 0), //eslint-disable-line no-void
					selectedValueText: (void 0) //eslint-disable-line no-void
				});
			}

			//selectbox is touched and has selected value
			const hasCurrentSelectedValue = typeof this.state.selectedValue !== 'undefined';

			//currently selected value is missed in new children
			const newChildrenMissCurrentSelectedValue =
				hasCurrentSelectedValue && !children.find(c => c.props.value === this.state.selectedValue);

			//new props contain new default value (existance is checked in prop types)
			const newPropsContainNewDefaultValue = typeof newProps.defaultValue !== 'undefined';

			//we need to set defaultValue and it is contained in new props
			const shouldSetNewDefaultValue =
				(previousValueIsReset || !hasCurrentSelectedValue || newChildrenMissCurrentSelectedValue) &&
				newPropsContainNewDefaultValue;

			if (shouldSetNewDefaultValue) {
				//try to set default (again existance is checked in prop types)
				const defaultChild = children.find(child => child.props.value === defaultValue);
				this.setState({
					selectedValue: defaultValue,
					selectedValueText: defaultChild.props.text || defaultChild.props.children
				});
			}
		}

		//NOTE: placeholder is chosen in render method if nothing is selected and there's no default value

		if (this.state.isOpened && newProps.isDisabled) {
			this.setState({
				isOpened: false
			});
		}
	}

	render() {
		const {
			AnchorComponent: Anchor,
			PopoverComponent: Popover,
			MenuComponent: Menu,
			placeholder,
			children,
			caretIconName,
			theme,
			selectedItemIconName,
			isDisabled
		} = this.props;

		const menuTheme = {
			container: classnames(
				theme.container__menu,
				{
					[theme.container__menu_hasSelectedItem]: (
						selectedItemIconName &&
						typeof this.state.selectedValue !== 'undefined'
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

		return (
			<Anchor ref={el => this._anchor = el}
			        isDisabled={isDisabled}
			        theme={anchorTheme}
			        caretIconName={caretIconName}
			        isOpened={this.state.isOpened}
			        value={this.state.selectedValue}
			        valueText={this.state.selectedValueText || placeholder}
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
		const {selectedValue} = this.state;
		const isActive = typeof value !== 'undefined' && value === selectedValue;

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
		//now we should sheck if selectbox is not controlled
		//if so we can update the state and call onChange
		//otherwise just call onChange
		if (typeof this.props.value === 'undefined') {
			this.setState({
				isOpened: false,
				selectedValue: value,
				selectedValueText: text
			});
		}
		this.props.onChange && this.props.onChange(value, text);
	}

	onPopoverRequestClose = () => {
		this.setState({
			isOpened: false
		});
	}
}