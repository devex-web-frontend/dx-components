import Demo from '../../demo/Demo.jsx';
import Button from './Button.jsx';
import React from 'react';

import {storiesOf} from '@kadira/storybook';
storiesOf('Button', module)
	.add('Default', () => (
		<Demo>
			<Button>Default</Button>
			<Button isDisabled={true}>Disabled</Button>
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
	));