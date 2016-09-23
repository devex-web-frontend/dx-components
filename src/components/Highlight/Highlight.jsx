import React from 'react';
import {themr} from 'react-css-themr';
import {PURE} from 'dx-util/src/react/pure';

export const HIGHLIGHT = Symbol('Mark');

export const HIGHLIGHT_THEME_SHAPE = {
	container: React.PropTypes.string,
	mark: React.PropTypes.string
};

@PURE
@themr(HIGHLIGHT)
export default class Highlight extends React.Component {
	static propTypes = {
		search: React.PropTypes.string,
		children: React.PropTypes.string,
		theme: React.PropTypes.shape(HIGHLIGHT_THEME_SHAPE)
	};

	static defaultProps = {
		children: '',
		search: ''
	};

	render() {
		const search = this.props.search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, 'i');
		const splitted = this.props.children.split(new RegExp(`(${search})`, 'ig'));
		const {theme} = this.props;

		return (
			<span className={theme.container}>
				{splitted.reduce((acc, el, i) => {
					if (el.trim() !== '') {
						acc.push(i % 2 ? <mark className={theme.mark} key={i}>{el}</mark> : el);
					}
					return acc;
				}, [])}
			</span>
		);
	}
}