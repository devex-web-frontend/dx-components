import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Demo from '../../demo/Demo.jsx';
import LoadingIndicaton from './LoadingIndicaton.jsx';
import {PURE} from 'dx-util/src/react/pure';

import css from './LoadingIndicaton.page.styl';

const LoadingIndicator = () => (
	<div className={css.loadingIndicator}/>
);

@PURE
class LodablePage extends React.Component {

	state = {
		isLoading: true
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				isLoading: false
			});
		}, 2500);
	}

	render() {
		const {isLoading} = this.state;
		const props = {
			LoadingIndicatorComponent: LoadingIndicator,
			isLoading,
			theme: {
				container: css.container
			}
		};

		return (
			<Demo>
				<section className={css.section}>
					<LoadingIndicaton {...props}>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel elit sit amet purus
							sollicitudin sagittis eget a nibh. Fusce a ornare odio, fringilla lobortis dui. Vivamus in
							fermentum sem. Vivamus pulvinar varius blandit. Sed nec purus posuere, molestie ante vitae,
							aliquam sem. Donec mauris dui, venenatis eu metus vel, scelerisque malesuada sem. Ut
							interdum
						</p>
					</LoadingIndicaton>
				</section>
			</Demo>
		);
	}
}

storiesOf('LoadingIndicaton', module).add('default', () => <LodablePage/>);