import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Demo from '../../demo/Demo.jsx';
import ComboboxAnchor from './ComboboxAnchor';
import Combobox from './Combobox.jsx';
import css from './Combobox.demo.styl';
import MenuItem from '../Menu/MenuItem.jsx';
import {PURE} from 'dx-util/src/react/pure';
import iconListItemTick from '../Selectbox/img/icon-list-item-tick.svg';

class DemoComboboxAnchor extends React.Component {

	static propTypes = {
		...ComboboxAnchor.propTypes
	}

	render() {
		const {theme} = this.props;

		const newProps = {
			...this.props,
			onChange: this.onChnage,
			theme: {
				...theme,
				container: css.anchor,
				input: css.input
			}
		};
		return <ComboboxAnchor {...newProps}/>;
	}

	onChnage = (text) => {
		const originalOnChange = this.props.onChange;
		const value = Number(text);

		originalOnChange && originalOnChange(text, value);
	}
}

@PURE
class ComboboxPage extends React.Component {
	state = {}

	render() {
		return (
			<Demo>
				<div>
					<Combobox defaultValue={1}
					          selectedItemIconName={iconListItemTick}
					          AnchorComponent={DemoComboboxAnchor}>
						<MenuItem value={1}>1.00</MenuItem>
						<MenuItem value={2}>2.00</MenuItem>
						<MenuItem value={5}>5.00</MenuItem>
						<MenuItem value={10}>10.00</MenuItem>
					</Combobox>
				</div>
			</Demo>
		);
	}
}

storiesOf('Combobox', module).add('default', () => <ComboboxPage/>);