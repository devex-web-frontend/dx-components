import React from 'react';
import {themr} from 'react-css-themr';
import ComboboxAnchor from './ComboboxAnchor';
import Selectbox, {SELECTBOX_THEME} from '../Selectbox/Selectbox.jsx';
import {PURE} from 'dx-util/src/react/pure';

export const COMBOBOX = Symbol('Combobox');

@PURE
@themr(COMBOBOX)
export default class Combobox extends React.Component {

	static propTypes = {
		...Selectbox.propTypes,
		theme: React.PropTypes.shape({
			...SELECTBOX_THEME,
			container: React.PropTypes.string
		})
	}

	static defaultProps = {
		...Selectbox.defaultProps,
		AnchorComponent: ComboboxAnchor
	}

	render() {
		return (
			<div className={this.props.theme.container}>
				<Selectbox {...this.props} />
			</div>
		);
	}

}