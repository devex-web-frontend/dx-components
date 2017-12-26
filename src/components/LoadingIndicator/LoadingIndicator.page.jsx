import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Demo from '../../demo/Demo';
import {LoadingIndicator} from './LoadingIndicator';

storiesOf('LoadingIndicator', module).add('default', () => (
	<Demo>
		<LoadingIndicator/>
	</Demo>
));