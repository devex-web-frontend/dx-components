import * as React from 'react';
import { withTheme } from '../withTheme';

describe('react/withTheme', () => {
	describe('should compile', () => {
		type TProps = {
			foo: string,
			theme: {
				container: string
			}
		};

		it('when used as HOF with React.Component', () => {
			class Foo extends React.Component<TProps> {
				render() {
					const { theme } = this.props;
					return (
						<div className={theme.container}>hi</div>
					);
				}
			}

			const Themed = withTheme(Symbol())(Foo);
			const testTheme = {
				container: '123'
			};
			const themed = <Themed foo="123" />;
			const themedWithTheme = <Themed foo="123" theme={testTheme} />;
		});

		it('when used as HOF with React.SFC', () => {
			const Foo: React.SFC<TProps> = props => (
				<div className={props.theme.container}>hi</div>
			);

			const Themed = withTheme(Symbol())(Foo);
			const testTheme = {
				container: '123'
			};
			const themed = <Themed foo="123" />;
			const themedWithTheme = <Themed foo="123" theme={testTheme} />;
		});
	});
});