import * as React from 'react';
import { ExpandableHandler, TExpandableHandlerProps } from './ExpandableHandler';
import * as classnames from 'classnames';
import { PURE } from 'dx-util/lib/react/pure';
import { withTheme } from '../../util/react/withTheme';
import { ComponentClass, ComponentType, ReactNode } from 'react';
import { ObjectClean } from 'typelevel-ts';
import { PartialKeys } from 'dx-util/lib/object/object';

export const EXPANDABLE = Symbol('Expandable');

export type TFullExpandableProps = {
	theme: {
		container?: string,
		container_isExpanded?: string,
		content?: string,
		handler?: string,
		Handler?: TExpandableHandlerProps['theme']
	},
	children: ReactNode,
	isExpanded?: boolean,
	Handler: ComponentType<TExpandableHandlerProps>
	onChange?: (isExpanded: boolean) => void
};

@PURE
class RawExpandable extends React.Component<TFullExpandableProps> {
	static defaultProps = {
		Handler: ExpandableHandler,
		isExpanded: false
	};

	render() {
		const { theme, Handler, isExpanded, children } = this.props;

		const className = classnames(theme.container, {
			[theme.container_isExpanded as string]: isExpanded
		});

		return (
			<div className={className}>
				<div className={theme.handler} onClick={this.onHandlerClick}>
					<Handler isExpanded={isExpanded} theme={theme.Handler}/>
				</div>
				<div className={theme.content}>
					{children}
				</div>
			</div>
		);
	}

	onHandlerClick = () => {
		const { onChange, isExpanded } = this.props;

		onChange && onChange(!isExpanded);
	}
}

export type TExpandableProps = ObjectClean<PartialKeys<TFullExpandableProps, 'theme' | 'Handler'>>;
export const Expandable: ComponentClass<TExpandableProps> = withTheme(EXPANDABLE)(RawExpandable);