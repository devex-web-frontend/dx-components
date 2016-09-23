import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Demo from '../../demo/Demo.jsx';
import Button from '../Button/Button.jsx';
import Selectbox from './Selectbox.jsx';
import SelectboxAnchor from './SelectboxAnchor.jsx';
import MenuItem from '../Menu/MenuItem.jsx';
import {PURE} from 'dx-util/src/react/pure';

import iconListItemTick from './img/icon-list-item-tick.svg';
import iconSmallDropdownArrow from './img/icon-small-dropdown-arrow.svg';
import css from './Selectbox.demo.styl';

class ThemeSelectboxAnchor extends React.Component {

	static propTypes = {
		...SelectboxAnchor.propTypes
	}

	render() {
		const {theme, ...props} = this.props;

		const newProps = {
			...props,
			isPrimary: true,
			theme: {
				...theme,
				container: css.container__anchor,
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
				<div>
					<Selectbox value={0}
					           placeholder={'Choose value'}
					           AnchorComponent={ThemeSelectboxAnchor}
					           selectedItemIconName={iconListItemTick}
					           caretIconName={iconSmallDropdownArrow}>
						<MenuItem value={0}>0</MenuItem>
						<MenuItem value={1}>1</MenuItem>
						<MenuItem value={2}>2</MenuItem>
					</Selectbox>
					<Selectbox placeholder="Choose your hero"
					           AnchorComponent={ThemeSelectboxAnchor}
					           selectedItemIconName={iconListItemTick}
					           onChange={this.onHeroChange}
					           caretIconName={iconSmallDropdownArrow}>
						<MenuItem value="superman">Superman</MenuItem>
						<MenuItem value="batman">Batman</MenuItem>
						<MenuItem value="flash">Flash</MenuItem>
					</Selectbox>
					<Selectbox placeholder="Controlled by left"
					           AnchorComponent={ThemeSelectboxAnchor}
					           value={this.state.hero}
					           onChange={this.onHeroChange}
					           selectedItemIconName={iconListItemTick}
					           caretIconName={iconSmallDropdownArrow}>
						<MenuItem value="superman">Superman</MenuItem>
						<MenuItem value="batman">Batman</MenuItem>
						<MenuItem value="flash">Flash</MenuItem>
					</Selectbox>
					<Selectbox defaultValue="batman"
					           AnchorComponent={ThemeSelectboxAnchor}
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
					<Selectbox defaultValue="batman"
					           AnchorComponent={ThemeSelectboxAnchor}>
						<MenuItem value="superman">Superman</MenuItem>
						<MenuItem value="batman">Batman</MenuItem>
						<MenuItem value="flash">Flash</MenuItem>
					</Selectbox>
					<Selectbox defaultValue="superman"
					           AnchorComponent={ThemeSelectboxAnchor}
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