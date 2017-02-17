import React from 'react';
import Demo from '../../demo/Demo.jsx';

import Input from './Input';
import {storiesOf} from '@kadira/storybook';

import css from './Input.page.styl';

const darkDemoTheme = {
	container: css.container
};

storiesOf('Input', module)
	.add('Default', () => (
		<Demo theme={darkDemoTheme}>
			<Input defaultValue="<Input/>"/>
			<Input tagName="div" tabIndex={0}>
				div
			</Input>
		</Demo>
	))
	.add('Readonly', () => {
		return (
			<Demo theme={darkDemoTheme}>
				<Input value="<Input/>" readOnly={true}/>
				<Input tagName="div" tabIndex={0} readOnly={true}>
					div
				</Input>
			</Demo>
		);
	})
	.add('Disabled', () => {
		return (
			<Demo theme={darkDemoTheme}>
				<Input value="Test Value" disabled={true}/>
				<Input tagName="div" tabIndex={0} disabled={true}>
					div
				</Input>
			</Demo>
		);
	})
	.add('Invalid', () => (
		<Demo theme={darkDemoTheme}>
			<Input defaultValue="Error" isInvalid={true}/>
			<Input tagName="div" tabIndex={0} isInvalid={true}>
				div
			</Input>
		</Demo>
	));