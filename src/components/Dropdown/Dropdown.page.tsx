import * as React from 'react';

import { storiesOf } from '@kadira/storybook';
import { Demo } from '../../demo/Demo';
import { Dropdown } from './Dropdown';
import { Component, MouseEventHandler, ReactNode, SFC } from 'react';
import { Button } from '../Button/Button';
import { WithInnerRef } from '../../util/react/typings';
import { PURE } from 'dx-util/lib/react/pure';
import { stateful } from '../Control/Control';

type TAnchorProps = WithInnerRef<{
	onClick: MouseEventHandler<Element>,
	children: ReactNode,
	isOpened?: boolean,
}>;

const StatefulDropdown = stateful('isOpened', 'onToggle')(Dropdown);

@PURE
class AnchorClass extends Component<TAnchorProps> {
	render() {
		const { innerRef, children, onClick, isOpened } = this.props;

		console.log('rendering anchor class');

		return (
			<Button ref={innerRef}
			        onClick={onClick}>
				Class Anchor{isOpened && ' is Opened'}
				{children}
			</Button>
		);
	}
}

const AnchorSFC: SFC<TAnchorProps> = props => {
	const { innerRef, children, onClick } = props;
	return (
		<Button ref={innerRef} onClick={onClick}>
			SFC Anchor
			{children}
		</Button>
	);
};

storiesOf('Dropdown', module)
	.add('with class Anchor', () => (
		<Demo>
			<StatefulDropdown Anchor={AnchorClass}>
				<div>hi!</div>
			</StatefulDropdown>
		</Demo>
	))
	.add('with SFC Anchor', () => (
		<Demo>
			<StatefulDropdown Anchor={AnchorSFC} onToggle={console.log.bind(console)}>
				hi
			</StatefulDropdown>
		</Demo>
	))
	.add('with force close', () => (
		<Demo>
			<DropdownPage/>
		</Demo>
	));

class DropdownPage extends Component<any, any> {
	private forceClose: Function;

	render() {
		return (
			<div>
				<StatefulDropdown Anchor={AnchorClass}>
					<Button>Force close</Button>
				</StatefulDropdown>
			</div>
		);
	}

	onForceCloseClick = () => {
		this.forceClose();
	}

	getForceClose = (close: Function) => {
		this.forceClose = close;
	};
}