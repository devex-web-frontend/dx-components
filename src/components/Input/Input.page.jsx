import React from 'react';
import Demo from '../../demo/Demo.jsx';

import Input from './Input.jsx';
import {storiesOf} from '@kadira/storybook';

storiesOf('Input', module)
	.add('Default', () => (
		<Demo>
			<Input value="Test Value"/>
		</Demo>
	)).add('Disabled', () => {
		return (
			<Demo>
				<Input value="Test Value" isDisabled={true} />
			</Demo>
		);
	});