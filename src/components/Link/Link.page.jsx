import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Demo from '../../demo/Demo.jsx';
import { Link } from './Link.tsx';

storiesOf('Link', module).add('default', () => (
	<Demo>
		<Link href="#">Empty Hash</Link>
		{' | '}
		<Link href="http://google.com" isDisabled={true}>Disabled</Link>
		{' | '}
		<Link href="http://google.com" target="_blank" rel="noopener noreferrer">
			https://google.com
		</Link>
	</Demo>
));