import * as React from 'react';
import * as classnames from 'classnames';
import {themr} from 'react-css-themr';
export const INPUT = Symbol('Input');

const INPUT_THEME_SHAPE = {
	container: React.PropTypes.string
};

type TInputInjectedProps = {
	theme: {
		container?: string,
		container_isFocused?: string
		container_hasError?: string
	}
};

type TOwnInputProps = React.HTMLProps<HTMLInputElement> & {
	tagName?: string,
	isFocused?: boolean,
	error?: React.ReactNode
};

type TFullInputProps = TOwnInputProps & TInputInjectedProps;

const Input: React.SFC<TFullInputProps> = ({theme, isFocused, tagName, error, ...props}) => {
	const Component = tagName as any;
	const className = classnames(
		theme.container,
		{
			[theme.container_isFocused as string]: isFocused,
			[theme.container_hasError as string]: Boolean(error)
		}
	);
	return <Component className={className} {...props}/>;
};
Input.propTypes = {
	theme: React.PropTypes.shape(INPUT_THEME_SHAPE)
};
Input.defaultProps = {
	tagName: 'input'
} as TFullInputProps;

export type TInputProps = TOwnInputProps & Partial<TInputInjectedProps>;
export default themr(INPUT)(Input) as React.ComponentClass<TInputProps>;