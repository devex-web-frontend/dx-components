import * as React from 'react';
import Demo from '../../demo/Demo.jsx';

import Input from './Input';
import {storiesOf} from '@kadira/storybook';

import * as css from './Input.page.styl';
import * as demoCss from './Input.demo.styl';
import stateful from '../../util/react/stateful';

const darkDemoTheme = {
	container: css.container
};

const Stateful = stateful()(Input);

storiesOf('Input', module)
	.add('Default', () => (
		<Demo theme={darkDemoTheme}>
			<Stateful defaultValue="<Input/>"/>
			<Input type="hidden" tabIndex={0}>
				<div className={demoCss.input}>div</div>
			</Input>
		</Demo>
	))
	.add('Readonly', () => {
		return (
			<Demo theme={darkDemoTheme}>
				<Stateful defaultValue="<Input/>" isReadOnly={true}/>
			</Demo>
		);
	})
	.add('Disabled', () => {
		return (
			<Demo theme={darkDemoTheme}>
				<Stateful defaultValue="Test Value" isDisabled={true}/>
			</Demo>
		);
	})
	.add('Invalid', () => (
		<Demo theme={darkDemoTheme}>
			<Stateful defaultValue="Error" error="Error"/>
		</Demo>
	));