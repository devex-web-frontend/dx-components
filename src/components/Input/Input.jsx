import React from 'react';
import {themr} from 'react-css-themr';
export const INPUT = Symbol('Input');

const Input = ({theme, ...props}) => <input {...props} className={theme.container} />;
Input.propTypes = {
	theme: React.PropTypes.shape({
		container: React.PropTypes.string
	})
};
export default themr(INPUT)(Input);