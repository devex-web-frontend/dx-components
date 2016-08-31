import React from 'react';
import Demo from '../../demo/Demo.jsx';

import NumericStepper from './NumericStepper.jsx';
import iconAdd from './img/icon-add.svg';
import iconDecrease from './img/icon-decrease.svg';

import {storiesOf} from '@kadira/storybook';

import css from './NumericStepper.page.styl';

const darkDemoTheme = {
	container: css.container
};
const formatter = (value) => value && value.toFixed('2');

storiesOf('NumericStepper', module)
	.add('Default', () => (
		<Demo theme={darkDemoTheme}>
			<div>
				<NumericStepper formatter={formatter}
								min={-10}
								max={10}
								defaultValue={5}
								upIconName={iconAdd}
								downIconName={iconDecrease} />
			</div>
			<br/>
			<div>
				<NumericStepper formatter={formatter}
				                isDisabled={true}
				                value={10}
				                upIconName={iconAdd}
				                downIconName={iconDecrease} />
			</div>
			<br/>
			<div>
				<NumericStepper formatter={formatter}
				                isDisabled={true}
				                value={10}
				                max={9}
				                upIconName={iconAdd}
				                downIconName={iconDecrease} />
			</div>
		</Demo>
	));