import * as React from 'react';

import { storiesOf } from '@kadira/storybook';
import { Demo } from '../../demo/Demo';
import { Dropdown } from './Dropdown';
import { Component, MouseEventHandler, ReactNode, SFC } from 'react';
import { Button } from '../Button/Button';
import { WithInnerRef } from '../../util/react/typings';
import { PURE } from 'dx-util/lib/react/pure';

type TAnchorProps = WithInnerRef<{
	onClick: MouseEventHandler<Element>,
	children: ReactNode
}>;

@PURE
class AnchorClass extends Component<TAnchorProps> {
	render() {
		const { innerRef, children, onClick } = this.props;

		console.log('rendering anchor class');

		return (
			<Button ref={innerRef}
			        onClick={onClick}>
				Class Anchor
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
			<Dropdown Anchor={AnchorClass}>
				<div>hi!</div>
			</Dropdown>
		</Demo>
	))
	.add('with SFC Anchor', () => (
		<Demo>
			<Dropdown Anchor={AnchorSFC}>
				hi
			</Dropdown>
		</Demo>
	));