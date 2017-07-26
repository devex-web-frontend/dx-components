import { Children, createElement, ComponentClass, Component, SFC } from 'react';
import * as PropTypes from 'prop-types';
import { ObjectOmit } from 'typelevel-ts';

const THEME_CONTEXT_KEY = '@@dx-util/theme-context-key'; //should be serializable
const THEME_CONFIG_KEY = Symbol('@@dx-util/theme-config-key');

export type TTheme = {
	[key: string]: TTheme | string
};

type TWithConfig = {
	config?: {
		name: string | symbol,
		theme: TTheme
	}
};

type TTargetProps = {
	theme: TTheme
};

type TResultProps<P extends TTargetProps> = ObjectOmit<P, 'theme'> & {
	theme?: P['theme']
};

type TResult<P extends TTargetProps> = ComponentClass<TResultProps<P>>;

//shortcuts
type CC<P> = ComponentClass<P>;

export function theme(name: string | symbol, defaultTheme: TTheme = {}) {
	function decorate<P extends TTargetProps>(Target: SFC<P & TTargetProps> & TWithConfig): TResult<P>;
	function decorate<P extends TTargetProps>(Target: CC<P & TTargetProps> & TWithConfig): TResult<P>;
	function decorate<P extends TTargetProps>(Target:
		(SFC<P & TTargetProps> | CC<P & TTargetProps>) & TWithConfig): TResult<P> {

		if (Target.config && Target.config.name === name) {
			//already wrapped - just merge in new defaultTheme
			Target.config.theme = mergeTwo(Target.config.theme, defaultTheme);
			return Target as any;
		}

		const config = {
			name,
			theme: defaultTheme
		};

		class Themed extends Component<TResultProps<P>, never> {
			static displayName = `Themed(${Target.name})`;

			static contextTypes = {
				[THEME_CONTEXT_KEY]: PropTypes.object.isRequired
			};

			render() {
				const props = {
					...this.props,
					theme: mergeTwo(mergeTwo(config.theme, this.context.theme[name]), this.props.theme)
				};
				return createElement(Target as any, props);
			}
		}

		Themed[THEME_CONFIG_KEY] = config;

		return Themed;
	}

	return decorate;
}

/**
 * Merges passed themes by concatenating string keys and processing nested themes
 */
export function merge(...themes: TTheme[]): TTheme {
	return themes.reduce((acc, theme) => merge(acc, theme), {});
}

function mergeTwo(original: TTheme = {}, mixin: TTheme = {}): TTheme {
	//make a copy to avoid mutations of nested objects
	//also strip all functions injected by isomorphic-style-loader
	const result = Object.keys(original).reduce((acc, key) => {
		const value = original[key];
		if (typeof value !== 'function') {
			acc[key] = value;
		}
		return acc;
	}, {});

	//traverse mixin keys and merge them to resulting theme
	Object.keys(mixin).forEach(key => {
		//there's no need to set any defaults here
		const originalValue = result[key];
		const mixinValue = mixin[key];

		switch (typeof mixinValue) {
			case 'object': {
				//possibly nested theme object
				switch (typeof originalValue) {
					case 'object': {
						//exactly nested theme object - go recursive
						result[key] = merge(originalValue, mixinValue as TTheme);
						break;
					}

					case 'undefined': {
						//original does not contain this nested key - just take it as is
						result[key] = mixinValue;
						break;
					}

					default: {
						//can't merge an object with a non-object
						throw new Error(`You are merging object ${key} with a non-object ${originalValue}`);
					}
				}
				break;
			}

			case 'undefined': //fallthrough - handles accidentally unset values which may come from props
			case 'function': {
				//this handles issue when isomorphic-style-loader addes helper functions to css-module
				break; //just skip
			}

			default: {
				//plain values
				switch (typeof originalValue) {
					case 'object': {
						//can't merge a non-object with an object
						throw new Error(`You are merging non-object ${mixinValue} with an object ${key}`);
					}

					case 'undefined': {
						//mixin key is new to original theme - take it as is
						result[key] = mixinValue;
						break;
					}
					case 'function': {
						//this handles issue when isomorphic-style-loader addes helper functions to css-module
						break; //just skip
					}

					default: {
						//finally we can merge
						result[key] = (originalValue as string).split(' ')
							.concat((mixinValue as string).split(' '))
							.filter((item, pos, self) => self.indexOf(item) === pos && item !== '')
							.join(' ');
						break;
					}
				}
				break;
			}
		}
	});

	return result;
}

export type TThemeProviderProps = {
	theme: {
		[key: number]: TTheme
	}
};

export class ThemeProvider extends Component<TThemeProviderProps> {
	static childContextTypes = {
		[THEME_CONTEXT_KEY]: PropTypes.object
	};

	render() {
		return Children.only(this.props.children);
	}

	getChildContext() {
		return {
			theme: this.props.theme
		};
	}
}