import * as React from 'react';
import { PURE } from 'dx-util/lib/react/pure';
import { theme } from '../../util/react/withTheme';
import { ObjectClean } from 'typelevel-ts';
import { PartialKeys } from 'dx-util/lib/object/object';
import { ComponentType } from 'react';

export const LOADING_INDICATOR = Symbol('LoadingIndicator');

type TFullLoadingIndicatorProps = {
	theme: {
		container?: string
	}
};

@PURE
class RawLoadingIndicator extends React.Component<TFullLoadingIndicatorProps> {
	render() {
		const { theme } = this.props;

		return (
			<div className={theme.container}></div>
		);
	}
}

export type TLoadingIndicatorProps = ObjectClean<PartialKeys<TFullLoadingIndicatorProps, 'theme'>>;
export type TLoadingIndicatorLike = ComponentType<TLoadingIndicatorProps>;
export const LoadingIndicator = theme(LOADING_INDICATOR)(RawLoadingIndicator);