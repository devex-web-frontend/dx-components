import React from 'react';
import {PURE} from 'dx-util/lib/react/pure';
import {themr} from 'react-css-themr';

export const RESIZE_DETECTOR = Symbol('ResizeDetector');

@PURE
@themr(RESIZE_DETECTOR)
export default class ResizeDetector extends React.Component {
	_object;

	static propTypes = {
		theme: React.PropTypes.shape({
			container: React.PropTypes.string
		}),
		onResize: React.PropTypes.func
	}

	componentDidMount() {
		this._object.contentDocument.defaultView.addEventListener('resize', this.onResize);
	}

	componentWillUnmount() {
		this._object.contentDocument.defaultView.removeEventListener('resize', this.onResize);
		delete this['_object'];
	}

	render() {
		const style = {
			display: 'block',
			position: 'absolute',
			top: 0,
			left: 0,
			height: '100%',
			width: '100%',
			overflow: 'hidden',
			pointerEvents: 'none',
			zIndex: '-1'
		};
		const {theme} = this.props;

		return (
			<object style={style} type="text/html" ref={el => this._object = el} data="about: blank"
			        className={theme.container}/>
		);
	}

	onResize = (event) => {
		const win = event.target || event.srcElement;
		if (win.__resizeRAF__) {
			cancelAnimationFrame(win.__resizeRAF__);
		}
		win.__resizeRAF__ = requestAnimationFrame(() => {
			const {onResize} = this.props;
			onResize && onResize(event);
		});
	}
}