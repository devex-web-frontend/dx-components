import React, {Component, PropTypes, Children} from 'react';
import {PURE} from 'dx-util/src/react/pure';
import classnames from 'classnames';
import {themr} from 'react-css-themr';

export const TOGGLE_BUTTONS = Symbol('ToggleButtons');

@PURE
@themr(TOGGLE_BUTTONS)

export default class ToggleButtons extends Component {
	static propTypes = {
		children: PropTypes.node,
		isDisabled: PropTypes.bool,
		isVertical: PropTypes.bool,
		toggleIndex: PropTypes.number,
		defaultIndex: PropTypes.number,
		onChange: PropTypes.func,
		theme: PropTypes.shape({
			container: PropTypes.string,
			//container__wrapper: PropTypes.string,
			//container__vertical: PropTypes.string,
			//container__item: PropTypes.string
		})
	}

	constructor(...args) {
		super(...args);

		this.state = {};

		if (typeof this.props.toggleIndex !== 'undefined') {
			//set passed value (existance is checked in prop types)
			this.state = {
				...this.state,
				toggleIndex: this.props.toggleIndex,
			};
		} else {
			this.state = {
				...this.state,
				toggleIndex: this.props.defaultIndex,
			};
		}
	}

	componentWillReceiveProps(newProps) {
		if (typeof newProps.toggleIndex !== 'undefined') {
			this.setState({
				toggleIndex: newProps.toggleIndex
			});
		}
	}

	render() {
		const {children, theme} = this.props;
		return (
			<div className={theme.container__wrapper}>
				{React.Children.map(children, ::this.renderToggleItem)}
			</div>
		);
	}

	renderToggleItem(child, i) {
		if (!child.props) {
			return child;
		}

		const {
				theme,
				isVertical,
				isDisabled
		} = this.props;
		const isActive = i === this.state.toggleIndex;

		const toggleButtonTheme = {
			container: classnames(theme.container__item,
				{
					[theme.container__item__active]: isActive,
					[theme.container__vertical]: isVertical
				})
		};

		return React.cloneElement(child, {
			isActive,
			isDisabled,
			onClick: this.onToggleSelect(i, child.props.onClick),
			theme: toggleButtonTheme
		});
	}

	onToggleSelect = (toggleIndex, childClickHandler) => e => {
		if (typeof this.props.toggleIndex === 'undefined') {
			this.setState({
				toggleIndex
			});
		}
		childClickHandler && childClickHandler();
		this.props.onChange && this.props.onChange(toggleIndex);
	}
}