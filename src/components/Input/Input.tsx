import * as React from 'react';
import * as classnames from 'classnames';
import {themr} from 'react-css-themr';
export const INPUT = Symbol('Input');

const INPUT_THEME_SHAPE = {
	container: React.PropTypes.string
};

interface IInputInjectedProps {
	theme: {
		container?: string,
		container_isFocused?: string
		container_hasError?: string
	}
}

interface IOwnInputProps extends React.HTMLProps<HTMLInputElement> {
	tagName?: string,
	isFocused?: boolean,
	error?: React.ReactNode
}

interface IInputProps extends IOwnInputProps, IInputInjectedProps {
}

const Input: React.SFC<IInputProps> = ({theme, isFocused, tagName, error, ...props}) => {
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
} as IInputProps;

export default themr(INPUT)(Input) as React.ComponentClass<IOwnInputProps & Partial<IInputInjectedProps>>;