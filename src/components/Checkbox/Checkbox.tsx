import * as React from 'react';
import { Component, EventHandler, ChangeEvent } from 'react';
import { PURE } from 'dx-util/lib/react/pure';
import { themr } from 'react-css-themr';
import * as classnames from 'classnames';
import { randomId } from 'dx-util/lib/string/string';

import { Icon } from '../Icon/Icon';
import { withTheme } from '../../util/react/withTheme';
import { ObjectClean } from 'typelevel-ts';
import { PartialKeys } from 'dx-util/lib/object/object';

export const CHECKBOX = Symbol('Checkbox');

export type TFullCheckboxProps = {
	id?: string,
	checkboxIconName: string,
	isDisabled?: boolean,
	isChecked?: boolean,
	onChange?: EventHandler<ChangeEvent<HTMLInputElement>>
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
			isChecked,
			onChange,
			theme
		} = this.props;

		const iconClassName = classnames(theme.icon, {
			[theme.icon_isChecked as string]: isChecked,
			[theme.icon_isDisabled as string]: isDisabled
		});
		const viewClassName = classnames(theme.view, {
			[theme.view_isDisabled as string]: isDisabled
		});

		return (
			<span className={theme.container}>
				<input
					type="checkbox"
					id={id}
					checked={isChecked}
					disabled={isDisabled}
					onChange={onChange}
					className={theme.input} />
				<span className={viewClassName}>
					<span className={iconClassName}>
						<Icon name={checkboxIconName} />
					</span>
				</span>
			</span>
		);
	}
}

export type TCheckboxProps = ObjectClean<PartialKeys<TFullCheckboxProps, 'theme'>>;
export const Checkbox = withTheme(CHECKBOX)(RawCheckbox);