import React from 'react';
import Demo from '../../demo/Demo.jsx';

import {Icon} from './Icon.tsx';
import {storiesOf} from '@kadira/storybook';
import iconAdd from './img/icon-add.svg';

storiesOf('Icon', module).add('default', () => (
	<Demo>
		<Icon name={iconAdd}/>
	</Demo>
));