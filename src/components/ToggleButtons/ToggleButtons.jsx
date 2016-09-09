import React, {Component, PropTypes, Children} from 'react';
import {PURE} from 'dx-util/src/react/pure';
import classnames from 'classnames';
import {themr} from 'react-css-themr';

import Button from '../Button/Button.jsx';

export const TOGGLE_BUTTON_SHAPE_OBJECT = {
	container: PropTypes.string,
	container_active: PropTypes.string,
	container_vertical: PropTypes.string
};

export const TOGGLE_BUTTONS = Symbol('ToggleButtons');

@PURE
@themr(TOGGLE_BUTTONS)

export default class ToggleButtons extends Component {
	static propTypes = {
		children: PropTypes.node,
		label: PropTypes.string,
		isDisabled: PropTypes.bool,
		isVertical: PropTypes.bool,
		toggleIndex: PropTypes.number,
		defaultIndex: PropTypes.number,
		onChange: PropTypes.func,
		toggleComponent: PropTypes.func,
		toggleButtonTheme: PropTypes.shape(TOGGLE_BUTTON_SHAPE_OBJECT),
		theme: PropTypes.shape({
			container: PropTypes.string,
			container__label: PropTypes.string,
			container__vertical: PropTypes.string,
			container__buttons: PropTypes.string,
			container__buttons__active: PropTypes.string,
			container__buttons__vertical: PropTypes.string
		})
	}

	static defaultProps = {
		toggleButtonTheme: {},
		toggleComponent: Button
	}

	constructor(...args) {
		super(...args);
		const {children} = this.props;

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
		const {children, theme, isDisabled} = this.props;
		return (
			<div>
				{this.props.label && <span className={theme.container__label}>{this.props.label}</span>}
				<span>
					{React.Children.map(children, ::this.renderToggleButton)}
				</span>
			</div>
		);
	}

	renderToggleButton(child, i) {
		const {
			theme,
			isVertical,
			isDisabled
		} = this.props;
		const isActive = i === this.state.toggleIndex;

		const ToggleButtonTheme = {
			container: classnames(theme.container__buttons,
				{
					[theme.container__buttons__active]: isActive,
					[theme.container__buttons__vertical]: isVertical
				})
		};

		return React.cloneElement(child, {
			isActive,
			isDisabled,
			onClick: this.onToggleSelect(i, child.props.onClick),
			theme: ToggleButtonTheme
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