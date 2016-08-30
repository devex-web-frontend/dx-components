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

@PURE
class GridPage extends React.Component {
	render() {
		return (
			<Demo>
				<Grid>
					<Head>
						<Row>
							<Cell>1</Cell>
							<Cell>2</Cell>
							<Cell>3</Cell>
						</Row>
					</Head>
					<Body>
						<Row>
							<Cell rowSpan={2}>_4_</Cell>
							<Cell colSpan={2}>_5_</Cell>
						</Row>
						<Row>
							<Cell>_8_</Cell>
							<Cell>_9_</Cell>
						</Row>
					</Body>
				</Grid>
			</Demo>
		);
	}
}

storiesOf('Grid', module).add('default', () => <GridPage/>);