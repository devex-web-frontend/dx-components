import * as React from 'react';
import {storiesOf} from '@kadira/storybook';
import Demo from '../../demo/Demo';
import NumberInput from './NumberInput';
import * as iconAdd from '../../resources/svg/icon-add.svg';
import * as iconDecrease from '../../resources/svg/icon-decrease.svg';
import stateful from '../../util/react/stateful';
const Stateful = stateful()(NumberInput);

storiesOf('NumberInput', module).add('default', () => (
	<Demo>
		<Stateful step={1}
		          defaultValue={123}
		          increaseIcon={iconAdd}
		          decreaseIcon={iconDecrease}
		/>
	</Demo>
));