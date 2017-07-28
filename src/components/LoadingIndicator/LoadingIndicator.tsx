import * as React from 'react';
import { PURE } from 'dx-util/lib/react/pure';
import { theme } from '../../util/react/theme';

export const LOADING_INDICATOR = Symbol('LoadingIndicator');

export type TLoadingIndicatorProps = {
	theme: {
		container?: string
	}
};

@PURE
class RawLoadingIndicator extends React.Component<TLoadingIndicatorProps> {
	render() {
		const { theme } = this.props;

		return (
			<div className={theme.container}></div>
		);
	}
}

export const LoadingIndicator = theme(LOADING_INDICATOR)(RawLoadingIndicator);