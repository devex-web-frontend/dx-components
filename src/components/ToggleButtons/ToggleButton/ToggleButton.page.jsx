import Demo from '../../../demo/Demo.jsx';
import ToggleButton from './ToggleButton.jsx';
import React from 'react';

import css from './ToggleButton.styl';

const theme = {
	container: css.container,
	container_active: css.container_active
};

import {storiesOf} from '@kadira/storybook';
storiesOf('ToggleButton', module)
		.add('Default', () => (
			<Demo>
				<ToggleButton theme={theme} >Default</ToggleButton>
			</Demo>
		))
		.add('Active', () => (
			<Demo>
				<ToggleButton isActive={true} theme={theme}>Active</ToggleButton>
			</Demo>
		));