import * as React from 'react';
import { PURE } from 'dx-util/lib/react/pure';
import { theme } from '../../util/react/theme';

export const ICON = Symbol('Icon');
export type TIconProps = {
	name: string,
	theme: {
		container?: string
	}
};

@PURE
class RawIcon extends React.Component<TIconProps> {
	render() {
		const { name, theme } = this.props;

		return (
			<svg className={`${theme.container}`}>
				<use xlinkHref={`#${name}`}/>
			</svg>
		);
	}
}

export const Icon = theme(ICON)(RawIcon);