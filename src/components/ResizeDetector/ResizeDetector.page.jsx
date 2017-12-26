import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { ResizeDetector } from './ResizeDetector.tsx';
import Demo from '../../demo/Demo';

storiesOf('ResizeDetector', module).add('default', () => (
	<Demo>
		Resize current window to log events in Action Logger below
		<ResizeDetector onResize={action('resized')} />
	</Demo>
));