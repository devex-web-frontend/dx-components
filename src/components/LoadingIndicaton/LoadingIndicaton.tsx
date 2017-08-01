import * as React from 'react';
import { ObjectClean } from 'typelevel-ts';
import { PartialKeys } from 'dx-util/lib/object/object';
import { ComponentType } from 'react';
import { theme } from '../../util/react/theme';

export const LOADINGINDICATON = Symbol('LoadingIndicaton');

type TRawLoadingIndicatonProps = {
	isLoading: boolean,
	LoadingIndicatorComponent: ComponentType,
	theme: {
		container?: string
	}
};

class RawLoadingIndicaton extends React.Component<TRawLoadingIndicatonProps> {
	static defaultProps = {
		isLoading: false
	};

	render() {
		const {
			theme,
			isLoading,
			children,
			LoadingIndicatorComponent: LoadingIndicator
		} = this.props;

		return (
			<div className={theme.container}>
				{isLoading && LoadingIndicator && <LoadingIndicator/>}
				{!isLoading && children}
			</div>
		);
	}
}

export type TLoadingIndicationProps = ObjectClean<PartialKeys<TRawLoadingIndicatonProps,
	'LoadingIndicatorComponent' | 'theme'>>;
export type TLoadingIndicationLike = ComponentType<TLoadingIndicationProps>;
export const LoadingIdicator: TLoadingIndicationLike = theme(LOADINGINDICATON)(RawLoadingIndicaton);