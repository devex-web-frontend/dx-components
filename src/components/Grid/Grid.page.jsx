import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Demo from '../../demo/Demo';
import {PURE} from 'dx-util/src/react/pure';

import {
	Grid,
	GridHead as Head,
	GridBody as Body,
	GridRow as Row,
	GridCell as Cell
} from './Grid';

import css from './Grid.page.styl';

const gridTheme = {
	container: css.container,
	gridBody: css.gridBody,
	gridHead: css.gridHead,
	gridHead_paddedForScrollbar: css.gridHead_paddedForScrollbar
};

@PURE
class GridPage extends React.Component {
	state = {
		isLong: false
	}

	_interval;

	componentDidMount() {
		this._interval = setTimeout(() => {
			this.setState({
				isLong: !this.state.isLong
			});
		}, 3000);
	}

	componentWillUnmount() {
		clearInterval(this._interval);
	}

	render() {
		return (
			<Demo>
				<Grid theme={gridTheme}>
					<Head theme={gridTheme}>
						<Row>
							<Cell>1</Cell>
							<Cell>2</Cell>
							<Cell>3</Cell>
						</Row>
					</Head>
					<Body theme={gridTheme}>
						{Array.from(new Array(20), () => 0).map((_, i) => (
							<Row key={i}>
								<Cell>
									{this.state.isLong ? '1_______________________________________' : '1'}
								</Cell>
								<Cell>2_______________________________________</Cell>
								<Cell>3_______________________________________</Cell>
							</Row>
						))}
					</Body>
				</Grid>
			</Demo>
		);
	}
}

storiesOf('Grid', module).add('default', () => <GridPage/>);