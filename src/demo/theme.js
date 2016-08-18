//this is a demo theme config - includes some additional presentational styles that are not included in the lib
import config from '../config/theme';

import {LIST} from '../components/List/List';
import list from '../components/List/List.demo.styl';

import {MENU} from '../components/Menu/Menu';
import menu from '../components/Menu/Menu.demo.styl';

import {POPOVER} from '../components/Popover/Popover';
import popover from '../components/Popover/Popover.demo.styl';

export default {
	...config,
	//additional styles
	[LIST]: list,
	[MENU]: menu,
	[POPOVER]: popover
};