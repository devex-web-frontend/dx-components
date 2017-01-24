import * as React from 'react';
import {storiesOf} from '@kadira/storybook';
import TimeInput from './TimeInput';
import Demo from '../../demo/Demo';

import * as add from '../../resources/svg/icon-add.svg';
import * as decrease from '../../resources/svg/icon-decrease.svg';

const time = {
	hours: 1,
	minutes: 20
};

storiesOf('TimeInput', module).add('default', () => (
	<Demo>
		<input type="time"/>
		<div>
			{/*<TimeInput downIconName={decrease} upIconName={add} value={time}/>*/}
		</div>
		<div tabIndex={0} style={{padding: 20}}>
			<div>
				<div>123</div>
				<input type="text" tabIndex={-1} onMouseDown={e => e.preventDefault()}/>
			</div>
		</div>
	</Demo>
));

type a = typeof TimeInput;