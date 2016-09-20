import React from 'react';
import {themr} from 'react-css-themr';
import ComboboxAnchor from './ComboboxAnchor';
import Selectbox from '../Selectbox/Selectbox.jsx';
import {PURE} from 'dx-util/src/react/pure';

export const COMBOBOX = Symbol('Combobox');

@PURE
@themr(COMBOBOX)
export default class Combobox extends React.Component {

	static propTypes = {
		...Selectbox.PropTypes,
		AnchorComponent: React.PropTypes.func,
		theme: React.PropTypes.shape({
			container: React.PropTypes.string
		})
	}

	static defaultProps = {
		...Selectbox.defaultProps,
		AnchorComponent: ComboboxAnchor
	}

	render() {
		const {
			children,
			...props
		} = this.props;

		return (
			<div className={this.props.theme.container}>
				<Selectbox {...props}>
					{children}
				</Selectbox>
			</div>
		);
	}

}