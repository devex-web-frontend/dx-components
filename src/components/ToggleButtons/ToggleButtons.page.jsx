import React, {Component} from 'react';
import Demo from '../../demo/Demo.jsx';
import ToggleButtons from './ToggleButtons.jsx';
import Button from '../Button/Button.jsx';
import Link from '../Link/Link.jsx';
import css from './ToggleButtons.styl';

import {PURE} from 'dx-util/src/react/pure';
import {themr} from 'react-css-themr';

import {storiesOf, action} from '@kadira/storybook';
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
				<ToggleButtons theme={css}
						defaultIndex={1}
						onChange={this.onToggleChange}>
					<Link>Toggle Link 1</Link>
					<Link>Toggle Link 2</Link>
					<Link>Toggle Link 3</Link>
				</ToggleButtons>
				<ToggleButtons theme={css}
						toggleIndex={this.state.toggleIndex}
						isVertical={true}
						onChange={this.onToggleChange}>
					<Button>Toggle 4</Button>
					<Button>Toggle 5</Button>
					<Button>Toggle 6</Button>
				</ToggleButtons>
				<ToggleButtons theme={css}
						toggleIndex={this.state.toggleIndex}
						isDisabled={true}
						onChange={this.onToggleChange}>
					<Button>Toggle 7</Button>
					<Button>Toggle 8</Button>
					<Button>Toggle 9</Button>
				</ToggleButtons>
				<ToggleButtons theme={css}
						toggleIndex={this.state.toggleIndex}
						onChange={this.onToggleChange}>
					<Button onClick={action('clicked on Toggle 10')}>Toggle 10</Button>
					<Button onClick={action('clicked on Toggle 11')}>Toggle 11</Button>
					<Button onClick={action('clicked on Toggle 12')}>Toggle 12</Button>
				</ToggleButtons>
			</Demo>
		);
	}

	onToggleChange = (i) => {
		this.setState({
			toggleIndex: i
		});
	}
}

storiesOf('Toggle Buttons', module).add('default', () => <ToggleButtonsPage/>);