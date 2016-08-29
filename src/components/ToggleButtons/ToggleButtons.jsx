import React, {Component, PropTypes, Children} from 'react';

import {themr} from 'react-css-themr';
import {PURE} from 'dx-util/src/react/pure';

import ToggleButton from './ToggleButton/ToggleButton';

import cssToggleButton from './ToggleButton/ToggleButton.styl';

export const TOGGLE_BUTTONS = Symbol('ToggleButtons');

@PURE
@themr(TOGGLE_BUTTONS)

export default class ToggleButtons extends Component {
	static propTypes = {
		label: PropTypes.string,
		buttons: PropTypes.arrayOf(React.PropTypes.object),
		activeIndex: PropTypes.number,
		isVertical: PropTypes.bool,
		theme: React.PropTypes.object
	}

	constructor(props, context) {
		super(props, context);
		this.state = {
			activeIndex: this.props.activeIndex
		};
	}

	render() {
		const {theme, isVertical} = this.props;
		return (
			<div className={theme.container}>
				{this.props.label && <span className={theme.container_label}>{this.props.label}</span>}
				<span>
					{this.props.buttons && this.props.buttons.map((button, i) => {
						return (
							<ToggleButton {...button}
									onClick={this.onButtonClick(i, button)}
									isActive={this.state.activeIndex === i}
									key={i}
									isVertical={isVertical}
									theme={cssToggleButton}/>
						);
					})}
				</span>
			</div>
		);
	}

	onButtonClick = (i, button) => (e) => {
		this.setState({
			activeIndex: i
		});
		button.onClick && button.onClick(i, button);
	}
}