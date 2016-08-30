import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Table, {
	TableCell as Cell,
	TableHead as THead,
	TableBody as TBody,
	TableRow as Tr
} from './Table';
import Demo from '../../demo/Demo';
import css from './Table.page.styl';

const firstTheme = {
	cell: css.cell_first
};

storiesOf('Table', module).add('default', () => (
	<Demo>
		<Table>
			<THead>
				<Tr>
					<Cell theme={firstTheme}>1</Cell>
					<Cell>2</Cell>
					<Cell>3</Cell>
				</Tr>
			</THead>
			<TBody>
				<Tr>
					<Cell theme={firstTheme} rowSpan={2}>_4_</Cell>
					<Cell colSpan={2}>_5_</Cell>
				</Tr>
				<Tr>
					<Cell>_8_</Cell>
					<Cell>_9_</Cell>
				</Tr>
			</TBody>
		</Table>
	</Demo>
));