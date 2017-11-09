import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Holdable } from './Holdable.tsx';
import { Button } from '../Button/Button.tsx';
import Demo from '../../demo/Demo.jsx';

class HoldableDemo extends React.Component {
	state = {
		value: 0,
	}

	render() {
		return (
			<Demo>
				<Holdable onHold={this.onIncrementValue}>
					<Button onClick={this.onIncrementValue}>{`Click and hold: ${this.state.value}`}</Button>
				</Holdable>
			</Demo>
		);
	}

	onIncrementValue = () => {
		this.setState({
			value: this.state.value + 1,
		});
	}
}

storiesOf('Holdable', module).add('default', () => (
	<HoldableDemo />
));
