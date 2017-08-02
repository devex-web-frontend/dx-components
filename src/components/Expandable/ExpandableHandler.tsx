import * as React from 'react';
import { PURE } from 'dx-util/lib/react/pure';
import { withTheme } from '../../util/react/withTheme';
import { ReactNode } from 'react';
import { ObjectClean } from 'typelevel-ts';
import { PartialKeys } from 'dx-util/lib/object/object';

export const EXPANDABLE_HANDLER = Symbol('ExpandableHandler');

export type TFullExpandableHandlerProps = {
	theme: {
		container?: string
	},
	isExpanded?: boolean,
	children?: ReactNode
};

@PURE
class RawExpandableHandler extends React.Component<TFullExpandableHandlerProps> {
	render() {
		const { theme, children } = this.props;
		return (
			<div className={theme.container}>
				{children}
			</div>
		);
	}
}

export type TExpandableHandlerProps = ObjectClean<PartialKeys<TFullExpandableHandlerProps, 'theme'>>;
export const ExpandableHandler = withTheme(EXPANDABLE_HANDLER)(RawExpandableHandler);