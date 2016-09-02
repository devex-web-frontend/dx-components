import React from 'react';
import {themr, ThemeProvider} from 'react-css-themr';

import css from './Demo.styl';

import theme from './theme.js';

const PROP_TYPES = {
	children: React.PropTypes.node.isRequired,
	theme: React.PropTypes.shape({
		container: React.PropTypes.string
	})
};

@themr(Symbol(), css)
class DemoComponent extends React.Component {
	static propTypes = PROP_TYPES;

	render() {
		const {children, theme} = this.props;

		return (
			<section className={theme.container}>
				{children}
			</section>
		);
	}
}

const Demo = props => (
	<ThemeProvider theme={theme}>
		<DemoComponent theme={props.theme}>
			{props.children}
		</DemoComponent>
	</ThemeProvider>
);

Demo.propTypes = PROP_TYPES;

export default Demo;