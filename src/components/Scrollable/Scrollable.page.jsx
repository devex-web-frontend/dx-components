import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Lorem from 'react-lorem-component';
import Scrollable from './Scrollable.jsx';
import Demo from '../../demo/Demo';
import css from './Scrollable.page.styl';
import {PURE} from 'dx-util/src/react/pure';
import Pure from '../Pure/Pure';

const darkDemoTheme = {
	container: css.container
};

const Heavy = () => (
	<Lorem paragraphUpperBound={20} />
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
								<div className={css.scrollable}><Heavy/></div>
							</Scrollable>
						</section>
					)}
				</Pure>

				<Pure check={this.state.scrollTop}>
					{() => (
						<section className={css.section}>
							<h1>VSync</h1>
							<Scrollable scrollTop={this.state.scrollTop}>
								<div className={css.scrollable}><Heavy/></div>
							</Scrollable>
						</section>
					)}
				</Pure>
				<Pure check={this.state.scrollLeft}>
					{() => (
						<section className={css.section}>
							<h1>HSync</h1>
							<Scrollable scrollLeft={this.state.scrollLeft}>
								<div className={css.scrollable}><Heavy/></div>
							</Scrollable>
						</section>
					)}
				</Pure>

				<section className={css.section}>
					<h1>VHSync</h1>
					<Scrollable scrollTop={this.state.scrollTop} scrollLeft={this.state.scrollLeft}>
						<div className={css.scrollable}><Heavy/></div>
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