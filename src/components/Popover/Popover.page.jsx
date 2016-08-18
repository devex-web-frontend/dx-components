import React from 'react';
import Demo from '../../demo/Demo.jsx';
import Button from '../Button/Button.jsx';
import Popover, {PLACEMENT, ALIGN} from './Popover.jsx';
import Selectbox from '../Selectbox/Selectbox.jsx';
import MenuItem from '../Menu/MenuItem.jsx';
import {PURE} from 'dx-util/src/react/pure';
import {storiesOf} from '@kadira/storybook';

import css from './Popover.page.styl';
const buttonTheme = {
	container: css.toggleButton
};

@PURE()
class HeavyContent extends React.Component {
	static propTypes = {
		isLong: React.PropTypes.bool
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

const DEFAULT_PLACEMENT = PLACEMENT.BOTTOM;
const DEFAULT_HORIZONTAL_ALIGN = ALIGN.LEFT;
const DEFAULT_VERTICAL_ALIGN = ALIGN.TOP;

@PURE()
class PopoverPage extends React.Component {

	state = {
		placement: DEFAULT_PLACEMENT,
		align: DEFAULT_HORIZONTAL_ALIGN,
		isOpened: false,
		isLongText: false,
		closeOnClickAway: false
	};

	_anchor;

	render() {
		const {placement, align, isOpened, closeOnClickAway} = this.state;

		return (
			<Demo>
				<div className={css.container}>
					<div>
						<label className={css.label}>Placement</label>
						<Selectbox defaultValue={PLACEMENT.BOTTOM} onChange={this.onPlacementSelect}>
							<MenuItem value={PLACEMENT.TOP}>Top</MenuItem>
							<MenuItem value={PLACEMENT.BOTTOM}>Bottom</MenuItem>
							<MenuItem value={PLACEMENT.LEFT}>Left</MenuItem>
							<MenuItem value={PLACEMENT.RIGHT}>Right</MenuItem>
						</Selectbox>
						<label className={css.label}>Align</label>
						{(placement === PLACEMENT.TOP || placement === PLACEMENT.BOTTOM) && (
							<Selectbox defaultValue={DEFAULT_HORIZONTAL_ALIGN}
							           onChange={this.onAlignSelect}>
								<MenuItem value={ALIGN.LEFT}>Left</MenuItem>
								<MenuItem value={ALIGN.CENTER}>Center</MenuItem>
								<MenuItem value={ALIGN.RIGHT}>Right</MenuItem>
							</Selectbox>
						)}
						{(placement === PLACEMENT.LEFT || placement === PLACEMENT.RIGHT) && (
							<Selectbox defaultValue={DEFAULT_VERTICAL_ALIGN}
							           onChange={this.onAlignSelect}>
								<MenuItem value={ALIGN.TOP}>Top</MenuItem>
								<MenuItem value={ALIGN.MIDDLE}>Middle</MenuItem>
								<MenuItem value={ALIGN.BOTTOM}>Bottom</MenuItem>
							</Selectbox>
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
		const placementWasVertical = [PLACEMENT.TOP, PLACEMENT.BOTTOM].includes(this.state.placement);
		const placementWillBeVertical = [PLACEMENT.TOP, PLACEMENT.BOTTOM].includes(placement);
		if (placementWasVertical && !placementWillBeVertical) {
			//placement orientation changed from vertical to horizontal
			//choose default vertical align
			this.setState({
				align: DEFAULT_VERTICAL_ALIGN
			});
		} else if (!placementWasVertical && placementWillBeVertical) {
			//placement orientation changed from horizontal to vertical
			//choose default horizontal align
			this.setState({
				align: DEFAULT_HORIZONTAL_ALIGN
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