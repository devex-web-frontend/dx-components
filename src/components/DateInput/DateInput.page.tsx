import * as React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import Demo from '../../demo/Demo';
import stateful from '../../util/react/stateful';
import DateInput from './DateInput';
const Stateful = stateful()(DateInput);
import * as add from '../../resources/svg/icon-add.svg';
import * as decrease from '../../resources/svg/icon-decrease.svg';
import * as clear from '../../resources/svg/icon-small-cross.svg';
import * as calendar from '../../resources/svg/icon-calendar.svg';
import {TControlProps} from '../Control/Control';

const onChange = (value: Date) => action('change')(value);
const onClear = () => action('clear')();

const Calendar: React.SFC<TControlProps<Date>> = props => {
	return (
		<div>calendar</div>
	);
};

class DateInputPage extends React.Component<any, any> {
	private target: any;

	render() {
		return (
			<Demo>
				<input type="date" id="date"/>
				<section>
					<h1>without Calendar</h1>
					<Stateful decrementIcon={decrease}
					          incrementIcon={add}
					          clearIcon={clear}
					          onChange={onChange}
					          onClear={onClear}
					          defaultValue={new Date()}/>
					<Stateful decrementIcon={decrease}
					          incrementIcon={add}
					          clearIcon={clear}
					          onChange={onChange}
					          onClear={onClear}
					          defaultValue={new Date()}/>
				</section>
				<section>
					<h1>with calendar</h1>
					<Stateful decrementIcon={decrease}
					          incrementIcon={add}
					          clearIcon={clear}
					          calendarIcon={calendar}
					          onChange={onChange}
					          onClear={onClear}
					          Calendar={Calendar}
					          defaultValue={new Date()}/>
					<Stateful decrementIcon={decrease}
					          incrementIcon={add}
					          clearIcon={clear}
					          calendarIcon={calendar}
					          onChange={onChange}
					          onClear={onClear}
					          Calendar={Calendar}
					          target={this.target}
					          defaultValue={new Date()}/>
				</section>
				<section>
					<h1>calendar output target</h1>
					<div ref={el => this.target = el}></div>
				</section>
			</Demo>
		);
	}
}

storiesOf('DateInput', module).add('default', () => <DateInputPage/>);