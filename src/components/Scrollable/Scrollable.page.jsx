import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Scrollable from './Scrollable.jsx';
import Demo from '../../demo/Demo';
import css from './Scrollable.page.styl';
import {PURE} from 'dx-util/src/react/pure';
import Pure from '../Pure/Pure';

const darkDemoTheme = {
	container: css.container
};

const CONTENT = (
	<div className={css.scrollable}>
		<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
		<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
		<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
		<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
		<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
		<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
		<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
		<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
		<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
		<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
		<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
		<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
		<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
		<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
		<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
		<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
		<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
		<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
		<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
		<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
		<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
		<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
		<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
		<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
		<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
		<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
		<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
		<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
		<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
		<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
		<p>abc abc abc abc abc abc abc abc abc abc abc abc</p>
	</div>
);

@PURE
class ScrollablePage extends React.Component {

	state = {}

	render() {
		return (
			<Demo theme={darkDemoTheme}>
				<Pure>
					{() => (
						<section className={css.section}>
							<h1>Origin</h1>
							<Scrollable onScroll={this.onScroll}>
								{CONTENT}
							</Scrollable>
						</section>
					)}
				</Pure>

				<Pure check={this.state.scrollTop}>
					{() => (
						<section className={css.section}>
							<h1>VSync</h1>
							<Scrollable scrollTop={this.state.scrollTop}>
								{CONTENT}
							</Scrollable>
						</section>
					)}
				</Pure>
				<Pure check={this.state.scrollLeft}>
					{() => (
						<section className={css.section}>
							<h1>HSync</h1>
							<Scrollable scrollLeft={this.state.scrollLeft}>
								{CONTENT}
							</Scrollable>
						</section>
					)}
				</Pure>

				<section className={css.section}>
					<h1>VHSync</h1>
					<Scrollable scrollTop={this.state.scrollTop} scrollLeft={this.state.scrollLeft}>
						{CONTENT}
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

storiesOf('Scrollable', module).add('default', () => <ScrollablePage/>);