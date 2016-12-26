import Demo from '../../demo/Demo.jsx';
import Button from './Button.jsx';
import React from 'react';

const demoStyle = {
	fontWeight: 'bold',
	color: 'blue'
};

import {storiesOf} from '@kadira/storybook';
storiesOf('Button', module)
	.add('Default', () => (
		<Demo>
			<Button>Default</Button>
			<Button isDisabled={true}>Disabled</Button>
			<Button style={demoStyle}>Styled</Button>
		</Demo>
	))
	.add('Primary', () => (
		<Demo>
			<Button isPrimary={true}>Primary</Button>
			<Button isPrimary={true} isDisabled={true}>Disabled</Button>
		</Demo>
	))
	.add('Flat', () => (
		<Demo>
			<Button isFlat={true}>Flat</Button>
			<Button isFlat={true} isDisabled={true}>Flat Disabled</Button>
			<Button isPrimary={true} isFlat={true}>Primary Flat</Button>
			<Button isPrimary={true} isFlat={true} isDisabled={true}>Primary Flat Disabled</Button>
		</Demo>
	))
	.add('Loading', () => (
		<Demo>
			<Button isLoading={true}>Loading</Button>
			<Button isDisabled={true} isLoading={true}>Loading Disabled</Button>
			<Button isFlat={true} isLoading={true}>Loading Flat</Button>
			<Button isFlat={true} isLoading={true} isDisabled={true}>Loading Flat Disabled</Button>
		</Demo>
	));