import * as React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import TimeInput from './TimeInput';
import Demo from '../../demo/Demo';
import stateful from '../../util/react/stateful';
const Stateful = stateful()(TimeInput);

import * as add from '../../resources/svg/icon-add.svg';
import * as decrease from '../../resources/svg/icon-decrease.svg';
import {TTime} from './TimeInput';

const time = {
	hours: 1,
	minutes: 20
};

const onChange = action('change');
const log = (value: TTime) => onChange(value);

storiesOf('TimeInput', module).add('default', () => (
	<Demo>
		<input type="time" id="time"/>
		<div>
			<Stateful decreaseIcon={decrease}
			          onChange={log}
			          increaseIcon={add}
			          defaultValue={time}/>
		</div>
	</Demo>
));