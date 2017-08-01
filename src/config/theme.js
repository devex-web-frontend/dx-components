import { ICON } from '../components/Icon/Icon';
import icon from '../components/Icon/Icon.styl';

import { BUTTON } from '../components/Button/Button';
import button from '../components/Button/Button.styl';

import { BUTTON_ICON } from '../components/ButtonIcon/ButtonIcon';
import buttonIcon from '../components/ButtonIcon/ButtonIcon.styl';

import { LINK } from '../components/Link/Link';
import link from '../components/Link/Link.styl';

import { LIST } from '../components/List/List';
import list from '../components/List/List.styl';

import { MENU } from '../components/Menu/Menu';
import menu from '../components/Menu/Menu.styl';

import { POPOVER } from '../components/Popover/Popover';
import popover from '../components/Popover/Popover.styl';

import { SELECTBOX } from '../components/Selectbox/Selectbox';
import selectbox from '../components/Selectbox/Selectbox.styl';

import { TOGGLE_BUTTONS } from '../components/ToggleButtons/ToggleButtons';
import toggleButtons from '../components/ToggleButtons/ToggleButtons.styl';

import { RESIZE_DETECTOR } from '../components/ResizeDetector/ResizeDetector';
import resizeDetector from '../components/ResizeDetector/ResizeDetector.styl';

import { COMBOBOX } from '../components/Combobox/Combobox';
import combobox from '../components/Combobox/Combobox.styl';

import { INPUT } from '../components/Input/Input';
import input from '../components/Input/Input.styl';

import { PASSWORD_INPUT } from '../components/PasswordInput/PasswordInput';
import passwordInput from '../components/PasswordInput/PasswordInput.styl';

import { NUMERIC_STEPPER } from '../components/NumericStepper/NumericStepper.jsx';
import numericStepper from '../components/NumericStepper/NumericStepper.styl';

import { EXPANDABLE } from '../components/Expandable/Expandable.jsx';
import expandable from '../components/Expandable/Expandable.styl';

import { TABLE } from '../components/Table/Table';
import table from '../components/Table/Table.styl';

import { GRID } from '../components/Grid/Grid';
import grid from '../components/Grid/Grid.styl';

import { SCROLLABLE } from '../components/Scrollable/Scrollable';
import scrollable from '../components/Scrollable/Scrollable.styl';

import { HORIZONTAL_SCROLLBAR } from '../components/Scrollbar/HorizontalScrollbar.jsx';
import horizontalScrollbar from '../components/Scrollbar/HorizontalScrollbar.styl';

import { VERTICAL_SCROLLBAR } from '../components/Scrollbar/VerticalScrollbar.jsx';
import verticalScrollbar from '../components/Scrollbar/VerticalScrollbar.styl';

import { LOADINGINDICATON } from '../components/LoadingIndicaton/LoadingIndicaton';
import loadingiIndicaton from '../components/LoadingIndicaton/LoadingIndicaton.styl';

import { CHECKBOX } from '../components/Checkbox/Checkbox.tsx';
import checkbox from '../components/Checkbox/Checkbox.styl';

import { POPUP } from '../components/Popup/Popup';
import popup from '../components/Popup/Popup.styl';

import { AUTOCOMPLETE } from '../components/Autocomplete/Autocomplete';
import autocomplete from '../components/Autocomplete/Autocomplete.styl';

import { DATE_PICKER } from '../components/DatePicker/DatePicker';
import datePicker from '../components/DatePicker/DatePicker.styl';

import { CALENDAR } from '../components/Calendar/Calendar';
import calendarTheme from '../components/Calendar/Calendar.styl';

import { LOADING_INDICATOR } from '../components/LoadingIndicator/LoadingIndicator';
import loadingIndicator from '../components/LoadingIndicator/LoadingIndicator.styl';

import { STEPPABLE_INPUT } from '../components/SteppableInput/SteppableInput';
import steppableInput from '../components/SteppableInput/theme/SteppableInput.styl';
import steppableInputInput from '../components/SteppableInput/theme/Input.styl';
import steppableInputButtonIcon from '../components/SteppableInput/theme/ButtonIcon.styl';

import { TIME_INPUT } from '../components/TimeInput/TimeInput';
import timeInput from '../components/TimeInput/theme/TimeInput.styl';

import { DATE_INPUT } from '../components/DateInput/DateInput';
import dateInput from '../components/DateInput/theme/DateInput.styl';
import dateInputButtonIcon from '../components/DateInput/theme/ButtonIcon.styl';
import { themeable } from 'react-css-themr';

export default {
	[ICON]: icon,
	[BUTTON]: button,
	[BUTTON_ICON]: buttonIcon,
	[LINK]: link,
	[CHECKBOX]: checkbox,
	[LIST]: list,
	[MENU]: menu,
	[POPOVER]: popover,
	[SELECTBOX]: selectbox,
	[TOGGLE_BUTTONS]: toggleButtons,
	[RESIZE_DETECTOR]: resizeDetector,
	[SELECTBOX]: selectbox,
	[INPUT]: input,
	[NUMERIC_STEPPER]: numericStepper,
	[SELECTBOX]: selectbox,
	[COMBOBOX]: combobox,
	[TABLE]: table,
	[GRID]: grid,
	[LOADINGINDICATON]: loadingiIndicaton,
	[POPUP]: popup,
	[GRID]: grid,
	[SCROLLABLE]: scrollable,
	[HORIZONTAL_SCROLLBAR]: horizontalScrollbar,
	[VERTICAL_SCROLLBAR]: verticalScrollbar,
	[AUTOCOMPLETE]: autocomplete,
	[DATE_PICKER]: datePicker,
	[CALENDAR]: calendarTheme,
	[EXPANDABLE]: expandable,
	[CALENDAR]: calendarTheme,
	[PASSWORD_INPUT]: {
		Input: {
			container: passwordInput.input
		}
	},
	[LOADING_INDICATOR]: loadingIndicator,
	[STEPPABLE_INPUT]: {
		...steppableInput,
		Input: steppableInputInput,
		ButtonIcon: steppableInputButtonIcon,
		ClearButtonIcon: steppableInputButtonIcon
	},
	[TIME_INPUT]: timeInput,
	[DATE_INPUT]: themeable(
		dateInput,
		{
			ButtonIcon: dateInputButtonIcon,
			CalendarButtonIcon: dateInputButtonIcon
		}
	)
};