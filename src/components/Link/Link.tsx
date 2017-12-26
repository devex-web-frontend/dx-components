import * as React from 'react';
import { PURE } from 'dx-util/lib/react/pure';
import { themr } from 'react-css-themr';
import * as classnames from 'classnames';
import { MouseEvent, EventHandler, ComponentClass } from 'react';
import { withTheme } from '../../util/react/withTheme';
import { PartialKeys } from 'dx-util/lib/object/object';
import { ObjectClean } from 'typelevel-ts/lib';

export const LINK = Symbol('Link');

export type TFullLinkProps = {
	children: React.ReactNode,
	href?: string,
	target?: string,
	rel?: string,
	isDisabled?: boolean,
	processEmptyHash?: boolean,
	onClick?: EventHandler<MouseEvent<HTMLAnchorElement>>,
	theme: {
		container?: string,
		container_isDisabled?: string
	}
};

@PURE
class RawLink extends React.Component<TFullLinkProps> {
	render() {
		const { isDisabled, rel, href, target, children, theme } = this.props;

		const className = classnames(
			theme.container,
			{
				[theme.container_isDisabled as string]: isDisabled
			}
		);

		return (
			<a href={href}
			   rel={rel}
			   target={target}
			   onClick={this.onClick}
			   className={className}>
				{children}
			</a>
		);
	}

	onClick = (e: MouseEvent<HTMLAnchorElement>) => {
		if (this.props.isDisabled || !this.props.processEmptyHash && this.props.href === '#') {
			e.preventDefault();
		}
		this.props.onClick && this.props.onClick(e);
	}
}

export type TLinkProps = ObjectClean<PartialKeys<TFullLinkProps, 'theme'>>;
export const Link: ComponentClass<TLinkProps> = withTheme(LINK)(RawLink);