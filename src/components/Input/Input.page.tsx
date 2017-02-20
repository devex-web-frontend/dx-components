import * as React from 'react';
import Demo from '../../demo/Demo.jsx';

import Input from './Input';
import {storiesOf} from '@kadira/storybook';

import * as css from './Input.page.styl';
import * as demoCss from './Input.demo.styl';

const darkDemoTheme = {
	container: css.container
};

storiesOf('Input', module)
	.add('Default', () => (
		<Demo theme={darkDemoTheme}>
			<Input defaultValue="<Input/>"/>
			<Input type="hidden" tabIndex={0}>
				<div className={demoCss.input}>div</div>
			</Input>
		</Demo>
	))
	.add('Readonly', () => {
		return (
			<Demo theme={darkDemoTheme}>
				<Input defaultValue="<Input/>" isReadOnly={true}/>
			</Demo>
		);
	})
	.add('Disabled', () => {
		return (
			<Demo theme={darkDemoTheme}>
				<Input defaultValue="Test Value" isDisabled={true}/>
			</Demo>
		);
	})
	.add('Invalid', () => (
		<Demo theme={darkDemoTheme}>
			<Input defaultValue="Error" error="Error"/>
		</Demo>
	));