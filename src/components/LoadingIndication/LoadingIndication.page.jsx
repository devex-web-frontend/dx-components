/* eslint-disable */
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Demo from '../../demo/Demo.jsx';
import { LoadingIndication } from './LoadingIndication.tsx';
import { PURE } from 'dx-util/lib/react/pure';
import { Button } from '../Button/Button';

import css from './LoadingIndication.page.styl';

@PURE
class LoadingIndicationPage extends React.Component {
	state = {
		isVisible: false
	}

	render() {
		return (
			<Demo>
				<section className={css.section}>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel elit sit amet purus
						sollicitudin sagittis eget a nibh. Fusce a ornare odio, fringilla lobortis dui. Vivamus in
						fermentum sem. Vivamus pulvinar varius blandit. Sed nec purus posuere, molestie ante vitae,
						aliquam sem. Donec mauris dui, venenatis eu metus vel, scelerisque malesuada sem. Ut
						interdum
					</p>
					<LoadingIndication isVisible={this.state.isVisible}/>
				</section>
				<Button onClick={this.onToggleClick}>Toggle</Button>
			</Demo>
		);
	}

	onToggleClick = () => {
		this.setState({
			isVisible: !this.state.isVisible
		});
	}
}

storiesOf('LoadingIndication', module).add('default', () => <LoadingIndicationPage/>);