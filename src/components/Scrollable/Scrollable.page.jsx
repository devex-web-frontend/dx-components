import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Scrollable from './Scrollable';
import Demo from '../../demo/Demo';
import css from './Scrollable.page.styl';
import {PURE} from 'dx-util/src/react/pure';

@PURE
class ScrollablePage extends React.Component {
	render() {
		return (
			<Demo>
				<Scrollable>
					<div className={css.origin}>
						<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
						<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
						<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
						<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
						<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
						<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
						<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
						<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
						<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
						<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
						<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
						<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
						<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
						<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
						<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
						<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
						<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
						<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
						<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
						<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
						<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
						<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
						<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
					</div>
				</Scrollable>
			</Demo>
		);
	}
}

storiesOf('Scrollable', module).add('default', () => <ScrollablePage/>)