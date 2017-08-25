import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {ResizeDetector} from './ResizeDetector';
import Demo from '../../demo/Demo';

storiesOf('ResizeDetector', module).add('default', () => (
	<Demo>
		<div>Resize current window to log events in Action Logger below</div>
		<ResizeDetector onResize={action('resized')}/>
	</Demo>
));