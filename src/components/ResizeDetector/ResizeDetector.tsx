import * as React from 'react';
import { PURE } from 'dx-util/lib/react/pure';
import { themr } from 'react-css-themr';
import { withTheme } from '../../util/react/withTheme';
import { EventHandler, ReactEventHandler, ReactInstance, SyntheticEvent } from 'react';
import { ObjectClean } from 'typelevel-ts/lib';
import { PartialKeys } from 'dx-util/lib/object/object';

export const RESIZE_DETECTOR = Symbol('ResizeDetector');

export type TFullResizeDetectorProps = {
	theme: {
		container?: string
	},
	onResize: ReactEventHandler<HTMLIFrameElement>
};

@PURE
class RawResizeDetector extends React.Component<TFullResizeDetectorProps> {
	static propTypes = {
		theme: React.PropTypes.shape({
			container: React.PropTypes.string
		}),
		onResize: React.PropTypes.func
	};

	_resizeDetector: HTMLIFrameElement | null;

	componentDidMount() {
		if (this._resizeDetector) {
			this._resizeDetector.contentWindow.addEventListener('resize', this.onResize);
		}
	}

	componentWillUnmount() {
		if (this._resizeDetector) {
			this._resizeDetector.contentWindow.removeEventListener('resize', this.onResize);
			this._resizeDetector = null;
		}
	}

	render() {
		const { theme } = this.props;
		return (
			<iframe src="about:blank" ref={el => this._resizeDetector = el} className={theme.container} />
		);
	}

	onResize: EventListener = event => {
		const { onResize } = this.props;
		onResize && onResize(event as any);
	}
}

export type TResizeDetectorProps = ObjectClean<PartialKeys<TFullResizeDetectorProps, 'theme'>>;
export const ResizeDetector = withTheme(RESIZE_DETECTOR)(RawResizeDetector);