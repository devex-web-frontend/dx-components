import * as React from 'react';
import SteppableInput, {TSteppableInput} from './SteppableInput';
import {storiesOf} from '@kadira/storybook';
import Demo from '../../demo/Demo';
import * as steppableInputTheme from './theme/SteppableInput.demo.styl';
import * as innerInputTheme from './theme/InnerInput.demo.styl';
declare const foo: any;
const theme = {
	...steppableInputTheme,
	InnerInput: innerInputTheme
};

import * as iconAdd from '../../resources/svg/icon-add.svg';
import * as iconDecrease from '../../resources/svg/icon-decrease.svg';
import stateful from '../../util/react/stateful';
import {themr} from 'react-css-themr';

const DemoSteppableInput: TSteppableInput<number, string> = SteppableInput;
const Stateful = stateful()(DemoSteppableInput);

const increment = (value: number, step: number): number => value + step;
const decrement = (value: number, step: number): number => value - step;

type TInputProps = React.HTMLProps<HTMLInputElement> & {
	onValueChange: (value?: number) => void,
	value?: number,
	theme: {
		container?: string
	}
};
type TInputState = {
	value: string
};
@themr(Symbol())
class Input extends React.Component<TInputProps, TInputState> {
	state: TInputState;

	componentWillMount() {
		this.setState({
			value: this.format(this.props.value)
		});
	}

	componentWillReceiveProps(props: TInputProps) {
		if (this.props.value !== props.value) {
			this.setState({
				value: this.format(props.value)
			});
		}
	}

	render() {
		const {onValueChange, defaultValue, theme, ...props} = this.props;
		return (
			<input {...props} onBlur={this.onBlur}
			                  className={theme.container}
			                  value={this.state.value}
			                  onChange={this.onChange}/>
		);
	}

	private onChange = (e: React.FormEvent<HTMLInputElement>) => {
		const {currentTarget: {value}} = e;
		this.setState({
			value
		});
		this.notifyChanged(value);
	}

	private onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		this.notifyChanged(this.state.value);
	}

	private notifyChanged(value: string) {
		if (value === '') {
			//empty input
			this.props.onValueChange(undefined);
		} else {
			const numeric = this.parse(this.state.value);
			if (!isNaN(numeric) && numeric !== this.props.value) {
				this.props.onValueChange(numeric);
			}
		}
	}

	private format = (value?: number): string => {
		return typeof value !== 'undefined' ? `${value}` : '';
	}

	private parse = (raw: string): number => {
		return Number(raw);
	}
}

storiesOf('SteppableInput', module).add('default', () => (
	<Demo>
		<Stateful theme={theme}
		          InnerInput={Input}
		          decrement={decrement}
		          increment={increment}
		          step={1}
		          onChange={console.log.bind(console)}
		          decreaseIcon={iconDecrease}
		          increaseIcon={iconAdd}/>
	</Demo>
));