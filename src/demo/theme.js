//this is a demo theme config - includes some additional presentational styles that are not included in the lib
import config from '../config/theme';

import {LIST} from '../components/List/List';
import list from '../components/List/List.demo.styl';

import {MENU} from '../components/Menu/Menu';
import menu from '../components/Menu/Menu.demo.styl';

import {POPOVER} from '../components/Popover/Popover';
import popover from '../components/Popover/Popover.demo.styl';

import {SELECTBOX} from '../components/Selectbox/Selectbox';
import selectbox from '../components/Selectbox/Selectbox.demo.styl';

import {TOGGLE_BUTTONS} from '../components/ToggleButtons/ToggleButtons';
import toggleButtons from '../components/ToggleButtons/ToggleButtons.demo.styl';

import {COMBOBOX} from '../components/Combobox/Combobox';
import combobox from '../components/Combobox/Combobox.demo.styl';

import {INPUT} from '../components/Input/Input.jsx';
import input from '../components/Input/Input.demo.styl';

import {NUMERIC_STEPPER} from '../components/NumericStepper/NumericStepper.jsx';
import numericStepper from '../components/NumericStepper/NumericStepper.demo.styl';

import {TABLE} from '../components/Table/Table';
import table from '../components/Table/Table.demo.styl';

import {HORIZONTAL_SCROLLBAR} from '../components/Scrollbar/HorizontalScrollbar.jsx';
import horizontalScrollbar from '../components/Scrollbar/HorizontalScrollbar.demo.styl';

import {VERTICAL_SCROLLBAR} from '../components/Scrollbar/VerticalScrollbar.jsx';
import verticalScrollbar from '../components/Scrollbar/VerricalScrollbar.demo.styl';

import {POPUP} from '../components/Popup/Popup';
import popup from '../components/Popup/Popup.demo.styl';

export default {
	...config,
	//additional demo styles
	[LIST]: list,
	[MENU]: menu,
	[POPOVER]: popover,
	[SELECTBOX]: selectbox,
	[TOGGLE_BUTTONS]: toggleButtons,
	[INPUT]: input,
	[SELECTBOX]: selectbox,
	[NUMERIC_STEPPER]: numericStepper,
	[COMBOBOX]: combobox,
	[TABLE]: table,
	[HORIZONTAL_SCROLLBAR]: horizontalScrollbar,
	[VERTICAL_SCROLLBAR]: verticalScrollbar,
	[POPUP]: popup
};