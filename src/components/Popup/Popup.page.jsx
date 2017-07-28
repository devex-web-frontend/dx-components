import React from 'react';
import Popup from './Popup';
import {storiesOf} from '@kadira/storybook';
import {PURE} from 'dx-util/lib/react/pure';
import Demo from '../../demo/Demo';
import {Button} from '../Button/Button';

import css from './Popup.page.styl';

const theme = {
	container: css.container
};

const popupTheme = {
	container: css.popup
};

const header = (
	<div>HEADER</div>
);

const footer = (
	<div>FOOTER</div>
);

@PURE
class PopupPage extends React.Component {
	state = {
		isOpened: false,
		isModal: false,
		shouldCloseOnClickAway: false
	}

	componentDidMount() {
		document.querySelector('html').classList.add(css.html);
	}

	componentWillUnmount() {
		document.querySelector('html').classList.remove(css.html);
	}

	render() {
		const {isOpened, isModal, shouldCloseOnClickAway} = this.state;

		return (
			<Demo theme={theme}>
				<label className={css.label}>
					Modal <input type="checkbox"
					             value={isModal}
					             onChange={this.onIsModalChange}/>
				</label>
				<label className={css.label}>
					Close on clickaway <input type="checkbox"
					             value={shouldCloseOnClickAway}
					             onChange={this.onCloseOnClickAwayChange}/>
				</label>
				<Button isPrimary={true}
				        onClick={this.onToggleClick}>
					{isOpened ? 'Close' : 'Open'}
					<Popup theme={popupTheme}
					       header={header}
					       footer={footer}
					       isModal={isModal}
					       shouldCloseOnClickAway={shouldCloseOnClickAway}
					       onRequestClose={this.onPopupRequestClose}
					       isOpened={isOpened}>
						<div>popup content</div>
					</Popup>
				</Button>
			</Demo>
		);
	}

	onToggleClick = e => {
		this.setState({
			isOpened: !this.state.isOpened
		});
	}

	onIsModalChange = e => {
		this.setState({
			isModal: !this.state.isModal
		});
	}

	onCloseOnClickAwayChange = e => {
		this.setState({
			shouldCloseOnClickAway: !this.state.shouldCloseOnClickAway
		});
	}

	onPopupRequestClose = () => {
		this.setState({
			isOpened: false
		});
	}
}

storiesOf('Popup', module).add('Default', () => <PopupPage/>);