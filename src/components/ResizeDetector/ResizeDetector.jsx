import React from 'react';
import ReactDOM from 'react-dom';
import {PURE} from 'dx-util/src/react/pure';
import {themr} from 'react-css-themr';

export const RESIZE_DETECTOR = Symbol('ResizeDetector');

@PURE
@themr(RESIZE_DETECTOR)
export default class ResizeDetector extends React.Component {
	static propTypes = {
		theme: React.PropTypes.shape({
			container: React.PropTypes.string
		}),
		onResize: React.PropTypes.func
	}

	componentDidMount() {
		ReactDOM.findDOMNode(this).contentWindow.addEventListener('resize', this.onResize);
	}

	componentWillUnmount() {
		ReactDOM.findDOMNode(this).contentWindow.removeEventListener('resize', this.onResize);
	}

	render() {
		return (
			<iframe src="about:blank" className={this.props.theme.container}/>
		);
	}

	onResize = e => {
		this.props.onResize && this.props.onResize(e);
	}
}