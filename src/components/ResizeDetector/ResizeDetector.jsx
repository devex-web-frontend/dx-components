import React from 'react';
import {PURE} from 'dx-util/src/react/pure';
import {themr} from 'react-css-themr';

export const RESIZE_DETECTOR = Symbol('ResizeDetector');

@PURE
@themr(RESIZE_DETECTOR)
export default class ResizeDetector extends React.Component {

	_resizeDetector;

	static propTypes = {
		theme: React.PropTypes.shape({
			container: React.PropTypes.string
		}),
		onResize: React.PropTypes.func
	}

	componentDidMount() {
		this._resizeDetector.contentWindow.addEventListener('resize', this.onResize);
	}

	componentWillUnmount() {
		this._resizeDetector.contentWindow.removeEventListener('resize', this.onResize);
		delete this['_resizeDetector'];
	}

	render() {
		const {theme} = this.props;
		return (
			<iframe src="about:blank" ref={el => this._resizeDetector = el} className={theme.container} />
		);
	}

	onResize = (event) => {
		const {onResize} = this.props;
		onResize && onResize(event);
	}
}