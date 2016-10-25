import React from 'react';
import {PURE} from 'dx-util/src/react/react';
import Button, {BUTTON_THEME} from '../Button/Button';

@PURE
export default class Day extends React.Component {
	static propTypes = {
		value: React.PropTypes.instanceOf(Date).isRequired,
		onChange: React.PropTypes.func,
		dayFormatter: React.PropTypes.func,
		isDisabled: React.PropTypes.bool,
		theme: React.PropTypes.shape(BUTTON_THEME)
	}

	renderInnerContent() {
		const {
			dayFormatter,
			value,
		} = this.props;
		return dayFormatter ? dayFormatter(value) : value;
	}

	render() {
		const {
			theme,
			isDisabled,
		} = this.props;

		return (
			<Button theme={theme}
			        onClick={this.onClick}
			        isDisabled={isDisabled}
			        isFlat={true}
			        type="button">
				{this.renderInnerContent()}
			</Button>
		);
	}

	onClick = () => {
		event.preventDefault();
		const {onChange, value} = this.props;
		onChange && onChange(value);
	}
}