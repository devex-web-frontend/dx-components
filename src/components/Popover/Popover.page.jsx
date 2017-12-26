import React from 'react';
import Demo from '../../demo/Demo.jsx';
import { Button } from '../Button/Button';
import { Popover, PopoverPlacement, PopoverAlign } from './Popover.tsx';
import { Selectbox } from '../Selectbox/Selectbox.tsx';
import { MenuItem } from '../Menu/Menu.tsx';
import { PURE } from 'dx-util/lib/react/pure';
import { storiesOf } from '@kadira/storybook';
import stateful from '../../util/react/stateful';

import css from './Popover.page.styl';
import * as PropTypes from 'prop-types';

const buttonTheme = {
	container: css.toggleButton
};

@PURE
class HeavyContent extends React.Component {
	static propTypes = {
		isLong: PropTypes.bool
	}

	render() {
		return (
			<div>
				<h2>Tethered Content</h2>
				<p>A paragraph to accompany the title.</p>
				<p>A paragraph to accompany the title.</p>
				<p>A paragraph to accompany the title.</p>
				<p>A paragraph to accompany the title.</p>
				<p>A paragraph to accompany the title.</p>
				{this.props.isLong && (
					<div>
						<p>A paragraph to accompany the title.</p>
						<p>A paragraph to accompany the title.</p>
						<p>A paragraph to accompany the title.</p>
						<p>A paragraph to accompany the title.</p>
					</div>
				)}
			</div>
		);
	}
}

const Stateful = stateful()(Selectbox);

@PURE
class PopoverPage extends React.Component {

	state = {
		placement: PopoverPlacement.Bottom,
		align: PopoverAlign.Left,
		isOpened: false,
		isLongText: false,
		closeOnClickAway: false
	};

	_anchor;

	render() {
		const { placement, align, isOpened, closeOnClickAway } = this.state;

		return (
			<Demo>
				<div className={css.container}>
					<div>
						<label className={css.label}>Placement</label>
						<Stateful defaultValue={PopoverPlacement.Bottom}
						          onChange={this.onPlacementSelect}>
							<MenuItem value={PopoverPlacement.Top}>Top</MenuItem>
							<MenuItem value={PopoverPlacement.Bottom}>Bottom</MenuItem>
							<MenuItem value={PopoverPlacement.Left}>Left</MenuItem>
							<MenuItem value={PopoverPlacement.Right}>Right</MenuItem>
						</Stateful>
						<label className={css.label}>Align</label>
						{(placement === PopoverPlacement.Top || placement === PopoverPlacement.Bottom) && (
							<Stateful defaultValue={PopoverAlign.Left}
							          onChange={this.onAlignSelect}>
								<MenuItem value={PopoverAlign.Left}>Left</MenuItem>
								<MenuItem value={PopoverAlign.Center}>Center</MenuItem>
								<MenuItem value={PopoverAlign.Right}>Right</MenuItem>
							</Stateful>
						)}
						{(placement === PopoverPlacement.Left || placement === PopoverPlacement.Right) && (
							<Stateful defaultValue={PopoverAlign.Top}
							          onChange={this.onAlignSelect}>
								<MenuItem value={PopoverAlign.Top}>Top</MenuItem>
								<MenuItem value={PopoverAlign.Middle}>Middle</MenuItem>
								<MenuItem value={PopoverAlign.Bottom}>Bottom</MenuItem>
							</Stateful>
						)}
						<label className={css.label}>
							Close on clickaway <input type="checkbox"
							                          value={closeOnClickAway}
							                          onChange={this.onCloseOnClickAwayChange}/>
						</label>
					</div>
					<Button isPrimary={true}
					        onClick={this.onToggleClick}
					        ref={el => this._anchor = el}
					        theme={buttonTheme}>
						{isOpened ? 'Hide' : 'Open'}
						<Popover placement={placement}
						         isOpened={isOpened}
						         onRequestClose={this.onPopoverRequestClose}
						         closeOnClickAway={closeOnClickAway}
						         hasArrow={true}
						         align={align}
						         anchor={this._anchor}>
							<HeavyContent/>
						</Popover>
					</Button>
				</div>
			</Demo>
		);
	}

	onPlacementSelect = placement => {
		const placementWasVertical = [PopoverPlacement.Top, PopoverPlacement.Bottom].includes(this.state.placement);
		const placementWillBeVertical = [PopoverPlacement.Top, PopoverPlacement.Bottom].includes(placement);
		if (placementWasVertical && !placementWillBeVertical) {
			//placement orientation changed from vertical to horizontal
			//choose default vertical align
			this.setState({
				align: PopoverAlign.Top
			});
		} else if (!placementWasVertical && placementWillBeVertical) {
			//placement orientation changed from horizontal to vertical
			//choose default horizontal align
			this.setState({
				align: PopoverAlign.Left
			});
		}
		//finally set placement
		this.setState({
			placement
		});
	}

	onAlignSelect = align => {
		this.setState({
			align
		});
	}

	onToggleClick = e => {
		this.setState({
			isOpened: !this.state.isOpened
		});
	}

	onPopoverRequestClose = () => {
		this.setState({
			isOpened: false
		});
	}

	onCloseOnClickAwayChange = e => {
		this.setState({
			closeOnClickAway: !this.state.closeOnClickAway
		});
	}
}

storiesOf('Popover', module).add('default', () => (
	<PopoverPage/>
));