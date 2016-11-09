import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Demo from '../../demo/Demo.jsx';
import NumericStepper from './NumericStepper.jsx';
import stateful from '../../util/react/stateful';

import iconAdd from './img/icon-add.svg';
import iconDecrease from './img/icon-decrease.svg';

import css from './NumericStepper.page.styl';

const darkDemoTheme = {
	container: css.container
};

const StatefulStepper = stateful()(NumericStepper);

const dollarFormatter = value => `$${value}`;
const dollarParser = inputString => {
	const newValue = parseInt(inputString.replace(/\D/g, ''), 10);
	return isNaN(newValue) ? 0 : newValue;
};

storiesOf('NumericStepper', module)
	.add('Default', () => (
		<Demo theme={darkDemoTheme}>
			<div>
				<StatefulStepper min={-10}
								 max={10}
								 defaultValue={5}
								 upIconName={iconAdd}
								 downIconName={iconDecrease}/>
			</div>
			<br/>
			<div>
				<StatefulStepper isDisabled={true}
								 defaultValue={10}
								 upIconName={iconAdd}
								 downIconName={iconDecrease}/>
			</div>
			<br/>
			<div>
				<StatefulStepper defaultValue={10}
								 min={0}
								 formatter={dollarFormatter}
								 parser={dollarParser}
								 upIconName={iconAdd}
								 downIconName={iconDecrease}/>
			</div>
			<br/>
			<div>
				<StatefulStepper defaultValue={14}
								 upIconName={iconAdd}
								 downIconName={iconDecrease}/>
			</div>
		</Demo>
	));