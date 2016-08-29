import Demo from '../../demo/Demo.jsx';
import ToggleButtons from './ToggleButtons.jsx';
import React from 'react';

import theme from './ToggleButtons.styl';

import {storiesOf} from '@kadira/storybook';
const buttons = [
	{
		text: 'Button 1'
	},
	{
		text: 'Button 2'
	},
	{
		text: 'Button 3'
	}
];
const buttons_flat = [
	{
		text: 'Button 1',
		isFlat: true
	},
	{
		text: 'Button 2',
		isFlat: true
	},
	{
		text: 'Button 3',
		isFlat: true
	}
];
storiesOf('ToggleButtons', module)
	.add('Default', () => (
		<Demo>
			<ToggleButtons buttons={buttons}
					activeIndex={1}
					theme={theme}/>
		</Demo>
	))
	.add('Vertical', () => (
		<Demo>
			<ToggleButtons buttons={buttons}
					activeIndex={1}
					isVertical={true}
					theme={theme}/>
		</Demo>
	))
	.add('Flat', () => (
		<Demo>
			<ToggleButtons buttons={buttons_flat}
					activeIndex={1}
					theme={theme}/>
		</Demo>
	))
	.add('Flat Vertical', () => (
		<Demo>
			<ToggleButtons buttons={buttons_flat}
					isVertical={true}
					activeIndex={1}
					theme={theme}/>
		</Demo>
	))
	.add('Labeled', () => (
		<Demo>
			<ToggleButtons label="Labeled Toggler"
					buttons={buttons}
					activeIndex={1}
					theme={theme}/>
		</Demo>
	));