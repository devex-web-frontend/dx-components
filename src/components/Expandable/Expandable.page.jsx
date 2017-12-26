import React from 'react';
import stateful from '../../util/react/stateful';
import { storiesOf, action } from '@kadira/storybook';
import { ExpandableHandler } from './ExpandableHandler.tsx';
import { Button } from '../Button/Button';
import Demo from '../../demo/Demo.jsx';
import { Icon } from '../Icon/Icon';
import { Expandable } from './Expandable.tsx';
import { PURE } from 'dx-util/lib/react/pure';

import iconMoveLeft from '../DatePicker/resources/icon-move-left.svg';
import iconMoveRight from '../DatePicker/resources/icon-move-right.svg';

import css from './Expandable.page.styl';

const iconTheme = {
	container: css.icon
};

const statefulProps = {
	valueKey: 'isExpanded'
};

const Stateful = stateful(statefulProps)(Expandable);

class CustomHandler extends React.Component {
	render() {
		const {theme, isExpanded} = this.props;
		const text = isExpanded ? 'Close me!' : 'Open me!';
		const icon = isExpanded ? iconMoveRight : iconMoveLeft;

		return (
			<ExpandableHandler theme={theme} isExpanded={isExpanded}>
				{text}
				<Icon name={icon} theme={iconTheme}/>
			</ExpandableHandler>
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
					<Stateful Handler={CustomHandler} onChange={this.onChange} isExpanded={shouldExpandAll}>
						You will not be asked for further confirmation of trades. <br/>
						Trades will be executed with on click.
					</Stateful>
				</section>
				<section className={css.section}>
					<Expandable Handler={ExpandableHandler} onChange={this.onChange}
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

	onChange = (isExpanded) => {
		action('Change')('onChange', isExpanded);
	}
}

storiesOf('Expandable', module).add('default', () => <ExpandablePage/>);