import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Demo from '../../demo/Demo';
import Highlight from './Highlight';

storiesOf('Highlight', module).add('Default', () => (
	<Demo>
		<Highlight search="test">
			test/test2 fdgkjdklfj dfgs test sdkfjksdfksaratestjfkdsjl
		</Highlight>
	</Demo>
));