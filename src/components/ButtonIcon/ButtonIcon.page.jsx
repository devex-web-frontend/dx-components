import React from 'react';
import {storiesOf} from '@kadira/storybook';
import ButtonIcon from './ButtonIcon.jsx';
import Demo from '../../demo/Demo.jsx';
import iconAdd from '../Icon/img/icon-add.svg';
import css from './ButtonIcon.page.styl';

const buttonTheme = {
	container: css.button,
	icon: css.icon
};

storiesOf('ButtonIcon', module)
	.add('Default', () => {
		return (
			<Demo>
				<ButtonIcon name={iconAdd} theme={buttonTheme}/>
			</Demo>
		);
	})
	.add('Flat', () => (
		<Demo>
			<ButtonIcon name={iconAdd} theme={buttonTheme} isFlat={true}/>

		</Demo>
	))
	.add('Disabled', () => (
		<Demo>
			<ButtonIcon name={iconAdd} theme={buttonTheme} isFlat={true}/>
		</Demo>
	));