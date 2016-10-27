import React from 'react';
import {themr} from 'react-css-themr';
import split from 'dx-util/src/string/split';
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
		const {search, children, theme} = this.props;

		let result;
		if (this.props.search === '') {
			result = children;
		} else {
			const splitted = split(children, search, false);
			result = splitted.reduce((acc, el, i) => {
				if (el.trim() !== '') {
					acc.push(i % 2 ? <mark className={theme.mark} key={i}>{el}</mark> : el);
				}
				return acc;
			}, []);
		}

		return (
			<span className={theme.container}>
				{result}
			</span>
		);
	}
}