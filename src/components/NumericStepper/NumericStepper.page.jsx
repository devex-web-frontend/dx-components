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
const formatter = (value) => value.toFixed('2');

storiesOf('NumericStepper', module)
	.add('Default', () => (
		<Demo theme={darkDemoTheme}>
			<div>
				<NumericStepper formatter={formatter}
								min={10}
								max={20}
								value={15}
								upIconName={iconAdd}
								downIconName={iconDecrease} />
			</div>

			<p>&nbsp;</p>

			<div>
				<NumericStepper formatter={formatter}
								isDisabled={true}
								upIconName={iconAdd}
								downIconName={iconDecrease} />
			</div>
		</Demo>
	));