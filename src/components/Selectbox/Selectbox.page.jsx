import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Demo from '../../demo/Demo.jsx';
import Button from '../Button/Button.jsx';
import Selectbox from './Selectbox.jsx';
import MenuItem from '../Menu/MenuItem.jsx';
import {PURE} from 'dx-util/src/react/pure';

import iconListItemTick from './img/icon-list-item-tick.svg';
import iconSmallDropdownArrow from './img/icon-small-dropdown-arrow.svg';

@PURE
class SelectboxPage extends React.Component {
	state = {}

	render() {
		return (
			<Demo>
				<div>
					<Selectbox placeholder="Choose your hero"
					           isPrimary={true}
					           selectedItemIconName={iconListItemTick}
					           onChange={this.onHeroChange}
					           caretIconName={iconSmallDropdownArrow}>
						<MenuItem value="superman">Superman</MenuItem>
						<MenuItem value="batman">Batman</MenuItem>
						<MenuItem value="flash">Flash</MenuItem>
					</Selectbox>
					<Selectbox placeholder="Controlled by left"
					           isPrimary={true}
					           value={this.state.hero}
					           onChange={this.onHeroChange}
					           selectedItemIconName={iconListItemTick}
					           caretIconName={iconSmallDropdownArrow}>
						<MenuItem value="superman">Superman</MenuItem>
						<MenuItem value="batman">Batman</MenuItem>
						<MenuItem value="flash">Flash</MenuItem>
					</Selectbox>
					<Selectbox defaultValue="batman"
					           isPrimary={true}
					           value={this.state.hero}
					           onChange={this.onHeroChange}
					           selectedItemIconName={iconListItemTick}
					           caretIconName={iconSmallDropdownArrow}>
						<MenuItem value="superman">Superman</MenuItem>
						<MenuItem value="batman">Batman</MenuItem>
						<MenuItem value="flash">Flash</MenuItem>
					</Selectbox>
					<Button onClick={this.onResetClick}>Reset</Button>
				</div>

				<div>
					<Selectbox defaultValue="superman">
						<MenuItem value="superman">Superman</MenuItem>
						<MenuItem value="batman">Batman</MenuItem>
						<MenuItem value="flash">Flash</MenuItem>
					</Selectbox>
					<Selectbox defaultValue="superman"
					           isDisabled={true}>
						<MenuItem value="superman">Superman</MenuItem>
						<MenuItem value="batman">Batman</MenuItem>
						<MenuItem value="flash">Flash</MenuItem>
					</Selectbox>
				</div>
			</Demo>
		);
	}

	onHeroChange = hero => {
		this.setState({
			hero
		});
	}

	onResetClick = e => {
		this.setState({
			hero: (void 0) //eslint-disable-line no-void
		});
	}
}

storiesOf('Selectbox', module).add('default', () => <SelectboxPage/>);