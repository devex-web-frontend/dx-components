import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Scrollable from './Scrollable';
import Demo from '../../demo/Demo';
import css from './Scrollable.page.styl';
import {PURE} from 'dx-util/src/react/pure';
import Pure from '../Pure/Pure';
import Perf from 'react-addons-perf';

const Heavy = () => (
	<div className={css.origin}>
		<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
		<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
		<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
		<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
		<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
		<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
		<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
		<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
		<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
		<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
		<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
		<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
		<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
		<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
		<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
		<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
		<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
		<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
		<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
		<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
		<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
		<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
		<p>1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0</p>
	</div>
);

@PURE
class ScrollablePage extends React.Component {
	state = {}

	render() {
		return (
			<Demo>
				<Pure>
					{() => (
						<section>
							<h1>Origin</h1>
							<Scrollable onScroll={this.onScroll}>
								<Heavy/>
							</Scrollable>
						</section>
					)}
				</Pure>

				<Pure check={this.state.scrollTop}>
					{() => (
						<section>
							<h1>VSync</h1>
							<Scrollable scrollTop={this.state.scrollTop}>
								<Pure>{() => <Heavy/>}</Pure>
							</Scrollable>
						</section>
					)}
				</Pure>
				<Pure check={this.state.scrollLeft}>
					{() => (
						<section>
							<h1>HSync</h1>
							<Scrollable scrollLeft={this.state.scrollLeft}>
								<Pure>{() => <Heavy/>}</Pure>
							</Scrollable>
						</section>
					)}
				</Pure>
				<section>
					<h1>VHSync</h1>
					<Scrollable scrollTop={this.state.scrollTop} scrollLeft={this.state.scrollLeft}>
						<Pure>{() => <Heavy/>}</Pure>
					</Scrollable>
				</section>
			</Demo>
		);
	}

	onScroll = (scrollLeft, scrollTop) => {
		this.setState({
			scrollLeft,
			scrollTop
		});
	}
}

storiesOf('Scrollable', module).add('default', () => <ScrollablePage/>)