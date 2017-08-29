import * as React from 'react';
import { Component, EventHandler, ChangeEvent, ComponentClass, ChangeEventHandler } from 'react';
import { PURE } from 'dx-util/lib/react/pure';
import * as classnames from 'classnames';

import { Icon } from '../Icon/Icon';
import { withTheme } from '../../util/react/withTheme';
import { ObjectClean } from 'typelevel-ts';
import { PartialKeys } from 'dx-util/lib/object/object';
import { TControlProps } from '../Control/Control';

export const CHECKBOX = Symbol('Checkbox');

export type TFullCheckboxProps = TControlProps<boolean> & {
	id?: string,
	checkboxIconName: string,
	isDisabled?: boolean,
	theme: {
		container?: string,
		container_isDisabled?: string,
		input?: string,
		view?: string,
		view_isDisabled?: string,
		icon?: string,
		icon_isChecked?: string,
		icon_isDisabled?: string
	}
};

@PURE
class RawCheckbox extends Component<TFullCheckboxProps> {
	render() {
		const {
			id,
			checkboxIconName,
			isDisabled,
			value,
			theme
		} = this.props;

		const iconClassName = classnames(theme.icon, {
			[theme.icon_isChecked as string]: value,
			[theme.icon_isDisabled as string]: isDisabled
		});
		const viewClassName = classnames(theme.view, {
			[theme.view_isDisabled as string]: isDisabled
		});

		return (
			<span className={theme.container}>
				<input type="checkbox"
				       id={id}
				       checked={value || false}
				       disabled={isDisabled}
				       onChange={this.handleChange}
				       className={theme.input}/>
				<span className={viewClassName}>
					<span className={iconClassName}>
						<Icon name={checkboxIconName}/>
					</span>
				</span>
			</span>
		);
	}

	handleChange: ChangeEventHandler<HTMLInputElement> = element => {
		this.props.onValueChange(element.target.checked);
	};
}

export type TCheckboxProps = ObjectClean<PartialKeys<TFullCheckboxProps, 'theme'>>;
export const Checkbox: ComponentClass<TCheckboxProps> = withTheme(CHECKBOX)(RawCheckbox);