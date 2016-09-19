import React from 'react';
import Popup from './Popup';
import {storiesOf} from '@kadira/storybook';
import {PURE} from 'dx-util/src/react/pure';
import Demo from '../../demo/Demo';
import Button from '../Button/Button';

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
		closeOnClickAway: false
	}

	componentDidMount() {
		document.querySelector('html').classList.add(css.html);
	}

	componentWillUnmount() {
		document.querySelector('html').classList.remove(css.html);
	}

	render() {
		const {isOpened, isModal, closeOnClickAway} = this.state;

		return (
			<Demo theme={theme}>
				<label className={css.label}>
					Modal <input type="checkbox"
					             value={isModal}
					             onChange={this.onIsModalChange}/>
				</label>
				<label className={css.label}>
					Close on clickaway <input type="checkbox"
					             value={closeOnClickAway}
					             onChange={this.onCloseOnClickAwayChange}/>
				</label>
				<Button isPrimary={true}
				        onClick={this.onToggleClick}>
					{isOpened ? 'Close' : 'Open'}
					<Popup theme={popupTheme}
					       header={header}
					       footer={footer}
					       isModal={isModal}
					       closeOnClickAway={closeOnClickAway}
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
			closeOnClickAway: !this.state.closeOnClickAway
		});
	}

	onPopupRequestClose = () => {
		this.setState({
			isOpened: false
		});
	}
}

storiesOf('Popup', module).add('Default', () => <PopupPage/>);