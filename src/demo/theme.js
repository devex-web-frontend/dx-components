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

export default {
	...config,
	//additional demo styles
	[LIST]: list,
	[MENU]: menu,
	[POPOVER]: popover,
	[SELECTBOX]: selectbox,
	[TOGGLE_BUTTONS]: toggleButtons
};