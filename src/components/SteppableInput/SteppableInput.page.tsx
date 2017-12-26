import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SteppableInput from './SteppableInput';
import { storiesOf, action } from '@kadira/storybook';
import Demo from '../../demo/Demo';
import * as pageTheme from './theme/SteppableInput.page.styl';

import * as iconAdd from '../../resources/svg/icon-add.svg';
import * as iconDecrease from '../../resources/svg/icon-decrease.svg';
import * as iconClear from '../../resources/svg/icon-small-cross.svg';
import { TSteppableInputProps } from './SteppableInput';
import { ReactInstance } from 'react';

class DemoInput extends React.Component<TSteppableInputProps, any> {
	private input: ReactInstance | null;

	render() {
		const {onIncrement, onDecrement, error, onClear, isDisabled} = this.props;

		return (
			<SteppableInput onIncrement={onIncrement}
			                onDecrement={onDecrement}
			                onClear={onClear}
			                error={error}
			                onFocus={this.onFocus}
			                clearIcon={iconClear}
			                decrementIcon={iconDecrease}
			                isDisabled={isDisabled}
			                incrementIcon={iconAdd}>
				<input className={pageTheme.customInput}
				       tabIndex={-1}
				       disabled={isDisabled}
				       ref={el => this.input = el}/>
			</SteppableInput>
		);
	}

	onFocus = () => {
		if (this.input) {
			const input: HTMLInputElement = ReactDOM.findDOMNode(this.input);
			input.focus();
		}
	}
}

storiesOf('SteppableInput', module).add('default', () => (
	<Demo>
		<DemoInput onIncrement={action('increment')}
		           onDecrement={action('decremnt')}/>
		<DemoInput onClear={action('clear')}/>
		<DemoInput onIncrement={action('increment')}
		           isDisabled={true}
		           onDecrement={action('decremnt')}
		           onClear={action('clear')}/>
		<DemoInput onIncrement={action('increment')}
		           onDecrement={action('decremnt')}
		           onClear={action('clear')}/>
		<DemoInput onIncrement={action('increment')}
		           onDecrement={action('decremnt')}
		           error={'Error'}
		           onClear={action('clear')}/>
	</Demo>
));