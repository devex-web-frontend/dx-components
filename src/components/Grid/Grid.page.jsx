import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Demo from '../../demo/Demo';
import {PURE} from 'dx-util/src/react/pure';
import {themeable} from 'react-css-themr';
import {
	Grid,
	GridHead as Head,
	GridBody as Body,
	GridRow as Row,
	GridCell as Cell
} from './Grid';

import css from './Grid.page.styl';
const theme1 = {
	cell: css.cell_first
};
const theme2 = {
	cell: css.cell_second
};
const theme3 = {
	cell: css.cell_third
};
const theme23 = {
	cell: css.cell_second_third
};
const theme12 = {
	cell: css.cell_first_second
};

@PURE
class GridPage extends React.Component {
	render() {
		return (
			<Demo>
				<Grid>
					<Head>
						<Row>
							<Cell theme={theme1}>1</Cell>
							<Cell theme={theme2}>2</Cell>
							<Cell theme={theme3}>3</Cell>
						</Row>
					</Head>
					<Body>
						<Row>
							<Cell theme={theme1}>1</Cell>
							<Cell theme={theme2}>2</Cell>
							<Cell theme={theme3}>3</Cell>
						</Row>
						<Row>
							<Cell theme={theme1}>1</Cell>
							<Cell theme={theme2}>2</Cell>
							<Cell theme={theme3}>3</Cell>
						</Row>
						<Row>
							<Cell theme={theme1}>1</Cell>
							<Cell theme={theme2}>2</Cell>
							<Cell theme={theme3}>3</Cell>
						</Row>
						<Row>
							<Cell theme={theme1}>1</Cell>
							<Cell theme={theme2}>2</Cell>
							<Cell theme={theme3}>3</Cell>
						</Row>
						<Row>
							<Cell theme={theme1}>1</Cell>
							<Cell theme={theme2}>2</Cell>
							<Cell theme={theme3}>3</Cell>
						</Row>
						<Row>
							<Cell theme={theme1}>1</Cell>
							<Cell theme={theme2}>2</Cell>
							<Cell theme={theme3}>3</Cell>
						</Row>
						<Row>
							<Cell theme={theme1}>1</Cell>
							<Cell theme={theme2}>2</Cell>
							<Cell theme={theme3}>3</Cell>
						</Row>
						<Row>
							<Cell theme={theme1}>1</Cell>
							<Cell theme={theme2}>2</Cell>
							<Cell theme={theme3}>3</Cell>
						</Row>
						<Row>
							<Cell theme={theme1}>1</Cell>
							<Cell theme={theme2}>2</Cell>
							<Cell theme={theme3}>3</Cell>
						</Row>
						<Row>
							<Cell theme={theme1}>1</Cell>
							<Cell theme={theme2}>2</Cell>
							<Cell theme={theme3}>3</Cell>
						</Row>
					</Body>
				</Grid>
			</Demo>
		);
	}
}

storiesOf('Grid', module).add('default', () => <GridPage/>);