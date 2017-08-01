import * as React from 'react';
import { PURE } from 'dx-util/lib/react/pure';
import { withTheme } from '../../util/react/withTheme';
import { PartialKeys } from 'dx-util/lib/object/object';
import { ObjectClean } from 'typelevel-ts';

export const ICON = Symbol('Icon');
export type TRawIconProps = {
	name: string,
	theme: {
		container?: string
	}
};

@PURE
class RawIcon extends React.Component<TRawIconProps> {
	render() {
		const { name, theme } = this.props;

		return (
			<svg className={`${theme.container}`}>
				<use xlinkHref={`#${name}`}/>
			</svg>
		);
	}
}

export type TIconProps = ObjectClean<PartialKeys<TRawIconProps, 'theme'>>;
export const Icon = withTheme(ICON)(RawIcon);