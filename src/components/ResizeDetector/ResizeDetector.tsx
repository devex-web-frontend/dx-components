import * as React from 'react';
import { PURE } from 'dx-util/src/react/pure';
import { themr } from 'react-css-themr';
import { ComponentClass } from 'react';
let detectorFactory;
import { TDetectoryFactoryOptions } from 'element-resize-detector';
if (typeof __IS_NODE__ === 'undefined') {
	detectorFactory = require('element-resize-detector');
} else {
	detectorFactory = (options: TDetectoryFactoryOptions) => ({
		listenTo: () => {},
		uninstall: () => {}
	});
}
import { raf } from '../../util/func/raf';

const NativeResizeDetector = detectorFactory({
	strategy: 'scroll'
});

export const RESIZE_DETECTOR = Symbol('ResizeDetector');

type TResizeDetectorOwnProps = {
	onResize: (element: Element) => any
};

type TResizeDetectorInjectedProps = {
	theme: {
		container?: string
	},

};

type TResizeDetectorFullProps = TResizeDetectorOwnProps & TResizeDetectorInjectedProps;

@PURE
class RawResizeDetector extends React.Component<TResizeDetectorFullProps, any> {
	private element: HTMLDivElement | null;

	componentDidMount() {
		if (this.element) {
			NativeResizeDetector.listenTo(this.element, this.onResize);
		}
	}

	componentWillUnmount() {
		if (this.element) {
			NativeResizeDetector.uninstall(this.element);
		}
	}

	render() {
		const { theme } = this.props;
		return (
			<div className={theme.container} ref={el => this.element = el} />
		);
	}

	onResize = raf((element: Element) => {
		this.props.onResize(element);
	});
}

export type TResizeDetectorProps = TResizeDetectorOwnProps & Partial<TResizeDetectorInjectedProps>;
export default themr(RESIZE_DETECTOR)(RawResizeDetector) as ComponentClass<TResizeDetectorProps>;
