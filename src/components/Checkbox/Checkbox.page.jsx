import React, {Component, PropTypes} from 'react';
import Demo from '../../demo/Demo.jsx';

import Checkbox from './Checkbox.jsx';
import {storiesOf} from '@kadira/storybook';

import css from './Checkbox.page.styl';

const darkDemoTheme = {
	container: css.container
};

class CheckboxPage extends Component {
	state = {
		checked: false
	}
	static propTypes = {
		disabled: PropTypes.bool
	}
	render() {
		return (
			<Demo>
				<div>
					<Checkbox theme={darkDemoTheme}
						checked={this.state.checked}
						onChange={this.onChangeHandler}
						disabled={this.props.disabled}
						value="chek1"
						name="chek1">I'am controlled checkbox</Checkbox>
				</div>
				<div>
					<Checkbox theme={darkDemoTheme}
						checked={this.state.checked}
						onChange={this.onChangeHandler}
						disabled={this.props.disabled}
						value="chek2"
						name="chek2">I'am controlled checkbox</Checkbox>
				</div>
				<div>
					<Checkbox theme={darkDemoTheme}
						disabled={this.props.disabled}
						onChange={this.onChangeHandler}
						value="chek3"
						name="chek3">I'am uncontrolled checkbox</Checkbox>
				</div>
			</Demo>
		);
	}
	onChangeHandler = (e) => {
		this.setState({
			checked: !this.state.checked
		});
	}
}

storiesOf('Checkbox', module).add('default', () => <CheckboxPage/>)
		.add('disabled', () => <CheckboxPage disabled={true}/>);

