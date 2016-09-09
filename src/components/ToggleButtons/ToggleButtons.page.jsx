import React, {Component} from 'react';
import Demo from '../../demo/Demo.jsx';
import ToggleButtons from './ToggleButtons.jsx';
import Button from '../Button/Button.jsx';
import css from './ToggleButtons.styl';

import {PURE} from 'dx-util/src/react/pure';
import {themr} from 'react-css-themr';

import {storiesOf} from '@kadira/storybook';
const TOGGLE_BUTTONS_PAGE = 'ToggleButtonsPage';

@PURE
@themr(TOGGLE_BUTTONS_PAGE)
class ToggleButtonsPage extends Component {
	state = {
		toggleIndex: 0
	}

	render() {
		return (
			<Demo>
				<ToggleButtons label="Labeled Toggle Buttons"
						theme={css}
						defaultIndex={1}
						onChange={this.onToggleChange}>
					<Button>Toggle 1</Button>
					<Button>Toggle 2</Button>
					<Button>Toggle 3</Button>
				</ToggleButtons>
				<ToggleButtons label="Vertical Toggle Buttons"
						theme={css}
						toggleIndex={this.state.toggleIndex}
						isVertical={true}
						onChange={this.onToggleChange}>
					<Button>Toggle 4</Button>
					<Button>Toggle 5</Button>
					<Button>Toggle 6</Button>
				</ToggleButtons>
				<ToggleButtons label="Disabled Toggle Buttons"
						theme={css}
						toggleIndex={this.state.toggleIndex}
						isDisabled={true}
						onChange={this.onToggleChange}>
					<Button>Toggle 7</Button>
					<Button>Toggle 8</Button>
					<Button>Toggle 9</Button>
				</ToggleButtons>
				<ToggleButtons label=" Buttons"
						theme={css}
						toggleIndex={this.state.toggleIndex}
						onChange={this.onToggleChange}>
					<Button>Toggle 10</Button>
					<Button>Toggle 11</Button>
					<Button onClick={this.onButtonClick}>Toggle 12</Button>
				</ToggleButtons>
			</Demo>
		);
	}

	onToggleChange = (i) => {
		this.setState({
			toggleIndex: i
		});
	}

	onButtonClick = e => {
		console.log('clicked');
	}
}

storiesOf('Toggle Buttons', module).add('default', () => <ToggleButtonsPage/>);