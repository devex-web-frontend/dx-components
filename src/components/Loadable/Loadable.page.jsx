import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Demo from '../../demo/Demo.jsx';
import Loadable from './Loadable.jsx';
import {PURE} from 'dx-util/src/react/pure';

const DemoLoader = () => (
	<div className="demoLoader"/>
);

import css from './Loadable.page.styl';

@PURE
class LodablePage extends React.Component {

	state = {
		isLoaded: true
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				isLoaded: false
			});
		}, 2500);
	}

	render() {
		const {isLoaded} = this.state;
		return (
			<Demo>
				<section className={css.section}>
					<Loadable isLoaded={isLoaded} LoaderComponent={DemoLoader} theme={{
						container: css.container
					}}>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel elit sit amet purus
							sollicitudin sagittis eget a nibh. Fusce a ornare odio, fringilla lobortis dui. Vivamus in
							fermentum sem. Vivamus pulvinar varius blandit. Sed nec purus posuere, molestie ante vitae,
							aliquam sem. Donec mauris dui, venenatis eu metus vel, scelerisque malesuada sem. Ut
							interdum
							tellus et orci egestas posuere. Nulla facilisi. Fusce commodo varius ultricies. Phasellus
							lobortis metus urna, ornare pulvinar libero dapibus quis. Suspendisse quis enim quis arcu
							accumsan vulputate. Nulla leo ligula, blandit a nisi ut, sagittis fringilla nisi.
							Suspendisse
							massa urna, ultricies quis tortor id, volutpat ultricies felis. Etiam efficitur enim nulla,
							quis
							luctus magna condimentum et. Class aptent taciti sociosqu ad litora torquent per conubia
							nostra,
							per inceptos himenaeos. Morbi feugiat ac quam ut viverra.
						</p>
					</Loadable>
				</section>
			</Demo>
		);
	}
}

storiesOf('Lodable', module).add('default', () => <LodablePage/>);