import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Demo from '../../demo/Demo';
import { Highlight } from './Highlight.tsx';

storiesOf('Highlight', module).add('Default', () => (
	<Demo>
		<div>
			<Highlight search="test">
				test/test2 fdgkjdklfj dfgs test sdkfjksdfksaratestjfkdsjl
			</Highlight>
		</div>

		<div>
			<Highlight>
				test/test2 fdgkjdklfj dfgs test sdkfjksdfksaratestjfkdsjl
			</Highlight>
		</div>

		<div>
			<Highlight search="with spaces">
				search="with spaces"
			</Highlight>
		</div>
	</Demo>
));