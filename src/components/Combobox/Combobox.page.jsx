import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Demo from '../../demo/Demo.jsx';
import { Button } from '../Button/Button';
import Combobox from './Combobox.jsx';
import css from './Combobox.page.styl';
import { MenuItem } from '../Menu/Menu.tsx';
import { PURE } from 'dx-util/lib/react/pure';

import iconSmallDropdownArrow from '../Selectbox/img/icon-small-dropdown-arrow.svg';
import iconListItemTick from '../Selectbox/img/icon-list-item-tick.svg';

@PURE
class ComboboxPage extends React.Component {
	state = {}

	render() {
		return (
			<Demo>
				<article className={css.article}>
					<section className={css.section}>
						<Combobox placeholder="Disabled component"
						          isDisabled={true}
						          selectedItemIconName={iconListItemTick}
						          caretIconName={iconSmallDropdownArrow}>
							<MenuItem value={1}>1.00</MenuItem>
							<MenuItem value={2}>2.00</MenuItem>
							<MenuItem value={5}>5.00</MenuItem>
							<MenuItem value={10}>10.00</MenuItem>
						</Combobox>
					</section>
					<section className={css.section}>
						<Combobox placeholder="Choose your value"
						          selectedItemIconName={iconListItemTick}
						          caretIconName={iconSmallDropdownArrow}
						          onChange={this.onChange}>
							<MenuItem value={1}>1.00</MenuItem>
							<MenuItem value={2}>2.00</MenuItem>
							<MenuItem value={5}>5.00</MenuItem>
							<MenuItem value={10}>10.00</MenuItem>
						</Combobox>
					</section>
					<section className={css.section}>
						<Combobox placeholder="Controlled by left"
						          value={this.state.value}
						          caretIconName={iconSmallDropdownArrow}
						          selectedItemIconName={iconListItemTick}>
							<MenuItem value={1}>1.00</MenuItem>
							<MenuItem value={2}>2.00</MenuItem>
							<MenuItem value={5}>5.00</MenuItem>
							<MenuItem value={10}>10.00</MenuItem>
						</Combobox>
					</section>
					<section className={css.section}>
						<Combobox defaultValue={'dasd'}
						          value={this.state.value}
						          onChange={this.onChange}
						          selectedItemIconName={iconListItemTick}
						          caretIconName={iconSmallDropdownArrow}>
							<MenuItem value={1}>1.00</MenuItem>
							<MenuItem value={2}>2.00</MenuItem>
							<MenuItem value={5}>5.00</MenuItem>
							<MenuItem value={10}>10.00</MenuItem>
						</Combobox>
					</section>
					<section className={css.section}>
						<Button onClick={this.onResetClick}>Reset</Button>
					</section>
				</article>
			</Demo>
		);
	}

	onChange = value => {
		this.setState({
			value
		});
	}

	onResetClick = e => {
		this.setState({
			value: (void 0) //eslint-disable-line no-void
		});
	}
}

storiesOf('Combobox', module).add('default', () => <ComboboxPage/>);