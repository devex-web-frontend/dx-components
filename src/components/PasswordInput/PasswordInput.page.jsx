import React from 'react';
import Demo from '../../demo/Demo.jsx';
import {storiesOf} from '@kadira/storybook';
import PasswordInput from './PasswordInput';

import css from './PasswordInput.page.styl';
const darkDemoTheme = {
	container: css.container
};

import iconHidePassword from './img/icon-hide-password.svg';
import iconShowPassword from './img/icon-show-password.svg';

storiesOf('PasswordInput', module)
	.add('Default', () => (
		<Demo theme={darkDemoTheme}>
			<main>
				<section className={css.form}>
					<PasswordInput iconShow={iconHidePassword} iconHide={iconShowPassword}/>
				</section>
				<section className={css.form}>
					<PasswordInput placeholder="Password" value="test" isRevealed={true} iconShow={iconHidePassword}
					               iconHide={iconShowPassword}/>
				</section>
				<section className={css.form}>
					<PasswordInput placeholder="Password" disabled={true} iconShow={iconHidePassword}
					               iconHide={iconShowPassword}/>
				</section>
			</main>
		</Demo>
	));