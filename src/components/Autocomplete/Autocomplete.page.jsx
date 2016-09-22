import React from 'react';
import Demo from '../../demo/Demo';
import Autocomplete, {UncontrolledAutocomplete} from './Autocomplete';
import {PURE} from 'dx-util/src/react/pure';
import {storiesOf, action} from '@kadira/storybook';

import css from './Autocomplete.page.styl';
const theme = {
	input: css.autocomplete__input,
	popover: css.autocomplete__popover
};

const notifyChanged = action('Change');

const data = Array.from(new Array(20).keys()).map(v => `${v}`);

@PURE
class AutocompletePage extends React.Component {
	state = {
		value: ''
	}

	render() {
		return (
			<Demo>
				<Autocomplete data={data}
				              placeholder="Enter number"
				              theme={theme}
				              value={this.state.value}
				              onChange={this.onChange}/>
			</Demo>
		);
	}

	onChange = value => {
		notifyChanged(value);
		this.setState({
			value
		});
	}
}

storiesOf('Autocomplete', module).add('Default', () => <AutocompletePage/>);