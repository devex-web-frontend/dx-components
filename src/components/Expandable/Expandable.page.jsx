import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import Button from '../Button/Button';
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
	static propTypes = {
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

	state = {}

	render() {
		const {shouldExpandAll} = this.state;
		return (
			<Demo>
				<section className={css.section}>
					<Button isFlat={true}
					        onClick={this.onExpandAllClick}>
						Expand All
					</Button>
					<Button isFlat={true}
					        onClick={this.onCollapseAllClick}>
						Collapse All
					</Button>
				</section>
				<section className={css.section}>
					<Expandable Handler={Handler} onToggle={this.onToggle} isExpanded={shouldExpandAll}>
						You will not be asked for further confirmation of trades. <br/>
						Trades will be executed with on click.
					</Expandable>
				</section>
				<section className={css.section}>
					<Expandable Handler={Handler} onToggle={this.onToggle}
					            isExpanded={typeof shouldExpandAll === 'undefined' ? true : shouldExpandAll}>
						You will not be asked for further confirmation of trades. <br/>
						Trades will be executed with on click.
					</Expandable>
				</section>
			</Demo>
		);
	}

	onExpandAllClick = e => {
		this.setState({
			shouldExpandAll: true
		});
	}

	onCollapseAllClick = e => {
		this.setState({
			shouldExpandAll: false
		});
	}

	onToggle = (isExpanded) => {
		action('Change')('resized', isExpanded);
	}
}

storiesOf('Expandable', module).add('default', () => <ExpandablePage/>);