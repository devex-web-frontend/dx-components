import React from 'react';
import {themr} from 'react-css-themr';
export const INPUT = Symbol('Input');

export const INPUT_THEME_SHAPE = {
	container: React.PropTypes.string
};

const Input = ({theme, ...props}) => <input {...props} className={theme.container}/>;
Input.propTypes = {
	theme: React.PropTypes.shape(INPUT_THEME_SHAPE)
};
export default themr(INPUT)(Input);