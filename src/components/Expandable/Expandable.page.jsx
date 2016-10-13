import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Demo from '../../demo/Demo.jsx';
import Icon from '../Icon/Icon';
import Expandable from './Expandable';
import {PURE} from 'dx-util/src/react/pure';

import iconMoveLeft from '../DatePicker/resources/icon-move-left.svg';
import iconMoveRight from '../DatePicker/resources/icon-move-right.svg';

import css from './Expandable.page.styl';

const iconTheme = {
	container: css.icon
};

class Handler extends React.Component {
	static propTypes ={
		isExpanded: React.PropTypes.bool
	}

	render() {
		const {isExpanded} = this.props;
		const text = isExpanded ? 'Close me!' : 'Open me!';
		const icon = isExpanded ? iconMoveRight : iconMoveLeft;

		return (
			<div>
				{text}
				<Icon name={icon} theme={iconTheme}/>
			</div>
		);
	}
}

@PURE
class ExpandablePage extends React.Component {
	render() {
		return (
			<Demo>
				<section className={css.section}>
					<Expandable Handler={Handler}>
						You will not be asked for further confirmation of trades. <br/>
						Trades will be executed with on click.
					</Expandable>
				</section>
			</Demo>
		);
	}
}

storiesOf('Expandable', module).add('default', () => <ExpandablePage/>);