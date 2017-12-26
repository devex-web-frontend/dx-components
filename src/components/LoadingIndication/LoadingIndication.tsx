import * as React from 'react';
import { ObjectClean } from 'typelevel-ts';
import { PartialKeys } from 'dx-util/lib/object/object';
import { ComponentClass, ComponentType } from 'react';

import { withTheme } from '../../util/react/withTheme';
import { LoadingIndicator, TLoadingIndicatorProps } from '../LoadingIndicator/LoadingIndicator';
import { PURE } from 'dx-util/lib/react/pure';
import * as cn from 'classnames';

export const LOADING_INDICATION = Symbol('LoadingIndicaton');

type TRawLoadingIndicatonProps = {
	isVisible?: boolean,
	LoadingIndicator: ComponentType<TLoadingIndicatorProps>,
	theme: {
		container?: string,
		container_isVisible?: string,
		LoadingIndicator?: TLoadingIndicatorProps['theme']
	}
};

@PURE
class RawLoadingIndicaton extends React.Component<TRawLoadingIndicatonProps> {
	static defaultProps = {
		LoadingIndicator
	};

	render() {
		const {
			theme,
			isVisible,
			LoadingIndicator
		} = this.props;

		const className = cn(theme.container, {
			[theme.container_isVisible as string]: isVisible
		});

		return (
			<div className={className}>
				<LoadingIndicator theme={theme.LoadingIndicator}/>
			</div>
		);
	}
}

export type TLoadingIndicationProps = ObjectClean<PartialKeys<TRawLoadingIndicatonProps,
	'LoadingIndicator' | 'theme'>>;
export const LoadingIndication: ComponentClass<TLoadingIndicationProps> =
	withTheme(LOADING_INDICATION)(RawLoadingIndicaton);