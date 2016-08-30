import React from 'react';
import Scrollable from './Scrollable';
import {storiesOf} from '@kadira/storybook';
import Demo from '../../demo/Demo';
import css from './Scrollable.page.styl';

storiesOf('Scrollable', module).add('default', () => (
	<Demo>
		<Scrollable>
			<div className={css.scrollable}>
				<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
				<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
				<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
				<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
				<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
				<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
				<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
				<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
				<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
				<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
				<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
				<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
				<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
				<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
				<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
				<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
				<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
				<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
				<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
				<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
				<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
				<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
				<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
				<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
				<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
				<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
				<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
				<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
				<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
				<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
				<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
				<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
			</div>
		</Scrollable>
	</Demo>
));