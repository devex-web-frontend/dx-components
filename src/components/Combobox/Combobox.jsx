import React from 'react';
import {themr} from 'react-css-themr';
import ComboboxAnchor from './ComboboxAnchor';
import Selectbox from '../Selectbox/Selectbox.jsx';
import {PURE} from 'dx-util/src/react/pure';

export const COMBOBOX = Symbol('Combobox');
import iconListItemTick from '../Selectbox/img/icon-list-item-tick.svg';

@PURE
@themr(COMBOBOX)
export default class Combobox extends React.Component {

	static propTypes = {
		children: React.PropTypes.node,
		AnchorComponent: React.PropTypes.func,
		theme: React.PropTypes.shape({
			container: React.PropTypes.string,
			wrapper: React.PropTypes.wrapper,
			input: React.PropTypes.string,
			arrow: React.PropTypes.string
		})
	}

	static defaultProps = {
		AnchorComponent: ComboboxAnchor
	}

	render() {
		const {
			theme,
			AnchorComponent: Anchor,
			children
		} = this.props;

		return (
			<div className={theme.container}>
				<Selectbox isPrimary={true}
				           defaultValue={1.00}
				           AnchorComponent={Anchor}
				           selectedItemIconName={iconListItemTick}>
					{children}
				</Selectbox>
			</div>
		);
	}

}