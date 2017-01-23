import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classnames from 'classnames';
import {themr} from 'react-css-themr';
import {PURE} from 'dx-util/src/react/pure';
export const INPUT = Symbol('Input');

const INPUT_THEME_SHAPE = {
	container: React.PropTypes.string
};

interface IInputInjectedProps {
	theme: {
		container?: string
	}
}

interface IOwnInputProps extends React.HTMLProps<HTMLInputElement> {
	tagName?: string
}

interface IInputProps extends IOwnInputProps, IInputInjectedProps {
}

const Input: React.SFC<IInputProps> = ({theme, tagName, ...props}) => {
	const Component = tagName as any;
	return <Component className={theme.container} {...props}/>;
};
Input.propTypes = {
	theme: React.PropTypes.shape(INPUT_THEME_SHAPE)
};
Input.defaultProps = {
	tagName: 'input'
} as IInputProps;

export default themr(INPUT)(Input) as React.ComponentClass<IOwnInputProps & Partial<IInputInjectedProps>>;