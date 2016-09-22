import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Demo from '../../demo/Demo.jsx';
import Button from '../Button/Button';
import Combobox from './Combobox.jsx';
import css from './Combobox.demo.styl';
import MenuItem from '../Menu/MenuItem.jsx';
import {PURE} from 'dx-util/src/react/pure';

import iconSmallDropdownArrow from '../Selectbox/img/icon-small-dropdown-arrow.svg';
import iconListItemTick from '../Selectbox/img/icon-list-item-tick.svg';
import SelectboxAnchor from '../Selectbox/SelectboxAnchor.jsx';

class DemoSelectboxAnchor extends React.Component {

	static propTypes = {
		...SelectboxAnchor.PropTypes
	}

	render() {
		const newProps = {
			...this.props,
			caretIconName: iconSmallDropdownArrow
		};

		return <SelectboxAnchor {...newProps}/>;
	}
}

@PURE
class ComboboxPage extends React.Component {
	state = {
		defaultValue: 2
	}

	render() {
		console.log(this.state.defaultValue);
		return (
			<Demo>
				<article className={css.article}>
					<Button onClick={this.onSetDefaulValueClick}>Set Defaul Value 10.00</Button>
				</article>
				<article className={css.article}>
					<section className={css.section}>
						<Combobox placeholder="Choose your value"
						          defaultValue={this.state.defaultValue}
						          AnchorComponent={DemoSelectboxAnchor}
						          selectedItemIconName={iconListItemTick}
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
						          onChange={this.onChange}
						          AnchorComponent={DemoSelectboxAnchor}
						          selectedItemIconName={iconListItemTick}>
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

	onSetDefaulValueClick = e => {
		this.setState({
			defaultValue: 10
		});
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