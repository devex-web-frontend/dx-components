import * as React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import Demo from '../../demo/Demo';
import stateful from '../../util/react/stateful';
import DateInput from './DateInput';
const Stateful = stateful()(DateInput);
import * as add from '../../resources/svg/icon-add.svg';
import * as decrease from '../../resources/svg/icon-decrease.svg';
import * as clear from '../../resources/svg/icon-small-cross.svg';
import * as calendar from '../../resources/svg/icon-calendar.svg';

const onChange = action('change');
const log = (value: Date) => onChange(value);

storiesOf('DateInput', module).add('default', () => (
	<Demo>
		<input type="date" id="date"/>
		<div>
			<Stateful decrementIcon={decrease}
			          incrementIcon={add}
			          clearIcon={clear}
			          calendarIcon={calendar}
			          onChange={log}
			          defaultValue={new Date()}/>
		</div>
	</Demo>
));