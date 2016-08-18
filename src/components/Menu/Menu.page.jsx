import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Demo from '../../demo/Demo.jsx';
import Menu from './Menu.jsx';
import MenuItem from './MenuItem.jsx';
import MenuItemGroup from './MenuItemGroup.jsx';

import css from './Menu.page.styl';
const theme = {
	container: css.list,
	item: css.item,
	itemGroup__header: css.itemGroup__header,
	itemGroup__header__content: css.itemGroup__header__content
};

const Item = props => <MenuItem {...props} theme={theme}/>;
const Group = props => <MenuItemGroup {...props} theme={theme}/>;

const onItemSelect = value => {
	console.log('selected', value);
};

storiesOf('Menu', module).add('default', () => {
	return (
		<Demo>
			<Menu onItemSelect={onItemSelect} theme={theme}>
				<Item value="1.1">1.1</Item>
				<Item value="1.2">1.2</Item>
				<Group header="2">
					<Menu>
						<Item value="2.1">2.1</Item>
						<Item value="2.2">2.2</Item>
						<Group header="3">
							<Menu>
								<Item value="3.1">3.1</Item>
								<Item value="3.2">3.2</Item>
								<Group header="3.3">
									<Menu>
										<Item value="3.3.1">3.3.1</Item>
										<Item value="3.3.2">3.3.2</Item>
										<Item value="3.3.3">3.3.3</Item>
									</Menu>
								</Group>
								<Item value="3.4">3.4</Item>
							</Menu>
						</Group>
					</Menu>
				</Group>
			</Menu>
		</Demo>
	);
});