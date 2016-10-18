import React from 'react';
import moment from 'moment';
import Demo from '../../demo/Demo.jsx';

import Calendar from './Calendar.jsx';
import {storiesOf} from '@kadira/storybook';

import nextMonthIcon from '../DatePicker/resources/icon-move-right.svg';
import previousMonthIcon from '../DatePicker/resources/icon-move-left.svg';

storiesOf('Calendar', module)
	.add('Default', () => (
		<Demo>
			<Calendar value={moment().format()}
			          previousMonthIcon={previousMonthIcon}
			          nextMonthIcon={nextMonthIcon}/>
		</Demo>
	));