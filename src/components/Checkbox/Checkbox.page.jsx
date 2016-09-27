import React, {Component, PropTypes} from 'react';
import {PURE} from 'dx-util/src/react/pure';
import {themr} from 'react-css-themr';
import Demo from '../../demo/Demo.jsx';

import Checkbox from './Checkbox.jsx';
import {storiesOf} from '@kadira/storybook';

import css from './Checkbox.page.styl';
import checkboxCSS from './Checkbox.demo.styl';

const darkDemoTheme = {
	container: css.container,
	container__view: css.container__view,
	container__checkboxIcon: css.container__checkboxIcon
};

export const CHECKBOX = 'Checkbox';

@PURE
@themr(CHECKBOX)
class CheckboxPage extends Component {
	state = {
		isChecked: true
	}
	static propTypes = {
		isDisabled: PropTypes.bool
	}
	render() {
		return (
			<Demo>
				<div className={css.container}>
					<label htmlFor="check1" className={css.container__label}>
						<Checkbox theme={darkDemoTheme}
							isChecked={this.state.isChecked}
							onChange={this.onChangeHandler}
							isDisabled={this.props.isDisabled}
							value="check1"
							name="check1"
							id="check1"/>
						I'am controlled checkbox
					</label>
				</div>
				<div className={css.container}>
					<label htmlFor="check2" className={css.container__label}>
						<Checkbox theme={darkDemoTheme}
								isChecked={this.state.isChecked}
								onChange={this.onChangeHandler}
								isDisabled={this.props.isDisabled}
								value="check2"
								name="check2"
								id="check2"/>
						I'am controlled checkbox
					</label>
				</div>
				<div className={css.container}>
					<label htmlFor="check3" className={css.container__label}>
						<Checkbox theme={darkDemoTheme}
								onChange={this.onChangeHandler}
								isDisabled={this.props.isDisabled}
								value="check3"
								name="check3"
								id="check3"/>
						I'am uncontrolled checkbox
					</label>
				</div>
			</Demo>
		);
	}
	onChangeHandler = (e) => {
		this.setState({
			isChecked: !this.state.isChecked
		});
	}
}

storiesOf('Checkbox', module).add('default', () => <CheckboxPage/>)
		.add('disabled', () => <CheckboxPage isDisabled={true}/>);

