import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import ResizeDetector from './ResizeDetector';
import Demo from '../../demo/Demo';

storiesOf('ResizeDetector', module).add('default', () => (
	<Demo>
		<ResizeDetector onResize={action('resized')}/>
	</Demo>
));