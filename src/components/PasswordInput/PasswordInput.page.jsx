import React from 'react';
import Demo from '../../demo/Demo.jsx';
import stateful from '../../util/react/stateful';
import {storiesOf} from '@kadira/storybook';
import PasswordInput from './PasswordInput';
import {PURE} from 'dx-util/lib/react/pure';

import css from './PasswordInput.page.styl';
const darkDemoTheme = {
	container: css.container
};

import iconHidePassword from './img/icon-hide-password.svg';
import iconShowPassword from './img/icon-show-password.svg';

const Stateful = stateful({
	valueKey: 'isRevealed',
	onChangeKey: 'onReveal'
})(PasswordInput);

@PURE
class PasswordInputPage extends React.Component {

	state = {
		value: 'test'
	};

	render() {
		const {isRevealed} = this.state;
		return (
			<Demo theme={darkDemoTheme}>
				<main>
					<section className={css.form}>
						<PasswordInput iconShow={iconHidePassword} value={this.state.value} onChange={this.onChange}
						               onReveal={this.onReveal}
						               isRevealed={isRevealed} iconHide={iconShowPassword}/>
					</section>
					<section className={css.form}>
						<Stateful placeholder="Password" defaultValue={false} iconShow={iconHidePassword}
						          iconHide={iconShowPassword}/>
					</section>
					<section className={css.form}>
						<PasswordInput placeholder="Password" isDisabled={true}
						               iconShow={iconHidePassword}
						               iconHide={iconShowPassword}/>
					</section>
				</main>
			</Demo>
		);
	}

	onChange = ({target: {value}}) => {
		this.setState({
			value
		});
	}

	onReveal = isRevealed => {
		this.setState({
			isRevealed
		});
	}
}

storiesOf('PasswordInput', module).add('default', () => <PasswordInputPage/>);