import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Demo from '../../demo/Demo.jsx';
import {Button} from '../Button/Button';
import Selectbox from './Selectbox.jsx';
import SelectboxAnchor from './SelectboxAnchor.jsx';
import MenuItem from '../Menu/MenuItem.jsx';
import {PURE} from 'dx-util/lib/react/pure';
import stateful from '../../util/react/stateful';

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

const Stateful = stateful()(DemoSelectbox);

@PURE
class SelectboxPage extends React.Component {
	state = {}

	render() {
		return (
			<Demo>
				<div>
					<Stateful placeholder="Choose your hero"
					          selectedItemIconName={iconListItemTick}
					          onChange={this.onHeroChange}
					          caretIconName={iconSmallDropdownArrow}>
						<MenuItem value="superman">Superman</MenuItem>
						<MenuItem value="batman">Batman</MenuItem>
						<MenuItem value="flash">Flash</MenuItem>
					</Stateful>
					<DemoSelectbox placeholder="Controlled by left"
					               value={this.state.hero}
					               selectedItemIconName={iconListItemTick}
					               onChange={this.onHeroChange}
					               caretIconName={iconSmallDropdownArrow}>
						<MenuItem value="superman">Superman</MenuItem>
						<MenuItem value="batman">Batman</MenuItem>
						<MenuItem value="flash">Flash</MenuItem>
					</DemoSelectbox>
					<Stateful placeholder="Loading"
					          isDisabled={true}
					          isLoading={true}>
						<MenuItem value="dummy">Dummy</MenuItem>
					</Stateful>
					<Button onClick={this.onResetClick}>Reset</Button>
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