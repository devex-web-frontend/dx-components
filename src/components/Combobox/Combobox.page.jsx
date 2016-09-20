import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Demo from '../../demo/Demo.jsx';
import ComboboxAnchor from './ComboboxAnchor';
import Combobox from './Combobox.jsx';
import css from './Combobox.demo.styl';
import MenuItem from '../Menu/MenuItem.jsx';
import {PURE} from 'dx-util/src/react/pure';

import iconSmallDropdownArrow from '../Selectbox/img/icon-small-dropdown-arrow.svg';

class ThemeComboboxAnchor extends React.Component {

	render() {
		const newProps = {
			...this.props,
			theme: {
				container: css.anchor,
				input: css.input,
				content_hasCaret: css.anchor__content_hasCaret,
				caret: css.anchor__caret
			},
			caretIconName: iconSmallDropdownArrow
		};

		console.log(newProps);

		return <ComboboxAnchor {...newProps}/>;
	}
}

@PURE
class ComboboxPage extends React.Component {
	state = {}

	render() {
		return (
			<Demo>
				<div>
					<Combobox AnchorComponent={ThemeComboboxAnchor}>
						<MenuItem value={1.00}>1.00</MenuItem>
						<MenuItem value={2.00}>2.00</MenuItem>
						<MenuItem value={5.00}>5.00</MenuItem>
						<MenuItem value={10.00}>10.00</MenuItem>
					</Combobox>
				</div>
			</Demo>
		);
	}
}

storiesOf('Combobox', module).add('default', () => <ComboboxPage/>);