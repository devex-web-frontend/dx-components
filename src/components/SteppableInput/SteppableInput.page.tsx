import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SteppableInput from './SteppableInput';
import {storiesOf, action} from '@kadira/storybook';
import Demo from '../../demo/Demo';
import * as pageTheme from './theme/SteppableInput.page.styl';
declare const foo: any;

import * as iconAdd from '../../resources/svg/icon-add.svg';
import * as iconDecrease from '../../resources/svg/icon-decrease.svg';
import * as iconClear from '../../resources/svg/icon-small-cross.svg';

class DemoInput extends React.Component<any, any> {
	private input: HTMLInputElement;

	render() {
		return (
			<SteppableInput onIncrement={action('increment')}
			                onDecrement={action('decrement')}
			                onFocus={this.onFocus}
			                clearIcon={iconClear}
			                isClearable={true}
			                decreaseIcon={iconDecrease}
			                increaseIcon={iconAdd}>
				<input className={pageTheme.customInput} tabIndex={-1} ref={(el: any) => this.input = el}/>
			</SteppableInput>
		);
	}

	onFocus = (e: any) => {
		const input = ReactDOM.findDOMNode<HTMLElement>(this.input);
		input.focus();
	}
}

storiesOf('SteppableInput', module).add('default', () => (
	<Demo>
		<DemoInput/>
	</Demo>
));