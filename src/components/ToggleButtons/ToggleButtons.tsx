import * as React from 'react';
import {
	Component, PropTypes, ReactElement, ComponentClass
} from 'react';
import { PURE } from 'dx-util/lib/react/pure';
import * as classnames from 'classnames';
import { mergeThemes, withTheme } from '../../util/react/withTheme';
import { ObjectClean } from 'typelevel-ts';
import { PartialKeys } from 'dx-util/lib/object/object';

export const TOGGLE_BUTTONS = Symbol('ToggleButtons');

type TToggleButtonsChildProps = {
	isActive?: boolean | undefined,
	isDisabled?: boolean,
	theme?: {
		container__vertical?: string,
		container__item?: string,
		container__item_active?: string
	},
	onClick?: () => void
};

export type TFullToggleButtonsProps = {
	children: ReactElement<TToggleButtonsChildProps>[],
	isDisabled?: boolean,
	isVertical?: boolean,
	toggleIndex?: number,
	defaultIndex?: number,
	onChange: Function,
	theme: {
		container?: string,
		container__wrapper?: string,
		container__vertical?: string,
		container__item?: string,
		container__item_active?: string
	}
};

type TToggleButtonsState = {
	toggleIndex: number
};

@PURE
class RawToggleButtons extends Component<TFullToggleButtonsProps, TToggleButtonsState> {
	static propTypes = {
		children: PropTypes.arrayOf(PropTypes.element),
		isDisabled: PropTypes.bool,
		isVertical: PropTypes.bool,
		toggleIndex: PropTypes.number,
		defaultIndex: PropTypes.number,
		onChange: PropTypes.func,
		theme: PropTypes.shape({
			container: PropTypes.string,
			container__wrapper: PropTypes.string,
			container__vertical: PropTypes.string,
			container__item: PropTypes.string,
			container__item_active: PropTypes.string
		})
	};

	state = {
		toggleIndex: 0
	};

	componentWillMount() {
		const { toggleIndex, defaultIndex } = this.props;
		this.setState({
			toggleIndex: typeof toggleIndex !== 'undefined' ? toggleIndex : defaultIndex || 0
		});
	}

	componentWillReceiveProps(newProps: TFullToggleButtonsProps) {
		if (typeof newProps.toggleIndex !== 'undefined') {
			this.setState({
				toggleIndex: newProps.toggleIndex
			});
		}
	}

	render() {
		const { children, theme } = this.props;
		return (
			<div className={theme.container__wrapper}>
				{React.Children.map(children, this.renderToggleItem)}
			</div>
		);
	}

	renderToggleItem = (child: ReactElement<TToggleButtonsChildProps>, i: number) => {
		const {
			theme,
			isVertical,
			isDisabled
		} = this.props;

		const isActive = i === this.state.toggleIndex;

		const toggleButtonTheme = mergeThemes({
			container: classnames(theme.container__item, {
				[theme.container__item_active as string]: isActive,
				[theme.container__vertical as string]: isVertical
			})
		}, child.props.theme || {});

		const childProps: TToggleButtonsChildProps = Object.assign({}, child.props, {
			isActive,
			isDisabled,
			onClick: this.onToggleSelect(i, child.props.onClick),
			theme: toggleButtonTheme
		});
		return React.cloneElement(child, childProps);
	};

	onToggleSelect = (toggleIndex: number, childClickHandler: TToggleButtonsChildProps['onClick']) => () => {
		if (typeof this.props.toggleIndex === 'undefined') {
			this.setState({
				toggleIndex
			});
		}
		childClickHandler && childClickHandler();
		this.props.onChange && this.props.onChange(toggleIndex);
	}
}

export type TToggleButtonsProps = ObjectClean<PartialKeys<TFullToggleButtonsProps, 'theme'>>;
export const ToggleButtons: ComponentClass<TToggleButtonsProps> = withTheme(TOGGLE_BUTTONS)(RawToggleButtons);