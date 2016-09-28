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

class DemoSelectboxAnchor extends React.Component {

	static propTypes = {
		...SelectboxAnchor.propTypes
	}

	render() {
		const newProps = {
			...this.props,
			isPrimary: true
		};
		return <SelectboxAnchor {...newProps}/>;
	}
}

class DemoSelectbox extends React.Component {
	static propTypes = {
		...Selectbox.propTypes
	}

	render() {
		const newProps = {
			...this.props,
			AnchorComponent: DemoSelectboxAnchor,
			caretIconName: iconSmallDropdownArrow,
		};

		return <Selectbox {...newProps} />;
	}
}

@PURE
class SelectboxPage extends React.Component {
	state = {}

	render() {
		return (
			<Demo>
				<div>
					<DemoSelectbox value={0}
					               selectedItemIconName={iconListItemTick}
					               placeholder={'Choose value'}>
						<MenuItem value={0}>0</MenuItem>
						<MenuItem value={1}>1</MenuItem>
						<MenuItem value={2}>2</MenuItem>
					</DemoSelectbox>
					<DemoSelectbox placeholder="Choose your hero"
					               selectedItemIconName={iconListItemTick}
					               onChange={this.onHeroChange}
					               caretIconName={iconSmallDropdownArrow}>
						<MenuItem value="superman">Superman</MenuItem>
						<MenuItem value="batman">Batman</MenuItem>
						<MenuItem value="flash">Flash</MenuItem>
					</DemoSelectbox>
					<DemoSelectbox placeholder="Controlled by left"
					               selectedItemIconName={iconListItemTick}
					               value={this.state.hero}
					               onChange={this.onHeroChange}>
						<MenuItem value="superman">Superman</MenuItem>
						<MenuItem value="batman">Batman</MenuItem>
						<MenuItem value="flash">Flash</MenuItem>
					</DemoSelectbox>
					<DemoSelectbox defaultValue="batman"
					               selectedItemIconName={iconListItemTick}
					               value={this.state.hero}
					               onChange={this.onHeroChange}>
						<MenuItem value="superman">Superman</MenuItem>
						<MenuItem value="batman">Batman</MenuItem>
						<MenuItem value="flash">Flash</MenuItem>
					</DemoSelectbox>
					<Button onClick={this.onResetClick}>Reset</Button>
				</div>

				<div>
					<DemoSelectbox defaultValue="batman">
						<MenuItem value="superman">Superman</MenuItem>
						<MenuItem value="batman">Batman</MenuItem>
						<MenuItem value="flash">Flash</MenuItem>
					</DemoSelectbox>
					<DemoSelectbox defaultValue="superman"
					               isDisabled={true}>
						<MenuItem value="superman">Superman</MenuItem>
						<MenuItem value="batman">Batman</MenuItem>
						<MenuItem value="flash">Flash</MenuItem>
					</DemoSelectbox>
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