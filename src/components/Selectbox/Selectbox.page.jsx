import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Demo from '../../demo/Demo.jsx';
import { Button } from '../Button/Button';
import { Selectbox } from './Selectbox.tsx';
import { SelectboxAnchor } from './SelectboxAnchor.tsx';
import { MenuItem } from '../Menu/Menu.tsx';
import { PURE } from 'dx-util/lib/react/pure';

import iconListItemTick from './img/icon-list-item-tick.svg';
import iconSmallDropdownArrow from './img/icon-small-dropdown-arrow.svg';
import { stateful } from '../Control/Control';

import * as selectoxPageCss from './Selectbox.page.styl';
const wideSelectboxTheme = {
	container__anchor: selectoxPageCss.container__anchor
};

class DemoSelectboxAnchor extends React.Component {
	render() {
		const newProps = {
			...this.props,
			isPrimary: true
		};
		return <SelectboxAnchor {...newProps}/>;
	}
}

class DemoSelectbox extends React.Component {
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
					          onValueChange={this.onHeroChange}
					          caretIconName={iconSmallDropdownArrow}>
						<MenuItem value="superman">Superman</MenuItem>
						<MenuItem value="batman">Batman</MenuItem>
						<MenuItem value="flash">Flash</MenuItem>
					</Stateful>
					<DemoSelectbox placeholder="Controlled by left"
					               value={this.state.hero}
					               selectedItemIconName={iconListItemTick}
					               onValueChange={this.onHeroChange}
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
				<section>
					Sync width
					<Stateful placeholder="Choose your hero"
					          shouldSyncWidth={true}
					          theme={wideSelectboxTheme}
					          selectedItemIconName={iconListItemTick}
					          caretIconName={iconSmallDropdownArrow}>
						<MenuItem value="superman">Superman</MenuItem>
						<MenuItem value="batman">Batman</MenuItem>
						<MenuItem value="flash">Flash</MenuItem>
					</Stateful>
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