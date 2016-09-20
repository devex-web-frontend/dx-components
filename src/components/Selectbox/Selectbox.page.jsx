import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Demo from '../../demo/Demo.jsx';
import Button from '../Button/Button.jsx';
import Selectbox from './Selectbox.jsx';
import css from './Selectbox.demo.styl';
import MenuItem from '../Menu/MenuItem.jsx';
import {PURE} from 'dx-util/src/react/pure';

import iconListItemTick from './img/icon-list-item-tick.svg';

import SelectboxAnchor from './SelectboxAnchor.jsx';
import iconSmallDropdownArrow from './img/icon-small-dropdown-arrow.svg';

class ThemeSelectboxAnchor extends React.Component {

	render() {
		const newProps = {
			...this.props,
			isPrimary: true,
			theme: {
				container: css.container__anchor,
				content_hasCaret: css.container__anchor__content_hasCaret,
				caret: css.container__anchor__caret
			},
			caretIconName: iconSmallDropdownArrow
		};

		return <SelectboxAnchor {...newProps}/>;
	}
}

@PURE
class SelectboxPage extends React.Component {
	state = {}

	render() {
		return (
			<Demo>
				<section>
					<Selectbox placeholder="Choose your hero"
					           selectedItemIconName={iconListItemTick}
					           AnchorComponent={ThemeSelectboxAnchor}
					           onChange={this.onHeroChange}>
						<MenuItem value="superman">Superman</MenuItem>
						<MenuItem value="batman">Batman</MenuItem>
						<MenuItem value="flash">Flash</MenuItem>
					</Selectbox>
					<Selectbox placeholder="Controlled by left"
					           value={this.state.hero}
					           AnchorComponent={ThemeSelectboxAnchor}
					           onChange={this.onHeroChange}
					           selectedItemIconName={iconListItemTick}
					           caretIconName={iconSmallDropdownArrow}>
						<MenuItem value="superman">Superman</MenuItem>
						<MenuItem value="batman">Batman</MenuItem>
						<MenuItem value="flash">Flash</MenuItem>
					</Selectbox>
					<Selectbox defaultValue="batman"
					           value={this.state.hero}
					           AnchorComponent={ThemeSelectboxAnchor}
					           onChange={this.onHeroChange}
					           selectedItemIconName={iconListItemTick}
					           caretIconName={iconSmallDropdownArrow}>
						<MenuItem value="superman">Superman</MenuItem>
						<MenuItem value="batman">Batman</MenuItem>
						<MenuItem value="flash">Flash</MenuItem>
					</Selectbox>
					<Button onClick={this.onResetClick}>Reset</Button>
				</section>


				<section>
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
				</section>
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