import React from 'react';
import {themr, ThemeProvider as ThemrProvider} from 'react-css-themr';
import * as PropTypes from 'prop-types';
import {ThemeProvider} from '../util/react/theme';

import css from './Demo.styl';

import theme from './theme.js';

const PROP_TYPES = {
	children: PropTypes.node.isRequired,
	theme: PropTypes.shape({
		container: PropTypes.string
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
	<ThemrProvider theme={theme}>
		<ThemeProvider theme={theme}>
			<DemoComponent theme={props.theme}>
				{props.children}
			</DemoComponent>
		</ThemeProvider>
	</ThemrProvider>
);

Demo.propTypes = PROP_TYPES;

export default Demo;