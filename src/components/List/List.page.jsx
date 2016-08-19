import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Demo from '../../demo/Demo.jsx';
import List from './List.jsx';
import Item from './ListItem.jsx';
import ItemGroup from './ListItemGroup.jsx';

import css from './List.page.styl';
const theme = {
	container: css.list
};

storiesOf('List', module).add('default', () => {
	return (
		<Demo>
			<List theme={theme}>
				<Item>1.1</Item>
				<Item>1.2</Item>
				<ItemGroup header={2}>
					<List>
						<Item>2.1</Item>
						<Item>2.2</Item>
						<ItemGroup header={3}>
							<List>
								<Item>3.1</Item>
								<Item>3.2</Item>
								<ItemGroup header={4}>
									<List>
										<Item>4.1</Item>
										<Item>4.2</Item>
										<Item>4.3</Item>
									</List>
								</ItemGroup>
								<Item>3.3</Item>
							</List>
						</ItemGroup>
					</List>
				</ItemGroup>
				<Item>1.3</Item>
			</List>
		</Demo>
	);
});