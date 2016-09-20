import React from 'react';
import Demo from '../../demo/Demo.jsx';

import Checkbox from './Checkbox.jsx';
import {storiesOf} from '@kadira/storybook';

import css from './Checkbox.page.styl';

const darkDemoTheme = {
	container: css.container
};

storiesOf('Checkbox', module)
		.add('Default', () => (
			<Demo theme={darkDemoTheme}>
				<Checkbox value="Test Value" name="chek1">Test Value</Checkbox>
			</Demo>
		))
		.add('Disabled', () => {
			return (
				<Demo theme={darkDemoTheme}>
					<Checkbox value="Test Value"
							defaultChecked={true}
							disabled={true}
							name="chek1">
						Test Value
					</Checkbox>
				</Demo>
			);
		});