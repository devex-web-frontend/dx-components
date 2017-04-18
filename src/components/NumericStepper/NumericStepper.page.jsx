import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Demo from '../../demo/Demo.jsx';
import NumericStepper from './NumericStepper.jsx';
import stateful from '../../util/react/stateful';

import iconAdd from '../../resources/svg/icon-add.svg';
import iconDecrease from '../../resources/svg/icon-decrease.svg';

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

const dateFormatter = value => {
	const date = new Date(value);
	return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear().toString().slice(-2)}`;
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
				<StatefulStepper defaultValue={1659}
								 min={0}
								 formatter={dollarFormatter}
								 parser={dollarParser}
								 upIconName={iconAdd}
								 downIconName={iconDecrease}/>
			</div>
			<br/>
			<div>
				<StatefulStepper defaultValue={1}
								 step={0.5}
								 upIconName={iconAdd}
								 downIconName={iconDecrease}/>
			</div>
			<br/>
			<div>
				<StatefulStepper defaultValue={10}
								 step={0.0001}
								 upIconName={iconAdd}
								 downIconName={iconDecrease}/>
			</div>
			<br/>
			<div>
				<StatefulStepper defaultValue={Date.now()}
								 step={24 * 3600 * 1000}
								 formatter={dateFormatter}
								 manualEdit={false}
								 upIconName={iconAdd}
								 downIconName={iconDecrease}/>
			</div>
		</Demo>
	));
