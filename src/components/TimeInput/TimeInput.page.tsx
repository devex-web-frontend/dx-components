import * as React from 'react';
import {storiesOf} from '@kadira/storybook';
import TimeInput from './TimeInput';
import Demo from '../../demo/Demo';
import stateful from '../../util/react/stateful';
const Stateful = stateful()(TimeInput);

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
			<Stateful decreaseIcon={decrease}
			          increaseIcon={add}
			          defaultValue={time}/>
		</div>
	</Demo>
));